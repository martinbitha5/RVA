import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

/**
 * Subscribes to Supabase Realtime for the flights table.
 * On INSERT/UPDATE/DELETE the matching TanStack Query cache keys are invalidated,
 * triggering a background refetch without blocking the UI.
 */
export function useRealtimeFlights(type: 'departure' | 'arrival') {
  const qc = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel(`flights:${type}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'flights', filter: `type=eq.${type}` },
        () => {
          // Invalidate both the live-board and the home-preview caches
          void qc.invalidateQueries({ queryKey: ['flights-board', type] });
          void qc.invalidateQueries({ queryKey: ['flights', type] });
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [type, qc]);
}
