import { createClient as createServiceClient } from "@supabase/supabase-js";
import { createClient as createSSRClient } from "lib/supabase/server";

export async function getEmployeeProfile() {
    const authSupabase = await createSSRClient();
    const { data: authData } = await authSupabase.auth.getUser();

    if (!authData?.user) return null;

    const userId = authData.user.id;

    const supabase = createServiceClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { data: employee, error: employeeError } = await supabase
        .from("employees")
        .select("first_name, last_name, roles(name), departments(name)")
        .eq("id", userId)
        .single();

    if (employeeError) {
        console.error("[getEmployeeProfile] Employee query error:", employeeError);
        return null;
    }

    if (!employee) {
        console.warn("[getEmployeeProfile] No employee found for user ID:", userId);
        return null;
    }

    const role = employee.roles?.name || "Faculty Member";
    const dept = employee.departments?.name || "";

    return {
        name: `${employee.first_name} ${employee.last_name}`,
        role: dept ? `${role} | ${dept}` : role,
        avatarUrl: null,
    };
}
