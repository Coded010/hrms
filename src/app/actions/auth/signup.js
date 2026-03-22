'use server'

import { createClient } from "lib/supabase/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { getCurrentUser } from "lib/supabase/auth/getCurrentUser";
import { getRedirectPath } from "lib/supabase/auth/getRedirectPath";

export async function signUp({ email, password, firstName, lastName, department, role }) {
    if (!email || !password || !firstName || !lastName || !department || !role) {
        throw new Error('All fields are required');
    }

    const claims = await getCurrentUser();
    if (!claims?.sub) {
        throw new Error("Unauthorized: You must be logged in to create a user.");
    }

    const supabase = await createClient();
    const { data: currentUserData, error: currentUserError } = await supabase
        .from('employees')
        .select('role_id')
        .eq('id', claims.sub)
        .single();

    console.log("Current User Error:", currentUserError);
    
    if (currentUserError || !currentUserData) {
        throw new Error("Unauthorized: Could not verify your employee role.");
    }

    if (currentUserData.role_id !== 1 && currentUserData.role_id !== 2) {
        throw new Error("Unauthorized: Only Admins and HR can create new users.");
    }

    const supabaseAdmin = createSupabaseClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { data: deptData, error: deptError } = await supabaseAdmin
        .from('departments')
        .select('id')
        .eq('name', department)
        .single();
    
    if (deptError || !deptData) {
        console.error("Supabase department query error:", deptError);
        throw new Error(`Department not found: ${department}`);
    }

    const { data: roleData, error: roleError } = await supabaseAdmin
        .from('roles')
        .select('id')
        .eq('name', role)
        .single();

    if (roleError || !roleData) {
        console.error("Supabase role query error:", roleError);
        throw new Error(`Role not found: ${role}`);
    }

    const { data: authData , error: authError } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
    });

    if (authError) throw new Error(authError.message);

    const userId = authData.user?.id;
    if (!userId) throw new Error('User not created');

    await supabaseAdmin.from('employees').insert({
        id: userId,
        email,
        first_name: firstName,
        last_name: lastName,
        dept_id: deptData.id,
        role_id: roleData.id,
    });

    const path = await getRedirectPath(claims.sub);
    redirect(path);
}
