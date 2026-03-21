import { redirect } from "next/navigation";
import { getCurrentUser } from "lib/supabase/auth/getCurrentUser";

export default async function DashboardIndex() {
    const claims = await getCurrentUser();

    if (!claims) {
        redirect("/");
    }

    redirect(`/dashboard/${claims.sub}/overview`);
}
