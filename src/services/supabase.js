import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

export const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Missing Supabase environment variables. Make sure `VITE_SUPABASE_URL` and `VITE_SUPABASE_KEY` are configured for your production build (e.g. in Vercel Project Settings -> Environment Variables) and then redeploy."
  );
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
