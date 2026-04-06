import { VideoIcon, CheckIcon, PersonIcon } from '@radix-ui/react-icons';

const iconMap = {
  video: <VideoIcon className="text-neutral/80 w-5 h-5" />,
  check: <CheckIcon className="text-neutral/80 w-5 h-5" />,
  person: <PersonIcon className="text-neutral/80 w-5 h-5" />,
};

export default function StatusCard({ data }) {
  return (
    <main className="bg-white rounded-xl border border-gray-200 shadow-sm transition-all hover:shadow-sm group p-6 cursor-pointer">
      <section className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-neutral/50">{data.title}</p>
          <h2 className="text-4xl font-bold text-neutral group-hover:text-[#5BB98B] mt-2 transition-all duration-300">
            {data.status}
          </h2>
        </div>

        <div className="border border-gray-200 p-2 rounded-lg group-hover:bg-[#5BB98B]/10 transition-all">
          {iconMap[data.type]}
        </div>
      </section>

      <p className="text-xs text-neutral/50 font-medium mt-4">
        {data.details}
      </p>
    </main>
  )
}
