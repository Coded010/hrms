"use server";

import { createClient } from "@supabase/supabase-js";

const ROLE_ROUTES = {
    DEAN: "dept",
    PROFESSOR: "me",
    INSTRUCTOR: "me",
    TEACHER: "me",
    ADMIN: "admin",
    HR: "hr",
    FINANCE: "finance",
};

export async function getRedirectPath(userId) {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { data: employee, error } = await supabase
        .from("employees")
        .select("roles(name), departments(name)")
        .eq("id", userId)
        .single();

    if (error || !employee) {
        console.error("getRedirectPath: employee lookup error:", error);
        return "/";
    }

    const roleName = employee.roles?.name?.toUpperCase();
    const deptName = employee.departments?.name;

    const panel = ROLE_ROUTES[roleName];

    if (!panel) {
        console.warn(`getRedirectPath: Unknown role "${roleName}", redirecting to /`);
        return "/";
    }

    if (panel === "dept") {
        if (!deptName) {
            console.warn("getRedirectPath: DEAN has no department, redirecting to /");
            return "/";
        }
        return `/dept/${encodeURIComponent(deptName)}/overview`;
    }

    return `/${panel}/overview`;
}
