import HrSidebar from "components/dashboard/HrSidebar";
import Topbar from "components/dashboard/Topbar";
import Footer from "components/dashboard/Footer";
import { getCurrentUser } from "lib/supabase/auth/getCurrentUser";
import { redirect } from "next/navigation";

export const metadata = {
    title: "HR",
    description: "HR Panel",
};

export default async function HrLayout({ children }) {
    const claims = await getCurrentUser();

    if (!claims) {
        redirect("/");
    }

    const user = {
        name: "HR",
        role: "Human Resources",
        avatarUrl: null,
    };

    return (
        <div className="flex h-screen w-full overflow-hidden">
            <HrSidebar />

            <div className="flex flex-col flex-1 h-screen overflow-hidden min-w-0">
                <Topbar user={user} />

                <main
                    className="flex-1 overflow-y-auto p-7 bg-[#f8fbf9]"
                    id="main-content"
                >
                    {children}
                </main>

                <Footer />
            </div>
        </div>
    );
}
