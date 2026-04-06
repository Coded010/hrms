import { createAdminClient } from "lib/supabase/admin";
import ClassCoverageBody from "./ClassCoverageBody";

function formatTime12(timeStr) {
    if (!timeStr) return "";
    const [h, m] = timeStr.split(":").map(Number);
    const ampm = h >= 12 ? "PM" : "AM";
    const hour = h % 12 || 12;
    return `${hour}:${m.toString().padStart(2, "0")} ${ampm}`;
}

export default async function ClassCoveragePage({ params }) {
    const supabase = createAdminClient();
    const { deptName } = await params;

    // Get department ID (case-insensitive match, handles URL encoding)
    const resolvedDeptName = deptName ? decodeURIComponent(deptName) : "";
    const { data: dept, error: deptError } = await supabase
        .from("departments")
        .select("id, name")
        .ilike("name", resolvedDeptName)
        .single();

    if (!dept) {
        console.error("ClassCoveragePage: dept lookup failed for", resolvedDeptName, deptError);
        return <div className="p-8 text-gray-500">Department &quot;{resolvedDeptName}&quot; not found.</div>;
    }

    const today = new Date();
    const todayStr = today.toISOString().split("T")[0]; // YYYY-MM-DD
    const dayOfWeek = today.getDay(); // 0=Sun, 1=Mon ... 6=Sat
    const jsDayToDbDay = dayOfWeek === 0 ? 7 : dayOfWeek; // Convert to 1=Mon...7=Sun

    // Fetch all employees in this department
    const { data: deptEmployees } = await supabase
        .from("employees")
        .select("id, first_name, last_name, middle_name, email")
        .eq("dept_id", dept.id);

    const empIds = (deptEmployees || []).map((e) => e.id);
    const empMap = new Map();
    for (const emp of deptEmployees || []) {
        empMap.set(emp.id, emp);
    }

    console.log("ClassCoverage: deptEmployees =", deptEmployees?.length || 0);

    // Fetch all schedules for today in this department
    const { data: allSchedules, error: schedError } = await supabase
        .from("schedules")
        .select("id, subject_code, subject_name, day_of_week, start_time, end_time, room, section, employee_id")
        .eq("day_of_week", jsDayToDbDay)
        .in("employee_id", empIds.length > 0 ? empIds : ["00000000-0000-0000-0000-000000000000"])
        .order("start_time", { ascending: true });

    console.log("ClassCoverage: dept.id =", dept.id, "jsDayToDbDay =", jsDayToDbDay);
    console.log("ClassCoverage: schedules =", allSchedules?.length || 0, "error =", schedError);

    if (schedError) {
        console.error("ClassCoveragePage: schedule fetch error", schedError);
        return <div className="p-8 text-red-500">Failed to load schedule data.</div>;
    }

    // Fetch today's attendance logs for all employees in this department
    let attendanceLogs = [];
    if (empIds.length > 0) {
        const { data: logs } = await supabase
            .from("attendance_logs")
            .select("employee_id, time_in, time_out, status")
            .eq("log_date", todayStr)
            .in("employee_id", empIds);
        attendanceLogs = logs || [];
    }

    const clockedInMap = new Map();
    for (const log of attendanceLogs) {
        clockedInMap.set(log.employee_id, { time_in: log.time_in, time_out: log.time_out, status: log.status });
    }

    // Categorize classes
    const now = today;
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const toMinutes = (timeStr) => {
        if (!timeStr) return Infinity;
        const [h, m] = timeStr.split(":").map(Number);
        return h * 60 + m;
    };

    const ongoing = [];
    const upcoming = [];
    const unattended = [];

    for (const sched of allSchedules || []) {
        const emp = empMap.get(sched.employee_id);
        const fullName = emp ? [emp.first_name, emp.middle_name, emp.last_name].filter(Boolean).join(" ") : "Unknown";
        const initials = emp ? [emp.first_name, emp.last_name].filter(Boolean).map((n) => n[0]).join("") : "??";
        const empId = sched.employee_id;
        const startMin = toMinutes(sched.start_time);
        const endMin = toMinutes(sched.end_time);
        const clockedIn = clockedInMap.get(empId);
        const isClockedIn = clockedIn && clockedIn.time_in;

        const card = {
            id: sched.subject_code,
            room: sched.room,
            section: sched.section,
            instructor: fullName,
            time: `${formatTime12(sched.start_time)} - ${formatTime12(sched.end_time)}`,
            initials,
            employeeId: empId,
        };

        if (currentMinutes >= startMin && currentMinutes < endMin) {
            // Currently in session
            if (isClockedIn) {
                ongoing.push({ ...card, checkIn: formatTime12(clockedIn.time_in) });
            } else {
                unattended.push(card);
            }
        } else if (currentMinutes < startMin && (startMin - currentMinutes) <= 90) {
            // Starting within 90 minutes
            upcoming.push(card);
        } else if (currentMinutes >= startMin && !isClockedIn) {
            // Session should have started but no clock-in
            unattended.push(card);
        }
    }

    const totalScheduled = allSchedules?.length || 0;
    const operationalEfficiency = totalScheduled > 0
        ? Math.round(((ongoing.length + upcoming.length) / totalScheduled) * 100)
        : 100;

    return (
        <ClassCoverageBody
            ongoing={ongoing}
            upcoming={upcoming}
            unattended={unattended}
            totalScheduled={totalScheduled}
            operationalEfficiency={operationalEfficiency}
        />
    );
}
