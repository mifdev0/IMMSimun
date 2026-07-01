'use client'

import { useEffect, useState } from 'react'
import { CheckCircle, XCircle, X } from 'lucide-react'

type ToastType = 'success' | 'error'

interface ToastData {
  type: ToastType
  message: string
}

let showToastFn: ((type: ToastType, message: string) => void) | null = null

export function showToast(type: ToastType, message: string) {
  showToastFn?.(type, message)
}

export default function Toast() {
  const [toast, setToast] = useState<ToastData | null>(null)

  useEffect(() => {
    showToastFn = (type, message) => setToast({ type, message })
    return () => { showToastFn = null }
  }, [])

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3000)
      return () => clearTimeout(t)
    }
  }, [toast])

  if (!toast) return null

  return (
    <div className="fixed bottom-6 right-6 z-[100] animate-in fade-in slide-in-from-bottom-4">
      <div className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border ${
        toast.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'
      }`}>
        {toast.type === 'success' ? <CheckCircle className="w-5 h-5 shrink-0" /> : <XCircle className="w-5 h-5 shrink-0" />}
        <p className="text-sm font-medium">{toast.message}</p>
        <button onClick={() => setToast(null)} className="p-0.5 rounded-full hover:bg-black/5 transition-colors ml-2">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
