import { Container } from '@/components/common/Container'
import { DemoNotice } from '@/components/common/DemoNotice'
import { demoMetrics } from '@/data/siteConfig'
import { useI18n } from '@/lib/i18n'

export function HeroSection() {
  const { t } = useI18n()

  return (
    <section className="relative overflow-hidden bg-[#e3effe]">
      <div className="pointer-events-none absolute -left-24 top-10 h-[420px] w-[420px] rounded-full bg-[#d4e8ff] blur-2xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-[520px] w-[640px] rounded-[40%] bg-[#c5ddfb]" />
      <Container className="relative grid items-center gap-10 py-16 lg:min-h-[780px] lg:grid-cols-[1fr_640px] lg:py-20">
        <div className="max-w-[560px]">
          <h1 className="text-[36px] font-semibold leading-[1.18] text-[#1a1a1a] md:text-[52px] lg:text-[64px] lg:leading-[76px]">
            {t('home.heroTitleA')} <span className="text-[#32b9ff]">{t('home.heroHighlight')}</span>
            <br />
            {t('home.heroTitleB')}
          </h1>
          <p className="mt-6 max-w-[90%] text-[17px] leading-7 text-black/65 md:text-[20px] md:leading-8">
            {t('home.heroBody')}
          </p>
          <DemoNotice>{t('demo.metrics')}</DemoNotice>
        </div>
        <Dashboard />
      </Container>
    </section>
  )
}

function Dashboard() {
  const { t } = useI18n()
  return (
    <div className="relative mx-auto h-[560px] w-full max-w-[640px] lg:h-[620px]">
      <article className="absolute left-0 top-0 z-30 w-[min(100%,349px)] rounded-[13px] bg-gradient-to-br from-white to-[#f8f9fa] p-6 shadow-[0_10px_20px_rgba(0,0,0,0.1)]">
        <p className="text-[16px] text-black/65">{t('home.tx')}</p>
        <p className="mt-4 text-[22px] font-semibold text-black/90">
          {t('home.today')} {demoMetrics.todayAmount}
        </p>
        <p className="text-[22px] font-semibold text-black/90">
          {t('home.yesterday')} {demoMetrics.yesterdayAmount}
        </p>
        <Chart />
      </article>

      <article className="absolute right-0 top-8 z-20 hidden w-[248px] rounded-[13px] bg-white/90 p-5 shadow-[0_10px_20px_rgba(0,0,0,0.1)] sm:block">
        <div className="flex items-center gap-2 text-[16px] text-black/65">
          <span className="grid size-7 place-items-center rounded-full bg-[#e8f8ff] text-[#0096f7]">$</span>
          {t('home.success')}
        </div>
        <p className="mt-4 text-[22px] font-semibold">{demoMetrics.successAmount}</p>
        <p className="mt-1 text-[13px] text-[#1ac475]">{demoMetrics.totalPayment}</p>
      </article>

      <article className="absolute bottom-[150px] left-0 z-10 hidden h-[250px] w-[349px] overflow-hidden rounded-[13px] bg-gradient-to-b from-white to-[#e5eefa] p-6 shadow-[0_10px_20px_rgba(0,0,0,0.08)] sm:block">
        <h2 className="text-[20px] font-semibold text-black/90">{t('home.partner')}</h2>
        <p className="mt-1 text-[16px] text-black/65">{t('home.partnerSub')}</p>
        <MethodOrbs />
      </article>

      <article className="absolute bottom-[210px] left-6 z-40 flex w-[230px] items-center gap-3 rounded-[13px] bg-white p-4 shadow-[0_10px_20px_rgba(0,0,0,0.12)]">
        <span className="grid size-10 place-items-center rounded-full bg-[#e9fbf3] text-[#1ac475]">
          <CheckIcon />
        </span>
        <div>
          <p className="text-[28px] font-bold leading-6">{demoMetrics.successRate}</p>
          <p className="text-[16px] font-medium">{t('home.rate')}</p>
        </div>
      </article>

      <article className="absolute bottom-6 right-0 z-20 w-[248px] rounded-[13px] bg-white/95 p-5 shadow-[0_10px_20px_rgba(0,0,0,0.1)]">
        <div className="flex items-center gap-2 text-[16px] text-black/65">
          <span className="grid size-7 place-items-center rounded-full bg-[#ffecec] text-[#ef4444]">↓</span>
          {t('home.payout')}
        </div>
        <p className="mt-4 text-[22px] font-semibold">{demoMetrics.payoutAmount}</p>
        <p className="mt-1 text-[13px] text-[#1ac475]">{demoMetrics.totalPayment}</p>
      </article>
    </div>
  )
}

function Chart() {
  return (
    <svg viewBox="0 0 290 110" className="mt-4 h-[110px] w-full" role="img" aria-label="Sample transaction trend">
      <line x1="0" y1="20" x2="290" y2="20" stroke="#edf1f5" />
      <line x1="0" y1="50" x2="290" y2="50" stroke="#edf1f5" />
      <line x1="0" y1="80" x2="290" y2="80" stroke="#edf1f5" />
      <path d="M0 78 C 40 70, 70 40, 110 48 S 170 20, 210 36 260 22 290 18" fill="none" stroke="#32b9ff" strokeWidth="3" />
      <path d="M0 78 C 40 70, 70 40, 110 48 S 170 20, 210 36 260 22 290 18 V 110 H 0 Z" fill="rgba(50,185,255,0.15)" />
    </svg>
  )
}

function MethodOrbs() {
  const orbs = [
    { color: '#5b6cff', label: 'Bank' },
    { color: '#7c3aed', label: 'Wallet' },
    { color: '#22c55e', label: 'QR' },
    { color: '#f97316', label: 'Card' },
  ]
  return (
    <div className="mt-8 flex gap-3" aria-hidden="true">
      {orbs.map((orb) => (
        <span
          key={orb.label}
          className="grid size-14 place-items-center rounded-full text-[11px] font-semibold text-white shadow-md"
          style={{ background: orb.color }}
        >
          {orb.label}
        </span>
      ))}
    </div>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#1ac475" />
      <path d="M7 12.5 10.2 16 17 8.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
