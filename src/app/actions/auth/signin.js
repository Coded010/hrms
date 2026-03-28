"use server";

import { createClient } from "lib/supabase/server";
import { redirect } from "next/navigation";
import { getRedirectPath } from "lib/supabase/auth/getRedirectPath";

export async function signIn(formData) {
    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !password) {
        throw new Error("Email and password are required");
    }

    const supabase = await createClient();

    const { data: { user }, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        throw new Error(error.message);
    }

    const path = await getRedirectPath(user.id);
    redirect(path);
}
