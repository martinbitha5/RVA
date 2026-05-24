import { createClient } from '@supabase/supabase-js';

const supabaseUrl     = import.meta.env.VITE_SUPABASE_URL as string;
// On utilise la service role key pour bypasser le RLS côté admin
const supabaseKey     = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Client admin (service role) — accès complet à toutes les tables
export const supabase = createClient(supabaseUrl, supabaseKey);

// Client anon — utilisé uniquement pour l'authentification
export const supabaseAnon = createClient(supabaseUrl, supabaseAnonKey);
