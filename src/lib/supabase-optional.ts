
import { createClient } from '@supabase/supabase-js';

// Optional Supabase client that gracefully handles missing environment variables
let supabase: ReturnType<typeof createClient> | null = null;

try {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  if (supabaseUrl && supabaseAnonKey) {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log('Supabase client initialized successfully');
  } else {
    console.warn('Supabase environment variables not found - running in demo mode');
  }
} catch (error) {
  console.warn('Failed to initialize Supabase client:', error);
}

export { supabase };
export const isSupabaseAvailable = !!supabase;
