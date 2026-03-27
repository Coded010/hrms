"use client";

import { MagnifyingGlassIcon, BellIcon } from "@radix-ui/react-icons";

// -- Topbar component
export default function Topbar() {
    return (
        <header
            className="h-16 min-h-16 bg-white border-b border-[#e8ede9] flex items-center px-6 gap-4 z-10"
            role="banner"
        >
            {/* Search */}
            <div
                className="flex-1 max-w-[420px] flex items-center gap-2 bg-[#f4faf7] border border-[#d1fae5] rounded-[10px] px-3.5 py-2 transition-all duration-150 focus-within:border-[#5bb98b] focus-within:shadow-[0_0_0_3px_rgba(91,185,139,0.12)]"
                aria-label="Search"
            >
                <MagnifyingGlassIcon
                    className="w-4 h-4 text-gray-400 shrink-0"
                    aria-hidden="true"
                />
                <input
                    id="topbar-search-input"
                    type="search"
                    placeholder="Search faculty, classes, or reports..."
                    aria-label="Search faculty, classes, or reports"
                    className="border-none outline-none bg-transparent text-[13px] text-[#202020] w-full font-[inherit] placeholder:text-gray-400"
                />
            </div>

            <div className="flex-1" aria-hidden="true" />

            {/* Right-side actions */}
            <div className="flex items-center gap-4">
                {/* Notification bell */}
                <button
                    id="topbar-bell-btn"
                    className="w-[38px] h-[38px] bg-[#f4faf7] border border-[#d1fae5] rounded-[10px] flex items-center justify-center cursor-pointer transition-all duration-150 hover:bg-[#e9f7f1] hover:border-[#5bb98b] hover:text-[#5bb98b] text-[#6b7280] relative"
                    aria-label="Notifications"
                    title="Notifications"
                    type="button"
                >
                    <BellIcon width={17} height={17} aria-hidden="true" />
                </button>
            </div>
        </header>
    );
}
