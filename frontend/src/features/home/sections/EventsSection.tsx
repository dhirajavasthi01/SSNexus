import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { useI18n } from '@/lib/i18n'

const samples = [
  { title: 'Regional payments forum', tone: 'from-[#123a63] to-[#32b9ff]' },
  { title: 'Checkout methods workshop', tone: 'from-[#0f2744] to-[#7c3aed]' },
  { title: 'Payout operations briefing', tone: 'from-[#12324f] to-[#22c55e]' },
  { title: 'Merchant onboarding session', tone: 'from-[#1e293b] to-[#f59e0b]' },
  { title: 'Security review roundtable', tone: 'from-[#111827] to-[#38bdf8]' },
]

export function EventsSection() {
  const { t } = useI18n()
  const [index, setIndex] = useState(0)
  const max = Math.max(samples.length - 1, 0)

  return (
    <section className="overflow-hidden bg-[#07131f] text-white">
      <Container className="py-20 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-end">
          <h2 className="text-[40px] font-semibold md:text-[48px]">{t('home.events')}</h2>
          <p className="max-w-[648px] text-[18px] leading-8 text-white/80 lg:justify-self-end">{t('home.eventsBody')}</p>
        </div>
        <div className="mt-8 flex gap-3">
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full border border-white/30"
            aria-label="Previous events"
            onClick={() => setIndex((value) => Math.max(0, value - 1))}
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full border border-white/30"
            aria-label="Next events"
            onClick={() => setIndex((value) => Math.min(max, value + 1))}
          >
            <ChevronRight />
          </button>
        </div>
        <div className="mt-8 overflow-hidden">
          <div
            className="flex gap-5 transition-transform duration-500"
            style={{ transform: `translateX(-${index * 280}px)` }}
          >
            {samples.map((item) => (
              <Link
                key={item.title}
                to="/blog"
                className="w-[260px] shrink-0"
              >
                <div className={`h-[180px] rounded-2xl bg-gradient-to-br ${item.tone}`} />
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-white/60">{t('blog.sample')}</p>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
