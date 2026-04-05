'use client'

import { useState, useEffect } from 'react';
import StatCard from './StatusCard'
import ClassCard from './ScheduleCard'
import ArrivalCard from './ArrivalCard'
import WeeklyCard from './WeeklyCard'

export default function OverviewGrid({ stats, sched, arrivals, weekly }) {
  const [data, setData] = useState({
    status: stats || [],
    sched: sched || [],
    arrivals: arrivals || [],
    weekly: weekly || []
  })

  useEffect(() => {
    if (stats || sched || arrivals || weekly) {
      setData({
        status: stats || [],
        sched: sched || [],
        arrivals: arrivals || [],
        weekly: weekly || []
      })
    }
  }, [stats, sched, arrivals, weekly])

  return (
    <main className="flex flex-col gap-6">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {data.status.map((d) => (
          <StatCard key={d.id} data={d} />
        ))}
      </section>

      <section className="grid lg:grid-cols-12 gap-6 pb-6">
        <section className="lg:col-span-8 flex flex-col gap-6">
          <ClassCard data={data.sched} />

          <footer className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.weekly.map((d) => (
              <WeeklyCard key={d.id} data={d} />
            ))}
          </footer>
        </section>

        <section className="lg:col-span-4 h-full">
          <ArrivalCard data={data.arrivals} />
        </section>
      </section>
    </main>
  )
}
