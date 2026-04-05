import { createAdminClient } from "lib/supabase/admin";
import ReportsBody from "./ReportsBody";

export default async function ReportsPage({ params }) {
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

    // Fetch all employees in this department
    const { data: employees } = await supabase
        .from("employees")
        .select("id, employee_no, first_name, last_name, middle_name, email")
        .eq("dept_id", dept.id)
        .order("first_name", { ascending: true });

    if (!employees || employees.length === 0) {
        return <ReportsBody stats={[]} facultyData={[]} totalFaculty={0} />;
    }

    const empIds = employees.map((e) => e.id);

    // Fetch all schedules for these employees
    const { data: schedules } = await supabase
        .from("schedules")
        .select("employee_id, start_time, end_time")
        .in("employee_id", empIds);

    // Fetch all attendance logs for these employees
    const { data: attendanceLogs } = await supabase
        .from("attendance_logs")
        .select("employee_id, log_date, time_in, time_out, status")
        .in("employee_id", empIds)
        .order("log_date", { ascending: false });

    // Compute scheduled hours per employee
    const scheduleMap = {};
    for (const s of schedules || []) {
        if (!scheduleMap[s.employee_id]) scheduleMap[s.employee_id] = [];
        scheduleMap[s.employee_id].push(s);
    }

    // Compute attendance stats per employee
    const attendanceMap = {};
    for (const log of attendanceLogs || []) {
        if (!attendanceMap[log.employee_id]) attendanceMap[log.employee_id] = [];
        attendanceMap[log.employee_id].push(log);
    }

    // Compute rendered hours from attendance logs
    const toHours = (timeStr) => {
        if (!timeStr) return 0;
        const [h, m] = timeStr.split(":").map(Number);
        return h + m / 60;
    };

    const facultyData = employees.map((emp) => {
        const fullName = [emp.first_name, emp.middle_name, emp.last_name].filter(Boolean).join(" ");
        const initials = [emp.first_name, emp.last_name].map((n) => n[0]).join("");

        // Scheduled hours: count unique class sessions * avg session duration
        const empSchedules = scheduleMap[emp.id] || [];
        const scheduledHours = empSchedules.length > 0
            ? empSchedules.reduce((acc, s) => {
                const start = toHours(s.start_time);
                const end = toHours(s.end_time);
                return acc + Math.max(0, end - start);
            }, 0)
            : 0;

        // Attendance data
        const logs = attendanceMap[emp.id] || [];
        let renderedHours = 0;
        let absences = 0;
        let lates = 0;

        for (const log of logs) {
            if (log.status === "absent") {
                absences++;
            } else {
                if (log.status === "late") lates++;
                if (log.time_in && log.time_out) {
                    renderedHours += toHours(log.time_out) - toHours(log.time_in);
                }
            }
        }

        const status = (absences > 0 || lates > 2) ? "REVIEW REQUIRED" : "COMPLIANT";

        return {
            id: emp.employee_no || "N/A",
            name: fullName,
            initials,
            scheduled: `${Math.round(scheduledHours)}h`,
            rendered: `${Math.round(renderedHours)}h`,
            absences,
            lates,
            status,
        };
    });

    // Compute aggregate stats
    const totalScheduled = facultyData.reduce((acc, f) => acc + parseInt(f.scheduled), 0);
    const totalRendered = facultyData.reduce((acc, f) => acc + parseInt(f.rendered), 0);
    const totalAbsences = facultyData.reduce((acc, f) => acc + f.absences, 0);
    const totalLates = facultyData.reduce((acc, f) => acc + f.lates, 0);
    const fulfillmentRate = totalScheduled > 0 ? ((totalRendered / totalScheduled) * 100).toFixed(1) : "0";

    const stats = [
        {
            label: "Total Scheduled Hours",
            value: totalScheduled.toFixed(1),
            sub: `Accumulated for ${employees.length} faculty members`,
            icon: "calendar",
        },
        {
            label: "Total Hours Rendered",
            value: totalRendered.toFixed(1),
            sub: `${fulfillmentRate}% fulfillment rate this period`,
            icon: "clock",
        },
        {
            label: "Absences / Lates",
            value: (totalAbsences + totalLates).toFixed(1),
            sub: "Requires Dean's justification",
            icon: "alert",
        },
    ];

    return <ReportsBody stats={stats} facultyData={facultyData} totalFaculty={employees.length} />;
}
