/**
 * AviationStack API client — Aéroport de N'djili (FIH)
 *
 * Free plan (100 req/month) → HTTP only.
 * En dev : Vite proxie /api/av → http://api.aviationstack.com/v1 (voir vite.config.ts).
 * En prod : nécessite un plan payant ou une Edge Function Supabase.
 */

import type { FlightWithAirline, FlightStatus } from '@/types/database';

// ── Base URL ──────────────────────────────────────────────────────────────────
// Dev  → Vite proxy (évite Mixed-Content HTTP/HTTPS et CORS)
// Prod → HTTPS direct (plan payant) ou variable d'env VITE_API_BASE
const BASE = import.meta.env.DEV
  ? '/api/av'
  : (import.meta.env.VITE_AVIATIONSTACK_BASE ?? 'https://api.aviationstack.com/v1');

const KEY = (import.meta.env.VITE_AVIATIONSTACK_KEY ?? '') as string;

// ── AviationStack raw types ───────────────────────────────────────────────────
interface AvEndpoint {
  airport:          string | null;
  timezone:         string | null;
  iata:             string | null;
  icao:             string | null;
  terminal:         string | null;
  gate:             string | null;
  baggage?:         string | null;
  delay:            number | null;
  scheduled:        string | null;
  estimated:        string | null;
  actual:           string | null;
  estimated_runway: string | null;
  actual_runway:    string | null;
}

interface AvAirline { name: string; iata: string; icao: string }
interface AvFlight  { number: string; iata: string; icao: string }
interface AvAircraft { registration: string | null; iata: string | null; icao: string | null }

export interface AvStackFlight {
  flight_date:   string;
  flight_status: 'scheduled' | 'active' | 'landed' | 'cancelled' | 'incident' | 'diverted';
  departure:     AvEndpoint;
  arrival:       AvEndpoint;
  airline:       AvAirline;
  flight:        AvFlight;
  aircraft:      AvAircraft | null;
}

interface AvStackResponse {
  pagination?: { limit: number; offset: number; count: number; total: number };
  data?: AvStackFlight[];
  error?: { code: string; message: string };
}

// ── Status mapping ────────────────────────────────────────────────────────────
function mapDepartureStatus(api: string, delay: number | null): FlightStatus {
  if (api === 'cancelled') return 'cancelled';
  if (api === 'diverted')  return 'diverted';
  if (api === 'landed')    return 'departed';  // le vol a décollé de FIH
  if (api === 'active')    return 'departed';  // en route
  if (delay && delay > 0)  return 'delayed';
  return 'scheduled';
}

function mapArrivalStatus(api: string, delay: number | null): FlightStatus {
  if (api === 'cancelled') return 'cancelled';
  if (api === 'diverted')  return 'diverted';
  if (api === 'landed')    return 'arrived';   // posé à FIH
  if (api === 'active')    return 'boarding';  // en approche
  if (delay && delay > 0)  return 'delayed';
  return 'scheduled';
}

// ── Logo overrides (airlines absentes ou incorrectes sur pics.avs.io) ─────────
// Note : les URLs Wikipedia bloquent le hotlinking. N'ajouter ici que des CDN fiables.
export const LOGO_OVERRIDES: Record<string, string> = {};

/** Retourne l'URL du logo depuis pics.avs.io (ou override si nécessaire). */
export function getAirlineLogoUrl(iataCode: string): string {
  return LOGO_OVERRIDES[iataCode] ?? `https://pics.avs.io/200/200/${iataCode}.png`;
}

// ── Data mapper ───────────────────────────────────────────────────────────────
function mapFlight(raw: AvStackFlight, type: 'departure' | 'arrival'): FlightWithAirline {
  const dep = raw.departure;
  const arr = raw.arrival;
  const isDep = type === 'departure';

  return {
    // Synthetic ID stable (iata + date + scheduled time)
    id: `${raw.flight.iata}-${raw.flight_date}-${isDep ? dep.scheduled : arr.scheduled}`,
    flight_number:    raw.flight.iata ?? null,
    airline_id:       raw.airline.iata,
    type,
    origin_iata:      dep.iata ?? '',
    destination_iata: arr.iata ?? '',
    scheduled_time:   (isDep ? dep.scheduled : arr.scheduled) ?? new Date().toISOString(),
    estimated_time:   isDep ? (dep.estimated ?? dep.scheduled) : (arr.estimated ?? arr.scheduled),
    actual_time:      isDep ? (dep.actual ?? dep.actual_runway) : (arr.actual ?? arr.actual_runway),
    status: isDep
      ? mapDepartureStatus(raw.flight_status, dep.delay)
      : mapArrivalStatus(raw.flight_status, arr.delay),
    terminal:      null,  // AviationStack renvoie rarement le terminal — affiché si dispo
    gate:          isDep ? dep.gate      : arr.gate,
    baggage_claim: arr.baggage ?? null,
    aircraft_type: raw.aircraft?.iata ?? null,
    codeshare:     false,
    remarks_fr:    null,
    remarks_en:    null,
    created_at:    new Date().toISOString(),
    updated_at:    new Date().toISOString(),
    // Airlines sub-object (joined)
    airlines: {
      iata_code: raw.airline?.iata  ?? '',
      name:      raw.airline?.name  ?? '',
      logo_url:  raw.airline?.iata
        ? (LOGO_OVERRIDES[raw.airline.iata] ?? `https://pics.avs.io/200/200/${raw.airline.iata}.png`)
        : null,
      slug:      (raw.airline?.iata ?? '').toLowerCase(),
    },
  };
}

// ── API fetcher ───────────────────────────────────────────────────────────────
async function fetchFlights(params: URLSearchParams): Promise<FlightWithAirline[]> {
  if (!KEY) {
    console.warn('[AviationStack] Clé API manquante — VITE_AVIATIONSTACK_KEY non définie.');
    return [];
  }

  params.set('access_key', KEY);
  params.set('limit', '100');

  const url = `${BASE}/flights?${params.toString()}`;
  const res = await fetch(url);

  if (res.status === 429) {
    throw new Error('QUOTA_EXCEEDED');
  }

  if (!res.ok) {
    throw new Error(`AviationStack HTTP ${res.status}`);
  }

  const json = (await res.json()) as AvStackResponse;

  if (json.error) {
    throw new Error(`AviationStack: ${json.error.message} (${json.error.code})`);
  }

  const raw = json.data ?? [];

  return raw
    .map(f => {
      try {
        return mapFlight(f, params.has('dep_iata') ? 'departure' : 'arrival');
      } catch {
        return null;
      }
    })
    .filter(Boolean) as ReturnType<typeof mapFlight>[];
}

/**
 * Vols au départ de FIH.
 * NB : le paramètre `flight_date` est réservé aux plans payants AviationStack
 * (renvoie `function_access_restricted` sur le free tier). On laisse donc
 * l'API renvoyer ses vols les plus récents/à venir.
 */
export function fetchFIHDepartures(): Promise<FlightWithAirline[]> {
  return fetchFlights(new URLSearchParams({ dep_iata: 'FIH' }));
}

/** Vols à l'arrivée à FIH (voir note ci-dessus pour `flight_date`). */
export function fetchFIHArrivals(): Promise<FlightWithAirline[]> {
  return fetchFlights(new URLSearchParams({ arr_iata: 'FIH' }));
}
