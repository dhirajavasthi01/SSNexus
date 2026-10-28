import { useEffect, useRef, useState } from "react"

import { markets } from "@/data/site.ts"

const spots = [
  { x: 30, y: 8 },
  { x: 64, y: 7 },
  { x: 82, y: 20 },
  { x: 16, y: 26 },
  { x: 76, y: 36 },
  { x: 20, y: 48 },
  { x: 82, y: 54 },
  { x: 14, y: 68 },
  { x: 70, y: 70 },
  { x: 28, y: 86 },
  { x: 54, y: 91 },
  { x: 80, y: 82 },
]

export function MarketGlobe() {
  const ref = useRef<HTMLDivElement>(null)
  const [live, setLive] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setLive(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 },
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div ref={ref} className={`markets-scene relative mx-auto min-h-[460px] w-full max-w-xl ${live ? "markets-live" : ""}`}>
      <div className="globe-orbit" aria-hidden="true" />
      <div className="globe-stage" aria-hidden="true">
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_32%_28%,#f4faff_0%,#9ed4ff_16%,#3b93ea_48%,#1457b0_74%,#0b2f66_100%)] shadow-[0_24px_50px_rgba(20,80,160,0.28),inset_-16px_-14px_28px_rgba(6,30,70,0.28)]" />
        <div className="globe-spin absolute inset-[8%]">
          {Array.from({ length: 6 }, (_, index) => (
            <span
              key={index}
              className="absolute inset-0 rounded-full border border-white/35"
              style={{ transform: `rotateY(${index * 30}deg)` }}
            />
          ))}
        </div>
        <span className="absolute top-[20%] right-[12%] left-[12%] h-[16%] rounded-[50%] border border-white/30" />
        <span className="absolute top-1/2 right-[6%] left-[6%] h-px -translate-y-1/2 bg-white/40" />
        <span className="absolute right-[12%] bottom-[20%] left-[12%] h-[16%] rounded-[50%] border border-white/30" />
        <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_24%,rgba(255,255,255,0.72),transparent_36%)]" />
      </div>
      {markets.map((market, index) => {
        const spot = spots[index]
        return (
          <span
            key={market.name}
            className="absolute z-10"
            style={{ left: `${spot?.x ?? 50}%`, top: `${spot?.y ?? 50}%` }}
          >
            <span
              className="market-pill inline-flex items-center gap-2 rounded-full border border-black/5 bg-white px-3 py-1.5 text-sm text-ink shadow-[0_8px_20px_rgba(20,50,90,0.08)]"
              style={{ ["--pill-delay" as string]: `${index * 80}ms` }}
            >
              <span aria-hidden="true">{market.flag}</span>
              {market.name}
            </span>
          </span>
        )
      })}
    </div>
  )
}
