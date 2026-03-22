"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import SignOutForm from "../auth/SignoutForm";
import {
    DashboardIcon,
    PersonIcon,
    DesktopIcon,
    CheckboxIcon,
    BarChartIcon,
    GearIcon,
    ExitIcon,
} from "@radix-ui/react-icons";

// -- Nav link definitions
const NAV_LINKS = [
    { label: "Overview", href: "overview", icon: DashboardIcon },
    {
        label: "Faculty Management",
        href: "faculty-management",
        icon: PersonIcon,
    },
    { label: "Class Coverage", href: "class-coverage", icon: DesktopIcon },
    {
        label: "Pending Approvals",
        href: "pending-approvals",
        icon: CheckboxIcon,
    },
    { label: "Reports", href: "reports", icon: BarChartIcon },
];

// -- Sidebar component
export default function Sidebar() {
    const pathname = usePathname();
    const params = useParams();
    const deptName = params?.deptName;

    const basePath = `/dept/${deptName}`;
    const isActive = (href) => pathname.includes(`/${href}`);

    return (
        <aside
            className="w-48 min-w-[230px] bg-white border-r border-[#e8ede9] flex flex-col h-screen sticky top-0 z-20"
            aria-label="Main navigation"
        >
            {/* Logo */}
            <div className="flex items-center justify-center gap-2 px-5 py-[18px] pb-4 border-b border-[#e8ede9]">
                <span className="text-lg font-bold text-[#5bb98b] tracking-tight">
                    CCS Faculty
                </span>
            </div>

            {/* Primary nav */}
            <nav
                className="flex-1 py-3 px-2.5 flex flex-col gap-0.5 overflow-y-auto"
                aria-label="Primary"
            >
                {NAV_LINKS.map(({ label, href, icon: Icon }) => (
                    <Link
                        key={href}
                        href={`${basePath}/${href}`}
                        aria-current={isActive(href) ? "page" : undefined}
                        className={[
                            "flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors duration-150 no-underline border border-transparent",
                            isActive(href)
                                ? "bg-[#e9f7f1] text-[#5bb98b]"
                                : "text-[#4a4a4a] hover:bg-[#f4faf7] hover:text-[#5bb98b]",
                        ].join(" ")}
                        prefetch={false}
                    >
                        <Icon
                            className={[
                                "w-[18px] h-[18px] shrink-0 transition-colors duration-150",
                                isActive(href)
                                    ? "text-[#5bb98b]"
                                    : "text-[#6b7280]",
                            ].join(" ")}
                            aria-hidden="true"
                        />
                        {label}
                    </Link>
                ))}
            </nav>

            {/* Bottom actions */}
            <div className="py-3 px-2.5 border-t border-[#e8ede9] flex flex-col gap-0.5">
                <Link
                    href={`${basePath}/settings`}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium text-[#4a4a4a] hover:bg-[#f4faf7] transition-colors duration-150 no-underline"
                >
                    <GearIcon
                        className="w-[18px] h-[18px] shrink-0 text-[#6b7280]"
                        aria-hidden="true"
                    />
                    Settings
                </Link>

                <SignOutForm />
            </div>
        </aside>
    );
}
