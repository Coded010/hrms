import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Admin client using the service role key.
 * Bypasses RLS entirely — safe in server components behind the proxy middleware.
 */
export const createAdminClient = () => {
    return createSupabaseClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
    );
};
