'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, FileText, Image, Users, Medal, LogOut, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'

const sidebarLinks = [
  { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/artikel', icon: FileText, label: 'Artikel' },
  { href: '/admin/galeri', icon: Image, label: 'Galeri' },
  { href: '/admin/struktural', icon: Users, label: 'Struktural' },
  { href: '/admin/prestasi', icon: Medal, label: 'Prestasi' },
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

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <button className="lg:hidden p-2 -ml-2" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 ml-auto">
            <span className="text-sm text-gray-500">{adminData.email || 'Admin'}</span>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#f97316] to-[#f0a500] flex items-center justify-center text-white text-sm font-semibold">SA</div>
          </div>
        </header>
        <div className="flex-1 p-6">{children}</div>
      </div>
    </div>
  )
}
