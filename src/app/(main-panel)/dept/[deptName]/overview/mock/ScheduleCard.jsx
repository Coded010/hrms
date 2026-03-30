import { InfoIcon } from "lucide-react"

export default function ScheduleCard( { data } ) {
  return (
    <main className="border border-gray-200 rounded-b-xl shadow-sm border-t-4 border-t-red-500 bg-white">
      <header className="flex flex-wrap justify-between items-center gap-4 p-6">
        <div className="flex items-center gap-3">
          <InfoIcon className="w-5 h-5 text-red-500"/>
          <div>
            <h2 className="text-lg font-bold">
              Immediate Attention: Unattended Classes
            </h2>
            <p className="text-sm text-neutral/50">
              The following classes are currently ongoing or starting but instructors have not clocked in.
            </p>
          </div>
        </div>
        
        <div className="badge badge-md badge-error border-none rounded-full py-3 px-4 font-semibold text-white">
          Critical Action Needed
        </div>
      </header>

      <section className="px-4 pb-6">
        <table className="table w-full">

          <thead>
            <tr className="text-neutral font-semibold border-b border-gray-100">
              <th>Time & Room</th>
              <th>Subject</th>
              <th>Assigned Professor</th>
              <th className=" text-end">Action</th>
            </tr>
          </thead>

          <tbody> 
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 border-b border-gray-50">
                <td className="py-4">
                   <div className="font-bold text-neutral/80">{item.time}</div>
                </td>
                <td className="font-bold text-neutral/80 max-w-[200px]">
                  {item.subject}
                </td>
                <td className="text-neutral/50 italic">
                  {item.professor}
                </td>
                <td className="text-end">
                  <button className="btn btn-sm bg-red-500 hover:bg-red-600 text-white border-none px-4">
                    + Assign Substitute
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </section>
    </main>
  )
}