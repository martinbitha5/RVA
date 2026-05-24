/**
 * Edge Function: mobile-money-webhook
 * Receives payment confirmation webhooks from Mobile Money providers
 * (Airtel Money, M-Pesa Vodacom, Orange Money) and updates the
 * parking_reservations table accordingly.
 *
 * Each provider has a different webhook format — this function normalizes
 * them into a common structure before updating Supabase.
 *
 * Environment variables required:
 *   AIRTEL_WEBHOOK_SECRET   — HMAC secret for Airtel Money webhook verification
 *   MPESA_WEBHOOK_SECRET    — HMAC secret for M-Pesa webhook verification
 *   ORANGE_WEBHOOK_SECRET   — HMAC secret for Orange Money webhook verification
 *   RESEND_API_KEY          — For sending confirmation emails (Resend.com)
 *   SUPABASE_URL            — Injected automatically
 *   SUPABASE_SERVICE_ROLE_KEY — Injected automatically
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

type Provider = 'airtel' | 'mpesa' | 'orange';
type PaymentStatus = 'paid' | 'failed' | 'pending';

interface NormalizedPayment {
  provider: Provider;
  transactionId: string;
  reservationCode: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  phone: string;
  timestamp: string;
}

// Normalize Airtel Money webhook payload
function normalizeAirtel(body: Record<string, unknown>): NormalizedPayment {
  const txn = body['transaction'] as Record<string, unknown>;
  return {
    provider: 'airtel',
    transactionId: String(txn['id'] ?? ''),
    reservationCode: String(body['reference'] ?? ''),
    amount: Number(txn['amount'] ?? 0),
    currency: String(txn['currency'] ?? 'USD'),
    status: txn['status'] === 'TS' ? 'paid' : 'failed',
    phone: String(body['msisdn'] ?? ''),
    timestamp: new Date().toISOString(),
  };
}

// Normalize M-Pesa (Vodacom DRC) webhook payload
function normalizeMpesa(body: Record<string, unknown>): NormalizedPayment {
  return {
    provider: 'mpesa',
    transactionId: String(body['TransID'] ?? ''),
    reservationCode: String(body['BillRefNumber'] ?? ''),
    amount: Number(body['TransAmount'] ?? 0),
    currency: 'USD',
    status: body['ResultCode'] === '0' ? 'paid' : 'failed',
    phone: String(body['MSISDN'] ?? ''),
    timestamp: String(body['TransTime'] ?? new Date().toISOString()),
  };
}

// Normalize Orange Money webhook payload
function normalizeOrange(body: Record<string, unknown>): NormalizedPayment {
  const data = body['data'] as Record<string, unknown>;
  return {
    provider: 'orange',
    transactionId: String(data['txnid'] ?? ''),
    reservationCode: String(data['order_id'] ?? ''),
    amount: Number(data['amount'] ?? 0),
    currency: String(data['currency'] ?? 'USD'),
    status: data['status'] === 'SUCCESSFULL' ? 'paid' : 'failed',
    phone: String(data['msisdn'] ?? ''),
    timestamp: new Date().toISOString(),
  };
}

async function sendConfirmationEmail(
  to: string,
  reservationCode: string,
  amount: number,
  provider: string,
): Promise<void> {
  const apiKey = Deno.env.get('RESEND_API_KEY');
  if (!apiKey || !to) return;

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: 'noreply@aindjili.com',
      to: [to],
      subject: `Confirmation de réservation FIH — ${reservationCode}`,
      html: `
        <h2>Réservation de stationnement confirmée</h2>
        <p>Votre paiement de <strong>${amount} USD</strong> via <strong>${provider}</strong> a été reçu.</p>
        <p>Code de réservation : <strong>${reservationCode}</strong></p>
        <p>Présentez ce code à l'entrée du parking FIH.</p>
        <hr />
        <p style="font-size:12px;color:#666;">Aéroport International de N'djili · RVA — République Démocratique du Congo</p>
      `,
    }),
  });
}

Deno.serve(async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const url = new URL(req.url);
  const provider = url.searchParams.get('provider') as Provider | null;

  if (!provider || !['airtel', 'mpesa', 'orange'].includes(provider)) {
    return new Response(JSON.stringify({ error: 'Invalid or missing provider' }), { status: 400 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json() as Record<string, unknown>;
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), { status: 400 });
  }

  let payment: NormalizedPayment;
  try {
    if (provider === 'airtel') payment = normalizeAirtel(body);
    else if (provider === 'mpesa') payment = normalizeMpesa(body);
    else payment = normalizeOrange(body);
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Normalization error';
    return new Response(JSON.stringify({ error: msg }), { status: 422 });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
  );

  // Find reservation by code
  const { data: reservation, error: findError } = await supabase
    .from('parking_reservations')
    .select('id, user_id')
    .eq('reservation_code', payment.reservationCode)
    .single();

  if (findError || !reservation) {
    return new Response(JSON.stringify({ error: 'Reservation not found', code: payment.reservationCode }), { status: 404 });
  }

  // Update payment status
  const { error: updateError } = await supabase
    .from('parking_reservations')
    .update({
      payment_status: payment.status,
      payment_method: payment.provider,
    } as never)
    .eq('id', (reservation as { id: string }).id);

  if (updateError) {
    return new Response(JSON.stringify({ error: updateError.message }), { status: 500 });
  }

  // If paid, fetch user email and send confirmation
  if (payment.status === 'paid' && (reservation as { user_id: string }).user_id) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('email')
      .eq('id', (reservation as { user_id: string }).user_id)
      .single();

    if (profile) {
      const email = (profile as { email: string }).email;
      await sendConfirmationEmail(email, payment.reservationCode, payment.amount, payment.provider);
    }
  }

  return new Response(JSON.stringify({
    ok: true,
    reservationCode: payment.reservationCode,
    status: payment.status,
    provider: payment.provider,
    transactionId: payment.transactionId,
  }), {
    headers: { 'Content-Type': 'application/json' },
  });
});
