'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { savePrestasi, getPrestasi } from '@/lib/store'

function Form() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const editId = searchParams.get('id')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (editId) {
      getPrestasi().then((all) => {
        const item = all.find((p) => p.id === editId)
        if (item) {
          setTitle(item.title)
          setDescription(item.description)
        }
      })
    }
  }, [editId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const id = editId || String(Date.now())
    const existing = await getPrestasi()
    const maxOrder = existing.reduce((max, p) => Math.max(max, p.order), 0)
    await savePrestasi({
      id,
      title,
      description,
      order: editId ? (existing.find((p) => p.id === editId)?.order || maxOrder + 1) : maxOrder + 1,
    })
    setSaving(false)
    router.push('/admin/prestasi')
  }

  return (
    <div>
      <Link href="/admin/prestasi" className="inline-flex items-center gap-2 text-sm text-gray-muted hover:text-accent transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Kembali
      </Link>
      <h1 className="text-2xl font-bold mb-6">{editId ? 'Edit Prestasi' : 'Tambah Prestasi'}</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] space-y-4 md:space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Judul Prestasi <span className="text-red-500">*</span></label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required
              placeholder="Contoh: Juara 1 International Essay Competition ALIEC 2025"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#fff8f0] focus:outline-none focus:ring-2 focus:ring-[#f97316]/30 focus:border-[#f97316] transition-all text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Keterangan</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}
              placeholder="Contoh: IMMawati Dini Nur Azizah"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#fff8f0] focus:outline-none focus:ring-2 focus:ring-[#f97316]/30 focus:border-[#f97316] transition-all text-sm" />
          </div>
        </div>

        <div className="flex items-center gap-3 mt-6">
          <button type="submit" disabled={saving}
            className="bg-gradient-to-r from-[#f97316] to-[#f0a500] text-white font-semibold px-8 py-3 rounded-full transition-all hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            {saving ? 'Menyimpan...' : (editId ? 'Simpan Perubahan' : 'Simpan')}
          </button>
          <Link href="/admin/prestasi"
            className="px-6 py-3 rounded-full border border-gray-200 text-gray-600 font-medium text-sm hover:bg-gray-50 transition-all">
            Batal
          </Link>
        </div>
      </form>
    </div>
  )
}

export default function TambahPrestasi() {
  return <Suspense><Form /></Suspense>
}
