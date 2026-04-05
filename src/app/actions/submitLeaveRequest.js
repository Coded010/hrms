"use server";

import { createClient as createServiceClient } from "@supabase/supabase-js";
import { createClient as createSSRClient } from "lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function submitLeaveRequest(formData) {
    const authSupabase = await createSSRClient();
    const { data: user, error: userError } = await authSupabase.auth.getUser();
    if (userError || !user?.user) {
        return { success: false, message: "Not authenticated" };
    }

    const employeeId = user.user.id;

    const { leave_type, start_date, end_date, reason } = formData;

    // Validate
    if (!leave_type || !start_date || !end_date || !reason) {
        return { success: false, message: "All fields are required." };
    }

    if (new Date(end_date) < new Date(start_date)) {
        return { success: false, message: "End date must be on or after start date." };
    }

    const supabase = createServiceClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { error } = await supabase.from("leave_requests").insert({
        employee_id: employeeId,
        leave_type,
        start_date,
        end_date,
        reason,
        status: "pending",
    });

    if (error) {
        console.error("submitLeaveRequest error:", error);
        return { success: false, message: error.message };
    }

    revalidatePath("/me/my-request");
    return { success: true, message: "Leave request submitted successfully." };
}
