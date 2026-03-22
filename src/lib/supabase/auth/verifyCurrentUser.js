import { createClient } from "lib/supabase/server";
import { cache } from "react";

export const verifyCurrentUser = cache(async () => {
    const supabase = await createClient();

    const {
        data: { user },
        error
    } = await supabase.auth.getUser();

    if (error) {
        return null;
    }

    return user;
});
