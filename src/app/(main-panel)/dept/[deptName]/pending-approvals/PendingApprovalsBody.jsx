"use client";

import { useState } from "react";
import {
    MixerHorizontalIcon,
    CheckCircledIcon,
    CrossCircledIcon,
    InfoCircledIcon,
    ArrowRightIcon,
} from "@radix-ui/react-icons";
import { approveLeave, declineLeave, approveCoverage, declineCoverage } from "actions/pendingApprovals";

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

function ApprovalCard({ item, onApprove, onDecline }) {
    const [processing, setProcessing] = useState(false);
    const [action, setAction] = useState(null);

    const handleApprove = async () => {
        setProcessing(true);
        setAction("approve");
        const success = item.tab === "leave"
            ? await approveLeave(item.id)
            : await approveCoverage(item.id);
        if (success) onApprove(item.id);
        setProcessing(false);
    };

    const handleDecline = async () => {
        setProcessing(true);
        setAction("decline");
        const success = item.tab === "leave"
            ? await declineLeave(item.id)
            : await declineCoverage(item.id);
        if (success) onDecline(item.id);
        setProcessing(false);
    };

    return (
        <div className="bg-white rounded-xl border border-[#e8ede9] shadow-sm p-5 flex items-start justify-between gap-4">
            <div className="flex items-start gap-4 min-w-0">
                <Avatar name={item.name} />
                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-gray-900 text-[15px]">{item.name}</h3>
                        <span className="text-xs bg-[#f4faf7] text-[#5bb98b] font-medium px-2 py-0.5 rounded-full">
                            {item.title}
                        </span>
                        {item.urgent && (
                            <span className="text-xs bg-red-100 text-red-600 font-medium px-2 py-0.5 rounded-full">
                                Urgent
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                        <span className="inline-flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            {item.type}
                        </span>
                        <span className="mx-1.5 text-gray-300">·</span>
                        <span className="inline-flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Submitted {item.submitted}
                        </span>
                    </p>
                    <div className="mt-3 pl-4 border-l-2 border-[#5bb98b]/30 bg-[#f9fdfb] rounded-r-lg py-2.5 px-3">
                        <p className="text-sm text-gray-600 italic leading-relaxed">&ldquo;{item.note}&rdquo;</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-2 shrink-0">
                <button
                    onClick={handleApprove}
                    disabled={processing}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#5bb98b] text-white rounded-lg text-sm font-medium hover:bg-[#4aa87a] transition-colors disabled:opacity-50"
                >
                    <CheckCircledIcon className="w-4 h-4" />
                    {processing && action === "approve" ? "Processing..." : "Approve"}
                </button>
                <button
                    onClick={handleDecline}
                    disabled={processing}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                    <CrossCircledIcon className="w-4 h-4" />
                    {processing && action === "decline" ? "Processing..." : "Decline"}
                </button>
            </div>
        </div>
    );
}

export default function PendingApprovalsBody({ initialLeaveRequests, initialScheduleAdjustments }) {
    const [activeTab, setActiveTab] = useState("leave");
    const [leaveRequests, setLeaveRequests] = useState(initialLeaveRequests);
    const [scheduleAdjustments, setScheduleAdjustments] = useState(initialScheduleAdjustments);

    const items = activeTab === "leave" ? leaveRequests : scheduleAdjustments;

    const handleApprove = (id) => {
        if (activeTab === "leave") {
            setLeaveRequests((prev) => prev.filter((r) => r.id !== id));
        } else {
            setScheduleAdjustments((prev) => prev.filter((r) => r.id !== id));
        }
    };

    const handleDecline = (id) => {
        if (activeTab === "leave") {
            setLeaveRequests((prev) => prev.filter((r) => r.id !== id));
        } else {
            setScheduleAdjustments((prev) => prev.filter((r) => r.id !== id));
        }
    };

    // Tag items with their tab for the card component
    const taggedItems = items.map((item) => ({ ...item, tab: activeTab }));

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Pending Approvals</h1>
                    <p className="text-sm text-gray-500 mt-1 max-w-xl">
                        Manage faculty leave requests and schedule modifications for the College.
                    </p>
                </div>
                <div className="inline-flex bg-[#f4faf7] rounded-lg p-1 gap-0.5">
                    <button
                        onClick={() => setActiveTab("leave")}
                        className={[
                            "inline-flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all",
                            activeTab === "leave" ? "bg-white text-[#5bb98b] shadow-sm" : "text-gray-500 hover:text-gray-700",
                        ].join(" ")}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Leave Requests
                        <span className={[
                            "text-xs px-1.5 py-0.5 rounded-full",
                            activeTab === "leave" ? "bg-[#e9f7f1] text-[#5bb98b]" : "bg-[#e8ede9] text-gray-500",
                        ].join(" ")}>
                            {leaveRequests.length}
                        </span>
                    </button>
                    <button
                        onClick={() => setActiveTab("schedule")}
                        className={[
                            "inline-flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all",
                            activeTab === "schedule" ? "bg-white text-[#5bb98b] shadow-sm" : "text-gray-500 hover:text-gray-700",
                        ].join(" ")}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Schedule Adjustments
                        <span className={[
                            "text-xs px-1.5 py-0.5 rounded-full",
                            activeTab === "schedule" ? "bg-[#e9f7f1] text-[#5bb98b]" : "bg-[#e8ede9] text-gray-500",
                        ].join(" ")}>
                            {scheduleAdjustments.length}
                        </span>
                    </button>
                </div>
            </div>

            <div className="flex items-center justify-between py-2.5 px-4 bg-[#f8fbf9] rounded-lg border border-[#e8ede9]">
                <div className="flex items-center gap-2">
                    <MixerHorizontalIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">Filter by:</span>
                </div>
                <span className="text-sm text-gray-400">
                    Showing {taggedItems.length} pending item{taggedItems.length !== 1 ? "s" : ""}
                </span>
            </div>

            <div className="space-y-3">
                {taggedItems.length === 0 ? (
                    <div className="bg-white rounded-xl border border-[#e8ede9] p-10 text-center">
                        <p className="text-gray-400 text-sm">No pending {activeTab === "leave" ? "leave requests" : "schedule adjustments"}.</p>
                    </div>
                ) : (
                    taggedItems.map((item) => (
                        <ApprovalCard key={item.id} item={item} onApprove={handleApprove} onDecline={handleDecline} />
                    ))
                )}
            </div>

            {taggedItems.length === 0 && (
                <div className="text-center py-2">
                    <button className="inline-flex items-center gap-1 text-[#5bb98b] hover:text-[#4aa87a] text-sm font-medium transition-colors">
                        View Approval History <ArrowRightIcon className="w-4 h-4" />
                    </button>
                </div>
            )}

            <div className="bg-[#f0f9f4] rounded-xl p-5 border border-[#d1fae5] flex items-start gap-3">
                <InfoCircledIcon className="w-5 h-5 text-[#5bb98b] shrink-0 mt-0.5" />
                <div>
                    <h3 className="text-sm font-semibold text-[#5bb98b]">HR Compliance Notice</h3>
                    <p className="text-sm text-[#5bb98b]/80 mt-1 leading-relaxed">
                        Approved leave requests are automatically synchronized with the Faculty Roster and real-time Class Coverage board.
                        Substitutes must be manually assigned for critical gaps in the Dashboard.
                    </p>
                </div>
            </div>
        </div>
    );
}
