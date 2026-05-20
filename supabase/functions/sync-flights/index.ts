/**
 * Edge Function: sync-flights
 * Fetches live flight data from AviationStack API and upserts into the
 * Supabase `flights` table.
 *
 * Trigger: Scheduled via pg_cron every 5 minutes, or called manually.
 *
 * Environment variables required:
 *   AVIATIONSTACK_API_KEY  — AviationStack API key (https://aviationstack.com)
 *   SUPABASE_URL           — Injected automatically by Supabase runtime
 *   SUPABASE_SERVICE_ROLE_KEY — Injected automatically by Supabase runtime
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const AIRPORT_IATA = 'FIH';

interface AviationStackFlight {
  flight_date: string;
  flight_status: string;
  departure: {
    iata: string;
    scheduled: string;
    estimated: string | null;
    actual: string | null;
    terminal: string | null;
    gate: string | null;
  };
  arrival: {
    iata: string;
    scheduled: string;
    estimated: string | null;
    actual: string | null;
    terminal: string | null;
    gate: string | null;
    baggage: string | null;
  };
  airline: {
    name: string;
    iata: string;
  };
  flight: {
    number: string;
    iata: string;
  };
  aircraft: {
    iata: string | null;
  } | null;
}

interface AviationStackResponse {
  data: AviationStackFlight[];
  pagination: {
    total: number;
    count: number;
    limit: number;
    offset: number;
  };
}

function mapStatus(raw: string): string {
  const mapping: Record<string, string> = {
    scheduled:  'scheduled',
    active:     'boarding',
    landed:     'arrived',
    cancelled:  'cancelled',
    incident:   'cancelled',
    diverted:   'diverted',
  };
  return mapping[raw] ?? 'scheduled';
}

Deno.serve(async (req: Request) => {
  // Only allow POST or scheduled invocations
  if (req.method !== 'POST' && req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  const apiKey = Deno.env.get('AVIATIONSTACK_API_KEY');
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'AVIATIONSTACK_API_KEY not set' }), { status: 500 });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
  );

  const results = { departures: 0, arrivals: 0, errors: [] as string[] };

  try {
    // --- Fetch departures ---
    const deptUrl = `http://api.aviationstack.com/v1/flights?access_key=${apiKey}&dep_iata=${AIRPORT_IATA}&limit=100`;
    const deptRes = await fetch(deptUrl);
    if (!deptRes.ok) throw new Error(`Departure fetch failed: ${deptRes.status}`);
    const deptData = await deptRes.json() as AviationStackResponse;

    for (const f of deptData.data ?? []) {
      const { error } = await supabase.from('flights').upsert({
        flight_number: f.flight.iata,
        type: 'departure',
        origin_iata: f.departure.iata,
        destination_iata: f.arrival.iata,
        scheduled_time: f.departure.scheduled,
        estimated_time: f.departure.estimated ?? null,
        actual_time: f.departure.actual ?? null,
        status: mapStatus(f.flight_status),
        terminal: f.departure.terminal ?? null,
        gate: f.departure.gate ?? null,
        baggage_claim: null,
        aircraft_type: f.aircraft?.iata ?? null,
      }, { onConflict: 'flight_number,scheduled_time' });

      if (error) results.errors.push(`DEP ${f.flight.iata}: ${error.message}`);
      else results.departures++;
    }

    // --- Fetch arrivals ---
    const arrUrl = `http://api.aviationstack.com/v1/flights?access_key=${apiKey}&arr_iata=${AIRPORT_IATA}&limit=100`;
    const arrRes = await fetch(arrUrl);
    if (!arrRes.ok) throw new Error(`Arrival fetch failed: ${arrRes.status}`);
    const arrData = await arrRes.json() as AviationStackResponse;

    for (const f of arrData.data ?? []) {
      const { error } = await supabase.from('flights').upsert({
        flight_number: f.flight.iata,
        type: 'arrival',
        origin_iata: f.departure.iata,
        destination_iata: f.arrival.iata,
        scheduled_time: f.arrival.scheduled,
        estimated_time: f.arrival.estimated ?? null,
        actual_time: f.arrival.actual ?? null,
        status: mapStatus(f.flight_status),
        terminal: f.arrival.terminal ?? null,
        gate: null,
        baggage_claim: f.arrival.baggage ?? null,
        aircraft_type: f.aircraft?.iata ?? null,
      }, { onConflict: 'flight_number,scheduled_time' });

      if (error) results.errors.push(`ARR ${f.flight.iata}: ${error.message}`);
      else results.arrivals++;
    }

    return new Response(JSON.stringify({
      ok: true,
      synced: results,
      timestamp: new Date().toISOString(),
    }), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ ok: false, error: msg }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
