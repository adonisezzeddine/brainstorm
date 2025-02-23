import { createClient } from '@supabase/supabase-js';

console.log("Loaded URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log("Loaded KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
