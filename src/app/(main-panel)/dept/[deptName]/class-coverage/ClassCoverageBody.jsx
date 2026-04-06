"use client";

import React from "react";
import {
    Monitor, Filter, CheckCircle2, MoreVertical,
    MapPin, Clock, ArrowRight, AlertCircle, Phone
} from "lucide-react";

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

export default function ClassCoverageBody({ ongoing, upcoming, unattended, totalScheduled, operationalEfficiency }) {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 pb-6 border-b border-gray-200">
                <div className="flex flex-col gap-1 text-gray-800">
                    <div className="flex items-center gap-2 font-semibold text-sm" style={{ color: "var(--user-role-color, #10b981)" }}>
                        <Monitor className="w-4 h-4" />
                        <span>Real-time Tracking</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mt-1">Class Coverage</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Monitoring {totalScheduled} scheduled classes for today. Operational efficiency at <span className="font-bold whitespace-nowrap" style={{ color: "var(--user-role-color, #10b981)" }}>{operationalEfficiency}%.</span>
                    </p>
                </div>
                <div className="flex items-center gap-3 mt-4 md:mt-0">
                    <button className="btn bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 shadow-sm flex items-center gap-2 font-medium px-4 py-2 rounded-lg transition-colors">
                        <Filter className="w-4 h-4" /> Filter by Building
                    </button>
                    <button
                        className="btn text-white shadow-sm flex items-center gap-2 font-medium px-4 py-2 rounded-lg transition-colors border-none"
                        style={{ backgroundColor: "var(--user-role-color, #10b981)" }}
                    >
                        Broadcast Announcement
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Ongoing */}
                <div className="flex flex-col gap-4 border-r border-dotted border-gray-200 pr-0 lg:pr-6">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Classes Ongoing</h2>
                            <span className="bg-gray-100 text-gray-600 text-xs py-0.5 px-2 rounded-full font-bold">{ongoing.length}</span>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600"><MoreVertical className="w-4 h-4" /></button>
                    </div>

                    {ongoing.length === 0 && (
                        <p className="text-sm text-gray-400 text-center py-8">No classes currently in session.</p>
                    )}
                    {ongoing.map((card) => (
                        <div key={card.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] flex flex-col">
                            <div className="p-4 flex flex-col gap-3">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-lg text-gray-900">{card.id}</h3>
                                    <span className="inline-flex items-center gap-1.5 border border-gray-200 px-2.5 py-1 rounded-full text-xs font-medium text-gray-700 bg-white">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-gray-600" /> Clocked In
                                    </span>
                                </div>
                                <div className="flex items-center gap-1.5 text-gray-500 text-xs font-medium">
                                    <MapPin className="w-3.5 h-3.5" /> {card.room}
                                </div>
                                <div className="flex items-center gap-3 mt-2">
                                    <Avatar initials={card.initials} />
                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-sm font-bold text-gray-800">{card.instructor}</span>
                                        <div className="flex items-center gap-1 text-gray-500 text-xs font-medium">
                                            <Clock className="w-3.5 h-3.5" /> {card.time}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="border-t border-gray-100 px-4 py-3 flex items-center justify-between bg-gray-50/50">
                                <span className="text-xs text-gray-500 font-medium">Clock-In: {card.clockIn}</span>
                                <button className="text-gray-400 hover:text-gray-600"><MoreVertical className="w-4 h-4" /></button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Upcoming */}
                <div className="flex flex-col gap-4 border-r border-dotted border-gray-200 pr-0 lg:pr-6">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Upcoming Next Hour</h2>
                            <span className="bg-gray-100 text-gray-600 text-xs py-0.5 px-2 rounded-full font-bold">{upcoming.length}</span>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600"><MoreVertical className="w-4 h-4" /></button>
                    </div>

                    {upcoming.length === 0 && (
                        <p className="text-sm text-gray-400 text-center py-8">No upcoming classes in the next hour.</p>
                    )}
                    {upcoming.map((card) => (
                        <div key={card.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] flex flex-col p-4 gap-3">
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-lg text-gray-900">{card.id}</h3>
                                <span className="inline-flex items-center gap-1.5 border border-gray-200 px-2.5 py-1 rounded-full text-xs font-medium text-gray-700 bg-white">
                                    <Clock className="w-3.5 h-3.5 text-gray-500" /> Standby
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5 text-gray-500 text-xs font-medium">
                                <MapPin className="w-3.5 h-3.5" /> {card.room}
                            </div>
                            <div className="flex items-center gap-3 mt-2">
                                <Avatar initials={card.initials} />
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-sm font-bold text-gray-800">{card.instructor}</span>
                                    <div className="flex items-center gap-1 text-gray-500 text-xs font-medium">
                                        <Clock className="w-3.5 h-3.5" /> {card.time}
                                    </div>
                                </div>
                            </div>
                            <div className="pt-3 border-t border-gray-100 mt-2 flex justify-center">
                                <button className="text-sm font-bold flex items-center gap-1 hover:underline transition-all" style={{ color: "var(--user-role-color, #10b981)" }}>
                                    View Details <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Unattended */}
                <div className="flex flex-col gap-4 rounded-2xl p-4 lg:p-6 bg-[#fdf2f2] border border-dotted border-red-200">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <h2 className="text-sm font-bold text-red-600 uppercase tracking-wider">Unattended / Alerts</h2>
                            <span className="bg-red-500 text-white text-xs py-0.5 px-2.5 rounded-full font-bold">{unattended.length}</span>
                        </div>
                        <button className="text-red-400 hover:text-red-700"><MoreVertical className="w-4 h-4" /></button>
                    </div>

                    {unattended.length === 0 && (
                        <p className="text-sm text-gray-400 text-center py-8">All classes are accounted for.</p>
                    )}
                    {unattended.map((card) => (
                        <div key={card.id} className="bg-white/80 backdrop-blur-sm border border-red-200 rounded-xl overflow-hidden shadow-sm flex flex-col p-4 gap-4">
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-lg text-gray-900">{card.id}</h3>
                                <span className="inline-flex items-center gap-1 shadow-sm px-2.5 py-0.5 rounded-full text-xs font-bold text-white bg-red-500">
                                    <AlertCircle className="w-3.5 h-3.5" /> Missing
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5 text-gray-600 text-xs font-medium">
                                <MapPin className="w-3.5 h-3.5" /> {card.room}
                            </div>
                            <div className="flex items-center gap-3 mt-1">
                                <Avatar initials={card.initials} />
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-sm font-bold text-gray-900">{card.instructor}</span>
                                    <div className="flex items-center gap-1 text-gray-600 text-xs font-medium">
                                        <Clock className="w-3.5 h-3.5" /> {card.time}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 border-t border-red-100 mt-2 pt-4">
                                <button className="bg-[#e44654] hover:bg-red-600 text-white font-bold py-2.5 px-4 rounded-lg flex-1 text-sm shadow-sm transition-colors text-center uppercase tracking-wider">
                                    Assign Sub
                                </button>
                                <button className="border border-red-200 bg-white text-[#e44654] hover:bg-red-50 p-2.5 rounded-lg shadow-sm transition-colors">
                                    <Phone className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
