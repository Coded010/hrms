"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { submitLeaveRequest } from "actions/submitLeaveRequest";
import { X, CheckCircle2, AlertCircle } from "lucide-react";
import { useWatch } from "react-hook-form";

const LEAVE_TYPES = [
    { value: "vacation", label: "Vacation Leave", balanceType: "vacation" },
    { value: "sick", label: "Sick Leave", balanceType: "sick" },
    { value: "emergency", label: "Emergency Leave", balanceType: "emergency" },
    { value: "overtime", label: "Overtime", balanceType: "emergency" },
    { value: "missed_log", label: "Missed Log", balanceType: "emergency" },
];

const schema = z.object({
    leave_type: z.string({ required_error: "Please select a request type." }).min(1, "Please select a request type."),
    start_date: z.string({ required_error: "Start date is required." }).min(1, "Start date is required."),
    end_date: z.string({ required_error: "End date is required." }).min(1, "End date is required."),
    reason: z.string({ required_error: "Reason is required." }).min(10, "Reason must be at least 10 characters.").max(500, "Reason must be under 500 characters."),
});

const BALANCE_LABELS = {
    vacation: "Vacation Leave",
    sick: "Sick Leave",
    emergency: "Emergency Leave",
};

export default function NewRequestModal({ open, onClose, balances }) {
    const [feedback, setFeedback] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        mode: "onBlur",
        defaultValues: {
            leave_type: "",
            start_date: "",
            end_date: "",
            reason: "",
        },
    });

    const watchLeaveType = useWatch({ control, name: "leave_type" });

    const onSubmit = async (data) => {
        setFeedback(null);
        setSubmitting(true);
        const result = await submitLeaveRequest(data);
        setSubmitting(false);

        if (result.success) {
            setFeedback({ type: "success", message: result.message });
            reset();
            setTimeout(() => {
                setFeedback(null);
                onClose();
            }, 1500);
        } else {
            setFeedback({ type: "error", message: result.message });
        }
    };

    if (!open) return null;

    const today = new Date().toISOString().split("T")[0];

    // Find selected type info
    const selected = LEAVE_TYPES.find((t) => t.value === watchLeaveType);
    const balanceType = selected?.balanceType;
    const bal = balances?.find((b) => b.leave_type === balanceType);
    const available = bal ? Math.max(0, Number(bal.total_days) - Number(bal.used_days)) : "—";

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />
            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden z-10">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900">Create New Request</h2>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                        aria-label="Close"
                    >
                        <X className="w-5 h-5 text-gray-400" />
                    </button>
                </div>

                {feedback && (
                    <div
                        className={`mx-6 mt-4 flex items-center gap-2.5 px-4 py-3 rounded-lg text-sm font-medium ${
                            feedback.type === "success"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "bg-red-50 text-red-700 border border-red-200"
                        }`}
                    >
                        {feedback.type === "success" ? (
                            <CheckCircle2 className="w-5 h-5 shrink-0" />
                        ) : (
                            <AlertCircle className="w-5 h-5 shrink-0" />
                        )}
                        {feedback.message}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-5 space-y-4">
                    {/* Request Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Request Type
                        </label>
                        <select
                            {...register("leave_type")}
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 focus:bg-white focus:border-emerald-400 focus:outline-none transition-colors disabled:opacity-60"
                            disabled={submitting}
                        >
                            <option value="" disabled>
                                Select a request type
                            </option>
                            {LEAVE_TYPES.map((t) => (
                                <option key={t.value} value={t.value}>
                                    {t.label}
                                </option>
                            ))}
                        </select>
                        {errors.leave_type && (
                            <p className="mt-1 text-xs text-red-500">{errors.leave_type.message}</p>
                        )}
                        {balanceType && (
                            <p className="mt-1.5 text-xs text-gray-400">
                                Deducts from{" "}
                                <span className="font-medium text-gray-600">
                                    {BALANCE_LABELS[balanceType]}
                                </span>{" "}
                                balance
                            </p>
                        )}
                    </div>

                    {/* Available Balance Display */}
                    {balanceType && (
                        <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 flex items-center justify-between">
                            <span className="text-sm text-gray-600">
                                {BALANCE_LABELS[balanceType]} Available
                            </span>
                            <span className="text-sm font-semibold text-gray-900">
                                {available} Days
                            </span>
                        </div>
                    )}

                    {/* Date Range */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Start Date
                            </label>
                            <input
                                type="date"
                                {...register("start_date")}
                                min={today}
                                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 focus:bg-white focus:border-emerald-400 focus:outline-none transition-colors disabled:opacity-60"
                                disabled={submitting}
                            />
                            {errors.start_date && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.start_date.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                End Date
                            </label>
                            <input
                                type="date"
                                {...register("end_date")}
                                min={today}
                                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 focus:bg-white focus:border-emerald-400 focus:outline-none transition-colors disabled:opacity-60"
                                disabled={submitting}
                            />
                            {errors.end_date && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.end_date.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Reason */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Reason
                        </label>
                        <textarea
                            {...register("reason")}
                            rows={4}
                            placeholder="Describe the reason for your request..."
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-emerald-400 focus:outline-none transition-colors resize-none disabled:opacity-60"
                            disabled={submitting}
                        />
                        {errors.reason && (
                            <p className="mt-1 text-xs text-red-500">{errors.reason.message}</p>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-60"
                            disabled={submitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors shadow-sm disabled:opacity-60"
                        >
                            {submitting && <span className="loading loading-spinner loading-xs"></span>}
                            {submitting ? "Submitting..." : "Submit Request"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
