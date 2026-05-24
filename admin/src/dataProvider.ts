import { supabaseDataProvider } from 'ra-supabase';
import { supabase } from './supabaseClient';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY as string;

export const dataProvider = supabaseDataProvider({
  instanceUrl: supabaseUrl,
  apiKey: supabaseKey,
  supabaseClient: supabase,
});
