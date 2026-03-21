import Sidebar from "components/dashboard/Sidebar";
import Topbar from "components/dashboard/Topbar";
import Footer from "components/dashboard/Footer";
import { getCurrentUser } from "lib/supabase/auth/getCurrentUser";
import { redirect } from "next/navigation";

export const metadata = {
    title: "Department",
    description: "Department Management System",
};

export default async function DashboardLayout({ children }) {
    const claims = await getCurrentUser();
    
    if (!claims) {
        redirect('/');
    }

    // TODO: fetch real user data from Supabase using `id`
    const user = {
        name: "Dr. John Doe",
        role: "Dean, College of Computer Studies",
        avatarUrl: null,
    };

    return (
        <div className="flex h-screen w-full overflow-hidden">
            {/* Left — fixed sidebar */}
            <Sidebar />

            {/* Right — topbar + scrollable content + footer */}
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
