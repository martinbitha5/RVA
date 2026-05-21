import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from './supabase';
import { fetchFIHDepartures, fetchFIHArrivals } from './aviationstack';
import type { FlightWithAirline, NewsArticle, ParkingLot, Airline, WaitTime } from '@/types/database';

export function useUpcomingFlights(type: 'departure' | 'arrival', limit = 6) {
  return useQuery<FlightWithAirline[]>({
    queryKey: ['flights', type, limit],
    queryFn: async () => {
      const now = new Date().toISOString();
      const { data, error } = await supabase
        .from('flights')
        .select('*, airlines(iata_code, name, logo_url, slug)')
        .eq('type', type)
        .gte('scheduled_time', now)
        .order('scheduled_time', { ascending: true })
        .limit(limit);
      if (error) throw error;
      return (data ?? []) as FlightWithAirline[];
    },
    staleTime: 30_000,
    refetchInterval: 60_000,
  });
}

export function useLatestNews(limit = 3) {
  return useQuery<NewsArticle[]>({
    queryKey: ['news', limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news_articles')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(limit);
      if (error) throw error;
      return data ?? [];
    },
    staleTime: 5 * 60_000,
  });
}

/**
 * Tableau des vols FIH — alimenté par AviationStack (données réelles).
 * Plan gratuit = 100 req/mois → cache long, pas d'auto-refresh.
 * Le bouton "Actualiser" déclenche un refetch manuel.
 */
export function useFlightBoard(type: 'departure' | 'arrival') {
  return useQuery<FlightWithAirline[]>({
    queryKey: ['flights-board', type],
    queryFn: type === 'departure' ? fetchFIHDepartures : fetchFIHArrivals,
    staleTime:            10 * 60_000,  // 10 min — ne re-fetch pas si données fraîches
    gcTime:               60 * 60_000,  // 1 h en cache
    refetchInterval:      false,         // pas d'auto-refresh (économie quota)
    refetchOnWindowFocus: false,
    retry: 1,
  });
}

export function useAirlines() {
  return useQuery<Airline[]>({
    queryKey: ['airlines'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('airlines')
        .select('*')
        .eq('active', true)
        .order('name');
      if (error) throw error;
      return data ?? [];
    },
    staleTime: 10 * 60_000,
    gcTime: 30 * 60_000,
  });
}

export function useAirlineBySlug(slug: string) {
  return useQuery<Airline | null>({
    queryKey: ['airlines', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('airlines')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    staleTime: 10 * 60_000,
    enabled: !!slug,
  });
}

export function useAirlineFlights(airlineId: string) {
  return useQuery<FlightWithAirline[]>({
    queryKey: ['flights-airline', airlineId],
    queryFn: async () => {
      const cutoff = new Date();
      cutoff.setHours(cutoff.getHours() - 2);
      const { data, error } = await supabase
        .from('flights')
        .select('*, airlines(iata_code, name, logo_url, slug)')
        .eq('airline_id', airlineId)
        .gte('scheduled_time', cutoff.toISOString())
        .order('scheduled_time', { ascending: true });
      if (error) throw error;
      return (data ?? []) as FlightWithAirline[];
    },
    staleTime: 30_000,
    enabled: !!airlineId,
  });
}

export function useWaitTimes() {
  return useQuery<WaitTime[]>({
    queryKey: ['wait-times'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('wait_times')
        .select('*')
        .order('terminal')
        .order('checkpoint');
      if (error) throw error;
      return data ?? [];
    },
    staleTime: 2 * 60_000,
    refetchInterval: 5 * 60_000,
  });
}

/**
 * Cherche un vol par ID d'abord dans le cache du tableau de bord (AviationStack),
 * et seulement si absent, refetch les deux tableaux.
 * Évite une requête Supabase pour les IDs synthétiques AviationStack.
 */
export function useFlightById(id: string) {
  const qc = useQueryClient();

  return useQuery<FlightWithAirline | null>({
    queryKey: ['flight-detail', id],
    queryFn: async () => {
      // Cherche dans les caches déjà chargés (0 requête API supplémentaire)
      const deps = qc.getQueryData<FlightWithAirline[]>(['flights-board', 'departure']) ?? [];
      const arrs = qc.getQueryData<FlightWithAirline[]>(['flights-board', 'arrival'])   ?? [];
      return [...deps, ...arrs].find(f => f.id === id) ?? null;
    },
    staleTime: 10 * 60_000,
    enabled: !!id,
  });
}

export function useParkingAvailability() {
  return useQuery<ParkingLot[]>({
    queryKey: ['parking-lots'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('parking_lots')
        .select('*')
        .eq('active', true)
        .order('code');
      if (error) throw error;
      return data ?? [];
    },
    staleTime: 60_000,
  });
}
