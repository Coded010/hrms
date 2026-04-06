"use server";

import { createClient as createServiceClient } from "@supabase/supabase-js";

/**
 * Assigns a schedule to an employee (faculty member).
 *
 * @param {string} employeeId - UUID of the employee
 * @param {object} scheduleData - Schedule details
 * @returns {{ success: boolean, message?: string, error?: string }}
 */
export async function assignSchedule(employeeId, scheduleData) {
    if (!employeeId) {
        return { success: false, error: "Employee ID is required." };
    }

    const supabase = createServiceClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { error } = await supabase.from("schedules").insert({
        employee_id: employeeId,
        subject_code: scheduleData.subject_code,
        subject_name: scheduleData.subject_name,
        day_of_week: parseInt(scheduleData.day_of_week, 10),
        start_time: scheduleData.start_time,
        end_time: scheduleData.end_time,
        room: scheduleData.room,
        section: scheduleData.section,
        status: "active",
    });

    if (error) {
        console.error("[assignSchedule] Error:", error);
        return { success: false, error: error.message || "Failed to assign schedule." };
    }

    return {
        success: true,
        message: "Schedule assigned successfully.",
    };
}
