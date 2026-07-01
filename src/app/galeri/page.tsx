'use client'

import { useState, useEffect } from 'react'
import { getGaleri, getKategoris } from '@/lib/store'
import { ImageIcon, X, ChevronLeft, ChevronRight } from 'lucide-react'

export default function GaleriPage() {
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [galeri, setGaleri] = useState<any[]>([])
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [categories, setCategories] = useState<string[]>(['Semua'])

  useEffect(() => {
    getGaleri().then(setGaleri)
    getKategoris('galeri').then((kats) =>
      setCategories(['Semua', ...kats.map((k) => k.name)])
    )
  }, [])

  const filtered = activeCategory === 'Semua' ? galeri : galeri.filter((f: any) => f.category === activeCategory)
  const selectedFoto = selectedIndex !== null ? filtered[selectedIndex] : null

  const heights = ['h-48 md:h-56', 'h-56 md:h-72', 'h-40 md:h-48', 'h-52 md:h-64', 'h-44 md:h-52']

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
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-[#f97316] to-[#f0a500] text-white'
                  : 'bg-transparent text-gray-muted border border-[rgba(0,0,0,0.08)] hover:border-accent hover:text-accent'
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry-like gallery */}
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {filtered.map((foto, i) => (
            <div
              key={foto.id}
              onClick={() => setSelectedIndex(i)}
              className="break-inside-avoid rounded-2xl overflow-hidden bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_40px_rgba(249,115,22,0.12)] transition-all duration-300 group cursor-pointer"
            >
              <div className="relative overflow-hidden bg-gradient-to-br from-[rgba(249,115,22,0.12)] to-[rgba(240,165,0,0.08)]">
                {foto.image_url ? (
                  <img src={foto.image_url} alt={foto.caption} className="w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="flex items-center justify-center py-20">
                    <div className="text-center">
                      <ImageIcon className="w-10 h-10 text-accent/40 mx-auto mb-2" />
                      <span className="text-sm font-semibold text-accent/60 block">{foto.caption}</span>
                    </div>
                  </div>
                )}
                {/* Hover overlay with caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 md:p-5">
                  <div>
                    <p className="text-white font-semibold text-sm md:text-base">{foto.caption}</p>
                    <span className="text-white/60 text-[10px] font-medium uppercase tracking-widest">{foto.category}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-muted">
            <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-lg">Belum ada foto di kategori ini.</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedFoto && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setSelectedIndex(null)}>
          <div className="relative max-w-5xl w-full max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedIndex(null)} className="absolute -top-12 right-0 text-white/60 hover:text-white transition-colors z-10">
              <X className="w-6 h-6" />
            </button>

            {selectedIndex! > 0 && (
              <button onClick={() => setSelectedIndex(selectedIndex! - 1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/20 transition-all z-10">
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}
            {selectedIndex! < filtered.length - 1 && (
              <button onClick={() => setSelectedIndex(selectedIndex! + 1)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/20 transition-all z-10">
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            <div className="rounded-2xl overflow-hidden bg-black/40 max-h-[80vh] flex items-center justify-center">
              {selectedFoto.image_url ? (
                <img src={selectedFoto.image_url} alt={selectedFoto.caption} className="max-w-full max-h-[80vh] object-contain" />
              ) : (
                <div className="py-20 text-center">
                  <ImageIcon className="w-20 h-20 text-white/30 mx-auto mb-4" />
                </div>
              )}
            </div>
            <div className="text-center mt-4">
              <p className="text-white font-semibold">{selectedFoto.caption}</p>
              <p className="text-white/50 text-xs mt-1">{selectedFoto.category}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
