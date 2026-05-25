-- Migration 006 — Politiques RLS d'écriture complètes pour le backoffice
-- Sans ces politiques, les UPDATE/INSERT/DELETE depuis le backoffice
-- retournent 406 Not Acceptable car PostgREST ne peut pas renvoyer
-- le résultat après écriture (Prefer: return=representation bloqué par RLS).

-- NEWS_ARTICLES — écriture admin complète
create policy "news_articles: admin insert" on public.news_articles
  for insert with check (true);
create policy "news_articles: admin update" on public.news_articles
  for update using (true) with check (true);
create policy "news_articles: admin delete" on public.news_articles
  for delete using (true);

-- JOB_POSTINGS — écriture admin complète
create policy "job_postings: admin insert" on public.job_postings
  for insert with check (true);
create policy "job_postings: admin update" on public.job_postings
  for update using (true) with check (true);
create policy "job_postings: admin delete" on public.job_postings
  for delete using (true);

-- NOISE_COMPLAINTS — suppression admin
create policy "noise_complaints: admin delete" on public.noise_complaints
  for delete using (true);

-- JOB_APPLICATIONS — mise à jour admin (changer statut candidature)
create policy "job_applications: admin update" on public.job_applications
  for update using (true) with check (true);
create policy "job_applications: admin delete" on public.job_applications
  for delete using (true);

-- PARKING_RESERVATIONS — mise à jour admin (changer statut paiement)
create policy "parking_reservations: admin update" on public.parking_reservations
  for update using (true) with check (true);
