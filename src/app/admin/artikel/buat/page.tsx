'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Upload, X, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { saveArticle, getArticles, getKategoris } from '@/lib/store'
import { slugify } from '@/lib/utils'
import RichEditor from '@/components/RichEditor'
import LoadingOverlay from '@/components/LoadingOverlay'
import { showToast } from '@/components/Toast'

export default function BuatArtikel() {
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)
  const [judul, setJudul] = useState('')
  const [kategori, setKategori] = useState('')
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [penulis, setPenulis] = useState('')
  const [tanggal, setTanggal] = useState(new Date().toISOString().split('T')[0])
  const [status, setStatus] = useState<'draft' | 'published'>('draft')
  const [konten, setKonten] = useState('')
  const [images, setImages] = useState<string[]>([])

  useEffect(() => {
    getKategoris('artikel').then((kats) => {
      setCategories(kats)
      if (kats.length > 0 && !kategori) setKategori(kats[0].name)
    })
  }, [])

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    Array.from(files).forEach((file) => {
      if (file.size > 5 * 1024 * 1024) return
      const reader = new FileReader()
      reader.onload = () => {
        if (reader.result) setImages((prev) => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    })
    e.target.value = ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const newId = String(Date.now())
      await saveArticle({
        id: newId,
        title: judul,
        slug: slugify(judul) + '-' + newId,
        category: kategori as any,
        author: penulis,
        published_at: tanggal,
        content: konten || '<p></p>',
        status,
        created_at: new Date().toISOString(),
        images: images.map((url, i) => ({ id: newId + '-' + i, artikel_id: newId, image_url: url, order: i })),
      })
      showToast('success', 'Berhasil disimpan')
      router.push('/admin/artikel')
    } catch (e: any) {
      showToast('error', 'Gagal menyimpan: ' + e.message)
      setLoading(false)
    }
  }

  return (
    <div>
      <Link href="/admin/artikel" className="inline-flex items-center gap-2 text-sm text-gray-muted hover:text-accent transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Kembali
      </Link>
      <h1 className="text-2xl font-bold mb-6">Buat Artikel Baru</h1>

      <form onSubmit={handleSubmit} className="max-w-3xl">
        <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] space-y-4 md:space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Judul <span className="text-red-500">*</span></label>
            <input type="text" value={judul} onChange={(e) => setJudul(e.target.value)} required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#fff8f0] focus:outline-none focus:ring-2 focus:ring-[#f97316]/30 focus:border-[#f97316] transition-all text-sm" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Kategori <span className="text-red-500">*</span></label>
              <select value={kategori} onChange={(e) => setKategori(e.target.value)} required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#fff8f0] focus:outline-none focus:ring-2 focus:ring-[#f97316]/30 focus:border-[#f97316] transition-all text-sm">
                {categories.map((k) => (
                  <option key={k.id} value={k.name}>{k.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Penulis <span className="text-red-500">*</span></label>
              <input type="text" value={penulis} onChange={(e) => setPenulis(e.target.value)} required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#fff8f0] focus:outline-none focus:ring-2 focus:ring-[#f97316]/30 focus:border-[#f97316] transition-all text-sm" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Tanggal Publish</label>
              <input type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#fff8f0] focus:outline-none focus:ring-2 focus:ring-[#f97316]/30 focus:border-[#f97316] transition-all text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
              <div className="flex gap-2 h-full items-center pt-1">
                <button type="button" onClick={() => setStatus('draft')}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${status === 'draft' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-50 text-gray-400'}`}>
                  Draft
                </button>
                <button type="button" onClick={() => setStatus('published')}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-50 text-gray-400'}`}>
                  Published
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Foto Dokumentasi <span className="text-gray-400 text-xs">(maks 5MB per foto)</span></label>
            <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleFile} className="hidden" />
            {images.length === 0 ? (
              <div onClick={() => fileRef.current?.click()} className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-accent transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-accent/50 mx-auto mb-2" />
                <p className="text-sm text-gray-muted">Klik untuk upload foto</p>
                <p className="text-xs text-gray-400 mt-1">Bisa lebih dari satu foto</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-3">
                {images.map((img, i) => (
                  <div key={i} className="relative w-24 h-24 rounded-xl overflow-hidden border border-gray-200 group">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    <button type="button" onClick={() => setImages((prev) => prev.filter((_, j) => j !== i))}
                      className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <button type="button" onClick={() => fileRef.current?.click()}
                  className="w-24 h-24 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center text-accent/50 hover:border-accent transition-colors">
                  <Upload className="w-6 h-6" />
                </button>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Konten <span className="text-red-500">*</span></label>
            <RichEditor content={konten} onChange={setKonten} />
          </div>
        </div>

        <div className="flex items-center gap-3 mt-6">
          <button type="submit" disabled={loading}
            className="bg-gradient-to-r from-[#f97316] to-[#f0a500] text-white font-semibold px-8 py-3 rounded-full transition-all hover:shadow-lg active:scale-[0.98] disabled:opacity-60 flex items-center gap-2">
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? 'Menyimpan...' : status === 'published' ? 'Publikasikan' : 'Simpan sebagai Draft'}
          </button>
          <Link href="/admin/artikel"
            className="px-6 py-3 rounded-full border border-gray-200 text-gray-600 font-medium text-sm hover:bg-gray-50 transition-all">
            Batal
          </Link>
        </div>
      </form>
      <LoadingOverlay open={loading} message="Menyimpan..." />
    </div>
  )
}
