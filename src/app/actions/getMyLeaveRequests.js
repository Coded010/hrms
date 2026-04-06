import { createClient as createServiceClient } from "@supabase/supabase-js";
import { createClient as createSSRClient } from "lib/supabase/server";

export async function getMyLeaveRequests(page = 1, perPage = 6) {
    const authSupabase = await createSSRClient();
    const { data: user, error: userError } = await authSupabase.auth.getUser();
    if (userError || !user?.user) return { requests: [], balances: [], total: 0 };

    const employeeId = user.user.id;

    const supabase = createServiceClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Get total count
    const countRes = await supabase
        .from("leave_requests")
        .select("*", { count: "exact", head: true })
        .eq("employee_id", employeeId);

    // Fetch paginated requests
    const start = (page - 1) * perPage;
    const end = start + perPage - 1;

    const [requestsRes, balancesRes] = await Promise.all([
        supabase
            .from("leave_requests")
            .select("*")
            .eq("employee_id", employeeId)
            .order("submitted_at", { ascending: false })
            .range(start, end),
        supabase
            .from("leave_balances")
            .select("*")
            .eq("employee_id", employeeId),
    ]);

    return {
        requests: requestsRes.data || [],
        balances: balancesRes.data || [],
        total: countRes.count || 0,
    };
}
