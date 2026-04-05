import { getMyLeaveRequests } from "actions/getMyLeaveRequests";
import NewRequestModalWrapper from "./NewRequestModalWrapper";
import {
    FileText,
    Clock,
    CalendarCheck,
    Search,
    SlidersHorizontal,
    Plus,
    ChevronLeft,
    ChevronRight,
    MoreHorizontal,
    Info,
    Zap,
} from "lucide-react";

const STATUS_STYLES = {
    approved: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    rejected: "bg-red-50 text-red-700 border border-red-200",
    pending: "bg-amber-50 text-amber-700 border border-amber-200",
};

const TYPE_LABELS = {
    vacation: "Vacation Leave",
    sick: "Sick Leave",
    emergency: "Emergency Leave",
    overtime: "Overtime",
    missed_log: "Missed Log",
};

function formatDateRange(start, end) {
    const s = new Date(start);
    const e = new Date(end);
    const fmt = (d) =>
        d.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    if (s.getTime() === e.getTime()) return fmt(s);
    return `${fmt(s)} – ${fmt(e)}`;
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function calcAvailable(balance) {
    return balance ? Math.max(0, Number(balance.total_days) - Number(balance.used_days)) : 0;
}

export default async function MyRequestsPage() {
    const { requests, balances } = await getMyLeaveRequests();

    const totalFiled = requests.length;
    const pendingCount = requests.filter((r) => r.status === "pending").length;

    const vacBal = balances.find((b) => b.leave_type === "vacation");
    const sickBal = balances.find((b) => b.leave_type === "sick");
    const emerBal = balances.find((b) => b.leave_type === "emergency");

    const availableVacation = calcAvailable(vacBal);
    const availableSick = calcAvailable(sickBal);
    const availableEmergency = calcAvailable(emerBal);

    // Pagination
    const PER_PAGE = 6;
    const totalPages = Math.max(1, Math.ceil(totalFiled / PER_PAGE));
    const pagedRequests = requests.slice(0, PER_PAGE);
    const page = 1;

    const STAT_CARDS = [
        {
            label: "Total Filed",
            value: totalFiled,
            sub: "Total requests processed this year",
            Icon: FileText,
            iconColor: "text-gray-400",
        },
        {
            label: "Pending Approval",
            value: pendingCount,
            sub: "Awaiting manager review",
            Icon: Clock,
            iconColor: "text-gray-400",
        },
        {
            label: "Available Vacation Leave",
            value: `${availableVacation} Days`,
            sub: "Vacation balance as of today",
            Icon: CalendarCheck,
            iconColor: "text-blue-500",
        },
        {
            label: "Available Emergency Leave",
            value: `${availableEmergency} Days`,
            sub: "Emergency balance as of today",
            Icon: Zap,
            iconColor: "text-orange-500",
        },
        {
            label: "Available Sick Leave",
            value: `${availableSick} Days`,
            sub: "Sick balance as of today",
            Icon: CalendarCheck,
            iconColor: "text-emerald-500",
        },
    ];

    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs text-gray-400 uppercase tracking-wide">
                <span>Dashboard</span>
                <span>›</span>
                <span className="text-gray-700 font-semibold">My Requests</span>
            </nav>

            {/* Page Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">My Requests</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Manage and track your filed HR requests and leave applications.
                    </p>
                </div>
                <NewRequestModalWrapper balances={balances} />
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {STAT_CARDS.map(({ label, value, sub, Icon, iconColor }) => (
                    <div
                        key={label}
                        className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-start justify-between"
                    >
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                                {label}
                            </p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
                            <p className="text-xs text-gray-400 mt-1">{sub}</p>
                        </div>
                        <div className="p-2.5 bg-gray-50 rounded-lg">
                            <Icon className={`w-5 h-5 ${iconColor}`} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Request History Table */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Table Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-sm font-semibold text-gray-900">Request History</h2>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search requests..."
                                className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-emerald-400 focus:outline-none transition-colors w-52"
                            />
                        </div>
                        <button className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                            <SlidersHorizontal className="w-4 h-4" />
                            Filter
                        </button>
                    </div>
                </div>

                {/* Table */}
                {pagedRequests.length === 0 ? (
                    <div className="px-6 py-16 text-center text-sm text-gray-400">
                        No leave requests found.
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-100 text-left">
                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                            Date Filed
                                        </th>
                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                            Request Type
                                        </th>
                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                            Target Dates
                                        </th>
                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                            Reason
                                        </th>
                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide text-center">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 w-10"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pagedRequests.map((req) => (
                                        <tr
                                            key={req.id}
                                            className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors"
                                        >
                                            <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                                                {new Date(req.submitted_at).toLocaleDateString(
                                                    "en-US",
                                                    {
                                                        month: "short",
                                                        day: "numeric",
                                                        year: "numeric",
                                                    }
                                                )}
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-gray-900">
                                                {TYPE_LABELS[req.leave_type] ||
                                                    capitalize(req.leave_type)}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                                                <span className="inline-flex items-center gap-1 text-emerald-600">
                                                    <CalendarCheck className="w-3.5 h-3.5" />
                                                    {formatDateRange(
                                                        req.start_date,
                                                        req.end_date
                                                    )}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-500 max-w-[240px] truncate">
                                                {req.reason}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span
                                                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                                                        STATUS_STYLES[req.status] ||
                                                        "bg-gray-100 text-gray-600"
                                                    }`}
                                                >
                                                    {req.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button className="p-1 rounded hover:bg-gray-100 transition-colors">
                                                    <MoreHorizontal className="w-4 h-4 text-gray-400" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
                            <p className="text-xs text-gray-500">
                                Showing{" "}
                                <span className="font-semibold text-gray-700">
                                    {pagedRequests.length}
                                </span>{" "}
                                of{" "}
                                <span className="font-semibold text-gray-700">
                                    {totalFiled}
                                </span>{" "}
                                requests
                            </p>
                            <div className="flex items-center gap-1">
                                <button
                                    disabled={page <= 1}
                                    className="p-1.5 rounded-lg border border-gray-200 text-gray-400 disabled:opacity-40 hover:bg-gray-50 transition-colors"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                                    (p) => (
                                        <button
                                            key={p}
                                            className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                                                p === page
                                                    ? "bg-emerald-600 text-white"
                                                    : "text-gray-600 hover:bg-gray-50"
                                            }`}
                                        >
                                            {p}
                                        </button>
                                    )
                                )}
                                <button
                                    disabled={page >= totalPages}
                                    className="p-1.5 rounded-lg border border-gray-200 text-gray-400 disabled:opacity-40 hover:bg-gray-50 transition-colors"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Bottom Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Approval Workflow */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-start gap-4">
                    <div className="p-2.5 bg-gray-50 rounded-lg mt-0.5">
                        <Info className="w-5 h-5 text-gray-500" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900">
                            Approval Workflow
                        </h3>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                            Once filed, requests are routed to your direct supervisor for
                            review. Standard processing time is 2–3 business days.
                        </p>
                    </div>
                </div>

                {/* Leave Policy Reminder */}
                <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-5 flex items-start gap-4">
                    <div className="p-2.5 bg-emerald-100 rounded-lg mt-0.5">
                        <CalendarCheck className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-emerald-800">
                            Leave Policy Reminder
                        </h3>
                        <p className="text-xs text-emerald-600 mt-1 leading-relaxed">
                            Planned leaves longer than 3 days should be filed at least 1
                            week in advance to ensure smooth team operations.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
