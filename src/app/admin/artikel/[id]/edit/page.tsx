'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Upload, X } from 'lucide-react'
import Link from 'next/link'
import { getArticles, saveArticle } from '@/lib/store'

export default function EditArtikel() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()
  const fileRef = useRef<HTMLInputElement>(null)
  const [article, setArticle] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const [judul, setJudul] = useState('')
  const [kategori, setKategori] = useState('Artikel')
  const [penulis, setPenulis] = useState('')
  const [tanggal, setTanggal] = useState('')
  const [status, setStatus] = useState<'draft' | 'published'>('draft')
  const [konten, setKonten] = useState('')
  const [images, setImages] = useState<string[]>([])

  useEffect(() => {
    getArticles().then((all) => {
      const found = all.find((a) => a.id === id)
      if (found) {
        setArticle(found)
        setJudul(found.title)
        setKategori(found.category)
        setPenulis(found.author)
        setTanggal(found.published_at)
        setStatus(found.status)
        setKonten(found.content)
        setImages(found.images?.map((i: any) => i.image_url) || [])
      }
      setLoading(false)
    })
  }, [id])

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
    if (!article) return
    await saveArticle({
      ...article,
      title: judul,
      category: kategori as any,
      author: penulis,
      published_at: tanggal,
      content: konten || '<p></p>',
      status,
      images: images.map((url, i) => ({ id: article.id + '-' + i, artikel_id: article.id, image_url: url, order: i })),
    })
    router.push('/admin/artikel')
  }

  if (loading) return <div className="text-center py-20"><p className="text-gray-muted">Memuat...</p></div>
  if (!article) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-muted">Artikel tidak ditemukan.</p>
        <Link href="/admin/artikel" className="text-accent font-medium text-sm mt-2 inline-block">Kembali</Link>
      </div>
    )
  }

  const kategoriList = ['Agenda', 'Artikel', 'Hikmah', 'Kegiatan'] as const

  return (
    <div>
      <Link href="/admin/artikel" className="inline-flex items-center gap-2 text-sm text-gray-muted hover:text-accent transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Kembali
      </Link>
      <h1 className="text-2xl font-bold mb-6">Edit Artikel</h1>

      <form onSubmit={handleSubmit} className="max-w-3xl">
        <div className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Judul <span className="text-red-500">*</span></label>
            <input type="text" value={judul} onChange={(e) => setJudul(e.target.value)} required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#fff8f0] focus:outline-none focus:ring-2 focus:ring-[#f97316]/30 focus:border-[#f97316] transition-all text-sm" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Kategori <span className="text-red-500">*</span></label>
              <select value={kategori} onChange={(e) => setKategori(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#fff8f0] focus:outline-none focus:ring-2 focus:ring-[#f97316]/30 focus:border-[#f97316] transition-all text-sm">
                {kategoriList.map((k) => <option key={k}>{k}</option>)}
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
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Foto Dokumentasi</label>
            <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleFile} className="hidden" />
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
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Konten <span className="text-red-500">*</span></label>
            <textarea value={konten} onChange={(e) => setKonten(e.target.value)} rows={12} required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#fff8f0] focus:outline-none focus:ring-2 focus:ring-[#f97316]/30 focus:border-[#f97316] transition-all text-sm resize-y" />
          </div>
        </div>

        <div className="flex items-center gap-3 mt-6">
          <button type="submit"
            className="bg-gradient-to-r from-[#f97316] to-[#f0a500] text-white font-semibold px-8 py-3 rounded-full transition-all hover:shadow-lg active:scale-[0.98]">
            Simpan Perubahan
          </button>
          <Link href="/admin/artikel"
            className="px-6 py-3 rounded-full border border-gray-200 text-gray-600 font-medium text-sm hover:bg-gray-50 transition-all">
            Batal
          </Link>
        </div>
      </form>
    </div>
  )
}
