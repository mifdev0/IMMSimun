'use client'

import Link from 'next/link'
import { ArrowRight, BookOpen, Heart, Clock } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getArticles, getPrestasi } from '@/lib/store'
import { formatDate } from '@/lib/utils'

const stats = [
  { value: '71+', label: 'Kader Aktif' },
  { value: '5+', label: 'Tahun Berjuang' },
  { value: '20+', label: 'Program Unggulan' },
]

const pilarIMM = [
  { icon: BookOpen, label: 'Intelektualitas', desc: 'Mengembangkan daya pikir kritis, ilmiah, dan inovatif.' },
  { icon: Heart, label: 'Humanitas', desc: 'Menanamkan kepedulian sosial dan kemanusiaan.' },
  { icon: Clock, label: 'Religiusitas', desc: 'Memperkuat nilai-nilai keislaman dan ketakwaan.' },
]

export default function Beranda() {
  const [latestArticles, setLatestArticles] = useState<any[]>([])
  const [achievements, setAchievements] = useState<any[]>([])

  useEffect(() => {
    getArticles().then((all) =>
      setLatestArticles(
        all.filter((a) => a.status === 'published')
          .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
          .slice(0, 3)
      )
    )
    getPrestasi().then(setAchievements)
  }, [])

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden pt-20 md:pt-[88px]">
        <div className="absolute inset-0">
          <img src="/hero.jpeg" alt="Hero IMM Siti Munjiyah" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/55 via-black/35 to-black/65" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-br from-[rgba(190,10,6,0.15)] to-[rgba(249,115,22,0.10)]" />
        <div className="absolute inset-0 z-[2] flex items-center justify-center pointer-events-none">
          <div
            className="w-[70%] h-[60%]"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 70%)',
              filter: 'blur(8px)',
            }}
          />
        </div>
        <div className="relative z-10 w-full flex justify-center px-8 md:px-14 lg:px-20 xl:px-28">
          <div className="max-w-4xl text-center">
            <p className="text-[13px] text-white/75 font-normal tracking-[0.05em] mb-4">
              Pimpinan Komisariat FKIP UMS · Surakarta
            </p>
            <h1 className="font-bold text-white leading-[1.1] mb-5" style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}>
              PK IMM{' '}
              <span className="bg-gradient-to-r from-[#f97316] to-[#f0a500] bg-clip-text text-transparent">Siti Munjiyah</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-8 leading-relaxed">
              Mewujudkan kader pendidik yang unggul dalam{' '}
              <span className="text-[#f0a500] font-semibold">intelektualitas</span>,{' '}
              <span className="text-[#f0a500] font-semibold">humanitas</span>, dan{' '}
              <span className="text-[#f0a500] font-semibold">religiusitas</span>{' '}
              untuk mencerahkan semesta.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/tentang-kami"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#f97316] to-[#f0a500] text-white px-8 py-3.5 rounded-full font-semibold text-base transition-all hover:shadow-lg hover:shadow-[rgba(249,115,22,0.3)] active:scale-[0.97]">
                Kenali Kami
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="#kegiatan"
                className="inline-flex items-center gap-2 border-2 border-white/30 text-white/90 px-8 py-3.5 rounded-full font-semibold text-base transition-all hover:bg-white/10 hover:text-white active:scale-[0.97]">
                Lihat Kegiatan
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-14">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-anton text-4xl md:text-5xl text-white/95">{stat.value}</div>
                  <div className="text-[11px] text-white/50 font-semibold tracking-widest uppercase mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TENTANG PREVIEW */}
      <section className="py-24 bg-[#fff8f0] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.04),transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative rounded-[2rem] overflow-hidden shadow-[0_10px_30px_rgba(249,115,22,0.08)] aspect-[4/3]">
                <img src="/hero.jpeg" alt="Kegiatan IMM" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-gradient-to-br from-[#f97316] to-[#f0a500] opacity-20 blur-2xl" />
            </div>
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-[rgba(249,115,22,0.1)] text-accent text-xs font-semibold uppercase tracking-widest mb-4 border border-[rgba(249,115,22,0.2)]">
                Tentang Kami
              </span>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
                Gerakan Mahasiswa yang{' '}
                <span className="bg-gradient-to-r from-[#f97316] to-[#f0a500] bg-clip-text text-transparent">Berakhlak Mulia</span>
              </h2>
              <p className="text-gray-muted leading-relaxed mb-6">
                IMM Siti Munjiyah merupakan wadah perkaderan Ikatan Mahasiswa Muhammadiyah di lingkungan
                FKIP Universitas Muhammadiyah Surakarta. Kami berkomitmen membentuk akademisi Islam yang
                berakhlak mulia, berlandaskan <strong>intelektualitas</strong>, <strong>humanitas</strong>, dan{' '}
                <strong>religiusitas</strong>.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {pilarIMM.map((p) => (
                  <span key={p.label} className="px-5 py-2 rounded-full bg-[rgba(249,115,22,0.08)] text-accent text-sm font-semibold">
                    {p.label}
                  </span>
                ))}
              </div>
              <Link href="/tentang-kami" className="btn-primary text-sm">
                Selengkapnya
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* VISI MISI PREVIEW */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.04),transparent_70%)] opacity-60" />
        <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16 relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[rgba(249,115,22,0.1)] text-accent text-xs font-semibold uppercase tracking-widest mb-4 border border-[rgba(249,115,22,0.2)]">
              Visi & Misi
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">Arah Perjuangan <span className="bg-gradient-to-r from-[#f97316] to-[#f0a500] bg-clip-text text-transparent">Kita</span></h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-[#f97316] to-[#f0a500] p-8 md:p-12 rounded-[2rem] text-white relative overflow-hidden mb-10 shadow-xl shadow-[rgba(249,115,22,0.2)]">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -ml-16 -mb-16" />
              <span className="text-xs font-bold uppercase tracking-widest text-white/70 block mb-3">Visi Utama</span>
              <p className="text-xl md:text-2xl italic leading-relaxed font-medium relative z-10">
                &ldquo;Unggul dalam keilmuan, mandiri dalam berkarya, dan bertaqwa dalam mengabdi
                demi kemaslahatan umat dan bangsa.&rdquo;
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { num: '01', title: 'Internalisasi Nilai', desc: 'Menguatkan internalisasi nilai-nilai Al-Islam dan Kemuhammadiyahan.' },
                { num: '02', title: 'Budaya Literasi', desc: 'Meningkatkan budaya literasi dan daya kritis mahasiswa.' },
                { num: '03', title: 'Aksi Kemanusiaan', desc: 'Responsif terhadap isu sosial dan gerakan kemanusiaan inklusif.' },
                { num: '04', title: 'Kemandirian Kader', desc: 'Mengembangkan potensi kewirausahaan dan soft skills.' },
              ].map((misi) => (
                <div key={misi.num} className="p-6 rounded-xl bg-[#fff8f0] group hover:bg-gradient-to-br hover:from-[#f97316] hover:to-[#f0a500] transition-all duration-300 cursor-default">
                  <div className="font-anton text-4xl text-accent mb-3 group-hover:text-white transition-colors">{misi.num}</div>
                  <h3 className="font-semibold text-base mb-1 group-hover:text-white transition-colors">{misi.title}</h3>
                  <p className="text-xs text-gray-muted group-hover:text-white/80 transition-colors">{misi.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* KEGIATAN & ARTIKEL */}
      <section id="kegiatan" className="py-24 bg-[#fff8f0]">
        <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-[rgba(249,115,22,0.1)] text-accent text-xs font-semibold uppercase tracking-widest mb-4 border border-[rgba(249,115,22,0.2)]">
                Artikel & Kegiatan
              </span>
              <h2 className="text-3xl md:text-4xl font-bold">Terbaru dari <span className="bg-gradient-to-r from-[#f97316] to-[#f0a500] bg-clip-text text-transparent">Munjiyah</span></h2>
            </div>
            <Link href="/artikel" className="inline-flex items-center gap-2 border-2 border-[rgba(249,115,22,0.3)] text-accent px-6 py-2.5 rounded-full font-semibold text-sm transition-all hover:bg-[rgba(249,115,22,0.06)] shrink-0">
              Lihat Semua Artikel
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestArticles.map((article) => (
              <Link key={article.id} href={`/artikel/${article.slug}`}
                className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_40px_rgba(249,115,22,0.1)] hover:-translate-y-1 transition-all duration-300 group">
                <div className="aspect-[16/9] overflow-hidden relative bg-gradient-to-br from-[rgba(249,115,22,0.1)] to-[rgba(240,165,0,0.1)] flex items-center justify-center">
                  {article.images.length > 0 && article.images[0].image_url ? (
                    <img src={article.images[0].image_url} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <span className="text-3xl font-anton bg-gradient-to-r from-[#f97316] to-[#f0a500] bg-clip-text text-transparent">{article.title.split(' ').slice(0, 2).join(' ')}</span>
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
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PRESTASI */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[rgba(249,115,22,0.1)] text-accent text-xs font-semibold uppercase tracking-widest mb-4 border border-[rgba(249,115,22,0.2)]">
              Prestasi Kader
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">Kader <span className="bg-gradient-to-r from-[#f97316] to-[#f0a500] bg-clip-text text-transparent">Berprestasi</span></h2>
            <p className="text-gray-muted mt-3 max-w-xl mx-auto">Deretan prestasi yang telah diraih oleh kader IMM Siti Munjiyah di berbagai ajang.</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative before:absolute before:left-[19px] before:top-8 before:bottom-0 before:w-[2px] before:bg-gradient-to-b before:from-[#f97316] before:to-[#f0a500] before:opacity-30 max-h-[460px] overflow-y-auto scroll-smooth pr-2 infinite-scroll">
              {achievements.sort((a: any, b: any) => a.order - b.order).map((p: any) => (
                <div key={p.id} className="relative pl-14 pb-6 last:pb-0">
                  <div className="absolute left-[13px] top-1.5 w-3 h-3 rounded-full bg-gradient-to-br from-[#f97316] to-[#f0a500] shadow-lg shadow-[rgba(249,115,22,0.3)]" />
                  <div className="bg-[#fff8f0] p-4 rounded-xl hover:shadow-[0_4px_20px_rgba(249,115,22,0.08)] transition-shadow">
                    <p className="text-sm font-semibold">{p.title}</p>
                    <p className="text-xs text-gray-muted mt-0.5">{p.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA BERGABUNG */}
      <section className="py-16 md:py-24 px-8 md:px-12 lg:px-16 bg-[#fff8f0]">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-[#f97316] to-[#f0a500] p-10 md:p-16 rounded-[2rem] relative overflow-hidden shadow-2xl shadow-[rgba(249,115,22,0.25)]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl -ml-24 -mb-24" />
            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Siap Bergabung?</h2>
              <p className="text-white/80 text-base md:text-lg mb-8">
                Jadilah bagian dari generasi pendidik yang berkarakter, cerdas, dan religius. Bersama kita bangun masa depan yang lebih cerah.
              </p>
              <Link href="/kontak"
                className="inline-flex items-center gap-2 bg-white text-accent font-bold px-10 py-4 rounded-full text-base hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/10">
                Daftar Sekarang
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
