import { createAdminClient } from "lib/supabase/admin";
import OverviewGrid from "./mock/OverviewGrid";

export default async function DashboardPage({ params }) {
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

    // Use Philippine time (GMT+8) for all comparisons
    const today = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Manila" }));
    const todayStr = today.toISOString().split("T")[0];
    const dayOfWeek = today.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
    // DB uses 1=Sunday, 2=Monday, ..., 7=Saturday
    const dbDay = dayOfWeek === 0 ? 1 : dayOfWeek + 1;
    const currentMin = today.getHours() * 60 + today.getMinutes();

    // Fetch all employees in this department
    const { data: employees, error: empError } = await supabase
        .from("employees")
        .select("id, first_name, last_name, middle_name, email, roles(name)")
        .eq("dept_id", dept.id);

    console.log("Overview: dept.id =", dept.id);
    console.log("Overview: employees =", employees?.length || 0, "error =", empError);

    const empIds = (employees || []).map((e) => e.id);
    const empMap = new Map();
    for (const emp of employees || []) {
        empMap.set(emp.id, emp);
    }

    // Fetch today's schedules
    const { data: schedules, error: schedErr } = await supabase
        .from("schedules")
        .select("id, subject_code, subject_name, start_time, end_time, room, section, employee_id")
        .eq("day_of_week", dbDay)
        .in("employee_id", empIds.length > 0 ? empIds : ["00000000-0000-0000-0000-000000000000"])
        .order("start_time", { ascending: true });

    console.log("Overview: schedules =", schedules?.length || 0, "error =", schedErr);

    // Fetch today's attendance logs
    const { data: attendanceLogs } = await supabase
        .from("attendance_logs")
        .select("employee_id, time_in, time_out, status")
        .eq("log_date", todayStr)
        .in("employee_id", empIds.length > 0 ? empIds : ["00000000-0000-0000-0000-000000000000"]);

    // Fetch pending leave requests for this department
    const { data: pendingLeaves } = await supabase
        .from("leave_requests")
        .select("id")
        .eq("status", "pending")
        .in("employee_id", empIds.length > 0 ? empIds : ["00000000-0000-0000-0000-000000000000"]);

    // Fetch pending class coverage
    const { data: pendingCoverage } = await supabase
        .from("class_coverage")
        .select("id")
        .eq("status", "pending");

    // Build clocked-in map
    const clockedInMap = new Map();
    for (const log of attendanceLogs || []) {
        clockedInMap.set(log.employee_id, { time_in: log.time_in, time_out: log.time_out, status: log.status });
    }

    // Categorize schedules
    const ongoingClasses = [];
    const unattendedClasses = [];
    const expectedArrivals = [];

    for (const sched of schedules || []) {
        const emp = empMap.get(sched.employee_id);
        const fullName = emp ? [emp.first_name, emp.middle_name, emp.last_name].filter(Boolean).join(" ") : "Unknown";
        const initials = emp ? [emp.first_name, emp.last_name].filter(Boolean).map((n) => n[0]).join("") : "??";
        const empId = sched.employee_id;
        const startMin = timeToMinutes(sched.start_time);
        const endMin = timeToMinutes(sched.end_time);
        const isClockedIn = clockedInMap.has(empId);

        if (currentMin >= startMin && currentMin < endMin) {
            if (isClockedIn) {
                ongoingClasses.push({
                    id: sched.subject_code,
                    subject: `${sched.subject_code}: ${sched.subject_name}`,
                    professor: fullName,
                    initials,
                    time: formatTimeRange(sched.start_time, sched.end_time),
                });
            } else {
                unattendedClasses.push({
                    id: sched.subject_code,
                    subject: `${sched.subject_code}: ${sched.subject_name}`,
                    professor: fullName,
                    initials,
                    time: formatTimeRange(sched.start_time, sched.end_time),
                });
            }
        } else if (currentMin < startMin && (startMin - currentMin) <= 120) {
            expectedArrivals.push({
                id: sched.id,
                name: fullName,
                subject: `${sched.subject_code} ${sched.subject_name}`,
                time: formatTime12(sched.start_time),
                status: isClockedIn ? "Clocked In" : "Not Yet Clocked In",
            });
        }
    }

    // Compute weekly stats
    const totalFaculty = employees?.length || 0;
    const attendanceRate = totalFaculty > 0
        ? Math.round(((employees?.filter((e) => clockedInMap.has(e.id)).length || 0) / totalFaculty) * 100)
        : 0;

    const substitutionPool = (employees || []).filter((e) => {
        const logs = clockedInMap.get(e.id);
        return logs && logs.status === "present";
    }).length;

    // Total shifts today
    const totalShifts = schedules?.length || 0;

    // Pending approvals
    const pendingLeaveCount = pendingLeaves?.length || 0;
    const pendingCoverageCount = pendingCoverage?.length || 0;

    return (
        <div>
            <h1>Operational Overview</h1>
            <p className="text-sm" style={{ color: "var(--user-role-color)" }}>
                Real-time faculty management and class coverage status.
            </p>
            <OverviewGrid
                stats={[
                    {
                        id: 1,
                        title: "Ongoing Classes Right Now",
                        status: ongoingClasses.length + unattendedClasses.length,
                        type: "video",
                        details: `${ongoingClasses.length} Instructors Present - ${unattendedClasses.length} Unattended Class${unattendedClasses.length !== 1 ? "es" : ""}`,
                    },
                    {
                        id: 2,
                        title: "Pending Approvals",
                        status: pendingLeaveCount + pendingCoverageCount,
                        type: "check",
                        details: `${pendingLeaveCount} Leave Requests - ${pendingCoverageCount} Schedule Changes`,
                    },
                    {
                        id: 3,
                        title: "Today's Total Shifts",
                        status: totalShifts,
                        type: "person",
                        details: `Scheduled across ${totalFaculty} Faculty Members`,
                    },
                ]}
                sched={unattendedClasses}
                arrivals={expectedArrivals.slice(0, 5)}
                weekly={[
                    { id: 1, icon: "CheckCircledIcon", label: "Attendance Rate", value: `${attendanceRate}% this week` },
                    { id: 2, icon: "PersonIcon", label: "Substitution Pool", value: `${substitutionPool} Faculty available` },
                ]}
            />
        </div>
    );
}

function timeToMinutes(timeStr) {
    if (!timeStr) return 0;
    const [h, m] = timeStr.split(":").map(Number);
    return h * 60 + m;
}

function formatTime12(timeStr) {
    if (!timeStr) return "";
    const [h, m] = timeStr.split(":").map(Number);
    const ampm = h >= 12 ? "PM" : "AM";
    const hour = h % 12 || 12;
    return `${hour}:${m.toString().padStart(2, "0")} ${ampm}`;
}

function formatTimeRange(start, end) {
    return `${formatTime12(start)} - ${formatTime12(end)}`;
}
