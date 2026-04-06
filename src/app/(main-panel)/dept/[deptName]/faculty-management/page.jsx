import { createAdminClient } from "lib/supabase/admin";
import FacultyManagementBody from "./FacultyManagementBody";

export default async function FacultyManagementPage({ params }) {
    const supabase = createAdminClient();
    const { deptName } = await params;

    // Fetch department ID from name
    const { data: dept } = await supabase
        .from("departments")
        .select("id")
        .ilike("name", deptName)
        .single();

    if (!dept) {
        return <div className="p-8 text-gray-500">Department not found.</div>;
    }

    // Fetch all employees in this department with their roles
    const { data: employees, error } = await supabase
        .from("employees")
        .select("id, employee_no, first_name, last_name, middle_name, email, is_active, hired_at, roles(name), departments(name)")
        .eq("dept_id", dept.id)
        .order("first_name", { ascending: true });

    if (error) {
        console.error("FacultyManagementPage: fetch error", error);
        return <div className="p-8 text-red-500">Failed to load faculty data.</div>;
    }

    // Transform to the shape the client component expects
    const faculty = (employees || []).map((emp) => {
        const fullName = [emp.first_name, emp.middle_name, emp.last_name].filter(Boolean).join(" ");
        const roleName = emp.roles?.name?.toUpperCase() || "UNKNOWN";
        // Map role to employment type heuristic
        const isFullTime = ["PROFESSOR", "INSTRUCTOR", "DEAN"].includes(roleName);
        const initials = [emp.first_name, emp.last_name].map((n) => n[0]).join("");

        return {
            id: emp.employee_no || "N/A",
            uuid: emp.id,
            name: fullName,
            email: emp.email,
            type: isFullTime ? "Full-Time" : "Part-Time",
            status: emp.is_active ? "Active" : "Inactive",
            initials,
        };
    });

    return <FacultyManagementBody initialFaculty={faculty} />;
}
