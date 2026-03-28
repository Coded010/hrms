export default function PendingApprovalsPage() {
    return (
        <div className="space-y-6">
            {/* Page Title Section */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Pending Approvals</h1>
                    <p className="text-sm text-gray-600 mt-1">
                        Manage faculty leave requests and schedule modifications for the College.
                    </p>
                </div>
                <div className="flex space-x-1">
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium">
                        Leave Requests (4)
                    </button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200">
                        Schedule Adjustments (2)
                    </button>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Filter by:</span>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                </div>
                <span className="text-sm text-gray-500">Showing 4 pending items</span>
            </div>

            {/* Approval Cards */}
            <div className="space-y-4">
                {/* Card 1 */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                                <span className="text-gray-600 font-medium">SJ</span>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                    <h3 className="font-semibold text-gray-900">Prof. Sarah Jenkins</h3>
                                    <span className="text-xs text-gray-500">Senior Lecturer</span>
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                        Urgent
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">Medical Leave — Submitted Oct 12, 2024</p>
                                <div className="mt-3 pl-4 border-l-2 border-gray-200">
                                    <p className="text-sm text-gray-700 italic">
                                        &ldquo;Recovery from minor outpatient surgery. Need 3 days rest per doctor&apos;s advice.&rdquo;
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">
                                Approve
                            </button>
                            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                                Decline
                            </button>
                        </div>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                                <span className="text-gray-600 font-medium">MC</span>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                    <h3 className="font-semibold text-gray-900">Dr. Michael Chen</h3>
                                    <span className="text-xs text-gray-500">Associate Professor</span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">Bereavement Leave — Submitted Oct 13, 2024</p>
                                <div className="mt-3 pl-4 border-l-2 border-gray-200">
                                    <p className="text-sm text-gray-700 italic">
                                        &ldquo;Attending funeral services for a family member in Seattle.&rdquo;
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">
                                Approve
                            </button>
                            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                                Decline
                            </button>
                        </div>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                                <span className="text-gray-600 font-medium">ER</span>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                    <h3 className="font-semibold text-gray-900">Prof. Elena Rodriguez</h3>
                                    <span className="text-xs text-gray-500">Instructor</span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">Vacation Leave — Submitted Oct 10, 2024</p>
                                <div className="mt-3 pl-4 border-l-2 border-gray-200">
                                    <p className="text-sm text-gray-700 italic">
                                        &ldquo;Pre-planned family trip. Course materials have been uploaded to LMS in advance.&rdquo;
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">
                                Approve
                            </button>
                            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                                Decline
                            </button>
                        </div>
                    </div>
                </div>

                {/* Card 4 */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                                <span className="text-gray-600 font-medium">RS</span>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                    <h3 className="font-semibold text-gray-900">Dr. Robert Smith</h3>
                                    <span className="text-xs text-gray-500">Department Chair</span>
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                        Urgent
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">Emergency Leave — Submitted Oct 14, 2024</p>
                                <div className="mt-3 pl-4 border-l-2 border-gray-200">
                                    <p className="text-sm text-gray-700 italic">
                                        &ldquo;Flooding in residential area due to heavy rains. Need to attend to home repairs.&rdquo;
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">
                                Approve
                            </button>
                            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                                Decline
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="text-center py-4">
                <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                    View Approval History
                </button>
            </div>

            {/* Footer Notice Card */}
            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                <h3 className="text-lg font-semibold text-green-800 mb-2">HR Compliance Notice</h3>
                <p className="text-sm text-green-700">
                    Approved leave requests are automatically synchronized with the Faculty Roster and real-time Class Coverage board. Substitutes must be manually assigned for critical gaps in the Dashboard.
                </p>
            </div>
        </div>
    );
}