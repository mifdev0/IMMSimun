'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getArticles, getKategoris } from '@/lib/store'
import { formatDate } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'

export default function ArtikelPage() {
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [articles, setArticles] = useState<any[]>([])
  const [categories, setCategories] = useState<string[]>(['Semua'])

  useEffect(() => {
    getArticles().then((all) =>
      setArticles(
        all.filter((a) => a.status === 'published')
          .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
      )
    )
    getKategoris('artikel').then((kats) =>
      setCategories(['Semua', ...kats.map((k) => k.name)])
    )
  }, [])

  const filtered = activeCategory === 'Semua'
    ? articles
    : articles.filter((a) => a.category === activeCategory)

  return (
    <div className="pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16">
        <div className="text-center pt-12 mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[rgba(249,115,22,0.1)] text-accent text-xs font-semibold uppercase tracking-widest mb-4 border border-[rgba(249,115,22,0.2)]">
            Artikel
          </span>
          <h1 className="text-3xl md:text-5xl font-bold">Artikel & <span className="bg-gradient-to-r from-[#f97316] to-[#f0a500] bg-clip-text text-transparent">Kegiatan</span></h1>
          <p className="text-gray-muted mt-3">Informasi terbaru seputar kegiatan dan program kerja IMM Siti Munjiyah.</p>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article) => (
            <Link key={article.id} href={`/artikel/${article.slug}`}
              className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_40px_rgba(249,115,22,0.1)] hover:-translate-y-1 transition-all duration-300 group">
              <div className="aspect-[16/9] overflow-hidden relative bg-gradient-to-br from-[rgba(249,115,22,0.1)] to-[rgba(240,165,0,0.1)] flex items-center justify-center">
                {article.images.length > 0 && article.images[0].image_url ? (
                  <img src={article.images[0].image_url} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <span className="text-3xl font-anton bg-gradient-to-r from-[#f97316] to-[#f0a500] bg-clip-text text-transparent">
                    {article.title.split(' ').slice(0, 2).join(' ')}
                  </span>
                )}
                <span className="absolute top-3 left-3 px-3 py-0.5 rounded-full bg-gradient-to-r from-[#f97316] to-[#f0a500] text-white text-[9px] font-bold uppercase tracking-widest">
                  {article.category}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-[11px] text-gray-muted mb-3">
                  <span>{formatDate(article.published_at)}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-muted" />
                  <span>{article.author}</span>
                </div>
                <h3 className="font-semibold text-base mb-2 group-hover:text-accent transition-colors">{article.title}</h3>
                <span className="text-accent font-semibold text-xs inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Baca Selengkapnya <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-muted">
            <p className="text-lg">Belum ada artikel di kategori ini.</p>
          </div>
        )}
      </div>
    </div>
  )
}
