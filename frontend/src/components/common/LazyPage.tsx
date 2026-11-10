import type { ReactNode } from 'react'
import { Suspense } from 'react'

export function PageFallback() {
  return (
    <div className="grid min-h-[40vh] place-items-center text-black/50" role="status">
      Loading page…
    </div>
  )
}

export function LazyPage({ children }: { children: ReactNode }) {
  return <Suspense fallback={<PageFallback />}>{children}</Suspense>
}
