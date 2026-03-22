"use client"
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
import Button from "@/components/ui/buttons";
import { useState, useEffect, useRef } from "react";

// Dummy Stat, facultyData
const stat = [
    { label: "Total Scheduled Hours", value: "692.0", sub: "Accumulated for 42 faculty members", color: "text-green-600", bg: "bg-green-50"},
    { label: "Total Hours Rendered", value: "682.5", sub: "96.5% fulfillment rate", color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Absences / Lates", value: "12.0", sub: "Requires Dean's justification", color: "text-red-600", bg: "bg-red-50" },
]

const facultyData = [
  { id: "F-10201", name: "Dr. Sarah Jenkins", scheduled: "80h", rendered: "78h", absences: 0, lates: 2, status: "COMPLIANT" },
  { id: "F-10202", name: "Prof. Michael Chen", scheduled: "72h", rendered: "72h", absences: 0, lates: 0, status: "COMPLIANT" },
  { id: "F-10203", name: "Dr. Elena Rodriguez", scheduled: "64h", rendered: "56h", absences: 1, lates: 0, status: "REVIEW REQUIRED" },
  { id: "F-10204", name: "Prof. John Cena", scheduled: "404h", rendered: "404h", absences: 0, lates: 0, status: "COMPLIANT" },
  { id: "F-10205", name: "Dr. Wok Fork", scheduled: "72h", rendered: "72h", absences: 3, lates: 2, status: "REVIEW REQUIRED" },
  { id: "F-10206", name: "Prof. Ciao Fan", scheduled: "64h", rendered: "64h", absences: 0, lates: 2, status: "COMPLIANT" },
  
];


export default function DashboardPage() {
    const [showBanner, setShowBanner] = useState(true);
    const bottomRef = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShowBanner(true);
                }
            },
            { threshold: 0.1 }
        );

        if (bottomRef.current) {
            observer.observe(bottomRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div className="space-y-4 bg-base-200/30 min-h-screen">

        <header className="flex flex-col md:flex-row md:items-center justify-between"> 
        <div>
            <h1>Attendance & Cutoff Reports</h1>
            <p className="text-sm" style={{ color: "var(--user-role-color)" }}>
                Review and finalize faculty hours for HR processing.
            </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
                {/* Date Pagination Group */}
                <div className="join border border-base-300 bg-base-100 rounded-md w-full sm:w-auto shadow-sm">
                    <button className="btn btn-ghost btn-sm join-item px-2">
                        <ChevronLeftIcon />
                    </button>
                    
                    <div className="btn btn-ghost btn-sm join-item no-animation flex gap-2 font-normal hover:bg-transparent">
                        <CalendarIcon className="text-success w-4 h-4" />
                        <span className="text-xs md:text-sm whitespace-nowrap">October 1 - October 15, 2024</span>
                    </div>

                    <button className="btn btn-ghost btn-sm join-item px-2">
                        <ChevronRightIcon />
                    </button>
                </div>

                {/* Filter Button */}
                <button className="btn btn-ghost btn-sm bg-base-100 border-base-400 px-2 shadow-sm hover:bg-transparent">
                <MixerHorizontalIcon />
                </button>
            </div>
        </header>
        
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stat.map((item, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl border border-base-300 shadow-sm flex justify-between items-start">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">{item.label}</p>
                            <h3 className="text-3xl font-bold mt-1">{item.value}</h3>
                            <p className="text-xs text-gray-400 mt-2">{item.sub}</p>
                        </div>
                        <div className={`${item.bg} p-2 rounded-lg ${item.color}`}>
                            {index === 0 ? <CalendarIcon /> : index === 1 ? <ClockIcon /> : <ExclamationTriangleIcon />}
                        </div>
                    </div>
                ))}
            </section>

            <section className="bg-white rounded-xl border border-base-300 shadow-sm overflow-hidden">
               <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-base-300 gap-4">
                {/* Left Side */}
                <div className="flex flex-col">
                    <h2 className="font-bold text-xl text-base-content tracking-tight">
                        Attendance Preview
                    </h2>
                    <p className="text-sm opacity-60">
                        Review individual faculty rendered hours before final submission.
                    </p>
                </div>

                {/* Right Side: Buttons */}
                <div className="flex gap-2">
                    <Button 
                        variant="ghost" 
                        className="bg-base-200 border border-base-300 rounded-md hover:bg-emerald-500 hover:text-white transition-all gap-2 text-xs font-medium px-3 h-9"
                    >
                    <FileTextIcon /> Export PDF
                </Button>
                    <Button 
                        variant="ghost" 
                        className="bg-base-200 border border-base-300 rounded-md hover:bg-emerald-500 hover:text-white transition-all gap-2 text-xs font-medium px-3 h-9"
                    >
                    <DownloadIcon /> Export Excel
                </Button>
                </div>
            </div>
            
            <div className="overflow-x-auto">
                    <table className="table table-auto w-full">
                        <thead className="bg-base-200/50">
                            <tr className="text-gray-500 text-xs uppercase tracking-wider">
                                <th>Faculty Member</th>
                                <th>Scheduled</th>
                                <th>Rendered</th>
                                <th>Absences</th>
                                <th>Lates</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {facultyData.map((faculty) => (
                                <tr key={faculty.id} className="hover:bg-base-300/30">
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar placeholder">
                                                <div className="bg-neutral text-neutral-content rounded-full w-10">
                                                    <span>{faculty.name.split(' ').map(n => n[0]).join('')}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold text-sm">{faculty.name}</div>
                                                <div className="text-[10px] font-mono opacity-50">{faculty.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-sm">{faculty.scheduled}</td>
                                    <td className="text-sm">{faculty.rendered}</td>
                                    <td className="text-sm">{faculty.absences}</td>
                                    <td className="text-sm">{faculty.lates}</td>
                                    <td>
                                        {faculty.status === "COMPLIANT" ? (
                                            <span className="badge badge-success badge-outline gap-1 font-bold py-3 px-3">
                                                <CheckCircledIcon /> COMPLIANT
                                            </span>
                                        ) : (
                                            <span className="badge badge-error badge-outline gap-1 font-bold py-3 px-3">
                                                <ExclamationTriangleIcon /> REVIEW REQUIRED
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
            </div>
        <div ref={bottomRef} className="h-4 w-full" />
        </section>

        <div className={`
                fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50
                transition-all duration-500 ease-in-out
                ${showBanner ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}
            `}>
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 md:p-5 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="bg-emerald-100 p-3 rounded-full text-emerald-600">
                            <FileTextIcon className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800">Ready for HR Submission?</h3>
                            <p className="text-sm text-gray-500">Finalizing this period will lock records.</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button 
                            onClick={() => setShowBanner(false)} // To hide banner
                            className="btn btn-ghost bg-white border-base-300"
                        >
                            Review All Details
                        </button>
                        <button className="btn btn-success text-white gap-2">
                             Submit Cutoff Report
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
