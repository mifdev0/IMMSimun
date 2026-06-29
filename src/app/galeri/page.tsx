'use client'

import { useState, useEffect } from 'react'
import { getGaleri } from '@/lib/store'
import { ImageIcon, X } from 'lucide-react'

const categories = ['Semua', 'Kaderisasi', 'Intelektual', 'Sosial', 'Kegiatan', 'Prestasi']

export default function GaleriPage() {
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [galeri, setGaleri] = useState<any[]>([])
  const [selectedFoto, setSelectedFoto] = useState<any>(null)

  useEffect(() => { getGaleri().then(setGaleri) }, [])

  const filtered = activeCategory === 'Semua' ? galeri : galeri.filter((f: any) => f.category === activeCategory)

  return (
    <div className="pb-20 bg-[#fff8f0] min-h-screen">
      <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16">
        <div className="text-center pt-12 mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[rgba(249,115,22,0.1)] text-accent text-xs font-semibold uppercase tracking-widest mb-4 border border-[rgba(249,115,22,0.2)]">
            Galeri
          </span>
          <h1 className="text-3xl md:text-5xl font-bold">Dokumentasi <span className="bg-gradient-to-r from-[#f97316] to-[#f0a500] bg-clip-text text-transparent">Kegiatan</span></h1>
          <p className="text-gray-muted mt-3">Momen-momen berharga dalam setiap kegiatan IMM Siti Munjiyah.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-[#f97316] to-[#f0a500] text-white'
                  : 'bg-transparent text-gray-muted border border-[rgba(0,0,0,0.08)] hover:border-accent hover:text-accent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((foto) => (
            <div
              key={foto.id}
              onClick={() => setSelectedFoto(foto)}
              className="aspect-square rounded-2xl overflow-hidden bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_40px_rgba(249,115,22,0.1)] transition-all duration-300 group cursor-pointer"
            >
              <div className="w-full h-full bg-gradient-to-br from-[rgba(249,115,22,0.12)] to-[rgba(240,165,0,0.08)] flex items-center justify-center relative overflow-hidden">
                {foto.image_url ? (
                  <img src={foto.image_url} alt={foto.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="text-center z-10">
                    <ImageIcon className="w-8 h-8 text-accent/40 mx-auto mb-2" />
                    <span className="text-sm font-semibold text-accent/60 group-hover:text-accent transition-colors block">{foto.caption}</span>
                    <span className="text-[10px] text-gray-muted/60">{foto.category}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedFoto && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setSelectedFoto(null)}>
          <div className="relative max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedFoto(null)} className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
            <div className="bg-white rounded-2xl p-6">
              <div className="aspect-video rounded-xl bg-gradient-to-br from-[rgba(249,115,22,0.12)] to-[rgba(240,165,0,0.08)] flex items-center justify-center mb-4 overflow-hidden">
                {selectedFoto.image_url ? (
                  <img src={selectedFoto.image_url} alt={selectedFoto.caption} className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-16 h-16 text-accent/40" />
                )}
              </div>
              <p className="font-semibold">{selectedFoto.caption}</p>
              <p className="text-xs text-gray-muted">{selectedFoto.category}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
