# Supabase Edge Functions — FIH / RVA

Three Edge Functions power the real-time and payment features of the FIH airport site.

## Functions

### `sync-flights`
Fetches live flight data from AviationStack and upserts into the `flights` table.

**Trigger**: Manual POST or pg_cron every 5 minutes (see migration 003).

**Required env vars** (set in Supabase Dashboard → Edge Functions → Secrets):
```
AVIATIONSTACK_API_KEY=your_key_here
```

**Deploy**:
```bash
supabase functions deploy sync-flights --project-ref exrdpowgljaubixjhaqz
```

**Test locally**:
```bash
supabase functions serve sync-flights --env-file .env.local
curl -X POST http://localhost:54321/functions/v1/sync-flights
```

---

### `notify-flight-alerts`
DB Webhook triggered on `flights` UPDATE. Sends SMS via Africa's Talking to subscribers.

**Required env vars**:
```
AFRICASTALKING_API_KEY=your_key
AFRICASTALKING_USERNAME=fih_rva
AFRICASTALKING_SENDER=FIH-RVA
```

**DB Webhook setup** (Supabase Dashboard → Database → Webhooks):
- Table: `flights`
- Events: `UPDATE`
- URL: `https://exrdpowgljaubixjhaqz.supabase.co/functions/v1/notify-flight-alerts`
- Headers: `Authorization: Bearer <service_role_key>`

**Deploy**:
```bash
supabase functions deploy notify-flight-alerts --project-ref exrdpowgljaubixjhaqz
```

---

### `mobile-money-webhook`
Receives payment callbacks from Airtel Money, M-Pesa Vodacom, and Orange Money.
Updates `parking_reservations.payment_status` and sends confirmation email.

**Required env vars**:
```
AIRTEL_WEBHOOK_SECRET=your_hmac_secret
MPESA_WEBHOOK_SECRET=your_hmac_secret
ORANGE_WEBHOOK_SECRET=your_hmac_secret
RESEND_API_KEY=your_resend_key
```

**Webhook URLs to register with providers**:
- Airtel Money: `https://exrdpowgljaubixjhaqz.supabase.co/functions/v1/mobile-money-webhook?provider=airtel`
- M-Pesa Vodacom: `https://exrdpowgljaubixjhaqz.supabase.co/functions/v1/mobile-money-webhook?provider=mpesa`
- Orange Money: `https://exrdpowgljaubixjhaqz.supabase.co/functions/v1/mobile-money-webhook?provider=orange`

**Deploy**:
```bash
supabase functions deploy mobile-money-webhook --project-ref exrdpowgljaubixjhaqz
```

---

## Deploying all functions at once

```bash
supabase functions deploy --project-ref exrdpowgljaubixjhaqz
```

## Local development

```bash
# Start local Supabase stack
supabase start

# Serve all functions locally
supabase functions serve --env-file .env.local

# Run migration 003
supabase db push
```

## Setting secrets in production

```bash
supabase secrets set AVIATIONSTACK_API_KEY=xxx --project-ref exrdpowgljaubixjhaqz
supabase secrets set AFRICASTALKING_API_KEY=xxx AFRICASTALKING_USERNAME=fih_rva --project-ref exrdpowgljaubixjhaqz
supabase secrets set RESEND_API_KEY=xxx --project-ref exrdpowgljaubixjhaqz
```
