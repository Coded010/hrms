"use server";

import { createClient } from "lib/supabase/server";

export async function approveLeave(requestId) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("leave_requests")
        .update({ status: "approved", reviewed_at: new Date().toISOString() })
        .eq("id", requestId);

    if (error) {
        console.error("approveLeave error:", error);
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
