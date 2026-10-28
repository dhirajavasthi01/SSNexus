import { ShieldCheck, Gauge, Sparkles, BadgeCheck } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { useI18n } from '@/lib/i18n'
import type { MessageKey } from '@/data/i18n'

const cards: Array<{ title: MessageKey; body: MessageKey; className: string; icon: typeof Gauge }> = [
  {
    title: 'home.benefit1',
    body: 'home.benefit1Body',
    className: 'bg-gradient-to-br from-[#1d4ed8] to-[#38bdf8]',
    icon: Gauge,
  },
  {
    title: 'home.benefit2',
    body: 'home.benefit2Body',
    className: 'bg-gradient-to-br from-[#db2777] to-[#fb7185]',
    icon: ShieldCheck,
  },
  {
    title: 'home.benefit3',
    body: 'home.benefit3Body',
    className: 'bg-gradient-to-br from-[#ea580c] to-[#fdba74]',
    icon: BadgeCheck,
  },
  {
    title: 'home.benefit4',
    body: 'home.benefit4Body',
    className: 'bg-gradient-to-br from-[#6d28d9] to-[#c4b5fd]',
    icon: Sparkles,
  },
]

export function WhyChooseSection() {
  const { t } = useI18n()

  return (
    <section className="bg-white">
      <Container className="py-20 lg:py-24">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-[40px] font-semibold leading-[58px] text-black md:text-[48px]">{t('home.why')}</h2>
            <p className="mt-5 max-w-[500px] text-[18px] leading-8 text-black/70">{t('home.whyBody')}</p>
          </div>
          <article className="relative min-h-[345px] overflow-hidden rounded-[20px] bg-[#0b2a4a] p-10 text-white">
            <Handshake />
            <h3 className="relative text-[24px] font-semibold leading-[30px]">{t('home.solutions')}</h3>
            <p className="relative mt-4 max-w-md text-[17px] leading-6 text-white/75">{t('home.solutionsBody')}</p>
          </article>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => {
            const Icon = card.icon
            return (
              <article key={card.title} className={`min-h-[296px] rounded-[20px] p-8 text-white ${card.className}`}>
                <Icon className="mb-5 size-12" aria-hidden="true" />
                <h3 className="text-[24px] font-semibold">{t(card.title)}</h3>
                <p className="mt-4 text-[16px] leading-7 text-white/80">{t(card.body)}</p>
              </article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

function Handshake() {
  return (
    <svg viewBox="0 0 180 140" className="pointer-events-none absolute -right-2 bottom-0 h-40 w-48 opacity-80" aria-hidden="true">
      <path d="M20 90c20-30 40-20 55-8l18 16c8 7 20 6 28-2l22-24c8-8 20-6 26 4 6 10 2 22-8 28l-30 22c-18 12-40 8-54-6L40 96c-8-6-16-4-20-6Z" fill="#7ec8ff" />
      <path d="M48 78c12-8 24-4 32 6" stroke="#fff" strokeWidth="4" fill="none" />
    </svg>
  )
}
