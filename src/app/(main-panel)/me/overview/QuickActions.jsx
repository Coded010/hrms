"use client";

import { useState } from "react";
import { PlusCircle, Clock, FileEdit } from "lucide-react";
import NewRequestModal from "../my-request/NewRequestModal";

export default function QuickActions({ balances = [] }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalDefaultType, setModalDefaultType] = useState("vacation");

    const openModal = (defaultType) => {
        setModalDefaultType(defaultType);
        setModalOpen(true);
    };

    return (
        <>
            <div className="space-y-3">
                {/* File a Leave */}
                <button
                    onClick={() => openModal("vacation")}
                    className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 rounded-xl px-5 py-4 flex items-center gap-4 text-white transition-all duration-200 shadow-sm hover:shadow-md group"
                >
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0 group-hover:bg-white/30 transition-colors">
                        <PlusCircle className="w-5 h-5" />
                    </div>
                    <div className="flex-1 text-left min-w-0">
                        <p className="text-sm font-semibold">File a Leave</p>
                        <p className="text-xs text-emerald-100 mt-0.5">Request vacation or sick time off</p>
                    </div>
                    <svg className="w-4 h-4 text-emerald-200 shrink-0 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                {/* File Overtime */}
                <button
                    onClick={() => openModal("overtime")}
                    className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 rounded-xl px-5 py-4 flex items-center gap-4 text-white transition-all duration-200 shadow-sm hover:shadow-md group"
                >
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0 group-hover:bg-white/30 transition-colors">
                        <Clock className="w-5 h-5" />
                    </div>
                    <div className="flex-1 text-left min-w-0">
                        <p className="text-sm font-semibold">File Overtime</p>
                        <p className="text-xs text-emerald-100 mt-0.5">Submit extra hours for approval</p>
                    </div>
                    <svg className="w-4 h-4 text-emerald-200 shrink-0 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                {/* Fix Missed Log (disabled) */}
                <div className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-xl px-5 py-4 flex items-center gap-4 text-white shadow-sm opacity-70 cursor-not-allowed">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                        <FileEdit className="w-5 h-5" />
                    </div>
                    <div className="flex-1 text-left min-w-0">
                        <p className="text-sm font-semibold">Fix Missed Log</p>
                        <p className="text-xs text-emerald-100 mt-0.5">Correct clock-in/out discrepancies</p>
                    </div>
                    <svg className="w-4 h-4 text-emerald-200 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>

            <NewRequestModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                balances={balances}
                defaultType={modalDefaultType}
            />
        </>
    );
}
