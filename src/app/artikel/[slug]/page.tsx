'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { getArticles } from '@/lib/store'
import { formatDate } from '@/lib/utils'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function DetailArtikel() {
  const { slug } = useParams<{ slug: string }>()
  const [article, setArticle] = useState<any>(null)
  const [prev, setPrev] = useState<any>(null)
  const [next, setNext] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getArticles().then((all) => {
      const sorted = all.filter((a) => a.status === 'published')
        .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
      const current = sorted.find((a) => a.slug === slug)
      setArticle(current || null)
      if (current) {
        const idx = sorted.findIndex((a) => a.slug === slug)
        setPrev(idx > 0 ? sorted[idx - 1] : null)
        setNext(idx < sorted.length - 1 ? sorted[idx + 1] : null)
      }
      setLoading(false)
    })
  }, [slug])

  if (loading) return <div className="py-20 text-center min-h-screen flex items-center justify-center"><p className="text-gray-muted">Memuat...</p></div>

  if (!article) {
    return (
      <div className="py-20 text-center min-h-screen flex items-center justify-center">
        <div>
          <h1 className="text-2xl font-bold mb-4">Artikel tidak ditemukan</h1>
          <Link href="/artikel" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#f97316] to-[#f0a500] text-white px-6 py-3 rounded-full text-sm font-semibold">
            <ArrowLeft className="w-4 h-4" /> Kembali
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pb-20 bg-[#fff8f0] min-h-screen">
      <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16">
        <div className="max-w-3xl mx-auto">
          <Link href="/artikel" className="inline-flex items-center gap-2 text-sm text-gray-muted hover:text-accent transition-colors mb-6 mt-6">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Artikel
          </Link>

          <article>
            <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-[#f97316] to-[#f0a500] text-white text-[10px] font-bold uppercase tracking-widest mb-4">
              {article.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">{article.title}</h1>
            <div className="flex items-center gap-3 text-sm text-gray-muted mb-8">
              <span>{article.author}</span>
              <span className="w-1 h-1 rounded-full bg-gray-muted" />
              <span>{formatDate(article.published_at)}</span>
            </div>

            {article.images?.length > 0 && article.images[0]?.image_url && (
              <div className="rounded-2xl overflow-hidden mb-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                <img src={article.images[0].image_url} alt={article.title} className="w-full aspect-video object-cover" />
              </div>
            )}
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
              <div dangerouslySetInnerHTML={{ __html: article.content }} className="prose prose-sm max-w-none text-gray-muted leading-relaxed" />
            </div>
          </article>

          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-10">
            {prev ? (
              <Link href={`/artikel/${prev.slug}`}
                className="flex items-center gap-2 text-sm text-gray-muted hover:text-accent transition-colors group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <div>
                  <span className="text-[10px] uppercase tracking-widest block">Sebelumnya</span>
                  <span className="font-medium">{prev.title}</span>
                </div>
              </Link>
            ) : <div />}
            {next ? (
              <Link href={`/artikel/${next.slug}`}
                className="flex items-center gap-2 text-sm text-gray-muted hover:text-accent transition-colors group text-right">
                <div>
                  <span className="text-[10px] uppercase tracking-widest block">Selanjutnya</span>
                  <span className="font-medium">{next.title}</span>
                </div>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : <div />}
          </div>
        </div>
      </div>
    </div>
  )
}
