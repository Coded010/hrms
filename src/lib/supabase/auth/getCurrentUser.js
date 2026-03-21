import { createClient } from "lib/supabase/server";

export const getCurrentUser = async () => {
    const supabase = await createClient();

    const {
        data,
        error,
    } = await supabase.auth.getClaims();

    if (error || !data) {
        return null;
    }

    return data.claims;
};
