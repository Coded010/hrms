"use server";

import { createClient } from "lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function signIn({ email, password }) {
    if (!email || !password) {
        throw new Error("Email and password are required");
    }

    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/", "layout");
    redirect("/");
}
