"use client";
import React from 'react';
import { 
    Monitor, Filter, CheckCircle2, MoreVertical, 
    MapPin, Clock, ArrowRight, AlertCircle, Phone 
} from 'lucide-react';

function Avatar({ initials }) {
    return (
        <div
            className="flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-bold"
            style={{ background: "#e6f4ed", color: "#218358" }}
        >
            {initials}
        </div>
    )
}

const ongoingClasses = [
    {
        id: "CS-101",
        room: "Lab 204",
        instructor: "Dr. Sarah Jenkins",
        time: "09:00 AM - 10:30 AM",
        checkIn: "8:54 AM",
        initials: "SJ"
    },
    {
        id: "IT-302",
        room: "Room 401",
        instructor: "Prof. Mark V.",
        time: "09:30 AM - 11:00 AM",
        checkIn: "8:54 AM",
        initials: "MV"
    },
    {
        id: "CYB-210",
        room: "Theater B",
        instructor: "Dr. Emily Chen",
        time: "09:00 AM - 11:00 AM",
        checkIn: "8:54 AM",
        initials: "EC"
    },
    {
        id: "DATA-11",
        room: "Room 102",
        instructor: "James Wilson",
        time: "09:00 AM - 10:30 AM",
        checkIn: "8:54 AM",
        initials: "JW"
    }
];

const upcomingClasses = [
    {
        id: "NET-105",
        room: "Lab 305",
        instructor: "Robert Fox",
        time: "11:00 AM - 12:30 PM",
        initials: "RF"
    },
    {
        id: "AI-400",
        room: "Room 502",
        instructor: "Dr. Elena S.",
        time: "11:00 AM - 01:00 PM",
        initials: "ES"
    },
    {
        id: "ETH-100",
        room: "Room 211",
        instructor: "Michael P.",
        time: "11:30 AM - 01:00 PM",
        initials: "MP"
    }
];

const unattendedAlerts = [
    {
        id: "CS-205",
        room: "Room 312",
        instructor: "Kevin Adams",
        time: "09:00 AM - 11:00 AM",
        initials: "KA"
    },
    {
        id: "WEB-101",
        room: "Lab 101",
        instructor: "Jessica Lee",
        time: "09:30 AM - 11:00 AM",
        initials: "JL"
    }
];

export default function ClassCoveragePage() {
    return (
        <div className="flex flex-col gap-5">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 pb-6 border-b border-gray-200">
                <div className="flex flex-col gap-1 text-gray-800">
                    <div className="flex items-center gap-2 font-semibold text-sm" style={{ color: "var(--user-role-color, #10b981)" }}>
                        <Monitor className="w-4 h-4" />
                        <span>Real-time Tracking</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mt-1">Class Coverage</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Monitoring 45 scheduled classes for today. Operational efficiency at <span className="font-bold whitespace-nowrap" style={{ color: "var(--user-role-color, #10b981)" }}>95.6%.</span>
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

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Column 1: Ongoing */}
                <div className="flex flex-col gap-4 border-r border-dotted border-gray-200 pr-0 lg:pr-6">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Classes Ongoing</h2>
                            <span className="bg-gray-100 text-gray-600 text-xs py-0.5 px-2 rounded-full font-bold">4</span>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600"><MoreVertical className="w-4 h-4" /></button>
                    </div>

                    {ongoingClasses.map(card => (
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
                                <span className="text-xs text-gray-500 font-medium">Check-In: {card.checkIn}</span>
                                <button className="text-gray-400 hover:text-gray-600"><MoreVertical className="w-4 h-4" /></button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Column 2: Upcoming */}
                <div className="flex flex-col gap-4 border-r border-dotted border-gray-200 pr-0 lg:pr-6">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Upcoming Next Hour</h2>
                            <span className="bg-gray-100 text-gray-600 text-xs py-0.5 px-2 rounded-full font-bold">3</span>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600"><MoreVertical className="w-4 h-4" /></button>
                    </div>

                    {upcomingClasses.map(card => (
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

                {/* Column 3: Unattended / Alerts */}
                <div className="flex flex-col gap-4 rounded-2xl p-4 lg:p-6 bg-[#fdf2f2] border border-dotted border-red-200">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <h2 className="text-sm font-bold text-red-600 uppercase tracking-wider">Unattended / Alerts</h2>
                            <span className="bg-red-500 text-white text-xs py-0.5 px-2.5 rounded-full font-bold">2</span>
                        </div>
                        <button className="text-red-400 hover:text-red-700"><MoreVertical className="w-4 h-4" /></button>
                    </div>

                    {unattendedAlerts.map(card => (
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
