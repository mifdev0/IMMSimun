'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown, Map } from 'lucide-react'
import { getRoadmap, deleteRoadmapItem, saveRoadmapItem } from '@/lib/store'
import type { RoadmapItem } from '@/types'

export default function AdminRoadmap() {
  const [list, setList] = useState<RoadmapItem[]>([])

  useEffect(() => { refresh() }, [])

  const refresh = async () => {
    const data = await getRoadmap()
    setList(data.sort((a, b) => a.order - b.order))
  }

  const handleDelete = async (id: string) => {
    if (confirm('Hapus item roadmap ini?')) {
      await deleteRoadmapItem(id)
      refresh()
    }
  }

  const moveUp = async (id: string) => {
    const data = await getRoadmap()
    const items = data.sort((a, b) => a.order - b.order)
    const idx = items.findIndex((r) => r.id === id)
    if (idx <= 0) return
    const temp = items[idx].order
    items[idx].order = items[idx - 1].order
    items[idx - 1].order = temp
    await Promise.all(items.map((r) => saveRoadmapItem(r)))
    refresh()
  }

  const moveDown = async (id: string) => {
    const data = await getRoadmap()
    const items = data.sort((a, b) => a.order - b.order)
    const idx = items.findIndex((r) => r.id === id)
    if (idx < 0 || idx >= items.length - 1) return
    const temp = items[idx].order
    items[idx].order = items[idx + 1].order
    items[idx + 1].order = temp
    await Promise.all(items.map((r) => saveRoadmapItem(r)))
    refresh()
  }

  const statusLabel: Record<string, string> = { planned: 'Direncanakan', ongoing: 'Berjalan', completed: 'Selesai' }
  const statusColor: Record<string, string> = {
    planned: 'bg-gray-100 text-gray-600',
    ongoing: 'bg-blue-50 text-blue-600',
    completed: 'bg-green-50 text-green-600',
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Manajemen Roadmap</h1>
        <Link href="/admin/roadmap/tambah"
          className="flex items-center gap-2 bg-gradient-to-r from-[#f97316] to-[#f0a500] text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:shadow-lg hover:shadow-[rgba(249,115,22,0.3)]">
          <Plus className="w-4 h-4" /> Tambah Item
        </Link>
      </div>

      <div className="bg-white rounded-xl md:rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="overflow-x-auto -mx-4 md:-mx-6 px-4 md:px-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="text-left py-4 px-6 font-medium text-gray-muted w-16">Urutan</th>
                <th className="text-left py-4 px-6 font-medium text-gray-muted">Judul</th>
                <th className="text-left py-4 px-6 font-medium text-gray-muted">Tanggal</th>
                <th className="text-left py-4 px-6 font-medium text-gray-muted">Status</th>
                <th className="text-right py-4 px-6 font-medium text-gray-muted">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {list.map((r, i) => (
                <tr key={r.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1">
                      <Map className="w-4 h-4 text-accent/60" />
                      <span className="text-gray-400 text-xs font-mono w-4">{i + 1}</span>
                      <div className="flex flex-col gap-0.5">
                        <button onClick={() => moveUp(r.id)} disabled={i === 0}
                          className="p-0.5 rounded text-gray-300 hover:text-accent disabled:opacity-20 disabled:cursor-not-allowed">
                          <ArrowUp className="w-3 h-3" />
                        </button>
                        <button onClick={() => moveDown(r.id)} disabled={i === list.length - 1}
                          className="p-0.5 rounded text-gray-300 hover:text-accent disabled:opacity-20 disabled:cursor-not-allowed">
                          <ArrowDown className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-medium">{r.icon && <span className="mr-1">{r.icon}</span>}{r.title}</td>
                  <td className="py-4 px-6 text-gray-muted">{r.date}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColor[r.status] || 'bg-gray-100 text-gray-600'}`}>
                      {statusLabel[r.status] || r.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/roadmap/tambah?id=${r.id}`} className="p-2 rounded-lg text-gray-400 hover:text-accent hover:bg-[rgba(249,115,22,0.06)] transition-all inline-flex">
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button onClick={() => handleDelete(r.id)} className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {list.length === 0 && (
          <div className="text-center py-12 text-gray-muted text-sm">Belum ada data roadmap.</div>
        )}
      </div>
    </div>
  )
}
