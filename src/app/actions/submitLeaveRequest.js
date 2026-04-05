"use server";

import { createClient } from "lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function submitLeaveRequest(formData) {
    const supabase = await createClient();

    const { data: user, error: userError } = await supabase.auth.getUser();
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
