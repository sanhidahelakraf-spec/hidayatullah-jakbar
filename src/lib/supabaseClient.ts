import { createClient } from '@supabase/supabase-js';

// Ambil dari file .env (JANGAN hardcode langsung di sini)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Supabase URL / Anon Key belum diset. Cek file .env kamu (VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY).'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);