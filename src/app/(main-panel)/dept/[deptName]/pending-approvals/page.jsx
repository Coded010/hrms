import { createAdminClient } from "lib/supabase/admin";
import PendingApprovalsBody from "./PendingApprovalsBody";

function formatDate(dateStr) {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default async function PendingApprovalsPage({ params }) {
    const supabase = createAdminClient();
    const { deptName } = await params;

    // Get department ID
    const { data: dept } = await supabase
        .from("departments")
        .select("id")
        .ilike("name", deptName)
        .single();

    if (!dept) {
        return <div className="p-8 text-gray-500">Department not found.</div>;
    }

    // Get employee IDs for this department first
    const { data: deptEmployees } = await supabase
        .from("employees")
        .select("id, first_name, last_name, middle_name, email, roles(name)")
        .eq("dept_id", dept.id);

    const empIds = (deptEmployees || []).map((e) => e.id);
    const empMap = new Map();
    for (const emp of deptEmployees || []) {
        empMap.set(emp.id, emp);
    }

    console.log("PendingApprovals: deptEmployees =", deptEmployees?.length || 0, "empIds =", empIds);

    // Fetch pending leave requests for employees in this department
    const { data: leaveRequests, error: lrError } = await supabase
        .from("leave_requests")
        .select("id, leave_type, start_date, end_date, reason, submitted_at, employee_id")
        .eq("status", "pending")
        .in("employee_id", empIds.length > 0 ? empIds : ["00000000-0000-0000-0000-000000000000"])
        .order("submitted_at", { ascending: false });

    console.log("PendingApprovals: leaveRequests =", leaveRequests?.length || 0, "error =", lrError);

    if (lrError) console.error("PendingApprovalsPage: leave requests error", lrError);

    // Map leave_type to human-readable
    const leaveTypeMap = {
        vacation: "Vacation Leave",
        sick: "Medical Leave",
        emergency: "Emergency Leave",
        overtime: "Overtime Request",
        missed_log: "Missed Log Correction",
    };

    const leaveItems = (leaveRequests || []).map((lr) => {
        const emp = empMap.get(lr.employee_id);
        const fullName = emp ? [emp.first_name, emp.middle_name, emp.last_name].filter(Boolean).join(" ") : "Unknown";
        return {
            id: lr.id,
            name: fullName,
            title: emp?.roles?.name || "Faculty",
            type: leaveTypeMap[lr.leave_type] || lr.leave_type,
            submitted: formatDate(lr.submitted_at),
            note: lr.reason,
            urgent: lr.leave_type === "emergency",
            startDate: lr.start_date,
            endDate: lr.end_date,
        };
    });

    // Fetch pending class coverage (schedule adjustments) for this department
    const { data: coverage, error: ccError } = await supabase
        .from("class_coverage")
        .select("id, coverage_date, notes, schedules(subject_code, subject_name, room, section, day_of_week), employees(first_name, last_name)")
        .eq("status", "pending")
        .eq("schedules.day_of_week.gte", 1)
        .order("coverage_date", { ascending: true });

    // Actually, class_coverage is linked to schedules, and schedules are linked to employees via employee_id.
    // We need to join through schedules to filter by department.
    const { data: pendingCoverage, error: pcError } = await supabase
        .from("class_coverage")
        .select("id, coverage_date, notes, schedules(subject_code, subject_name, room, section, day_of_week, employees(first_name, last_name))")
        .eq("status", "pending")
        .order("coverage_date", { ascending: true });

    if (ccError) console.error("PendingApprovalsPage: class coverage error", ccError);
    if (pcError) console.error("PendingApprovalsPage: pending coverage error", pcError);

    const scheduleItems = (pendingCoverage || []).map((cc) => {
        const sched = cc.schedules;
        const emp = sched?.employees;
        const fullName = [emp?.first_name, emp?.last_name].filter(Boolean).join(" ");
        return {
            id: cc.id,
            name: fullName || "Unknown",
            title: "Schedule Adjustment",
            type: "Class Coverage",
            submitted: formatDate(cc.coverage_date),
            note: cc.notes || `Coverage needed for ${sched?.subject_code || "class"} in ${sched?.room || "TBD"}`,
            urgent: false,
        };
    });

    return (
        <PendingApprovalsBody
            initialLeaveRequests={leaveItems}
            initialScheduleAdjustments={scheduleItems}
        />
    );
}
