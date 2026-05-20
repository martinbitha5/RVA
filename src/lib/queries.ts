import { useQuery } from '@tanstack/react-query';
import { supabase } from './supabase';
import type { FlightWithAirline, NewsArticle, ParkingLot } from '@/types/database';

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
