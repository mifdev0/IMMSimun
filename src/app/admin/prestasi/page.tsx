'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown, Medal } from 'lucide-react'
import { getPrestasi, deletePrestasi, savePrestasi } from '@/lib/store'

export default function AdminPrestasi() {
  const [list, setList] = useState<any[]>([])

  useEffect(() => { getPrestasi().then((data) => setList(data.sort((a, b) => a.order - b.order))) }, [])

  const refresh = async () => { const data = await getPrestasi(); setList(data.sort((a, b) => a.order - b.order)) }

  const handleDelete = async (id: string) => {
    if (confirm('Hapus prestasi ini?')) {
      await deletePrestasi(id)
      refresh()
    }
  }

  const moveUp = async (id: string) => {
    const data = await getPrestasi()
    const items = data.sort((a, b) => a.order - b.order)
    const idx = items.findIndex((p) => p.id === id)
    if (idx <= 0) return
    const temp = items[idx].order
    items[idx].order = items[idx - 1].order
    items[idx - 1].order = temp
    await Promise.all(items.map((p) => savePrestasi(p)))
    refresh()
  }

  const moveDown = async (id: string) => {
    const data = await getPrestasi()
    const items = data.sort((a, b) => a.order - b.order)
    const idx = items.findIndex((p) => p.id === id)
    if (idx < 0 || idx >= items.length - 1) return
    const temp = items[idx].order
    items[idx].order = items[idx + 1].order
    items[idx + 1].order = temp
    await Promise.all(items.map((p) => savePrestasi(p)))
    refresh()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Manajemen Prestasi</h1>
        <Link href="/admin/prestasi/tambah"
          className="flex items-center gap-2 bg-gradient-to-r from-[#f97316] to-[#f0a500] text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:shadow-lg hover:shadow-[rgba(249,115,22,0.3)]">
          <Plus className="w-4 h-4" /> Tambah Prestasi
        </Link>
      </div>

      <div className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="text-left py-4 px-6 font-medium text-gray-muted w-16">Urutan</th>
                <th className="text-left py-4 px-6 font-medium text-gray-muted">Prestasi</th>
                <th className="text-left py-4 px-6 font-medium text-gray-muted">Keterangan</th>
                <th className="text-right py-4 px-6 font-medium text-gray-muted">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {list.map((p, i) => (
                <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1">
                      <Medal className="w-4 h-4 text-accent/60" />
                      <span className="text-gray-400 text-xs font-mono w-4">{i + 1}</span>
                      <div className="flex flex-col gap-0.5">
                        <button onClick={() => moveUp(p.id)} disabled={i === 0}
                          className="p-0.5 rounded text-gray-300 hover:text-accent disabled:opacity-20 disabled:cursor-not-allowed">
                          <ArrowUp className="w-3 h-3" />
                        </button>
                        <button onClick={() => moveDown(p.id)} disabled={i === list.length - 1}
                          className="p-0.5 rounded text-gray-300 hover:text-accent disabled:opacity-20 disabled:cursor-not-allowed">
                          <ArrowDown className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-medium">{p.title}</td>
                  <td className="py-4 px-6 text-gray-muted">{p.description}</td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 rounded-lg text-gray-400 hover:text-accent hover:bg-[rgba(249,115,22,0.06)] transition-all">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all">
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
          <div className="text-center py-12 text-gray-muted text-sm">Belum ada data prestasi.</div>
        )}
      </div>
    </div>
  )
}
