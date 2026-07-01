'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.classList.remove('animate-fadeIn')
    // force reflow
    void el.offsetWidth
    el.classList.add('animate-fadeIn')
  }, [pathname])

  const isBeranda = pathname === '/'
  const isAdmin = pathname.startsWith('/admin')

  if (isBeranda || isAdmin) return <>{children}</>

  return (
    <div ref={ref} className="pt-36 animate-fadeIn">
      {children}
    </div>
  )
}
