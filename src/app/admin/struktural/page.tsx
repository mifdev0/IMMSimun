'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Pencil, Trash2, User, ArrowUp, ArrowDown } from 'lucide-react'
import { getPengurus, deletePengurus, savePengurus } from '@/lib/store'

type GroupKey = 'pimpinan' | 'bidang' | 'unit'

const tabs: { key: GroupKey; label: string }[] = [
  { key: 'pimpinan', label: 'Pimpinan Umum' },
  { key: 'bidang', label: 'Bidang' },
  { key: 'unit', label: 'Unit' },
]

const bidangList = [
  'Bidang Organisasi',
  'Bidang Kader',
  'Bidang HPKP',
  'Bidang RPK',
  'Bidang SPM',
  'Bidang IMMawati',
  'Bidang TKK',
  'Bidang Medkom',
  'Bidang SBO',
]

const unitList = [
  'LO BUMK',
  'LSO PUSAKA',
  'LSO LENTERA',
  'LSO IMD',
  'LSO GARDA',
]

export default function AdminStruktural() {
  const [list, setList] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState<GroupKey>('pimpinan')

  useEffect(() => { getPengurus().then(setList) }, [])
  const [selectedBidang, setSelectedBidang] = useState('Bidang Organisasi')
  const [selectedUnit, setSelectedUnit] = useState('LO BUMK')

  const refresh = async () => { const data = await getPengurus(); setList(data) }

  const handleDelete = async (id: string) => {
    if (confirm('Hapus pengurus ini?')) {
      await deletePengurus(id)
      refresh()
    }
  }

  const moveUp = async (id: string) => {
    const data = await getPengurus()
    const items = data.filter((p) => p.group === activeTab && (activeTab !== 'bidang' || p.unit_name === selectedBidang) && (activeTab !== 'unit' || p.unit_name === selectedUnit)).sort((a, b) => a.order - b.order)
    const idx = items.findIndex((p) => p.id === id)
    if (idx <= 0) return
    const temp = items[idx].order
    items[idx].order = items[idx - 1].order
    items[idx - 1].order = temp
    await Promise.all(items.map((p) => savePengurus(p)))
    refresh()
  }

  const moveDown = async (id: string) => {
    const data = await getPengurus()
    const items = data.filter((p) => p.group === activeTab && (activeTab !== 'bidang' || p.unit_name === selectedBidang) && (activeTab !== 'unit' || p.unit_name === selectedUnit)).sort((a, b) => a.order - b.order)
    const idx = items.findIndex((p) => p.id === id)
    if (idx < 0 || idx >= items.length - 1) return
    const temp = items[idx].order
    items[idx].order = items[idx + 1].order
    items[idx + 1].order = temp
    await Promise.all(items.map((p) => savePengurus(p)))
    refresh()
  }

  const filtered = list.filter((p) => {
    if (p.group !== activeTab) return false
    if (activeTab === 'bidang') return p.unit_name === selectedBidang
    if (activeTab === 'unit') return p.unit_name === selectedUnit
    return true
  }).sort((a, b) => a.order - b.order)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Manajemen Struktural</h1>
        <Link href="/admin/struktural/tambah"
          className="flex items-center gap-2 bg-gradient-to-r from-[#f97316] to-[#f0a500] text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:shadow-lg hover:shadow-[rgba(249,115,22,0.3)]">
          <Plus className="w-4 h-4" /> Tambah Pengurus
        </Link>
      </div>

      <div className="flex gap-2 mb-6">
        {tabs.map((tab) => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === tab.key
                ? 'bg-gradient-to-r from-[#f97316] to-[#f0a500] text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-accent hover:text-accent'
            }`}>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'bidang' && (
        <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-2">
          {bidangList.map((b) => (
            <button key={b} onClick={() => setSelectedBidang(b)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedBidang === b
                  ? 'bg-gradient-to-r from-[#f97316] to-[#f0a500] text-white'
                  : 'bg-white border border-gray-200 text-gray-500 hover:border-accent hover:text-accent'
              }`}>
              {b.replace('Bidang ', '')}
            </button>
          ))}
        </div>
      )}

      {activeTab === 'unit' && (
        <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-2">
          {unitList.map((u) => (
            <button key={u} onClick={() => setSelectedUnit(u)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedUnit === u
                  ? 'bg-gradient-to-r from-[#f97316] to-[#f0a500] text-white'
                  : 'bg-white border border-gray-200 text-gray-500 hover:border-accent hover:text-accent'
              }`}>
              {u}
            </button>
          ))}
        </div>
      )}

      {activeTab === 'bidang' && (
        <div className="mb-4">
          <Link href={`/admin/struktural/tambah?group=bidang&unit=${encodeURIComponent(selectedBidang)}`}
            className="inline-flex items-center gap-1.5 text-sm text-accent font-medium hover:underline">
            <Plus className="w-4 h-4" /> Tambah Anggota {selectedBidang.replace('Bidang ', '')}
          </Link>
        </div>
      )}

      {activeTab === 'unit' && (
        <div className="mb-4">
          <Link href={`/admin/struktural/tambah?group=unit&unit=${encodeURIComponent(selectedUnit)}`}
            className="inline-flex items-center gap-1.5 text-sm text-accent font-medium hover:underline">
            <Plus className="w-4 h-4" /> Tambah Anggota {selectedUnit}
          </Link>
        </div>
      )}

      <div className="bg-white rounded-xl md:rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="overflow-x-auto -mx-4 md:-mx-6 px-4 md:px-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="text-left py-4 px-6 font-medium text-gray-muted w-16">Urutan</th>
                <th className="text-left py-4 px-6 font-medium text-gray-muted">Foto</th>
                <th className="text-left py-4 px-6 font-medium text-gray-muted">Nama</th>
                <th className="text-left py-4 px-6 font-medium text-gray-muted">Jabatan</th>
                <th className="text-left py-4 px-6 font-medium text-gray-muted">Bidang / Unit</th>
                <th className="text-right py-4 px-6 font-medium text-gray-muted">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((p, i) => (
                <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1">
                      <span className="text-gray-400 text-xs font-mono w-4">{i + 1}</span>
                      <div className="flex flex-col gap-0.5">
                        <button onClick={() => moveUp(p.id)} disabled={i === 0}
                          className="p-0.5 rounded text-gray-300 hover:text-accent disabled:opacity-20 disabled:cursor-not-allowed">
                          <ArrowUp className="w-3 h-3" />
                        </button>
                        <button onClick={() => moveDown(p.id)} disabled={i === filtered.length - 1}
                          className="p-0.5 rounded text-gray-300 hover:text-accent disabled:opacity-20 disabled:cursor-not-allowed">
                          <ArrowDown className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    {p.photo_url ? (
                      <img src={p.photo_url} alt={p.name} className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[rgba(249,115,22,0.1)] to-[rgba(240,165,0,0.1)] flex items-center justify-center text-accent">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-6 font-medium">{p.name}</td>
                  <td className="py-4 px-6 text-gray-muted">{p.position}</td>
                  <td className="py-4 px-6 text-gray-muted">{p.unit_name || '-'}</td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/struktural/tambah?id=${p.id}`} className="p-2 rounded-lg text-gray-400 hover:text-accent hover:bg-[rgba(249,115,22,0.06)] transition-all inline-flex">
                        <Pencil className="w-4 h-4" />
                      </Link>
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
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-muted text-sm">Belum ada pengurus.</div>
        )}
      </div>
    </div>
  )
}
