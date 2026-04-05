"use server";

import { createClient } from "lib/supabase/server";

export async function approveLeave(requestId) {
    const supabase = await createClient();

    // Fetch the leave request details
    const { data: request, error: fetchError } = await supabase
        .from("leave_requests")
        .select("employee_id, leave_type, start_date, end_date")
        .eq("id", requestId)
        .single();

    if (fetchError || !request) {
        console.error("approveLeave fetch error:", fetchError);
        return false;
    }

    // Call atomic DB function: updates status + increments used_days
    const { error: updateError } = await supabase.rpc("approve_leave_request", {
        p_request_id: requestId,
    });

    if (updateError) {
        console.error("approveLeave RPC error:", updateError);
        return false;
    }

    return true;
}

export async function declineLeave(requestId) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("leave_requests")
        .update({ status: "rejected", reviewed_at: new Date().toISOString() })
        .eq("id", requestId);

    if (error) {
        console.error("declineLeave error:", error);
        return false;
    }
    return true;
}

export async function approveCoverage(coverageId) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("class_coverage")
        .update({ status: "assigned" })
        .eq("id", coverageId);

    if (error) {
        console.error("approveCoverage error:", error);
        return false;
    }
    return true;
}

export async function declineCoverage(coverageId) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("class_coverage")
        .update({ status: "resolved" })
        .eq("id", coverageId);

    if (error) {
        console.error("declineCoverage error:", error);
        return false;
    }
    return true;
}
