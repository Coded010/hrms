"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SidebarUserProfile from "./SidebarUserProfile";
import { DashboardIcon } from "@radix-ui/react-icons";

const NAV_LINKS = [
    { label: "Overview", href: "overview", icon: DashboardIcon },
];

export default function FinanceSidebar({ user }) {
    const pathname = usePathname();
    const basePath = `/finance`;
    const isActive = (href) => pathname.includes(`/${href}`);

    return (
        <aside className="w-48 min-w-[230px] bg-white border-r border-[#e8ede9] flex flex-col h-screen sticky top-0 z-20" aria-label="Finance navigation">
            <div className="flex items-center justify-center gap-2 px-5 py-[18px] pb-4 border-b border-[#e8ede9]">
                <span className="text-lg font-bold text-[#5bb98b] tracking-tight">Finance Panel</span>
            </div>
            <nav className="flex-1 py-3 px-2.5 flex flex-col gap-0.5 overflow-y-auto" aria-label="Primary">
                {NAV_LINKS.map(({ label, href, icon: Icon }) => (
                    <Link
                        key={href}
                        href={`${basePath}/${href}`}
                        aria-current={isActive(href) ? "page" : undefined}
                        className={[
                            "flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors duration-150 no-underline border border-transparent",
                            isActive(href) ? "bg-[#e9f7f1] text-[#5bb98b]" : "text-[#4a4a4a] hover:bg-[#f4faf7] hover:text-[#5bb98b]",
                        ].join(" ")}
                        prefetch={false}
                    >
                        <Icon
                            className={[
                                "w-[18px] h-[18px] shrink-0 transition-colors duration-150",
                                isActive(href) ? "text-[#5bb98b]" : "text-[#6b7280]",
                            ].join(" ")}
                            aria-hidden="true"
                        />
                        {label}
                    </Link>
                ))}
            </nav>
            <SidebarUserProfile user={user} settingsHref={`${basePath}/settings`} />
        </aside>
    );
}
