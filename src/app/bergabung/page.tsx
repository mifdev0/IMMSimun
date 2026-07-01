'use client'

import { useState, useEffect } from 'react'
import { getSettings } from '@/lib/store'
import { ExternalLink } from 'lucide-react'

export default function Bergabung() {
  const [settings, setSettings] = useState<any>(null)

  useEffect(() => {
    getSettings().then(setSettings)
  }, [])

  const ctaText = settings?.cta_text || 'Siap Bergabung? Jadilah bagian dari generasi pendidik yang berkarakter, cerdas, dan religius.'
  const ctaLink = settings?.cta_link || '#'
  const ctaLabel = settings?.cta_link_label || 'Daftar Sekarang'
  const isExternal = ctaLink.startsWith('http')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fff8f0] to-white px-6">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#f97316] to-[#f0a500] flex items-center justify-center mx-auto mb-8 shadow-lg shadow-[rgba(249,115,22,0.2)]">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-6">Bergabung dengan <span className="bg-gradient-to-r from-[#f97316] to-[#f0a500] bg-clip-text text-transparent">IMM Siti Munjiyah</span></h1>

        <p className="text-gray-muted text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
          {ctaText}
        </p>

        <a
          href={ctaLink}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#f97316] to-[#f0a500] text-white px-10 py-4 rounded-full text-base font-bold transition-all hover:shadow-xl hover:shadow-[rgba(249,115,22,0.3)] active:scale-[0.97]"
        >
          {ctaLabel}
          <ExternalLink className="w-5 h-5" />
        </a>

        {isExternal && (
          <p className="text-xs text-gray-400 mt-4">Kamu akan diarahkan ke halaman pendaftaran</p>
        )}
      </div>
    </div>
  )
}
