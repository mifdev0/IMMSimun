'use client'

import { useEffect, useState } from 'react'
import { getSettings } from '@/lib/store'
import { Phone, MapPin, Mail, Globe } from 'lucide-react'
import Link from 'next/link'
import { SkeletonLine } from '@/components/Skeleton'

export default function Kontak() {
  const [settings, setSettings] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSettings().finally(() => setLoading(false)).then(setSettings)
  }, [])

  const kontakData = [
    {
      icon: Phone,
      title: 'WhatsApp',
      desc: 'Hubungi kami langsung via WhatsApp untuk informasi lebih lanjut.',
      action: {
        label: 'Hubungi via WhatsApp',
        href: `https://wa.me/${settings?.kontak_whatsapp || '6281234567890'}`,
        external: true,
      },
    },
    {
      icon: Globe,
      title: 'Media Sosial',
      desc: 'Ikuti kami di berbagai platform media sosial.',
      sosmed: [
        { label: settings?.kontak_instagram ? `@${settings.kontak_instagram}` : '@immsitimunjiyah_fkip', href: `https://instagram.com/${settings?.kontak_instagram || 'immsitimunjiyah_fkip'}` },
        { label: settings?.kontak_tiktok ? `@${settings.kontak_tiktok}` : '@immsitimunjiyah_fkip', href: `https://tiktok.com/@${settings?.kontak_tiktok || 'immsitimunjiyah_fkip'}` },
        { label: settings?.kontak_youtube || 'IMM Siti Munjiyah', href: `https://youtube.com/${settings?.kontak_youtube || '@immsitimunjiyah'}` },
        { label: settings?.kontak_twitter ? `@${settings.kontak_twitter}` : '@immsitimunjiyah', href: `https://twitter.com/${settings?.kontak_twitter || 'immsitimunjiyah'}` },
      ],
    },
    {
      icon: MapPin,
      title: 'Alamat',
      desc: settings?.kontak_alamat || 'Sekretariat PK IMM Siti Munjiyah\nFakultas Keguruan dan Ilmu Pendidikan\nUniversitas Muhammadiyah Surakarta\nKampus 1 UMS, Jl. A. Yani No. 157, Pabelan, Kartasura, Sukoharjo',
    },
    {
      icon: Mail,
      title: 'Email',
      desc: 'Untuk keperluan resmi dan kerjasama, silakan hubungi melalui email.',
      action: { label: settings?.kontak_email || 'immsitimunjiyah@ums.ac.id', href: `mailto:${settings?.kontak_email || 'immsitimunjiyah@ums.ac.id'}`, external: false },
    },
  ]

  if (loading) {
    return (
      <div className="pb-20 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16">
          <div className="text-center pt-12 mb-12">
            <SkeletonLine className="h-4 w-24 mx-auto mb-4" />
            <SkeletonLine className="h-10 w-64 mx-auto mb-3" />
            <SkeletonLine className="h-4 w-80 mx-auto" />
          </div>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                <SkeletonLine className="h-14 w-14 rounded-full mb-5" />
                <SkeletonLine className="h-5 w-32 mb-2" />
                <SkeletonLine className="h-4 w-full mb-2" />
                <SkeletonLine className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16">
        <div className="text-center pt-12 mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[rgba(249,115,22,0.1)] text-accent text-xs font-semibold uppercase tracking-widest mb-4 border border-[rgba(249,115,22,0.2)]">
            Kontak
          </span>
          <h1 className="text-3xl md:text-5xl font-bold">Hubungi <span className="bg-gradient-to-r from-[#f97316] to-[#f0a500] bg-clip-text text-transparent">Kami</span></h1>
          <p className="text-gray-muted mt-3">Temukan kami melalui platform media sosial atau datang langsung ke sekretariat.</p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {kontakData.map((item) => (
            <div key={item.title} className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_35px_rgba(249,115,22,0.12)] transition-all">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#f97316] to-[#f0a500] flex items-center justify-center mb-5">
                <item.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>

              {'sosmed' in item ? (
                <div className="space-y-3">
                  {item.sosmed!.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-gray-muted hover:text-accent transition-colors group">
                      <span className="w-8 h-8 rounded-full bg-[rgba(249,115,22,0.08)] flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#f97316] group-hover:to-[#f0a500] transition-all">
                        <svg className="w-4 h-4 group-hover:text-white transition-colors text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                      </span>
                      {s.label}
                    </a>
                  ))}
                </div>
              ) : item.action ? (
                <>
                  <p className="text-sm text-gray-muted mb-4 whitespace-pre-line">{item.desc}</p>
                  <Link href={item.action.href} target={item.action.external ? '_blank' : undefined}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#f97316] to-[#f0a500] text-white px-6 py-3 rounded-full text-sm font-semibold transition-all hover:scale-105">
                    {item.action.label}
                  </Link>
                </>
              ) : (
                <p className="text-sm text-gray-muted whitespace-pre-line">{item.desc}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
