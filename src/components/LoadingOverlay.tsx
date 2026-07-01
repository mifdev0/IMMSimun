'use client'

import { Loader2 } from 'lucide-react'

interface Props {
  open: boolean
  message?: string
}

export default function LoadingOverlay({ open, message = 'Memproses...' }: Props) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[80] bg-black/30 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white rounded-2xl px-8 py-6 shadow-2xl flex items-center gap-4">
        <Loader2 className="w-6 h-6 animate-spin text-[#f97316]" />
        <p className="text-sm font-medium text-gray-700">{message}</p>
      </div>
    </div>
  )
}
