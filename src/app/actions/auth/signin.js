'use server'

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function signIn({ email, password }) {
    if (!email || !password) {
        throw new Error('Email and password are required')
    }

    const supabase = await createSupabaseServerClient()

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        throw new Error(error.message)
    }

    redirect('/');
}
