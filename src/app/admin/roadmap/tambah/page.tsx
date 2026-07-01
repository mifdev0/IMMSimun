'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { saveRoadmapItem, getRoadmap } from '@/lib/store'
import type { RoadmapItem } from '@/types'

function Form() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const editId = searchParams.get('id')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [status, setStatus] = useState<'planned' | 'ongoing' | 'completed'>('planned')
  const [icon, setIcon] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (editId) {
      getRoadmap().then((all) => {
        const item = all.find((r) => r.id === editId)
        if (item) {
          setTitle(item.title)
          setDescription(item.description)
          setDate(item.date)
          setStatus(item.status)
          setIcon(item.icon)
        }
      })
    }
  }, [editId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const id = editId || String(Date.now())
    const existing = await getRoadmap()
    const maxOrder = existing.reduce((max, r) => Math.max(max, r.order), 0)
    await saveRoadmapItem({
      id,
      title,
      description,
      date,
      status,
      icon,
      order: editId ? (existing.find((r) => r.id === editId)?.order || maxOrder + 1) : maxOrder + 1,
    })
    router.push('/admin/roadmap')
  }

  return (
    <div>
      <Link href="/admin/roadmap" className="inline-flex items-center gap-2 text-sm text-gray-muted hover:text-accent transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Kembali
      </Link>
      <h1 className="text-2xl font-bold mb-6">{editId ? 'Edit Item Roadmap' : 'Tambah Item Roadmap'}</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] space-y-4 md:space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Judul <span className="text-red-500">*</span></label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required
              placeholder="Contoh: Pelantikan Pengurus Baru"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#fff8f0] focus:outline-none focus:ring-2 focus:ring-[#f97316]/30 focus:border-[#f97316] transition-all text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Deskripsi</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)}
              placeholder="Deskripsi item roadmap"
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#fff8f0] focus:outline-none focus:ring-2 focus:ring-[#f97316]/30 focus:border-[#f97316] transition-all text-sm resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Tanggal <span className="text-red-500">*</span></label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#fff8f0] focus:outline-none focus:ring-2 focus:ring-[#f97316]/30 focus:border-[#f97316] transition-all text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value as 'planned' | 'ongoing' | 'completed')}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#fff8f0] focus:outline-none focus:ring-2 focus:ring-[#f97316]/30 focus:border-[#f97316] transition-all text-sm">
              <option value="planned">Direncanakan</option>
              <option value="ongoing">Berjalan</option>
              <option value="completed">Selesai</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Ikon (emoji)</label>
            <input type="text" value={icon} onChange={(e) => setIcon(e.target.value)}
              placeholder="Contoh: 🎉"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#fff8f0] focus:outline-none focus:ring-2 focus:ring-[#f97316]/30 focus:border-[#f97316] transition-all text-sm" />
          </div>
        </div>

        <div className="flex items-center gap-3 mt-6">
          <button type="submit" disabled={loading}
            className="bg-gradient-to-r from-[#f97316] to-[#f0a500] text-white font-semibold px-8 py-3 rounded-full transition-all hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? 'Menyimpan...' : editId ? 'Simpan Perubahan' : 'Simpan'}
          </button>
          <Link href="/admin/roadmap"
            className="px-6 py-3 rounded-full border border-gray-200 text-gray-600 font-medium text-sm hover:bg-gray-50 transition-all">
            Batal
          </Link>
        </div>
      </form>
    </div>
  )
}

export default function TambahRoadmap() {
  return <Suspense><Form /></Suspense>
}
