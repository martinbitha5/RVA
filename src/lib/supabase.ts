import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? '';

if (!supabaseUrl || !supabaseAnonKey) {
  // Ne pas lancer d'exception ici — cela ferait planter toute page qui importe
  // ce module même sans error boundary. On log un avertissement ; les requêtes
  // API échoueront gracieusement via TanStack Query (état isError).
  console.warn(
    '[Supabase] VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY ne sont pas définis. ' +
    'Configurez ces variables dans le tableau de bord de votre plateforme de déploiement.',
  );
}

export const supabase = createClient<Database>(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    },
    realtime: {
      params: {
        eventsPerSecond: 10,
      },
    },
  },
);
