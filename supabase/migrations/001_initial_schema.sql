-- ============================================================
-- Migration 001 — Schéma initial FIH Airport
-- Aéroport International de N'djili (FIH/FZAA) — RVA, RDC
-- ============================================================

-- Enable required extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pg_trgm";     -- Full-text search sur vols/destinations
create extension if not exists "unaccent";    -- Recherche sans accents (Français)

-- ============================================================
-- TABLE: profiles (liée à auth.users de Supabase)
-- ============================================================
create table if not exists public.profiles (
  id                  uuid        primary key references auth.users on delete cascade,
  email               text,
  phone               text,
  full_name           text,
  preferred_language  text        not null default 'fr' check (preferred_language in ('fr', 'en', 'ln')),
  notification_sms    boolean     not null default false,
  notification_email  boolean     not null default true,
  avatar_url          text,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);
comment on table public.profiles is 'Profils utilisateurs liés à auth.users (RVA/FIH Portal)';

-- ============================================================
-- TABLE: airlines (compagnies aériennes opérant à FIH)
-- ============================================================
create table if not exists public.airlines (
  id              uuid        primary key default uuid_generate_v4(),
  iata_code       text        not null unique,
  icao_code       text        unique,
  name            text        not null,
  slug            text        not null unique,
  logo_url        text,
  website         text,
  description_fr  text,
  description_en  text,
  hub_at_fih      boolean     not null default false,
  alliance        text,       -- Star Alliance, oneworld, SkyTeam, etc.
  checkin_counter text,       -- ex: "Comptoirs 12-15, Terminal International"
  lounge_name     text,       -- nom du salon VIP si applicable
  active          boolean     not null default true,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
comment on table public.airlines is 'Compagnies aériennes opérant à l''Aéroport International de N''djili (FIH)';
create index idx_airlines_iata on public.airlines (iata_code);
create index idx_airlines_slug on public.airlines (slug);
create index idx_airlines_active on public.airlines (active);

-- ============================================================
-- TABLE: destinations (aéroports / villes liées à FIH)
-- ============================================================
create table if not exists public.destinations (
  id              uuid        primary key default uuid_generate_v4(),
  iata_code       text        not null unique,
  icao_code       text,
  city_fr         text        not null,
  city_en         text        not null,
  country_fr      text        not null,
  country_en      text        not null,
  country_code    text        not null,  -- ISO 3166-1 alpha-2
  continent       text,
  timezone        text,
  is_domestic     boolean     not null default false,
  province_rdc    text,       -- Province si destination RDC (Lualaba, Nord-Kivu, etc.)
  active          boolean     not null default true
);
comment on table public.destinations is 'Aéroports / destinations reliés à FIH';
create index idx_destinations_iata on public.destinations (iata_code);
create index idx_destinations_domestic on public.destinations (is_domestic);
create index idx_destinations_country on public.destinations (country_code);

-- ============================================================
-- TABLE: flights (vols — alimentés par API + admin)
-- ============================================================
create table if not exists public.flights (
  id               uuid        primary key default uuid_generate_v4(),
  flight_number    text        not null,
  airline_id       uuid        not null references public.airlines on delete cascade,
  type             text        not null check (type in ('departure', 'arrival')),
  origin_iata      text        not null,
  destination_iata text        not null,
  scheduled_time   timestamptz not null,
  estimated_time   timestamptz,
  actual_time      timestamptz,
  status           text        not null default 'scheduled'
                   check (status in ('scheduled','boarding','departed','arrived',
                                     'delayed','cancelled','diverted','on_time')),
  terminal         text        check (terminal in ('international','domestic')),
  gate             text,
  baggage_claim    text,
  aircraft_type    text,
  codeshare        boolean     not null default false,
  remarks_fr       text,
  remarks_en       text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);
comment on table public.flights is 'Vols en temps réel — départs et arrivées de FIH';
create index idx_flights_scheduled_time on public.flights (scheduled_time);
create index idx_flights_status on public.flights (status);
create index idx_flights_airline on public.flights (airline_id);
create index idx_flights_type on public.flights (type);
create index idx_flights_flight_number on public.flights (flight_number);
-- Index compound pour la vue temps réel (requête la plus fréquente)
create index idx_flights_type_scheduled on public.flights (type, scheduled_time)
  where status not in ('arrived','departed','cancelled');

-- ============================================================
-- TABLE: concessions (boutiques, restaurants, services)
-- ============================================================
create table if not exists public.concessions (
  id              uuid        primary key default uuid_generate_v4(),
  name            text        not null,
  slug            text        not null unique,
  category        text        not null
                  check (category in ('restaurant','boutique','bar','cafe',
                                      'duty_free','lounge','exchange','bank',
                                      'medical','pharmacy','telecom','hotel',
                                      'transport','other')),
  terminal        text        check (terminal in ('international','domestic','both')),
  zone            text        check (zone in ('before_security','after_security','arrivals','both')),
  level           text,
  description_fr  text,
  description_en  text,
  hours           jsonb,      -- {"monday":"06:00-22:00","tuesday":"...","weekend":"06:00-00:00"}
  phone           text,
  email           text,
  logo_url        text,
  cover_image_url text,
  gallery         jsonb,      -- ["url1","url2"]
  tags            text[],     -- ["halal","végétarien","congolais","wifi"]
  active          boolean     not null default true,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
comment on table public.concessions is 'Boutiques, restaurants et services à l''aéroport FIH';
create index idx_concessions_category on public.concessions (category);
create index idx_concessions_terminal on public.concessions (terminal);
create index idx_concessions_active on public.concessions (active);
create index idx_concessions_slug on public.concessions (slug);
-- Full-text search sur nom et description
create index idx_concessions_fts on public.concessions
  using gin (to_tsvector('french', name || ' ' || coalesce(description_fr, '')));

-- ============================================================
-- TABLE: lounges (salons VIP)
-- ============================================================
create table if not exists public.lounges (
  id                  uuid        primary key default uuid_generate_v4(),
  name                text        not null,
  slug                text        not null unique,
  operator            text,
  airline_id          uuid        references public.airlines on delete set null,
  location            text,
  terminal            text        check (terminal in ('international','domestic')),
  level               text,
  description_fr      text,
  description_en      text,
  access_conditions   text,
  access_fee_usd      numeric(10,2),
  amenities           jsonb,      -- ["wifi","shower","food","bar","sleeping_pods"]
  hours               jsonb,
  capacity            integer,
  image_url           text,
  gallery             jsonb,
  active              boolean     not null default true,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);
comment on table public.lounges is 'Salons VIP à l''Aéroport International de N''djili (FIH)';

-- ============================================================
-- TABLE: parking_lots (parkings)
-- ============================================================
create table if not exists public.parking_lots (
  id                  uuid        primary key default uuid_generate_v4(),
  code                text        not null unique,    -- P1, P2, P3, PMR
  name                text        not null,
  description_fr      text,
  description_en      text,
  total_spots         integer     not null,
  available_spots     integer,    -- mis à jour en temps réel
  hourly_rate_usd     numeric(10,2),
  daily_rate_usd      numeric(10,2),
  weekly_rate_usd     numeric(10,2),
  monthly_rate_usd    numeric(10,2),
  distance_terminal   text,       -- ex: "200m du terminal international"
  shuttle_available   boolean     not null default false,
  ev_charging         boolean     not null default false,
  covered             boolean     not null default false,
  pmr_spots           integer     not null default 0,
  security_level      text        check (security_level in ('standard','premium','cctv_24h')),
  latitude            numeric(10,7),
  longitude           numeric(10,7),
  active              boolean     not null default true,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);
comment on table public.parking_lots is 'Parkings de l''aéroport FIH (P1, P2, P3, PMR)';

-- ============================================================
-- TABLE: parking_reservations (réservations stationnement)
-- ============================================================
create table if not exists public.parking_reservations (
  id                  uuid        primary key default uuid_generate_v4(),
  user_id             uuid        not null references public.profiles on delete cascade,
  parking_lot_id      uuid        not null references public.parking_lots on delete restrict,
  vehicle_plate       text        not null,
  vehicle_type        text        check (vehicle_type in ('car','motorcycle','truck','minibus')),
  start_at            timestamptz not null,
  end_at              timestamptz not null,
  duration_hours      numeric(8,2) generated always as
                        (extract(epoch from (end_at - start_at)) / 3600) stored,
  total_amount_usd    numeric(10,2) not null,
  total_amount_cdf    numeric(15,2), -- équivalent CDF au moment de la réservation
  payment_method      text        check (payment_method in
                        ('airtel_money','mpesa','orange_money','card','cash')),
  payment_status      text        not null default 'pending'
                      check (payment_status in ('pending','paid','failed','refunded')),
  payment_reference   text,
  reservation_code    text        not null unique,
  qr_code_url         text,
  notes               text,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),
  check (end_at > start_at)
);
comment on table public.parking_reservations is 'Réservations de stationnement — Aéroport FIH';
create index idx_parking_reservations_user on public.parking_reservations (user_id);
create index idx_parking_reservations_lot on public.parking_reservations (parking_lot_id);
create index idx_parking_reservations_dates on public.parking_reservations (start_at, end_at);
create index idx_parking_reservations_code on public.parking_reservations (reservation_code);

-- ============================================================
-- TABLE: news_articles (actualités / news)
-- ============================================================
create table if not exists public.news_articles (
  id              uuid        primary key default uuid_generate_v4(),
  slug            text        not null unique,
  title_fr        text        not null,
  title_en        text,
  excerpt_fr      text,
  excerpt_en      text,
  body_fr         text,
  body_en         text,
  cover_image_url text,
  category        text        not null
                  check (category in ('corporate','community','operations',
                                      'environment','careers','partnership','safety')),
  author          text,
  tags            text[],
  published_at    timestamptz,
  status          text        not null default 'draft'
                  check (status in ('draft','published','archived')),
  views_count     integer     not null default 0,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
comment on table public.news_articles is 'Actualités et communiqués de presse — RVA/FIH';
create index idx_news_published_at on public.news_articles (published_at desc)
  where status = 'published';
create index idx_news_category on public.news_articles (category);
create index idx_news_fts on public.news_articles
  using gin (to_tsvector('french',
    coalesce(title_fr,'') || ' ' || coalesce(excerpt_fr,'') || ' ' || coalesce(body_fr,'')));

-- ============================================================
-- TABLE: job_postings (offres d'emploi)
-- ============================================================
create table if not exists public.job_postings (
  id                    uuid        primary key default uuid_generate_v4(),
  title                 text        not null,
  department            text        not null,
  location              text        not null default 'FIH — Kinshasa, RDC',
  contract_type         text        not null
                        check (contract_type in ('CDI','CDD','stage','freelance','consultant')),
  experience_level      text        check (experience_level in ('junior','mid','senior','manager','executive')),
  description_fr        text,
  requirements_fr       text,
  benefits_fr           text,
  salary_range          text,       -- ex: "1500-2000 USD/mois"
  application_deadline  date,
  apply_url             text,
  active                boolean     not null default true,
  posted_at             timestamptz not null default now(),
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);
comment on table public.job_postings is 'Offres d''emploi RVA/FIH';
create index idx_job_postings_active on public.job_postings (active, posted_at desc);
create index idx_job_postings_department on public.job_postings (department);

-- ============================================================
-- TABLE: job_applications (candidatures)
-- ============================================================
create table if not exists public.job_applications (
  id              uuid        primary key default uuid_generate_v4(),
  job_posting_id  uuid        not null references public.job_postings on delete restrict,
  full_name       text        not null,
  email           text        not null,
  phone           text,
  nationality     text,
  cv_url          text,       -- Supabase Storage URL
  cover_letter    text,
  linkedin_url    text,
  status          text        not null default 'received'
                  check (status in ('received','reviewing','shortlisted',
                                    'interview','rejected','hired')),
  reviewer_notes  text,
  submitted_at    timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
comment on table public.job_applications is 'Candidatures aux offres d''emploi RVA/FIH';
create index idx_job_applications_posting on public.job_applications (job_posting_id);
create index idx_job_applications_status on public.job_applications (status);
create index idx_job_applications_email on public.job_applications (email);

-- ============================================================
-- TABLE: noise_complaints (plaintes environnement sonore)
-- ============================================================
create table if not exists public.noise_complaints (
  id              uuid        primary key default uuid_generate_v4(),
  user_id         uuid        references public.profiles on delete set null,
  full_name       text        not null,
  email           text,
  phone           text,
  address         text,
  commune         text        not null
                  check (commune in ('Nsele','Masina','Kimbanseke','N_djili',
                                     'Limete','Makala','Ngaliema','other')),
  latitude        numeric(10,7),
  longitude       numeric(10,7),
  incident_date   timestamptz not null,
  time_of_day     text        check (time_of_day in ('morning','afternoon','evening','night')),
  frequency       text        check (frequency in ('once','occasional','regular','daily')),
  description     text        not null,
  status          text        not null default 'received'
                  check (status in ('received','in_review','responded','closed')),
  response        text,
  responded_at    timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
comment on table public.noise_complaints is 'Plaintes environnement sonore — communes riveraines de FIH';
create index idx_noise_complaints_commune on public.noise_complaints (commune);
create index idx_noise_complaints_status on public.noise_complaints (status);
create index idx_noise_complaints_date on public.noise_complaints (incident_date desc);

-- ============================================================
-- TABLE: flight_alerts (abonnements alertes SMS vols)
-- ============================================================
create table if not exists public.flight_alerts (
  id              uuid        primary key default uuid_generate_v4(),
  user_id         uuid        not null references public.profiles on delete cascade,
  flight_id       uuid        references public.flights on delete cascade,
  flight_number   text,       -- Pour suivre par numéro (pas forcément un vol en DB)
  alert_date      date,       -- Date du vol suivi
  alert_types     text[]      not null default array['status_change','gate_change','delay'],
  phone_override  text,       -- Si numéro SMS différent du profil
  active          boolean     not null default true,
  created_at      timestamptz not null default now()
);
comment on table public.flight_alerts is 'Abonnements alertes SMS vols — passagers FIH';
create index idx_flight_alerts_user on public.flight_alerts (user_id);
create index idx_flight_alerts_flight on public.flight_alerts (flight_id);
create index idx_flight_alerts_active on public.flight_alerts (active);

-- ============================================================
-- TABLE: pages (contenu CMS pages statiques)
-- ============================================================
create table if not exists public.pages (
  id                      uuid        primary key default uuid_generate_v4(),
  slug                    text        not null unique,
  title_fr                text        not null,
  title_en                text,
  body_fr                 text,
  body_en                 text,
  meta_description_fr     text,
  meta_description_en     text,
  og_image_url            text,
  is_published            boolean     not null default false,
  updated_at              timestamptz not null default now(),
  updated_by              uuid        references public.profiles on delete set null
);
comment on table public.pages is 'CMS pages statiques — contenu éditorial FIH/RVA';
create index idx_pages_slug on public.pages (slug);
create index idx_pages_published on public.pages (is_published) where is_published = true;

-- ============================================================
-- TABLE: wait_times (temps d'attente sécurité/immigration)
-- ============================================================
create table if not exists public.wait_times (
  id              uuid        primary key default uuid_generate_v4(),
  checkpoint_type text        not null
                  check (checkpoint_type in ('security_intl','security_dom',
                                             'immigration_arrival','immigration_departure',
                                             'customs','pcr_test','vaccination_check')),
  terminal        text        check (terminal in ('international','domestic')),
  estimated_minutes integer   not null,
  status          text        not null default 'normal'
                  check (status in ('closed','light','normal','moderate','busy','very_busy')),
  updated_at      timestamptz not null default now()
);
comment on table public.wait_times is 'Temps d''attente aux contrôles — FIH (mis à jour régulièrement)';

-- ============================================================
-- TRIGGERS: updated_at automatique
-- ============================================================
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_profiles_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();
create trigger trg_airlines_updated_at before update on public.airlines
  for each row execute function public.set_updated_at();
create trigger trg_flights_updated_at before update on public.flights
  for each row execute function public.set_updated_at();
create trigger trg_concessions_updated_at before update on public.concessions
  for each row execute function public.set_updated_at();
create trigger trg_lounges_updated_at before update on public.lounges
  for each row execute function public.set_updated_at();
create trigger trg_parking_lots_updated_at before update on public.parking_lots
  for each row execute function public.set_updated_at();
create trigger trg_parking_reservations_updated_at before update on public.parking_reservations
  for each row execute function public.set_updated_at();
create trigger trg_news_articles_updated_at before update on public.news_articles
  for each row execute function public.set_updated_at();
create trigger trg_job_postings_updated_at before update on public.job_postings
  for each row execute function public.set_updated_at();
create trigger trg_job_applications_updated_at before update on public.job_applications
  for each row execute function public.set_updated_at();
create trigger trg_noise_complaints_updated_at before update on public.noise_complaints
  for each row execute function public.set_updated_at();

-- ============================================================
-- TRIGGER: auto-create profile on auth.users insert
-- ============================================================
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.email)
  );
  return new;
end;
$$;

-- Drop and recreate to ensure latest version
drop trigger if exists trg_on_auth_user_created on auth.users;
create trigger trg_on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
