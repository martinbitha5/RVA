-- Migration 003: Edge functions support
-- Adds unique constraint needed by sync-flights upsert,
-- pg_cron schedule for flight sync, and DB webhook trigger for alert notifications.

-- ============================================================
-- 1. Unique constraint for flight upsert (sync-flights function)
-- ============================================================
-- Prevents duplicate rows when upserting on (flight_number, scheduled_time)
ALTER TABLE flights
  ADD CONSTRAINT flights_number_time_unique
  UNIQUE (flight_number, scheduled_time);

-- ============================================================
-- 2. Enable pg_cron extension (requires superuser — run in Supabase Dashboard)
-- ============================================================
-- CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule sync-flights edge function every 5 minutes
-- (Uncomment after enabling pg_cron and replacing YOUR_PROJECT_REF)
-- SELECT cron.schedule(
--   'sync-flights-every-5min',
--   '*/5 * * * *',
--   $$
--   SELECT
--     net.http_post(
--       url := 'https://YOUR_PROJECT_REF.supabase.co/functions/v1/sync-flights',
--       headers := '{"Authorization": "Bearer ' || current_setting('app.service_role_key') || '"}'::jsonb,
--       body := '{}'::jsonb
--     )
--   $$
-- );

-- ============================================================
-- 3. Index for flight alert lookups by flight_id
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_flight_alerts_flight_id
  ON flight_alerts (flight_id)
  WHERE active = true;

-- ============================================================
-- 4. Index for parking reservations by user
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_parking_reservations_user_id
  ON parking_reservations (user_id, created_at DESC);

-- ============================================================
-- 5. Index for noise_complaints by status
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_noise_complaints_status
  ON noise_complaints (status, created_at DESC);

-- ============================================================
-- 6. Grant execute on net schema to service role
--    (needed for pg_net HTTP calls from pg_cron)
-- ============================================================
-- GRANT USAGE ON SCHEMA net TO service_role;
