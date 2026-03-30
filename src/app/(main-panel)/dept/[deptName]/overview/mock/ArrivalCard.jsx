export default function ArrivalCard( { data } ) {
  return (
    <main className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col h-full">

      <header className="flex justify-between items-start mb-1">
        <h2 className="text-lg font-bold text-neutral/80">Expected Arrivals</h2>
        <button className="btn btn-xs text-gray-400 text-lg border-none">...</button>
      </header>
      <p className="text-neutral/50 text-sm mb-6">Next 2 Hours (Upcoming Shifts)</p>

      <section className="grow space-y-6">
        {data.map((faculty) => (
          <div key={faculty.id} className="flex items-center justify-between gap-4">

            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="rounded-full w-10 ring-1 ring-neutral/20">
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-neutral/80 leading-tight">
                  {faculty.name}
                </h3>
                <p className="text-xs text-neutral/50">
                  {faculty.subject} • {faculty.time}
                </p>
              </div>
            </div>

            <div className="badge badge-outline text-xs py-3 px-2 text-neutral/50 whitespace-nowrap">
              {faculty.status}
            </div>
          </div>
        ))}
      </section>
      
      <div className="border mt-4"></div>

      <footer className="mt-8 pt-6 border-t border-gray-50">
        <button className="btn btn-sm w-full bg-transparent text-[#5BB98B] border border-[#5BB98B] hover:bg-[#5BB98B]/20">
          View Full Coverage Board
        </button>
      </footer>
    </main>
  )
}