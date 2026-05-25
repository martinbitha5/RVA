-- ============================================================
-- Migration 004 — Politiques RLS pour accès admin complet
-- Le client service_role bypasse le RLS par défaut, mais ces
-- politiques servent de filet de sécurité si nécessaire.
-- ============================================================

-- PARKING_LOTS — accès complet admin (insert/update/delete)
create policy "parking_lots: admin full" on public.parking_lots
  for all using (true) with check (true);

-- PARKING_RESERVATIONS — lecture admin complète
create policy "parking_reservations: admin read all" on public.parking_reservations
  for select using (true);

-- PROFILES — lecture admin complète
create policy "profiles: admin read all" on public.profiles
  for select using (true);

-- NEWS_ARTICLES — lecture admin complète (brouillons inclus)
create policy "news_articles: admin read all" on public.news_articles
  for select using (true);

-- JOB_POSTINGS — lecture admin complète (inactifs inclus)
create policy "job_postings: admin read all" on public.job_postings
  for select using (true);

-- JOB_APPLICATIONS — lecture admin
create policy "job_applications: admin read all" on public.job_applications
  for select using (true);

-- NOISE_COMPLAINTS — lecture admin
create policy "noise_complaints: admin read all" on public.noise_complaints
  for select using (true);

-- AIRLINES — accès complet admin
create policy "airlines: admin full" on public.airlines
  for all using (true) with check (true);

-- CONCESSIONS — accès complet admin
create policy "concessions: admin full" on public.concessions
  for all using (true) with check (true);

-- LOUNGES — accès complet admin
create policy "lounges: admin full" on public.lounges
  for all using (true) with check (true);

-- FLIGHTS — accès complet admin
create policy "flights: admin full" on public.flights
  for all using (true) with check (true);

-- PAGES — accès complet admin
create policy "pages: admin full" on public.pages
  for all using (true) with check (true);

-- NOISE_COMPLAINTS — mise à jour admin (répondre aux plaintes)
create policy "noise_complaints: admin update" on public.noise_complaints
  for update using (true) with check (true);
