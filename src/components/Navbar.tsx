'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/tentang-kami', label: 'Tentang Kami' },
  { href: '/struktural', label: 'Struktural' },
  { href: '/visi-misi', label: 'Visi & Misi' },
  { href: '/artikel', label: 'Artikel' },
  { href: '/galeri', label: 'Galeri' },
  { href: '/kontak', label: 'Kontak' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (pathname.startsWith('/admin')) return null

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-4 md:px-8 lg:px-12 transition-all duration-300">
      <div
        className={`max-w-7xl mx-auto rounded-2xl md:rounded-full px-5 md:px-8 border transition-all duration-300 ${
          scrolled
            ? 'bg-white shadow-[0_4px_24px_rgba(0,0,0,0.10)] border-gray-100/80'
            : 'bg-white/95 backdrop-blur-xl shadow-[0_2px_16px_rgba(0,0,0,0.08)] border-[rgba(249,115,22,0.06)]'
        }`}
        style={scrolled ? {} : { backgroundColor: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)' }}
      >
        <div className="flex items-center justify-between h-14 md:h-16">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <img src="/logoImmSimun.png" alt="Logo IMM" className="h-8 w-auto" />
            <div className="hidden sm:block">
              <span className="text-sm font-bold leading-tight block text-dark">PK IMM</span>
              <span className="text-xs font-medium leading-tight block gradient-text">Siti Munjiyah</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = link.href === '/'
                ? pathname === '/'
                : pathname.startsWith(link.href + '/') || pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 text-sm transition-colors relative flex flex-col items-center ${
                    isActive ? 'text-[#f97316] font-semibold' : 'text-dark/60 font-normal hover:text-dark/80'
                  }`}
                >
                  {link.label}
                  <span
                    className={`mt-0.5 h-[2px] rounded-full transition-opacity duration-200 ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{
                      width: '100%',
                      background: 'linear-gradient(90deg, #f97316, #f0a500)',
                    }}
                  />
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-3">
            <a href="/kontak" className="btn-primary text-sm !py-2 !px-5 hidden sm:inline-flex">
              Gabung
            </a>
            <button
              className="lg:hidden p-2"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden border-t border-[rgba(249,115,22,0.06)] pb-3 pt-2">
            <div className="space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive ? 'text-accent bg-[rgba(249,115,22,0.06)]' : 'text-dark/70 hover:text-accent hover:bg-[rgba(249,115,22,0.06)]'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
              <Link href="/kontak" onClick={() => setOpen(false)} className="btn-primary text-sm !py-2.5 !px-6 inline-flex mt-2">
                Gabung
              </Link>
            </div>
          </div>
        )}
      </div>

    </nav>
  )
}
