import { getOverviewData } from "actions/getOverviewData";
import LeaveBalanceCard from "./LeaveBalanceCard";
import QuickActions from "./QuickActions";
import { CalendarDays } from "lucide-react";

function formatDate(date) {
    return new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

function formatTime(timeStr) {
    if (!timeStr) return "—";
    const [h, m] = timeStr.split(":");
    const hour = parseInt(h, 10);
    const minute = m;
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minute} ${period}`;
}

const STATUS_STYLES = {
    present: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    late: "bg-red-50 text-red-700 border border-red-200",
    absent: "bg-gray-100 text-gray-600 border border-gray-200",
};

const STATUS_LABELS = {
    present: "On Time",
    late: "Late",
    absent: "Absent",
};

export default async function MeOverviewPage() {
    const data = await getOverviewData();

    if (!data) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <span className="text-gray-500">Unable to load overview.</span>
            </div>
        );
    }

    const { firstName, lastName, leaveBalances, attendanceLogs } = data;
    const greeting = new Date().getHours() < 12 ? "Good Morning" : new Date().getHours() < 18 ? "Good Afternoon" : "Good Evening";

    return (
        <div className="max-w-7xl mx-auto">
            <div className="space-y-6">
            {/* Greeting Banner */}
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border border-emerald-100">
                <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-emerald-800">
                        {greeting}, {firstName}! 👋
                    </h2>
                    <p className="text-emerald-600 text-sm mt-1 flex items-center gap-1.5">
                        <CalendarDays className="w-4 h-4" />
                        Your next payday is in <span className="font-semibold">4 days</span>.
                    </p>
                </div>
                <div className="text-right text-xs text-emerald-700/70 space-y-0.5">
                    <p className="font-medium">Active Period: Oct 16 – Oct 31</p>
                    <p>Last synced: Just now</p>
                </div>
            </div>

            {/* Leave Balances */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
                        <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        Leave Balances
                    </h3>
                    <button className="text-emerald-600 hover:text-emerald-800 text-sm font-medium">
                        View Detail
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <LeaveBalanceCard
                        label="Vacation Leave"
                        used={leaveBalances.vacation.used}
                        total={leaveBalances.vacation.total}
                        available={leaveBalances.vacation.available}
                        color="green"
                    />
                    <LeaveBalanceCard
                        label="Emergency Leave"
                        used={leaveBalances.emergency.used}
                        total={leaveBalances.emergency.total}
                        available={leaveBalances.emergency.available}
                        color="orange"
                    />
                    <LeaveBalanceCard
                        label="Sick Leave"
                        used={leaveBalances.sick.used}
                        total={leaveBalances.sick.total}
                        available={leaveBalances.sick.available}
                        color="blue"
                    />
                </div>
            </div>

            {/* Quick Actions + Recent Logs Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Quick Actions */}
                <div>
                    <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                        Quick Actions
                    </h3>
                    <QuickActions balances={[]} />
                </div>

                {/* Recent Biometric Logs */}
                <div>
                    <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Recent Biometric Logs
                    </h3>
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        {attendanceLogs.length === 0 ? (
                            <div className="px-6 py-12 text-center text-sm text-gray-400">
                                No attendance logs found.
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-gray-100">
                                            <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                                Date
                                            </th>
                                            <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                                Time In
                                            </th>
                                            <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                                Time Out
                                            </th>
                                            <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {attendanceLogs.map((log) => (
                                            <tr key={log.id} className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors">
                                                <td className="px-5 py-3.5 text-gray-600 whitespace-nowrap">
                                                    {formatDate(log.date)}
                                                </td>
                                                <td className="px-5 py-3.5 text-gray-700 font-medium whitespace-nowrap">
                                                    {formatTime(log.timeIn)}
                                                </td>
                                                <td className="px-5 py-3.5 text-gray-700 font-medium whitespace-nowrap">
                                                    {formatTime(log.timeOut)}
                                                </td>
                                                <td className="px-5 py-3.5">
                                                    <span
                                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                                            STATUS_STYLES[log.status] || "bg-gray-100 text-gray-600"
                                                        }`}
                                                    >
                                                        {STATUS_LABELS[log.status] || capitalize(log.status)}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                    <div className="mt-3 text-center">
                        <button className="text-emerald-600 hover:text-emerald-800 text-sm font-medium">
                            View Full Attendance History
                        </button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
