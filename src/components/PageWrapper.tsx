'use client'

import { usePathname } from 'next/navigation'

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isBeranda = pathname === '/'
  const isAdmin = pathname.startsWith('/admin')

  if (isBeranda || isAdmin) return <>{children}</>

  return <div className="pt-36">{children}</div>
}
