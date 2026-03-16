import { createBrowserClient } from "@supabase/ssr";
import { cache } from "react";

export const createClient = cache(() => {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
});
