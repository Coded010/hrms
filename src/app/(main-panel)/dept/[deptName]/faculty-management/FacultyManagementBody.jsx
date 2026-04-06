"use client";

import * as React from "react";
import {
    SlidersHorizontal,
    Download,
    UserPlus,
    MoreVertical,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from "@/components/ui/table";

const computeStats = (data) => {
    const total = data.length;
    const fullTime = data.filter((f) => f.type === "Full-Time").length;
    const partTime = data.filter((f) => f.type === "Part-Time").length;
    const onLeave = data.filter((f) => f.status === "On Leave").length;
    const fullPct = total > 0 ? Math.round((fullTime / total) * 100) : 0;
    const partPct = total > 0 ? Math.round((partTime / total) * 100) : 0;
    return [
        { label: "TOTAL FACULTY", value: String(total), sub: "+3 this month", subColor: "#5BB98B" },
        { label: "FULL-TIME", value: String(fullTime), sub: `${fullPct}% of total`, subColor: "#999" },
        { label: "PART-TIME", value: String(partTime), sub: `${partPct}% of total`, subColor: "#999" },
        { label: "ON LEAVE", value: String(onLeave), sub: "Returning soon", subColor: "#f59e0b" },
    ];
};

function StatCard({ label, value, sub, subColor }) {
    return (
        <div className="flex-1 min-w-[140px] rounded-lg border border-[#e5e7eb] bg-white px-5 py-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#9ca3af]">{label}</p>
            <p className="mt-1 text-[2rem] font-bold text-[#202020] leading-none">{value}</p>
            <p className="mt-1 text-xs font-medium" style={{ color: subColor }}>{sub}</p>
        </div>
    );
}

function EmploymentBadge({ type }) {
    const isFullTime = type === "Full-Time";
    return (
        <span
            className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
            style={isFullTime
                ? { background: "#d1fae5", color: "#065f46" }
                : { background: "#dbeafe", color: "#1e40af" }}
        >
            {type}
        </span>
    );
}

function Avatar({ initials }) {
    return (
        <div
            className="flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-bold"
            style={{ background: "#e6f4ed", color: "#218358" }}
        >
            {initials}
        </div>
    );
}

function FilterDropdown({ icon: Icon, label, options }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="inline-flex items-center gap-1.5 rounded-lg border border-[#e5e7eb] bg-white px-3 h-9 text-sm text-[#374151] hover:bg-[#f9fafb] transition-colors">
                    <Icon className="size-3.5 text-[#6b7280]" />
                    {label}
                    <svg className="size-3 opacity-50 ml-0.5" viewBox="0 0 10 6" fill="none">
                        <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                {options.map((o, i) => (
                    <React.Fragment key={o}>
                        {i === 1 && <DropdownMenuSeparator />}
                        <DropdownMenuItem>{o}</DropdownMenuItem>
                    </React.Fragment>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

function PaginationBtn({ children, active, disabled, onClick }) {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className="flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-sm font-medium border border-[#e5e7eb] bg-white text-[#374151] hover:bg-[#f3f4f6] disabled:pointer-events-none disabled:opacity-40 transition-colors"
            style={active ? { background: "#5BB98B", color: "#fff", borderColor: "#5BB98B" } : {}}
        >
            {children}
        </button>
    );
}

const ITEMS_PER_PAGE = 10;

export default function FacultyManagementBody({ initialFaculty }) {
    const [search, setSearch] = React.useState("");
    const [currentPage, setCurrentPage] = React.useState(1);

    const filtered = initialFaculty.filter(
        (f) =>
            f.name.toLowerCase().includes(search.toLowerCase()) ||
            f.email.toLowerCase().includes(search.toLowerCase())
    );

    const pageCount = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
    const safePage = Math.min(currentPage, pageCount);
    const paginated = filtered.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);
    const STATS = computeStats(filtered);

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    };

    if (initialFaculty.length === 0) {
        return (
            <div className="flex flex-col gap-5">
                <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[#9ca3af]">
                        <span style={{ color: "#5BB98B" }}>Faculty Roster</span>
                    </p>
                    <h1 className="mt-0.5 text-4xl font-bold text-[#202020] leading-tight">Faculty Management</h1>
                    <p className="mt-0.5 text-sm text-[#6b7280]">
                        Manage, filter, and monitor all academic personnel within your college.
                    </p>
                </div>
                <div className="bg-white rounded-xl border border-[#e5e7eb] p-10 text-center">
                    <p className="text-gray-400 text-sm">No faculty members found in this department.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-5">
            <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#9ca3af]">
                    <span style={{ color: "#5BB98B" }}>Faculty Roster</span>
                </p>
                <h1 className="mt-0.5 text-4xl font-bold text-[#202020] leading-tight">Faculty Management</h1>
                <p className="mt-0.5 text-sm text-[#6b7280]">
                    Manage, filter, and monitor all academic personnel within your college.
                </p>
            </div>

            <div className="flex flex-wrap gap-3">
                {STATS.map((s) => <StatCard key={s.label} {...s} />)}
            </div>

            <div className="flex flex-wrap items-center gap-2">
                <input
                    type="text"
                    placeholder="Filter by name..."
                    value={search}
                    onChange={handleSearch}
                    className="h-9 w-44 rounded-lg border border-[#e5e7eb] bg-white px-3 text-sm text-[#202020] placeholder:text-[#9ca3af] outline-none focus:border-[#5BB98B] focus:ring-2 focus:ring-[#5BB98B]/20 transition"
                />
                <FilterDropdown icon={SlidersHorizontal} label="Employment Type" options={["All", "Full-Time", "Part-Time"]} />
                <div className="ml-auto flex items-center gap-2">
                    <button className="inline-flex items-center gap-1.5 rounded-lg border border-[#e5e7eb] bg-white px-3 h-9 text-sm text-[#374151] hover:bg-[#f9fafb] transition-colors font-medium">
                        <Download className="size-3.5 text-[#6b7280]" />
                        Export
                    </button>
                    <button
                        className="inline-flex items-center gap-1.5 rounded-lg px-3.5 h-9 text-sm font-semibold text-white transition-colors"
                        style={{ background: "#5BB98B" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#4daa7d")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "#5BB98B")}
                    >
                        <UserPlus className="size-3.5" />
                        Endorse Hire
                    </button>
                </div>
            </div>

            <div className="rounded-xl border border-[#e5e7eb] bg-white overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-[#f9fafb] hover:bg-[#f9fafb] border-b border-[#e5e7eb] h-12">
                            <TableHead className="pl-6 w-[260px] py-3 text-xs font-semibold text-[#6b7280] uppercase tracking-wider">Faculty Member</TableHead>
                            <TableHead className="pl-8 py-3 text-xs font-semibold text-[#6b7280] uppercase tracking-wider">Employee ID</TableHead>
                            <TableHead className="py-3 text-xs font-semibold text-[#6b7280] uppercase tracking-wider">Employment Type</TableHead>
                            <TableHead className="py-3 text-xs font-semibold text-[#6b7280] uppercase tracking-wider">Current Status</TableHead>
                            <TableHead className="text-right pr-6 py-3 text-xs font-semibold text-[#6b7280] uppercase tracking-wider">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginated.map((faculty) => (
                            <TableRow key={faculty.id} className="border-b border-[#f3f4f6] hover:bg-[#fafffe] transition-colors">
                                <TableCell className="pl-6 py-3">
                                    <div className="flex items-center gap-3">
                                        <Avatar initials={faculty.initials} />
                                        <div>
                                            <p className="font-semibold text-[#202020] text-sm leading-tight">{faculty.name}</p>
                                            <p className="text-xs text-[#9ca3af] mt-0.5">{faculty.email}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="pl-8 py-3">
                                    <span className="rounded-md border border-[#e5e7eb] bg-[#f9fafb] px-2 py-0.5 text-xs font-mono text-[#374151]">
                                        {faculty.id}
                                    </span>
                                </TableCell>
                                <TableCell className="py-3"><EmploymentBadge type={faculty.type} /></TableCell>
                                <TableCell className="py-3 text-sm text-[#374151]">{faculty.status}</TableCell>
                                <TableCell className="pr-6 py-3 text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <button className="inline-flex items-center justify-center size-8 rounded-md text-[#9ca3af] hover:bg-[#f3f4f6] hover:text-[#374151] transition-colors">
                                                <MoreVertical className="size-4" />
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem variant="destructive">Remove</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <div className="flex items-center justify-between border-t border-[#f3f4f6] px-6 py-3">
                    <p className="text-xs text-[#9ca3af]">
                        Showing{" "}
                        <span className="font-semibold text-[#374151]">
                            {paginated.length === 0 ? 0 : `${(safePage - 1) * ITEMS_PER_PAGE + 1}–${(safePage - 1) * ITEMS_PER_PAGE + paginated.length}`}
                        </span>{" "}
                        of{" "}
                        <span className="font-semibold text-[#374151]">{filtered.length}</span>{" "}
                        faculty members
                    </p>
                    <div className="flex items-center gap-1">
                        <PaginationBtn disabled={safePage === 1} onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}>
                            <ChevronLeft className="size-3.5 mr-0.5" />
                            <span className="text-xs">Previous</span>
                        </PaginationBtn>
                        {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
                            <PaginationBtn key={p} active={safePage === p} onClick={() => setCurrentPage(p)}>
                                {p}
                            </PaginationBtn>
                        ))}
                        <PaginationBtn disabled={safePage === pageCount} onClick={() => setCurrentPage((p) => Math.min(pageCount, p + 1))}>
                            <span className="text-xs">Next</span>
                            <ChevronRight className="size-3.5 ml-0.5" />
                        </PaginationBtn>
                    </div>
                </div>
            </div>
        </div>
    );
}
