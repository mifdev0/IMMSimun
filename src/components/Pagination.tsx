'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Props {
  current: number
  total: number
  perPage: number
  onChange: (page: number) => void
}

export default function Pagination({ current, total, perPage, onChange }: Props) {
  const totalPages = Math.ceil(total / perPage)
  if (totalPages <= 1) return null

  const pages: (number | '...')[] = []
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= current - 1 && i <= current + 1)) {
      pages.push(i)
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...')
    }
  }

  return (
    <div className="flex items-center justify-center gap-1.5 mt-8 pb-4">
      <button
        onClick={() => onChange(current - 1)}
        disabled={current <= 1}
        className="p-2 rounded-xl border border-gray-200 text-gray-500 hover:border-accent hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`dots-${i}`} className="px-2 text-gray-400 text-sm">...</span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`min-w-[36px] h-9 rounded-xl text-sm font-medium transition-all ${
              p === current
                ? 'bg-gradient-to-r from-[#f97316] to-[#f0a500] text-white shadow-md'
                : 'border border-gray-200 text-gray-600 hover:border-accent hover:text-accent'
            }`}
          >
            {p}
          </button>
        )
      )}
      <button
        onClick={() => onChange(current + 1)}
        disabled={current >= totalPages}
        className="p-2 rounded-xl border border-gray-200 text-gray-500 hover:border-accent hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  )
}
