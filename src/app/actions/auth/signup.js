'use server'

import { createClient } from "lib/supabase/server";

export async function signUp({ email, password, firstName, lastName }) {
    if (!email || !password || !firstName || !lastName) {
        throw new Error('All fields are required');
    }


    const supabase = await createClient();

    const { data , error } = await supabase.auth.signUp({
        email,
        password,
    })

    if (error) throw new Error(error.message);

    const userId = data.user?.id;
    if (!userId) throw new Error('User not created');

    await supabase.from('users').insert({
        id: userId,
        email,
        first_name: firstName,
        last_name: lastName,
    })

    await supabase.from('user_roles').insert({
        user_id: userId,
        role: 'faculty',
    }); 
}
