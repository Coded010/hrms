"use server";

import { createClient as createServerClient } from "lib/supabase/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

/**
 * Calls the PostgreSQL function `trigger_attendance` to log an attendance event.
 * The DB function determines the status (present, late) based on the employee's
 * schedule and the current time (15-minute grace period).
 *
 * First call = time-in, second call = time-out.
 *
 * @returns {{ success: boolean, data?: object, error?: string }}
 */
export async function triggerAttendance() {
    const authSupabase = await createServerClient();
    const { data: authData, error: authError } = await authSupabase.auth.getUser();

    if (authError || !authData?.user) {
        return { success: false, error: "Unauthorized" };
    }

    const employeeId = authData.user.id;

    const supabase = createServiceClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    try {
        const { data, error } = await supabase.rpc("trigger_attendance", {
            p_employee_id: employeeId,
        });

        if (error) {
            console.error("Error calling trigger_attendance:", error);
            return { success: false, error: error.message || "Failed to log attendance" };
        }

        // Revalidate pages that show attendance data
        revalidatePath("/me/overview");
        revalidatePath("/(main-panel)/admin/overview");
        revalidatePath("/(main-panel)/hr/overview");

        return { success: true, data };
    } catch (err) {
        console.error("Failed to call trigger_attendance:", err);
        return { success: false, error: "Failed to reach attendance service" };
    }
}
