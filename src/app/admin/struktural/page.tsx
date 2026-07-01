'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Pencil, Trash2, User, ArrowUp, ArrowDown, CalendarPlus } from 'lucide-react'
import { getPengurus, deletePengurus, savePengurus, getPeriodes, savePeriode } from '@/lib/store'

type GroupKey = 'pimpinan' | 'bidang' | 'unit'

const tabs: { key: GroupKey; label: string }[] = [
  { key: 'pimpinan', label: 'Pimpinan Umum' },
  { key: 'bidang', label: 'Bidang' },
  { key: 'unit', label: 'Unit' },
]

const bidangList = [
  'Bidang Organisasi', 'Bidang Kader', 'Bidang HPKP', 'Bidang RPK',
  'Bidang SPM', 'Bidang IMMawati', 'Bidang TKK', 'Bidang Medkom', 'Bidang SBO',
]

const unitList = ['LO BUMK', 'LSO PUSAKA', 'LSO LENTERA', 'LSO IMD', 'LSO GARDA']

export default function AdminStruktural() {
  const [list, setList] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState<GroupKey>('pimpinan')
  const [selectedBidang, setSelectedBidang] = useState('Bidang Organisasi')
  const [selectedUnit, setSelectedUnit] = useState('LO BUMK')
  const [periods, setPeriods] = useState<any[]>([])
  const [selectedPeriodId, setSelectedPeriodId] = useState('')
  const [newPeriodLabel, setNewPeriodLabel] = useState('')

  useEffect(() => {
    getPeriodes().then((p) => {
      setPeriods(p)
      const current = p.find((per) => per.is_current)
      setSelectedPeriodId(current?.id || p[0]?.id || '')
    })
  }, [])

  useEffect(() => {
    if (selectedPeriodId) {
      getPengurus().then((all) => {
        const period = periods.find((p) => p.id === selectedPeriodId)
        setList(all.filter((x) => x.period === (period?.label || '')))
      })
    }
  }, [selectedPeriodId, periods])

  const refresh = async () => {
    if (!selectedPeriodId) return
    const all = await getPengurus()
    const period = periods.find((p) => p.id === selectedPeriodId)
    setList(all.filter((x) => x.period === (period?.label || '')))
  }

  const addPeriod = async () => {
    const label = newPeriodLabel.trim()
    if (!label) return
    await savePeriode({ id: String(Date.now()), label, is_current: false })
    setNewPeriodLabel('')
    const updated = await getPeriodes()
    setPeriods(updated)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Hapus pengurus ini?')) {
      await deletePengurus(id)
      refresh()
    }
  }

  const moveUp = async (id: string) => {
    const all = await getPengurus()
    const period = periods.find((p) => p.id === selectedPeriodId)
    const items = all.filter((x) => x.period === (period?.label || '')).sort((a, b) => a.order - b.order)
    const idx = items.findIndex((p) => p.id === id)
    if (idx <= 0) return
    const temp = items[idx].order; items[idx].order = items[idx - 1].order; items[idx - 1].order = temp
    await Promise.all(items.map((p) => savePengurus(p)))
    refresh()
  }

  const moveDown = async (id: string) => {
    const all = await getPengurus()
    const period = periods.find((p) => p.id === selectedPeriodId)
    const items = all.filter((x) => x.period === (period?.label || '')).sort((a, b) => a.order - b.order)
    const idx = items.findIndex((p) => p.id === id)
    if (idx < 0 || idx >= items.length - 1) return
    const temp = items[idx].order; items[idx].order = items[idx + 1].order; items[idx + 1].order = temp
    await Promise.all(items.map((p) => savePengurus(p)))
    refresh()
  }

  const filtered = list.filter((p) => {
    if (p.group !== activeTab) return false
    if (activeTab === 'bidang') return p.unit_name === selectedBidang
    if (activeTab === 'unit') return p.unit_name === selectedUnit
    return true
  }).sort((a, b) => a.order - b.order)

  const selectedLabel = periods.find((p) => p.id === selectedPeriodId)?.label || ''

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <h1 className="text-xl md:text-2xl font-bold">Struktural</h1>
        <div className="flex items-center gap-2">
          <select value={selectedPeriodId} onChange={(e) => setSelectedPeriodId(e.target.value)}
            className="px-4 py-2 rounded-full border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#f97316]/30">
            {periods.map((p) => (
              <option key={p.id} value={p.id}>{p.label} {p.is_current ? '(Saat Ini)' : ''}</option>
            ))}
          </select>
          <Link href={`/admin/struktural/tambah?period=${encodeURIComponent(selectedLabel)}`}
            className="flex items-center gap-1.5 bg-gradient-to-r from-[#f97316] to-[#f0a500] text-white px-4 py-2 rounded-full text-sm font-semibold transition-all hover:shadow-lg shrink-0">
            <Plus className="w-4 h-4" /> Tambah
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <input value={newPeriodLabel} onChange={(e) => setNewPeriodLabel(e.target.value)}
          placeholder="Periode baru (contoh: 2026/2027)"
          className="flex-1 max-w-xs px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#f97316]/30" />
        <button onClick={addPeriod} disabled={!newPeriodLabel.trim()}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200 text-gray-600 text-sm font-medium hover:border-accent hover:text-accent transition-all disabled:opacity-40">
          <CalendarPlus className="w-4 h-4" /> Buat Periode
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === tab.key ? 'bg-gradient-to-r from-[#f97316] to-[#f0a500] text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-accent hover:text-accent'
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
                selectedBidang === b ? 'bg-gradient-to-r from-[#f97316] to-[#f0a500] text-white' : 'bg-white border border-gray-200 text-gray-500 hover:border-accent hover:text-accent'
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
                selectedUnit === u ? 'bg-gradient-to-r from-[#f97316] to-[#f0a500] text-white' : 'bg-white border border-gray-200 text-gray-500 hover:border-accent hover:text-accent'
              }`}>
              {u}
            </button>
          ))}
        </div>
      )}

      <div className="text-xs text-gray-400 mb-3">Periode: <strong>{selectedLabel}</strong></div>

      <div className="bg-white rounded-xl md:rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="overflow-x-auto -mx-4 md:-mx-6 px-4 md:px-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="text-left py-3 md:py-4 px-4 md:px-6 font-medium text-gray-muted w-16 text-xs md:text-sm">Urutan</th>
                <th className="text-left py-3 md:py-4 px-4 md:px-6 font-medium text-gray-muted text-xs md:text-sm">Foto</th>
                <th className="text-left py-3 md:py-4 px-4 md:px-6 font-medium text-gray-muted text-xs md:text-sm">Nama</th>
                <th className="text-left py-3 md:py-4 px-4 md:px-6 font-medium text-gray-muted text-xs md:text-sm hidden sm:table-cell">Jabatan</th>
                <th className="text-left py-3 md:py-4 px-4 md:px-6 font-medium text-gray-muted text-xs md:text-sm hidden md:table-cell">Bidang/Unit</th>
                <th className="text-right py-3 md:py-4 px-4 md:px-6 font-medium text-gray-muted text-xs md:text-sm">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((p, i) => (
                <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 md:py-4 px-4 md:px-6">
                    <div className="flex items-center gap-1">
                      <span className="text-gray-400 text-xs font-mono w-4">{i + 1}</span>
                      <div className="flex flex-col gap-0.5">
                        <button onClick={() => moveUp(p.id)} disabled={i === 0}
                          className="p-0.5 rounded text-gray-300 hover:text-accent disabled:opacity-20"><ArrowUp className="w-3 h-3" /></button>
                        <button onClick={() => moveDown(p.id)} disabled={i === filtered.length - 1}
                          className="p-0.5 rounded text-gray-300 hover:text-accent disabled:opacity-20"><ArrowDown className="w-3 h-3" /></button>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 md:py-4 px-4 md:px-6">
                    {p.photo_url ? (
                      <img src={p.photo_url} alt={p.name} className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[rgba(249,115,22,0.1)] to-[rgba(240,165,0,0.1)] flex items-center justify-center text-accent"><User className="w-4 h-4" /></div>
                    )}
                  </td>
                  <td className="py-3 md:py-4 px-4 md:px-6 font-medium text-xs md:text-sm">{p.name}</td>
                  <td className="py-3 md:py-4 px-4 md:px-6 text-gray-muted text-xs hidden sm:table-cell">{p.position}</td>
                  <td className="py-3 md:py-4 px-4 md:px-6 text-gray-muted text-xs hidden md:table-cell">{p.unit_name || '-'}</td>
                  <td className="py-3 md:py-4 px-4 md:px-6 text-right">
                    <div className="flex items-center justify-end gap-1 md:gap-2">
                      <Link href={`/admin/struktural/tambah?id=${p.id}`}
                        className="p-1.5 md:p-2 rounded-lg text-gray-400 hover:text-accent hover:bg-[rgba(249,115,22,0.06)] transition-all inline-flex"><Pencil className="w-3.5 h-3.5 md:w-4 md:h-4" /></Link>
                      <button onClick={() => handleDelete(p.id)}
                        className="p-1.5 md:p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"><Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-muted text-sm">Belum ada pengurus untuk periode ini.</div>
        )}
      </div>
    </div>
  )
}
