-- Migration 007 — Table hero_slides (carrousel page d'accueil)
create table if not exists public.hero_slides (
  id          uuid        primary key default uuid_generate_v4(),
  image_url   text        not null,
  title_fr    text        not null,
  title_en    text,
  subtitle_fr text,
  subtitle_en text,
  cta_label_fr text,
  cta_label_en text,
  cta_url     text,
  sort_order  integer     not null default 0,
  active      boolean     not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create trigger trg_hero_slides_updated_at before update on public.hero_slides
  for each row execute function public.set_updated_at();

-- RLS
alter table public.hero_slides enable row level security;

-- Lecture publique (slides actifs seulement)
create policy "hero_slides: public read" on public.hero_slides
  for select using (active = true);

-- Accès complet admin
create policy "hero_slides: admin full" on public.hero_slides
  for all using (true) with check (true);

-- Realtime
alter publication supabase_realtime add table public.hero_slides;
