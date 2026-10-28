import { useEffect, useRef, useState } from "react"

type RollingNumberProps = {
  value: number
  suffix?: string
  startDelay?: number
}

function reelSteps(digit: number) {
  return [...Array(10).keys(), ...Array.from({ length: digit + 1 }, (_, index) => index)]
}

function DigitReel({
  digit,
  active,
  instant,
  delay,
}: {
  digit: number
  active: boolean
  instant: boolean
  delay: number
}) {
  const steps = reelSteps(digit)
  const offset = active ? steps.length - 1 : 0

  return (
    <span className="inline-block h-[1.15em] overflow-hidden">
      <span
        className="flex flex-col"
        style={{
          transform: `translateY(calc(${offset} * -1.15em))`,
          transitionProperty: "transform",
          transitionDuration: instant ? "0ms" : "1500ms",
          transitionDelay: instant ? "0ms" : `${delay}ms`,
          transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          lineHeight: "1.15em",
        }}
      >
        {steps.map((step, index) => (
          <span key={`${step}-${index}`} className="block h-[1.15em]">
            {step}
          </span>
        ))}
      </span>
    </span>
  )
}

export function RollingNumber({ value, suffix = "", startDelay = 0 }: RollingNumberProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [active, setActive] = useState(false)
  const [instant, setInstant] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      setInstant(true)
      setActive(true)
      return
    }

    const node = ref.current
    if (!node) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 },
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
    }
  }, [])

  const chars = value.toLocaleString("en-US").split("")

  return (
    <span
      ref={ref}
      className="inline-flex items-end tracking-tight whitespace-nowrap"
      aria-label={`${value.toLocaleString("en-US")}${suffix}`}
    >
      <span aria-hidden="true" className="inline-flex items-end">
        {chars.map((char, index) =>
          char === "," ? (
            <span key={`comma-${index}`} className="h-[1.15em] leading-[1.15em]">
              ,
            </span>
          ) : (
            <DigitReel
              key={`digit-${index}`}
              digit={Number(char)}
              active={active}
              instant={instant}
              delay={startDelay + index * 90}
            />
          ),
        )}
        {suffix ? (
          <span
            className={`leading-none ${suffix.trim().length > 1 ? "ml-1.5 text-[0.62em] font-semibold" : ""}`}
          >
            {suffix.trim()}
          </span>
        ) : null}
      </span>
    </span>
  )
}
