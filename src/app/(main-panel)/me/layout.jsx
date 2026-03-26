import MeSidebar from "components/dashboard/MeSidebar";
import Topbar from "components/dashboard/Topbar";
import Footer from "components/dashboard/Footer";
import { getCurrentUser } from "lib/supabase/auth/getCurrentUser";
import { redirect } from "next/navigation";

export const metadata = {
    title: "My Dashboard",
    description: "Personal Dashboard",
};

export default async function MeLayout({ children }) {
    const claims = await getCurrentUser();

    if (!claims) {
        redirect("/");
    }

    const user = {
        name: "Faculty",
        role: "Faculty Member",
        avatarUrl: null,
    };

    return (
        <div className="flex h-screen w-full overflow-hidden">
            <MeSidebar user={user} />

            <div className="flex flex-col flex-1 h-screen overflow-hidden min-w-0">
                <Topbar />

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
