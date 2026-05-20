/**
 * Edge Function: notify-flight-alerts
 * Triggered by Supabase DB Webhook on flights table UPDATE.
 * When a flight's status or gate changes, sends SMS via Africa's Talking
 * to all subscribed users.
 *
 * Environment variables required:
 *   AFRICASTALKING_API_KEY  — Africa's Talking API key
 *   AFRICASTALKING_USERNAME — Africa's Talking username (e.g. "fih_rva")
 *   AFRICASTALKING_SENDER   — Short code / sender ID (e.g. "FIH-RVA")
 *   SUPABASE_URL            — Injected automatically
 *   SUPABASE_SERVICE_ROLE_KEY — Injected automatically
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

interface FlightRecord {
  id: string;
  flight_number: string;
  type: string;
  status: string;
  gate: string | null;
  destination_iata: string;
  origin_iata: string;
  scheduled_time: string;
}

interface WebhookPayload {
  type: 'UPDATE';
  table: string;
  record: FlightRecord;
  old_record: FlightRecord;
}

interface AlertUser {
  id: string;
  alert_types: string[];
  profiles: {
    phone: string | null;
    email: string | null;
    full_name: string | null;
    notification_sms: boolean;
  } | null;
}

async function sendSms(phone: string, message: string): Promise<void> {
  const apiKey = Deno.env.get('AFRICASTALKING_API_KEY') ?? '';
  const username = Deno.env.get('AFRICASTALKING_USERNAME') ?? 'sandbox';
  const from = Deno.env.get('AFRICASTALKING_SENDER') ?? 'FIH-RVA';

  const body = new URLSearchParams({
    username,
    to: phone,
    message,
    from,
  });

  await fetch('https://api.africastalking.com/version1/messaging', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'apiKey': apiKey,
    },
    body: body.toString(),
  });
}

function buildMessage(flight: FlightRecord, oldFlight: FlightRecord): string | null {
  const fn = flight.flight_number;
  const route = flight.type === 'departure'
    ? `FIH → ${flight.destination_iata}`
    : `${flight.origin_iata} → FIH`;

  const statusChanged = flight.status !== oldFlight.status;
  const gateChanged = flight.gate !== oldFlight.gate;

  if (statusChanged) {
    const statusLabels: Record<string, string> = {
      boarding: 'Embarquement en cours',
      departed: 'En vol',
      arrived: 'Atterri',
      delayed: 'Retardé',
      cancelled: 'ANNULÉ',
      diverted: 'Dévié',
    };
    const label = statusLabels[flight.status] ?? flight.status;
    return `FIH · Vol ${fn} (${route}) — ${label}${flight.gate ? ` — Porte ${flight.gate}` : ''}`;
  }

  if (gateChanged && flight.gate) {
    return `FIH · Vol ${fn} (${route}) — Changement de porte : ${flight.gate}`;
  }

  return null;
}

Deno.serve(async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const payload = await req.json() as WebhookPayload;

  if (payload.type !== 'UPDATE' || payload.table !== 'flights') {
    return new Response(JSON.stringify({ ok: true, skipped: true }), { status: 200 });
  }

  const { record, old_record } = payload;

  const message = buildMessage(record, old_record);
  if (!message) {
    return new Response(JSON.stringify({ ok: true, skipped: 'no_relevant_change' }), { status: 200 });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
  );

  // Fetch all active alert subscribers for this flight
  const { data: alerts } = await supabase
    .from('flight_alerts')
    .select('id, alert_types, profiles(phone, email, full_name, notification_sms)')
    .eq('flight_id', record.id)
    .eq('active', true);

  const subscribers = (alerts as AlertUser[] | null) ?? [];
  const sent: string[] = [];
  const skipped: string[] = [];

  for (const alert of subscribers) {
    const profile = alert.profiles;
    if (!profile?.notification_sms || !profile.phone) {
      skipped.push(alert.id);
      continue;
    }

    // Check alert_types filter
    const statusChanged = record.status !== old_record.status;
    const gateChanged = record.gate !== old_record.gate;

    const shouldNotify =
      (statusChanged && alert.alert_types.includes('status_change')) ||
      (record.status === 'delayed' && alert.alert_types.includes('delay')) ||
      (gateChanged && alert.alert_types.includes('gate_change'));

    if (!shouldNotify) {
      skipped.push(alert.id);
      continue;
    }

    await sendSms(profile.phone, message);
    sent.push(alert.id);
  }

  return new Response(JSON.stringify({
    ok: true,
    flight: record.flight_number,
    message,
    sent: sent.length,
    skipped: skipped.length,
  }), {
    headers: { 'Content-Type': 'application/json' },
  });
});
