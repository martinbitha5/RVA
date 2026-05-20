-- ============================================================
-- Migration 002 — Row Level Security (RLS) Policies
-- Aéroport International de N'djili (FIH) — RVA, RDC
-- ============================================================

-- Enable RLS on all tables
alter table public.profiles              enable row level security;
alter table public.airlines              enable row level security;
alter table public.destinations          enable row level security;
alter table public.flights               enable row level security;
alter table public.concessions           enable row level security;
alter table public.lounges               enable row level security;
alter table public.parking_lots          enable row level security;
alter table public.parking_reservations  enable row level security;
alter table public.news_articles         enable row level security;
alter table public.job_postings          enable row level security;
alter table public.job_applications      enable row level security;
alter table public.noise_complaints      enable row level security;
alter table public.flight_alerts         enable row level security;
alter table public.pages                 enable row level security;
alter table public.wait_times            enable row level security;

-- ============================================================
-- PROFILES — un utilisateur lit/écrit uniquement son propre profil
-- ============================================================
create policy "profiles: select own" on public.profiles
  for select using (auth.uid() = id);
create policy "profiles: update own" on public.profiles
  for update using (auth.uid() = id);
create policy "profiles: insert own" on public.profiles
  for insert with check (auth.uid() = id);

-- ============================================================
-- AIRLINES — lecture publique, écriture admin
-- ============================================================
create policy "airlines: public read" on public.airlines
  for select using (active = true);

-- ============================================================
-- DESTINATIONS — lecture publique
-- ============================================================
create policy "destinations: public read" on public.destinations
  for select using (active = true);

-- ============================================================
-- FLIGHTS — lecture publique, écriture admin
-- ============================================================
create policy "flights: public read" on public.flights
  for select using (true);

-- ============================================================
-- CONCESSIONS — lecture publique, écriture admin
-- ============================================================
create policy "concessions: public read" on public.concessions
  for select using (active = true);

-- ============================================================
-- LOUNGES — lecture publique, écriture admin
-- ============================================================
create policy "lounges: public read" on public.lounges
  for select using (active = true);

-- ============================================================
-- PARKING_LOTS — lecture publique, écriture admin
-- ============================================================
create policy "parking_lots: public read" on public.parking_lots
  for select using (active = true);

-- ============================================================
-- PARKING_RESERVATIONS — utilisateur voit uniquement ses réservations
-- ============================================================
create policy "parking_reservations: select own" on public.parking_reservations
  for select using (auth.uid() = user_id);
create policy "parking_reservations: insert own" on public.parking_reservations
  for insert with check (auth.uid() = user_id);
create policy "parking_reservations: update own" on public.parking_reservations
  for update using (auth.uid() = user_id
    and payment_status = 'pending');  -- ne peut modifier qu'une résa non payée

-- ============================================================
-- NEWS_ARTICLES — lecture publique (articles publiés)
-- ============================================================
create policy "news_articles: public read published" on public.news_articles
  for select using (status = 'published');

-- ============================================================
-- JOB_POSTINGS — lecture publique (offres actives)
-- ============================================================
create policy "job_postings: public read active" on public.job_postings
  for select using (active = true);

-- ============================================================
-- JOB_APPLICATIONS — insertion publique anonyme, lecture admin
-- ============================================================
create policy "job_applications: public insert" on public.job_applications
  for insert with check (true);
-- Aucune politique de lecture publique → uniquement admin via service_role

-- ============================================================
-- NOISE_COMPLAINTS — insertion publique (anonyme possible), lecture admin
-- ============================================================
create policy "noise_complaints: public insert" on public.noise_complaints
  for insert with check (true);
-- Aucune politique de lecture publique → uniquement admin via service_role

-- ============================================================
-- FLIGHT_ALERTS — utilisateur lit/écrit ses propres alertes
-- ============================================================
create policy "flight_alerts: select own" on public.flight_alerts
  for select using (auth.uid() = user_id);
create policy "flight_alerts: insert own" on public.flight_alerts
  for insert with check (auth.uid() = user_id);
create policy "flight_alerts: update own" on public.flight_alerts
  for update using (auth.uid() = user_id);
create policy "flight_alerts: delete own" on public.flight_alerts
  for delete using (auth.uid() = user_id);

-- ============================================================
-- PAGES — lecture publique (pages publiées)
-- ============================================================
create policy "pages: public read published" on public.pages
  for select using (is_published = true);

-- ============================================================
-- WAIT_TIMES — lecture publique
-- ============================================================
create policy "wait_times: public read" on public.wait_times
  for select using (true);

-- ============================================================
-- Activer Realtime sur les tables dynamiques
-- ============================================================
-- Permet au client Supabase Realtime de s'abonner aux changements
alter publication supabase_realtime add table public.flights;
alter publication supabase_realtime add table public.wait_times;
alter publication supabase_realtime add table public.parking_lots;
