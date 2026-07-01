'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, Tag } from 'lucide-react'
import { getKategoris, saveKategori, deleteKategori } from '@/lib/store'
import type { Kategori } from '@/types'

const tabs = [
  { id: 'artikel' as const, label: 'Kategori Artikel' },
  { id: 'galeri' as const, label: 'Kategori Galeri' },
]

export default function AdminKategori() {
  const [activeTab, setActiveTab] = useState<'artikel' | 'galeri'>('artikel')
  const [list, setList] = useState<Kategori[]>([])
  const [newName, setNewName] = useState('')

  useEffect(() => { refresh() }, [activeTab])

  const refresh = async () => {
    const data = await getKategoris(activeTab)
    setList(data.sort((a, b) => a.order - b.order))
  }

  const handleAdd = async () => {
    const name = newName.trim()
    if (!name) return
    const maxOrder = list.reduce((max, k) => Math.max(max, k.order), 0)
    await saveKategori({ id: String(Date.now()), type: activeTab, name, order: maxOrder + 1 })
    setNewName('')
    refresh()
  }

  const handleDelete = async (id: string) => {
    if (confirm('Hapus kategori ini?')) {
      await deleteKategori(id)
      refresh()
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Manajemen Kategori</h1>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-[#f97316] to-[#f0a500] text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] space-y-5">
        <div className="flex items-center gap-3">
          <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)}
            placeholder="Nama kategori baru..."
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-[#fff8f0] focus:outline-none focus:ring-2 focus:ring-[#f97316]/30 focus:border-[#f97316] transition-all text-sm" />
          <button onClick={handleAdd} disabled={!newName.trim()}
            className="flex items-center gap-2 bg-gradient-to-r from-[#f97316] to-[#f0a500] text-white px-5 py-3 rounded-full text-sm font-semibold transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
            <Plus className="w-4 h-4" /> Tambah
          </button>
        </div>

        <div className="space-y-2">
          {list.map((k) => (
            <div key={k.id} className="flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50/50 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Tag className="w-4 h-4 text-accent/60" />
                <span className="text-sm font-medium">{k.name}</span>
              </div>
              <button onClick={() => handleDelete(k.id)}
                className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          {list.length === 0 && (
            <p className="text-center py-8 text-gray-muted text-sm">Belum ada kategori.</p>
          )}
        </div>
      </div>
    </div>
  )
}
