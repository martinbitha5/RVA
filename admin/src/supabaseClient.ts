import { createClient } from '@supabase/supabase-js';

const supabaseUrl     = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey     = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Client admin (service role) — bypasse tout le RLS.
// persistSession: false est CRITIQUE : sans ça, le JWT de la session supabaseAnon
// (stocké dans localStorage) serait repris par ce client et remplacerait la
// service role key, faisant tourner toutes les requêtes au niveau "authenticated".
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});

// Client anon — uniquement pour l'authentification de l'administrateur
export const supabaseAnon = createClient(supabaseUrl, supabaseAnonKey);
