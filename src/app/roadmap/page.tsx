'use client'

import { useState, useEffect } from 'react'
import { getRoadmap } from '@/lib/store'
import type { RoadmapItem } from '@/types'

const statusLabel: Record<string, string> = { planned: 'Direncanakan', ongoing: 'Berjalan', completed: 'Selesai' }
const statusColor: Record<string, string> = {
  planned: 'bg-gray-100 text-gray-600',
  ongoing: 'bg-blue-50 text-blue-600',
  completed: 'bg-green-50 text-green-600',
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00')
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
  return `${months[d.getMonth()]} ${d.getFullYear()}`
}

export default function RoadmapPage() {
  const [items, setItems] = useState<RoadmapItem[]>([])

  useEffect(() => {
    getRoadmap().then((data) => setItems(data.sort((a, b) => (a.date < b.date ? -1 : 1))))
  }, [])

  return (
    <main className="min-h-screen pt-28 md:pt-36 pb-20 px-4 md:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[rgba(249,115,22,0.1)] text-[#f97316] text-xs font-semibold tracking-wide uppercase mb-3">
            Roadmap
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark">
            Peta Perjuangan
          </h1>
          <p className="text-gray-muted mt-3 max-w-lg mx-auto text-sm md:text-base">
            Langkah dan capaian PK IMM Siti Munjiyah dalam setiap periode
          </p>
        </div>

        {items.length === 0 && (
          <div className="text-center py-20 text-gray-muted text-sm">Belum ada data roadmap.</div>
        )}

        {/* Desktop Timeline */}
        <div className="hidden md:block relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#f97316]/40 via-[#f0a500]/40 to-[#f97316]/40 -translate-x-1/2" />

          {items.map((item, i) => (
            <div key={item.id} className={`relative flex items-start ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} mb-10`}>
              <div className="w-1/2 px-8">
                <div className={`${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100 max-w-md ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    {item.icon && <span className="text-3xl block mb-2">{item.icon}</span>}
                    <p className="text-xs font-semibold text-[#f97316] uppercase tracking-wider mb-1">{formatDate(item.date)}</p>
                    <h3 className="text-lg font-bold text-dark mb-1">{item.title}</h3>
                    {item.description && <p className="text-sm text-gray-muted mb-3">{item.description}</p>}
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColor[item.status] || 'bg-gray-100 text-gray-600'}`}>
                      {statusLabel[item.status] || item.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
                <div className="w-5 h-5 rounded-full bg-white border-2 border-[#f97316] shadow-sm z-10" />
              </div>

              <div className="w-1/2" />
            </div>
          ))}
        </div>

        {/* Mobile Stacked */}
        <div className="md:hidden space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100">
              {item.icon && <span className="text-3xl block mb-2">{item.icon}</span>}
              <p className="text-xs font-semibold text-[#f97316] uppercase tracking-wider mb-1">{formatDate(item.date)}</p>
              <h3 className="text-lg font-bold text-dark mb-1">{item.title}</h3>
              {item.description && <p className="text-sm text-gray-muted mb-3">{item.description}</p>}
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColor[item.status] || 'bg-gray-100 text-gray-600'}`}>
                {statusLabel[item.status] || item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
