"use client";

import {
    MixerHorizontalIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    CalendarIcon,
    ClockIcon,
    ExclamationTriangleIcon,
    FileTextIcon,
    DownloadIcon,
    CheckCircledIcon,
    PaperPlaneIcon,
} from "@radix-ui/react-icons";
import { useState, useEffect, useRef } from "react";

function Avatar({ name }) {
    const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2);
    return (
        <div
            className="flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-bold"
            style={{ background: "#e6f4ed", color: "#218358" }}
        >
            {initials}
        </div>
    );
}

const iconMap = {
    calendar: CalendarIcon,
    clock: ClockIcon,
    alert: ExclamationTriangleIcon,
};

const colors = {
    calendar: { color: "text-[#5bb98b]", bg: "bg-[#e9f7f1]" },
    clock: { color: "text-[#5bb98b]", bg: "bg-[#e9f7f1]" },
    alert: { color: "text-red-500", bg: "bg-red-50" },
};

export default function ReportsBody({ stats, facultyData, totalFaculty }) {
    const [showBanner, setShowBanner] = useState(true);
    const bottomRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setShowBanner(true);
            },
            { threshold: 0.1 }
        );
        if (bottomRef.current) observer.observe(bottomRef.current);
        return () => observer.disconnect();
    }, []);

    const now = new Date();
    const periodStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const periodEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const periodLabel = `${periodStart.toLocaleDateString("en-US", { month: "long", day: "numeric" })} – ${periodEnd.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`;

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Attendance &amp; Cutoff Reports</h1>
                    <p className="text-sm text-gray-500 mt-1">Review and finalize faculty hours for HR processing.</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="inline-flex items-center border border-[#e8ede9] bg-white rounded-lg shadow-sm">
                        <button className="px-2.5 py-2 text-gray-400 hover:text-gray-600 transition-colors">
                            <ChevronLeftIcon className="w-4 h-4" />
                        </button>
                        <div className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 border-x border-[#e8ede9]">
                            <CalendarIcon className="w-4 h-4 text-[#5bb98b]" />
                            {periodLabel}
                        </div>
                        <button className="px-2.5 py-2 text-gray-400 hover:text-gray-600 transition-colors">
                            <ChevronRightIcon className="w-4 h-4" />
                        </button>
                    </div>
                    <button className="inline-flex items-center justify-center w-9 h-9 bg-white border border-[#e8ede9] rounded-lg shadow-sm text-gray-500 hover:text-gray-700 transition-colors">
                        <MixerHorizontalIcon className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stats.map((item, index) => {
                    const Icon = iconMap[item.icon];
                    const c = colors[item.icon];
                    return (
                        <div key={index} className="bg-white rounded-xl border border-[#e8ede9] shadow-sm p-5 flex justify-between items-start">
                            <div>
                                <p className="text-sm text-gray-500 font-medium">{item.label}</p>
                                <h3 className="text-3xl font-bold mt-1 text-gray-900">{item.value}</h3>
                                <p className="text-xs text-gray-400 mt-1.5">{item.sub}</p>
                            </div>
                            <div className={`${c.bg} p-2 rounded-lg ${c.color}`}>
                                <Icon className="w-5 h-5" />
                            </div>
                        </div>
                    );
                })}
            </div>

            <section className="bg-white rounded-xl border border-[#e8ede9] shadow-sm overflow-hidden">
                <div className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#e8ede9] gap-4">
                    <div>
                        <h2 className="font-bold text-lg text-gray-900">Attendance Preview</h2>
                        <p className="text-sm text-gray-400 mt-0.5">
                            Review individual faculty rendered hours before final submission.
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#f8fbf9] border border-[#e8ede9] rounded-lg text-sm font-medium text-gray-600 hover:bg-[#f0f9f4] hover:text-[#5bb98b] hover:border-[#d1fae5] transition-all">
                            <FileTextIcon className="w-4 h-4" /> Export PDF
                        </button>
                        <button className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#f8fbf9] border border-[#e8ede9] rounded-lg text-sm font-medium text-gray-600 hover:bg-[#f0f9f4] hover:text-[#5bb98b] hover:border-[#d1fae5] transition-all">
                            <DownloadIcon className="w-4 h-4" /> Export Excel
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    {facultyData.length === 0 ? (
                        <div className="p-10 text-center text-gray-400 text-sm">No faculty data available.</div>
                    ) : (
                        <table className="w-full">
                            <thead className="bg-[#f8fbf9] border-b border-[#e8ede9]">
                                <tr className="text-gray-400 text-xs uppercase tracking-wider">
                                    <th className="text-left font-medium px-5 py-3">Faculty Member</th>
                                    <th className="text-left font-medium px-5 py-3">Scheduled</th>
                                    <th className="text-left font-medium px-5 py-3">Rendered</th>
                                    <th className="text-left font-medium px-5 py-3">Absences</th>
                                    <th className="text-left font-medium px-5 py-3">Lates</th>
                                    <th className="text-left font-medium px-5 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {facultyData.map((faculty) => (
                                    <tr
                                        key={faculty.id}
                                        className="border-b border-[#f0f0f0] hover:bg-[#f9fdfb] transition-colors last:border-b-0"
                                    >
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-3">
                                                <Avatar name={faculty.name} />
                                                <div>
                                                    <div className="font-semibold text-sm text-gray-900">{faculty.name}</div>
                                                    <div className="text-[11px] font-mono text-gray-400">{faculty.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5 text-sm text-gray-600">{faculty.scheduled}</td>
                                        <td className="px-5 py-3.5 text-sm text-gray-600">{faculty.rendered}</td>
                                        <td className="px-5 py-3.5 text-sm text-gray-600">{faculty.absences}</td>
                                        <td className="px-5 py-3.5 text-sm text-gray-600">{faculty.lates}</td>
                                        <td className="px-5 py-3.5">
                                            {faculty.status === "COMPLIANT" ? (
                                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-[#e9f7f1] text-[#5bb98b]">
                                                    <CheckCircledIcon className="w-3.5 h-3.5" /> COMPLIANT
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-500">
                                                    <ExclamationTriangleIcon className="w-3.5 h-3.5" /> REVIEW REQUIRED
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </section>

            <div ref={bottomRef} className="h-4" />

            <div
                className={`fixed bottom-16 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-5xl z-50 transition-all duration-500 ease-in-out ${
                    showBanner ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
                }`}
            >
                <div className="bg-[#f0f9f4] border border-[#d1fae5] rounded-2xl p-4 md:p-5 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="bg-[#d1fae5] p-2.5 rounded-full text-[#5bb98b]">
                            <FileTextIcon className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800 text-[15px]">Ready for HR Submission?</h3>
                            <p className="text-sm text-gray-500 mt-0.5">
                                Finalizing this period will lock attendance records and notify HR payroll.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                        <button
                            onClick={() => setShowBanner(false)}
                            className="px-4 py-2 bg-white border border-[#e8ede9] rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                        >
                            Review All Details
                        </button>
                        <button className="inline-flex items-center gap-2 px-5 py-2 bg-[#5bb98b] text-white rounded-lg text-sm font-semibold hover:bg-[#4aa87a] transition-colors shadow-sm">
                            <PaperPlaneIcon className="w-4 h-4" /> Submit Cutoff Report to HR
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
