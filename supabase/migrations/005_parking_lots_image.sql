-- Migration 005 — Ajout colonne image aux parkings
alter table public.parking_lots
  add column if not exists image_url text;
