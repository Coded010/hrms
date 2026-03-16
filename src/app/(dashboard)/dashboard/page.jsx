import { redirect } from "next/navigation";
import { getCurrentUser } from "lib/supabase/auth/getCurrentUser";

export default async function DashboardIndex() {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        redirect("/");
    }

    redirect(`/dashboard/${currentUser.id}/overview`);
}
