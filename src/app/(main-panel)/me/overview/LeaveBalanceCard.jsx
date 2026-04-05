"use client";

function calcPercentage(used, total) {
    if (!total || total === 0) return 0;
    return (used / total) * 100;
}

export default function LeaveBalanceCard({ label, used, total, available, color }) {
    const pct = calcPercentage(used, total);
    const radius = 52;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference - (pct / 100) * circumference;

    const colorMap = {
        green: { stroke: "#10b981", bg: "bg-emerald-50", text: "text-emerald-600", ring: "ring-emerald-100" },
        blue: { stroke: "#3b82f6", bg: "bg-blue-50", text: "text-blue-600", ring: "ring-blue-100" },
        orange: { stroke: "#f59e0b", bg: "bg-orange-50", text: "text-orange-600", ring: "ring-orange-100" },
    };

    const c = colorMap[color] || colorMap.green;

    return (
        <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center ${c.ring} ring-1`}>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">{label}</p>
            <div className="relative w-32 h-32 mb-4">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r={radius} fill="none" stroke="#f3f4f6" strokeWidth="10" />
                    <circle
                        cx="60"
                        cy="60"
                        r={radius}
                        fill="none"
                        stroke={c.stroke}
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={dashOffset}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-gray-900">{used}</span>
                    <span className="text-xs text-gray-400">/ {total} Days Used</span>
                </div>
            </div>
            <div className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-semibold ${c.bg} ${c.text}`}>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                {available} Days Available
            </div>
        </div>
    );
}
