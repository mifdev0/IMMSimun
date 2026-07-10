'use client'

import { useEffect, useState } from 'react'
import { getSettings } from '@/lib/store'
import { BookOpen, Heart, Clock } from 'lucide-react'
import { SkeletonLine, SkeletonImage } from '@/components/Skeleton'

const pilarData = [
  {
    icon: BookOpen,
    title: 'Intelektualitas',
    desc: 'Mengembangkan daya pikir kritis, ilmiah, dan inovatif dalam setiap langkah perjuangan.',
  },
  {
    icon: Heart,
    title: 'Humanitas',
    desc: 'Menanamkan kepedulian sosial dan kemanusiaan sebagai wujud pengabdian kepada umat.',
  },
  {
    icon: Clock,
    title: 'Religiusitas',
    desc: 'Memperkuat nilai-nilai keislaman dan ketakwaan dalam setiap aspek kehidupan.',
  },
]

export default function TentangKami() {
  const [settings, setSettings] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSettings().finally(() => setLoading(false)).then(setSettings)
  }, [])

  if (loading) {
    return (
      <div className="pb-20 bg-[#fff8f0] min-h-screen">
        <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16">
          <div className="text-center pt-12 mb-12">
            <SkeletonLine className="h-4 w-24 mx-auto mb-4" />
            <SkeletonLine className="h-10 w-80 mx-auto" />
          </div>
          <div className="max-w-4xl mx-auto space-y-10">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 md:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                <SkeletonLine className="h-6 w-48 mb-4" />
                <SkeletonImage className="w-full h-48 rounded-xl mb-4" />
                {Array.from({ length: 4 }).map((_, j) => (
                  <SkeletonLine key={j} className="h-4 w-full mb-2" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pb-20 bg-[#fff8f0] relative overflow-hidden min-h-screen">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.04),transparent_70%)]" />
      <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16 relative z-10">
        <div className="text-center pt-12 mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[rgba(249,115,22,0.1)] text-accent text-xs font-semibold uppercase tracking-widest mb-4 border border-[rgba(249,115,22,0.2)]">
            Tentang Kami
          </span>
          <h1 className="text-3xl md:text-5xl font-bold">Mengenal <span className="bg-gradient-to-r from-[#f97316] to-[#f0a500] bg-clip-text text-transparent">IMM Siti Munjiyah</span></h1>
        </div>

        <div className="max-w-4xl mx-auto space-y-10">
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <h2 className="text-2xl font-bold mb-4">Sekilas IMM Siti Munjiyah</h2>
            {settings?.about_image && (
              <img src={settings.about_image} alt="IMM Siti Munjiyah" className="w-full rounded-xl mb-4 object-cover max-h-64" />
            )}
            <p className="text-gray-muted leading-relaxed mb-4">
              {settings?.about_text || 'IMM Siti Munjiyah merupakan wadah perkaderan Ikatan Mahasiswa Muhammadiyah di lingkungan FKIP Universitas Muhammadiyah Surakarta. Kami berkomitmen membentuk akademisi Islam yang berakhlak mulia, berlandaskan intelektualitas, humanitas, dan religiusitas.'}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <h2 className="text-2xl font-bold mb-4">Apa itu IMM?</h2>
            <p className="text-gray-muted leading-relaxed mb-4">
              Ikatan Mahasiswa Muhammadiyah (IMM) adalah organisasi mahasiswa Islam yang didirikan pada
              <strong> 14 Maret 1964 M / 29 Syawal 1384 H</strong> di Yogyakarta. IMM merupakan salah satu
              organisasi otonom di lingkungan Persyarikatan Muhammadiyah yang bergerak di bidang kemahasiswaan,
              keilmuan, dan pengkaderan.
            </p>
            <p className="text-gray-muted leading-relaxed">
              Tujuan IMM adalah membentuk akademisi Islam yang berakhlak mulia dalam rangka mencapai tujuan
              Muhammadiyah, yaitu terwujudnya masyarakat Islam yang sebenar-benarnya.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <h2 className="text-2xl font-bold mb-4">Seputar PK IMM Siti Munjiyah</h2>
            <p className="text-gray-muted leading-relaxed mb-4">
              Pimpinan Komisariat IMM Siti Munjiyah adalah salah satu dari <strong>15 komisariat</strong> di bawah
              naungan Pimpinan Cabang IMM Kota Surakarta. Berlokasi di <strong>Fakultas Keguruan dan Ilmu Pendidikan
              Universitas Muhammadiyah Surakarta (FKIP UMS)</strong>, komisariat ini memiliki keunikan tersendiri
              dengan <em>local wisdom</em> dalam ranah pendidikan.
            </p>
            <p className="text-gray-muted leading-relaxed">
              Sebagai komisariat yang berada di lingkungan FKIP, IMM Siti Munjiyah berfokus pada pengembangan
              kader pendidik yang unggul, berkarakter, dan berlandaskan nilai-nilai Islam.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <h2 className="text-2xl font-bold mb-4">Asal Nama Siti Munjiyah</h2>
            <p className="text-gray-muted leading-relaxed mb-4">
              Nama &ldquo;Siti Munjiyah&rdquo; diambil dari nama istri <strong>Drs. H. Mohamad Djazman</strong>, salah satu
              pendiri IMM sekaligus Rektor IKIP Muhammadiyah Surakarta (sekarang FKIP UMS). Siti Munjiyah dikenal
              sebagai sosok yang memiliki dedikasi tinggi dalam dunia pendidikan dan keislaman.
            </p>
            <p className="text-gray-muted leading-relaxed">
              Komisariat ini merupakan salah satu komisariat tertua di Solo dan Jawa Tengah, dengan sejarah panjang
              dalam pengembangan kader IMM di wilayah Surakarta.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <h2 className="text-2xl font-bold mb-6">Tiga Pilar IMM</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pilarData.map((pilar) => (
                <div key={pilar.title} className="p-6 rounded-2xl bg-[#fff8f0] text-center">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#f97316] to-[#f0a500] flex items-center justify-center mx-auto mb-4">
                    <pilar.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{pilar.title}</h3>
                  <p className="text-xs text-gray-muted">{pilar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
