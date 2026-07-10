'use client'

export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`rounded-2xl bg-white/50 border border-gray-200/60 overflow-hidden animate-pulse ${className}`}>
      <div className="h-48 bg-gray-200/70" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-gray-200/70 rounded-full w-3/4" />
        <div className="h-3 bg-gray-200/70 rounded-full w-1/2" />
        <div className="h-3 bg-gray-200/70 rounded-full w-full" />
        <div className="h-3 bg-gray-200/70 rounded-full w-5/6" />
      </div>
    </div>
  )
}

export function SkeletonLine({ className = '' }: { className?: string }) {
  return <div className={`h-4 bg-gray-200/70 rounded-full animate-pulse ${className}`} />
}

export function SkeletonImage({ className = '' }: { className?: string }) {
  return <div className={`bg-gray-200/70 animate-pulse ${className}`} />
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}

export function SkeletonHero() {
  return (
    <div className="animate-pulse">
      <div className="h-[70vh] bg-gray-200/70 rounded-3xl" />
      <div className="mt-8 space-y-4 px-4 max-w-3xl mx-auto">
        <div className="h-8 bg-gray-200/70 rounded-full w-1/3 mx-auto" />
        <div className="h-4 bg-gray-200/70 rounded-full w-2/3 mx-auto" />
      </div>
    </div>
  )
}

export function SkeletonDetail() {
  return (
    <div className="animate-pulse space-y-6 max-w-4xl mx-auto">
      <div className="h-10 bg-gray-200/70 rounded-full w-2/3" />
      <div className="h-4 bg-gray-200/70 rounded-full w-1/3" />
      <div className="h-64 bg-gray-200/70 rounded-2xl" />
      <div className="space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-4 bg-gray-200/70 rounded-full" style={{ width: `${85 + Math.random() * 15}%` }} />
        ))}
      </div>
    </div>
  )
}
