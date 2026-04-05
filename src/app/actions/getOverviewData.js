"use server";

import { createClient as createServiceClient } from "@supabase/supabase-js";
import { createClient as createSSRClient } from "lib/supabase/server";

export async function getOverviewData() {
    // Use SSR client for auth to get current user from cookies
    const authSupabase = await createSSRClient();
    const { data: authData } = await authSupabase.auth.getUser();
    if (!authData?.user) return null;

    const employeeId = authData.user.id;

    // Use service-role client for data queries (bypasses RLS)
    const supabase = createServiceClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Fetch employee, leave balances, and attendance logs in parallel
    const [employeeRes, balancesRes, attendanceRes] = await Promise.all([
        supabase
            .from("employees")
            .select("first_name, last_name, roles(name), departments(name)")
            .eq("id", employeeId)
            .single(),
        supabase
            .from("leave_balances")
            .select("*")
            .eq("employee_id", employeeId)
            .in("leave_type", ["vacation", "sick", "emergency"]),
        supabase
            .from("attendance_logs")
            .select("*")
            .eq("employee_id", employeeId)
            .order("log_date", { ascending: false })
            .limit(5),
    ]);

    const employee = employeeRes.data;
    const balances = balancesRes.data || [];
    const attendanceLogs = attendanceRes.data || [];

    // Build leave balance map
    const vacationBal = balances.find((b) => b.leave_type === "vacation");
    const sickBal = balances.find((b) => b.leave_type === "sick");
    const emergencyBal = balances.find((b) => b.leave_type === "emergency");

    const formatBalance = (bal, defaultTotal = 15) => {
        if (!bal) return { used: 0, total: defaultTotal, available: defaultTotal };
        const used = Number(bal.used_days);
        const total = Number(bal.total_days);
        return { used, total, available: Math.max(0, total - used) };
    };

    return {
        firstName: employee?.first_name || "Employee",
        lastName: employee?.last_name || "",
        roleName: employee?.roles?.name || "Faculty",
        department: employee?.departments?.name || "",
        leaveBalances: {
            vacation: formatBalance(vacationBal, 15),
            sick: formatBalance(sickBal, 15),
            emergency: formatBalance(emergencyBal, 10),
        },
        attendanceLogs: attendanceLogs.map((log) => ({
            id: log.id,
            date: log.log_date,
            timeIn: log.time_in,
            timeOut: log.time_out,
            status: log.status,
        })),
    };
}
