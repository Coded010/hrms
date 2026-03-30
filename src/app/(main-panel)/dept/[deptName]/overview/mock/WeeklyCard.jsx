export default function WeeklyCard({ data }) {
  return (
  <main  className="flex items-center gap-4 min-w-[280px] bg-white p-5 rounded-xl border border-gray-200 hover:shadow-sm transition-all duration-300 group">
    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200">
      <data.icon className="w-5 h-5 text-neutral/80 group-hover:text-[#5BB98B] transition-all duration-300"/>
    </div>
    <div className="leading-tight">
      <h3 className="text-[14px] font-bold text-neutral/80 group-hover:text-[#5BB98B] transition-all duration-300">
        {data.label}
      </h3>
      <p className="text-[12px] text-neutral/50">
        {data.value}
      </p>
    </div>
  </main>
  )
}