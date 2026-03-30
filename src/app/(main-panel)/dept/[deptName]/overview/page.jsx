import StatusGrid from './mock/OverviewGrid'

export default function DashboardPage() {
    return (
        <div>
            <h1>Operational Overview</h1>
            <p className="text-sm" style={{ color: "var(--user-role-color)" }}>
                Real-time faculty management and class coverage status.
            </p>
            <StatusGrid/>
        </div>
    );
}