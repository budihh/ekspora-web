import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

declare global {
  var _supabaseInstance: ReturnType<typeof createClient> | undefined;
}

export const supabase = global._supabaseInstance || createClient(supabaseUrl, supabaseKey);

if (process.env.NODE_ENV !== 'production') {
  global._supabaseInstance = supabase;
}