"use client";

import { useState } from "react";
import { triggerAttendance } from "@/app/actions/triggerAttendance";

function formatTime(timeStr) {
    if (!timeStr) return "—";
    const [h, m] = timeStr.split(":");
    const hour = parseInt(h, 10);
    const minute = m;
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minute} ${period}`;
}

export default function AttendanceTriggerPage() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleTrigger = async () => {
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const res = await triggerAttendance();
            if (res.success) {
                setResult(res.data);
            } else {
                setError(res.error);
            }
        } catch (err) {
            setError(err.message || "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 w-full max-w-md space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-bold text-gray-900">Attendance Trigger Test</h1>
                    <p className="text-gray-500 text-sm">
                        Simulates a biometric time-in/time-out event via the Supabase Edge Function.
                    </p>
                </div>

                <button
                    onClick={handleTrigger}
                    disabled={loading}
                    className="btn btn-primary btn-lg w-full"
                >
                    {loading ? (
                        <>
                            <span className="loading loading-spinner"></span>
                            Processing...
                        </>
                    ) : (
                        "Time In / Time Out"
                    )}
                </button>

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
                        <p className="font-semibold mb-1">Error</p>
                        <p>{error}</p>
                    </div>
                )}

                {result && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 space-y-2 text-sm">
                        <p className="font-semibold text-emerald-800">Result</p>
                        <div className="space-y-1 text-emerald-700">
                            <p><span className="font-medium">Status:</span> {result.status}</p>
                            {result.expected_time && (
                                <p><span className="font-medium">Expected Time:</span> {formatTime(result.expected_time)}</p>
                            )}
                            {result.log && (
                                <>
                                    <p><span className="font-medium">Time In:</span> {formatTime(result.log.time_in)}</p>
                                    {result.log.time_out && (
                                        <p><span className="font-medium">Time Out:</span> {formatTime(result.log.time_out)}</p>
                                    )}
                                    <p><span className="font-medium">Date:</span> {result.log.log_date}</p>
                                </>
                            )}
                            {result.message && (
                                <p><span className="font-medium">Message:</span> {result.message}</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
