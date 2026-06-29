'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { FileText, Image, Users, Medal, ArrowRight } from 'lucide-react'
import { getArticles, getGaleri, getPengurus, getPrestasi } from '@/lib/store'
import { formatDate } from '@/lib/utils'

export default function AdminDashboard() {
  const [articles, setArticles] = useState<any[]>([])
  const [galeri, setGaleri] = useState<any[]>([])
  const [pengurus, setPengurus] = useState<any[]>([])
  const [prestasi, setPrestasi] = useState<any[]>([])

  useEffect(() => {
    getArticles().then(setArticles)
    getGaleri().then(setGaleri)
    getPengurus().then(setPengurus)
    getPrestasi().then(setPrestasi)
  }, [])

  const stats = [
    { label: 'Total Artikel', value: articles.filter((a) => a.status === 'published').length, icon: FileText, href: '/admin/artikel', color: 'from-[#f97316] to-[#f0a500]' },
    { label: 'Total Foto Galeri', value: galeri.length, icon: Image, href: '/admin/galeri', color: 'from-[#f97316] to-[#f0a500]' },
    { label: 'Total Pengurus', value: pengurus.length, icon: Users, href: '/admin/struktural', color: 'from-[#f97316] to-[#f0a500]' },
    { label: 'Total Prestasi', value: prestasi.length, icon: Medal, href: '/admin/prestasi', color: 'from-[#f97316] to-[#f0a500]' },
  ]

  const recentArticles = articles.filter((a) => a.status === 'published').slice(0, 5)

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 mb-8">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}
            className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_40px_rgba(249,115,22,0.1)] transition-all group">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-gray-300 group-hover:text-accent transition-colors" />
            </div>
            <p className="text-xl md:text-3xl font-bold">{stat.value}</p>
            <p className="text-[11px] md:text-sm text-gray-muted">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-base md:text-lg">Artikel Terbaru</h2>
          <Link href="/admin/artikel" className="text-xs md:text-sm text-accent font-medium hover:underline">Lihat Semua</Link>
        </div>
        <div className="overflow-x-auto -mx-4 md:-mx-6 px-4 md:px-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left">
                <th className="pb-3 font-medium text-gray-muted">Judul</th>
                <th className="pb-3 font-medium text-gray-muted">Kategori</th>
                <th className="pb-3 font-medium text-gray-muted">Penulis</th>
                <th className="pb-3 font-medium text-gray-muted">Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {recentArticles.map((a) => (
                <tr key={a.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 font-medium">{a.title}</td>
                  <td className="py-3">
                    <span className="px-2.5 py-1 rounded-full bg-[rgba(249,115,22,0.1)] text-accent text-[10px] font-semibold uppercase tracking-widest">{a.category}</span>
                  </td>
                  <td className="py-3 text-gray-muted">{a.author}</td>
                  <td className="py-3 text-gray-muted">{formatDate(a.published_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
