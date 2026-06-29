'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Upload, X, Crop } from 'lucide-react'
import Link from 'next/link'
import { saveGaleri } from '@/lib/store'
import ImageCropper from '@/components/ImageCropper'

export default function TambahFoto() {
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)
  const [image, setImage] = useState('')
  const [cropTarget, setCropTarget] = useState('')
  const [caption, setCaption] = useState('')
  const [kategori, setKategori] = useState('Kaderisasi')
  const [tanggal, setTanggal] = useState(new Date().toISOString().split('T')[0])

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || file.size > 5 * 1024 * 1024) return
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.result) setCropTarget(reader.result as string)
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!image) return
    await saveGaleri({
      id: String(Date.now()),
      image_url: image,
      caption,
      category: kategori,
      event_date: tanggal,
      created_at: new Date().toISOString(),
    })
    router.push('/admin/galeri')
  }

  return (
    <div>
      <Link href="/admin/galeri" className="inline-flex items-center gap-2 text-sm text-gray-muted hover:text-accent transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Kembali
      </Link>
      <h1 className="text-2xl font-bold mb-6">Tambah Foto</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Foto <span className="text-red-500">*</span></label>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
            {!image ? (
              <div onClick={() => fileRef.current?.click()} className="border-2 border-dashed border-gray-200 rounded-xl p-10 text-center hover:border-accent transition-colors cursor-pointer">
                <Upload className="w-10 h-10 text-accent/50 mx-auto mb-3" />
                <p className="text-sm text-gray-muted">Klik untuk upload & crop foto</p>
                <p className="text-xs text-gray-400 mt-1">Maks 5MB</p>
              </div>
            ) : (
              <div className="relative inline-block group">
                <img src={image} alt="Preview" className="max-h-64 rounded-xl border border-gray-200" />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-2">
                  <button type="button" onClick={() => fileRef.current?.click()}
                    className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/40 transition-all">
                    <Crop className="w-4 h-4" />
                  </button>
                  <button type="button" onClick={() => setImage('')}
                    className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-red-400 transition-all">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Judul / Keterangan</label>
            <input type="text" value={caption} onChange={(e) => setCaption(e.target.value)}
              placeholder="Contoh: DAD 2025"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#fff8f0] focus:outline-none focus:ring-2 focus:ring-[#f97316]/30 focus:border-[#f97316] transition-all text-sm" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Kategori Kegiatan</label>
              <select value={kategori} onChange={(e) => setKategori(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#fff8f0] focus:outline-none focus:ring-2 focus:ring-[#f97316]/30 focus:border-[#f97316] transition-all text-sm">
                <option>Kaderisasi</option>
                <option>Intelektual</option>
                <option>Sosial</option>
                <option>Kegiatan</option>
                <option>Prestasi</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Tanggal Kegiatan</label>
              <input type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#fff8f0] focus:outline-none focus:ring-2 focus:ring-[#f97316]/30 focus:border-[#f97316] transition-all text-sm" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-6">
          <button type="submit" disabled={!image}
            className="bg-gradient-to-r from-[#f97316] to-[#f0a500] text-white font-semibold px-8 py-3 rounded-full transition-all hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed">
            Upload Foto
          </button>
          <Link href="/admin/galeri"
            className="px-6 py-3 rounded-full border border-gray-200 text-gray-600 font-medium text-sm hover:bg-gray-50 transition-all">
            Batal
          </Link>
        </div>
      </form>

      {cropTarget && (
        <ImageCropper
          image={cropTarget}
          aspect={16 / 9}
          cropShape="rect"
          onCropDone={(dataUrl) => { setImage(dataUrl); setCropTarget('') }}
          onCancel={() => setCropTarget('')}
        />
      )}
    </div>
  )
}
