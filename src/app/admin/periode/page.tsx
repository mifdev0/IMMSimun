'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, Calendar } from 'lucide-react'
import { getPeriodes, savePeriode, deletePeriode } from '@/lib/store'
import type { Periode } from '@/types'

export default function AdminPeriode() {
  const [list, setList] = useState<Periode[]>([])
  const [newLabel, setNewLabel] = useState('')

  useEffect(() => { refresh() }, [])

  const refresh = async () => {
    const data = await getPeriodes()
    setList(data.sort((a, b) => (a.label > b.label ? -1 : 1)))
  }

  const handleAdd = async () => {
    const label = newLabel.trim()
    if (!label) return
    await savePeriode({ id: String(Date.now()), label, is_current: false })
    setNewLabel('')
    refresh()
  }

  const toggleCurrent = async (p: Periode) => {
    for (const item of list) {
      await savePeriode({ ...item, is_current: item.id === p.id })
    }
    refresh()
  }

  const handleDelete = async (id: string) => {
    if (confirm('Hapus periode ini?')) {
      try {
        await deletePeriode(id)
        refresh()
      } catch {
        alert('Tidak dapat menghapus periode yang masih memiliki pengurus.')
      }
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Manajemen Periode</h1>
      </div>

      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] space-y-5">
        <div className="flex items-center gap-3">
          <input type="text" value={newLabel} onChange={(e) => setNewLabel(e.target.value)}
            placeholder="Label periode baru (contoh: 2026/2027)..."
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-[#fff8f0] focus:outline-none focus:ring-2 focus:ring-[#f97316]/30 focus:border-[#f97316] transition-all text-sm" />
          <button onClick={handleAdd} disabled={!newLabel.trim()}
            className="flex items-center gap-2 bg-gradient-to-r from-[#f97316] to-[#f0a500] text-white px-5 py-3 rounded-full text-sm font-semibold transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
            <Plus className="w-4 h-4" /> Tambah
          </button>
        </div>

        <div className="space-y-2">
          {list.map((p) => (
            <div key={p.id} className="flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50/50 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-accent/60" />
                <span className="text-sm font-medium">{p.label}</span>
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input type="checkbox" checked={p.is_current} onChange={() => toggleCurrent(p)}
                    className="w-4 h-4 rounded border-gray-300 text-[#f97316] focus:ring-[#f97316]/30" />
                  Periode Saat Ini
                </label>
                <button onClick={() => handleDelete(p.id)}
                  className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {list.length === 0 && (
            <p className="text-center py-8 text-gray-muted text-sm">Belum ada periode.</p>
          )}
        </div>
      </div>
    </div>
  )
}
