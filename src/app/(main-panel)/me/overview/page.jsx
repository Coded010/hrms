import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function MyOverviewPage() {
    return (
        <div className="space-y-6">
            {/* Header Card */}
            <div className="bg-green-100 rounded-lg p-6 flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-semibold text-green-800">Good Morning, John! 👋</h2>
                    <p className="text-green-600 mt-1">Your next payday is in 4 days.</p>
                </div>
                <div className="text-right text-sm text-green-700">
                    <p>Active Period: Oct 16 – Oct 31</p>
                    <p>Last synced: Just now</p>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Side */}
                <div className="space-y-6">
                    {/* Leave Balances */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Leave Balances</h3>
                            <button className="text-green-600 hover:text-green-800 text-sm">View Detail</button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {/* Vacation Leave */}
                            <div className="bg-white rounded-lg p-4 border">
                                <div className="flex flex-col items-center">
                                    <div className="relative w-16 h-16 mb-2">
                                        <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                                            <path
                                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                fill="none"
                                                stroke="#e5e7eb"
                                                strokeWidth="2"
                                            />
                                            <path
                                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                fill="none"
                                                stroke="#10b981"
                                                strokeWidth="2"
                                                strokeDasharray={`${5/15 * 100}, 100`}
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-lg font-semibold">5</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600">/ 15 Days Used</p>
                                    <p className="text-sm text-green-600 font-medium">10 Days Available</p>
                                </div>
                            </div>

                            {/* Sick Leave */}
                            <div className="bg-white rounded-lg p-4 border">
                                <div className="flex flex-col items-center">
                                    <div className="relative w-16 h-16 mb-2">
                                        <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                                            <path
                                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                fill="none"
                                                stroke="#e5e7eb"
                                                strokeWidth="2"
                                            />
                                            <path
                                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                fill="none"
                                                stroke="#10b981"
                                                strokeWidth="2"
                                                strokeDasharray={`${2/15 * 100}, 100`}
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-lg font-semibold">2</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600">/ 15 Days Used</p>
                                    <p className="text-sm text-green-600 font-medium">13 Days Available</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                                <h4 className="font-medium text-green-800">File a Leave</h4>
                                <p className="text-sm text-green-600 mt-1">Request vacation or sick time off</p>
                            </div>
                            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                                <h4 className="font-medium text-green-800">File Overtime</h4>
                                <p className="text-sm text-green-600 mt-1">Submit extra hours for approval</p>
                            </div>
                            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                                <h4 className="font-medium text-green-800">Fix Missed Log</h4>
                                <p className="text-sm text-green-600 mt-1">Correct clock-in/out discrepancies</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Recent Biometric Logs */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Recent Biometric Logs</h3>
                    </div>
                    <div className="bg-white rounded-lg border overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Time In</TableHead>
                                    <TableHead>Time Out</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Oct 24, 2024</TableCell>
                                    <TableCell>08:52 AM</TableCell>
                                    <TableCell>05:30 PM</TableCell>
                                    <TableCell>
                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            On Time
                                        </span>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Oct 23, 2024</TableCell>
                                    <TableCell>09:15 AM</TableCell>
                                    <TableCell>06:05 PM</TableCell>
                                    <TableCell>
                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                            Late
                                        </span>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Oct 22, 2024</TableCell>
                                    <TableCell>08:45 AM</TableCell>
                                    <TableCell>05:15 PM</TableCell>
                                    <TableCell>
                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            On Time
                                        </span>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                    <div className="mt-4 text-center">
                        <button className="text-green-600 hover:text-green-800 text-sm">View Full Attendance History</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
