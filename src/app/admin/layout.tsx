'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, FileText, Image, Users, Medal, Settings, Tag, LogOut, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'

const sidebarLinks = [
  { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/artikel', icon: FileText, label: 'Artikel' },
  { href: '/admin/galeri', icon: Image, label: 'Galeri' },
  { href: '/admin/struktural', icon: Users, label: 'Struktural' },
  { href: '/admin/prestasi', icon: Medal, label: 'Prestasi' },
  { href: '/admin/settings', icon: Settings, label: 'Pengaturan' },
  { href: '/admin/kategori', icon: Tag, label: 'Kategori' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const admin = sessionStorage.getItem('imm_admin')
    if (pathname !== '/admin/login' && !admin) {
      router.push('/admin/login')
    }
  }, [pathname, router])

  const handleLogout = () => {
    sessionStorage.removeItem('imm_admin')
    router.push('/admin/login')
  }

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  const adminData = typeof window !== 'undefined' ? JSON.parse(sessionStorage.getItem('imm_admin') || '{}') : {}

  return (
    <div className="min-h-screen flex bg-[#f9fafb] pt-0">
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 lg:translate-x-0 lg:static lg:z-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-gray-100">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <img src="/logoImmSimun.png" alt="Logo" className="h-8 w-auto" />
            <div>
              <p className="text-sm font-bold leading-tight">PK IMM</p>
              <p className="text-[10px] font-medium text-accent">Admin Panel</p>
            </div>
          </Link>
        </div>
        <nav className="p-4 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#f97316] to-[#f0a500] text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <link.icon className="w-5 h-5" />
                {link.label}
              </Link>
            )
          })}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
          <button onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex-1 flex flex-col min-h-screen pb-16 lg:pb-0">
        <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-gray-200 px-4 md:px-6 py-3 flex items-center justify-between min-h-[56px]">
          <div className="flex items-center gap-2">
            <button className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-gray-100 transition-colors" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-5 h-5" />
            </button>
            <span className="text-sm font-semibold text-gray-700 lg:hidden">Admin Panel</span>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <span className="text-xs md:text-sm text-gray-500 truncate max-w-[120px] md:max-w-none">{adminData.email || 'Admin'}</span>
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-[#f97316] to-[#f0a500] flex items-center justify-center text-white text-xs md:text-sm font-semibold shrink-0">SA</div>
          </div>
        </header>
        <div className="flex-1 p-4 md:p-6 overflow-x-hidden max-w-full">{children}</div>

        {/* Mobile bottom nav */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 px-2 py-1 flex items-center justify-around shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
            return (
              <Link key={link.href} href={link.href} onClick={() => setSidebarOpen(false)}
                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl text-[10px] font-medium transition-all min-w-0 ${
                  isActive ? 'text-[#f97316]' : 'text-gray-400 hover:text-gray-600'
                }`}>
                <link.icon className="w-5 h-5" />
                <span className="truncate max-w-[60px]">{link.label}</span>
              </Link>
            )
          })}
          <button onClick={handleLogout}
            className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl text-[10px] font-medium text-gray-400 hover:text-red-500 transition-all min-w-0">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </nav>
      </div>
    </div>
  )
}
