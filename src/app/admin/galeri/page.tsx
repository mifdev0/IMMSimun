'use client'

import Link from 'next/link'
import { Plus, Pencil, Trash2, ImageIcon } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getGaleri, deleteGaleri } from '@/lib/store'

export default function AdminGaleri() {
  const [fotos, setFotos] = useState<any[]>([])

  useEffect(() => { getGaleri().then(setFotos) }, [])

  const handleDelete = async (id: string) => {
    if (confirm('Hapus foto ini?')) {
      await deleteGaleri(id)
      const data = await getGaleri()
      setFotos(data)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Manajemen Galeri</h1>
        <Link href="/admin/galeri/tambah"
          className="flex items-center gap-2 bg-gradient-to-r from-[#f97316] to-[#f0a500] text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:shadow-lg hover:shadow-[rgba(249,115,22,0.3)]">
          <Plus className="w-4 h-4" /> Tambah Foto
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {fotos.map((foto) => (
          <div key={foto.id} className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] group">
            <div className="aspect-square bg-gradient-to-br from-[rgba(249,115,22,0.12)] to-[rgba(240,165,0,0.08)] flex items-center justify-center relative overflow-hidden">
              {foto.image_url ? (
                <img src={foto.image_url} alt={foto.caption} className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="w-10 h-10 text-accent/40" />
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button className="p-2 rounded-lg bg-white/20 text-white hover:bg-white/40 transition-all">
                  <Pencil className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(foto.id)} className="p-2 rounded-lg bg-white/20 text-white hover:bg-red-400 transition-all">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-3">
              <p className="text-xs font-semibold truncate">{foto.caption}</p>
              <p className="text-[10px] text-gray-muted">{foto.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
