import { createClient } from "lib/supabase/server";

export async function getMyLeaveRequests() {
    const supabase = await createClient();

    const { data: user, error: userError } = await supabase.auth.getUser();
    if (userError || !user?.user) return { requests: [], balances: [] };

    const employeeId = user.user.id;

    // Fetch both tables in parallel
    const [requestsRes, balancesRes] = await Promise.all([
        supabase
            .from("leave_requests")
            .select("*")
            .eq("employee_id", employeeId)
            .order("submitted_at", { ascending: false }),
        supabase
            .from("leave_balances")
            .select("*")
            .eq("employee_id", employeeId),
    ]);

    return {
        requests: requestsRes.data || [],
        balances: balancesRes.data || [],
    };
}
