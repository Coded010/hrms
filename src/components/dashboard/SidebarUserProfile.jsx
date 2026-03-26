"use client";

import { useState, useRef, useEffect } from "react";
import { GearIcon, ExitIcon } from "@radix-ui/react-icons";
import { signOut } from "actions/auth/signout";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import Link from "next/link";

// -- SidebarUserProfile component
export default function SidebarUserProfile({ user, settingsHref }) {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const containerRef = useRef(null);

    const initials = user?.name
        ? user.name
              .split(" ")
              .map((w) => w[0])
              .slice(0, 2)
              .join("")
              .toUpperCase()
        : "U";

    // Close on outside click
    useEffect(() => {
        function handleClickOutside(e) {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative border-t border-[#e8ede9] px-3 py-3"
        >
            {/* Popover Menu */}
            {open && (
                <div className="absolute left-3 right-3 bottom-full mb-2 bg-white border border-[#e8ede9] rounded-xl shadow-lg overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-2 duration-150">
                    {settingsHref && (
                        <Link
                            id="sidebar-settings-link"
                            href={settingsHref}
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2.5 text-[13px] font-medium text-[#4a4a4a] hover:bg-[#f4faf7] hover:text-[#5bb98b] transition-colors duration-150 no-underline"
                        >
                            <GearIcon
                                className="w-[16px] h-[16px] shrink-0 text-[#6b7280]"
                                aria-hidden="true"
                            />
                            Settings
                        </Link>
                    )}
                    <button
                        id="sidebar-logout-btn"
                        onClick={() => {
                            setOpen(false);
                            startTransition(async () => {
                                await signOut();
                                router.push("/");
                            });
                        }}
                        disabled={isPending}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 text-[13px] font-medium text-red-500 hover:bg-red-50 transition-colors duration-150 text-left bg-transparent border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ExitIcon
                            className="w-[16px] h-[16px] shrink-0"
                            aria-hidden="true"
                        />
                        {isPending ? "Logging out..." : "Log Out"}
                    </button>
                </div>
            )}

            {/* Profile trigger */}
            <button
                id="sidebar-profile-btn"
                onClick={() => setOpen((prev) => !prev)}
                className="w-full flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-[#f4faf7] transition-colors duration-150 cursor-pointer text-left border-none bg-transparent"
                aria-haspopup="true"
                aria-expanded={open}
                aria-label="User menu"
            >
                {/* Avatar */}
                <div
                    className="w-9 h-9 rounded-full bg-linear-to-br from-[#5bb98b] to-[#3da870] flex items-center justify-center text-[13px] font-bold text-white shrink-0 overflow-hidden border-2 border-[#e9f7f1]"
                    aria-hidden="true"
                >
                    {user?.avatarUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={user.avatarUrl}
                            alt={user.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span>{initials}</span>
                    )}
                </div>

                {/* Name + role */}
                <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-[#202020] leading-tight truncate">
                        {user?.name ?? "User"}
                    </p>
                    <p className="text-[11px] text-[#6b7280] leading-tight truncate">
                        {user?.role ?? ""}
                    </p>
                </div>

                {/* Chevron */}
                <svg
                    className={`w-3.5 h-3.5 text-[#6b7280] shrink-0 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true"
                >
                    <path
                        d="M2 4l4 4 4-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
        </div>
    );
}
