import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Cookie-free client for public pages. Because it never reads cookies,
// public pages can be cached instead of rendered fresh for every visitor.
export async function createClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}