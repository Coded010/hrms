import { createBrowserClient } from "@supabase/ssr";

export const createClient = () => {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLISHABLE_KEY
    );
};
