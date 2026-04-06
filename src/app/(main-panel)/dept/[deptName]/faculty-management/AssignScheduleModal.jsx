"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { assignSchedule } from "actions/assignSchedule";
import { X, CheckCircle2, AlertCircle } from "lucide-react";

const DAYS_OF_WEEK = [
    { value: 1, label: "Sunday" },
    { value: 2, label: "Monday" },
    { value: 3, label: "Tuesday" },
    { value: 4, label: "Wednesday" },
    { value: 5, label: "Thursday" },
    { value: 6, label: "Friday" },
    { value: 7, label: "Saturday" },
];

const schema = z
    .object({
        subject_code: z.string().min(1, "Subject code is required."),
        subject_name: z.string().min(1, "Subject name is required."),
        day_of_week: z.string({ required_error: "Day of week is required." }).min(1, "Please select a day."),
        start_time: z.string({ required_error: "Start time is required." }).min(1, "Start time is required."),
        end_time: z.string({ required_error: "End time is required." }).min(1, "End time is required."),
        room: z.string().min(1, "Room is required."),
        section: z.string().min(1, "Section is required."),
    })
    .refine((data) => data.start_time < data.end_time, {
        message: "End time must be after start time.",
        path: ["end_time"],
    });

export default function AssignScheduleModal({ open, onClose, facultyName, employeeId }) {
    const [feedback, setFeedback] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        mode: "onBlur",
        defaultValues: {
            subject_code: "",
            subject_name: "",
            day_of_week: "",
            start_time: "",
            end_time: "",
            room: "",
            section: "",
        },
    });

    useEffect(() => {
        if (open) {
            reset({
                subject_code: "",
                subject_name: "",
                day_of_week: "",
                start_time: "",
                end_time: "",
                room: "",
                section: "",
            });
            setFeedback(null);
        }
    }, [open, reset]);

    const onSubmit = async (data) => {
        setFeedback(null);
        setSubmitting(true);
        const result = await assignSchedule(employeeId, data);
        setSubmitting(false);

        if (result.success) {
            setFeedback({ type: "success", message: result.message });
            reset();
            setTimeout(() => {
                setFeedback(null);
                onClose();
            }, 1500);
        } else {
            setFeedback({ type: "error", message: result.error });
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />
            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden z-10">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900">Assign Schedule</h2>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                        aria-label="Close"
                    >
                        <X className="w-5 h-5 text-gray-400" />
                    </button>
                </div>

                {facultyName && (
                    <div className="mx-6 mt-4 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                        <p className="text-xs text-gray-400 mb-0.5">Assigning to</p>
                        <p className="text-sm font-semibold text-gray-900">{facultyName}</p>
                    </div>
                )}

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
                    {/* Subject Code & Name */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Subject Code
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. CS101"
                                {...register("subject_code")}
                                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-emerald-400 focus:outline-none transition-colors disabled:opacity-60"
                                disabled={submitting}
                            />
                            {errors.subject_code && (
                                <p className="mt-1 text-xs text-red-500">{errors.subject_code.message}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Subject Name
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. Intro to Programming"
                                {...register("subject_name")}
                                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-emerald-400 focus:outline-none transition-colors disabled:opacity-60"
                                disabled={submitting}
                            />
                            {errors.subject_name && (
                                <p className="mt-1 text-xs text-red-500">{errors.subject_name.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Day of Week */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Day of Week
                        </label>
                        <select
                            {...register("day_of_week")}
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 focus:bg-white focus:border-emerald-400 focus:outline-none transition-colors disabled:opacity-60"
                            disabled={submitting}
                        >
                            <option value="" disabled>Select a day</option>
                            {DAYS_OF_WEEK.map((d) => (
                                <option key={d.value} value={d.value}>{d.label}</option>
                            ))}
                        </select>
                        {errors.day_of_week && (
                            <p className="mt-1 text-xs text-red-500">{errors.day_of_week.message}</p>
                        )}
                    </div>

                    {/* Time Range */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Start Time
                            </label>
                            <input
                                type="time"
                                {...register("start_time")}
                                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 focus:bg-white focus:border-emerald-400 focus:outline-none transition-colors disabled:opacity-60"
                                disabled={submitting}
                            />
                            {errors.start_time && (
                                <p className="mt-1 text-xs text-red-500">{errors.start_time.message}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                End Time
                            </label>
                            <input
                                type="time"
                                {...register("end_time")}
                                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 focus:bg-white focus:border-emerald-400 focus:outline-none transition-colors disabled:opacity-60"
                                disabled={submitting}
                            />
                            {errors.end_time && (
                                <p className="mt-1 text-xs text-red-500">{errors.end_time.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Room & Section */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Room
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. Room 204"
                                {...register("room")}
                                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-emerald-400 focus:outline-none transition-colors disabled:opacity-60"
                                disabled={submitting}
                            />
                            {errors.room && (
                                <p className="mt-1 text-xs text-red-500">{errors.room.message}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Section
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. BS CS 1A"
                                {...register("section")}
                                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-emerald-400 focus:outline-none transition-colors disabled:opacity-60"
                                disabled={submitting}
                            />
                            {errors.section && (
                                <p className="mt-1 text-xs text-red-500">{errors.section.message}</p>
                            )}
                        </div>
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
                            {submitting ? "Assigning..." : "Assign Schedule"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
