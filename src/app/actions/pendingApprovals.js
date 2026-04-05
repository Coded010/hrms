"use server";

import { createClient as createServiceClient } from "@supabase/supabase-js";
import { createClient as createSSRClient } from "lib/supabase/server";
import { revalidatePath } from "next/cache";

function getServiceClient() {
    return createServiceClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
    );
}

export async function approveLeave(requestId) {
    const supabase = getServiceClient();
    const { error } = await supabase
        .from("leave_requests")
        .update({ status: "approved", reviewed_at: new Date().toISOString() })
        .eq("id", requestId);

    if (error) {
        console.error("approveLeave error:", error);
        return false;
    }
    revalidatePath("/dept/[deptName]/pending-approvals");
    return true;
}

export async function declineLeave(requestId) {
    const supabase = getServiceClient();
    const { error } = await supabase
        .from("leave_requests")
        .update({ status: "rejected", reviewed_at: new Date().toISOString() })
        .eq("id", requestId);

    if (error) {
        console.error("declineLeave error:", error);
        return false;
    }
    revalidatePath("/dept/[deptName]/pending-approvals");
    return true;
}

export async function approveCoverage(coverageId) {
    const supabase = getServiceClient();
    const { error } = await supabase
        .from("class_coverage")
        .update({ status: "assigned" })
        .eq("id", coverageId);

    if (error) {
        console.error("approveCoverage error:", error);
        return false;
    }
    revalidatePath("/dept/[deptName]/class-coverage");
    return true;
}

export async function declineCoverage(coverageId) {
    const supabase = getServiceClient();
    const { error } = await supabase
        .from("class_coverage")
        .update({ status: "resolved" })
        .eq("id", coverageId);

    if (error) {
        console.error("declineCoverage error:", error);
        return false;
    }
    revalidatePath("/dept/[deptName]/class-coverage");
    return true;
}
