import { Container } from '@/components/common/Container'
import { DemoNotice } from '@/components/common/DemoNotice'
import { coverageMarkets, demoMetrics } from '@/data/siteConfig'
import { useI18n } from '@/lib/i18n'

const positions = [
  'left-[8%] top-[18%]',
  'left-[28%] top-[8%]',
  'right-[18%] top-[16%]',
  'left-[4%] top-[42%]',
  'left-[36%] top-[36%]',
  'right-[8%] top-[40%]',
  'left-[18%] bottom-[28%]',
  'right-[22%] bottom-[30%]',
  'left-[8%] bottom-[10%]',
  'left-[42%] bottom-[12%]',
  'right-[10%] bottom-[8%]',
]

export function WhoWeServeSection() {
  const { t } = useI18n()
  const stats = [
    { value: demoMetrics.merchants, label: demoMetrics.merchantLabel },
    { value: demoMetrics.transactionsValue, label: demoMetrics.transactionsLabel },
    { value: demoMetrics.methods, label: demoMetrics.methodsLabel },
  ]

  return (
    <section className="relative overflow-hidden bg-[#002542] text-white">
      <Container className="grid items-center gap-12 py-20 lg:min-h-[780px] lg:grid-cols-2 lg:py-24">
        <div>
          <h2 className="text-[40px] font-semibold leading-tight md:text-[48px]">{t('home.serve')}</h2>
          <p className="mt-6 max-w-[450px] text-[18px] leading-8 text-white/80">{t('home.serveBody')}</p>
          <div className="mt-16 grid grid-cols-3 gap-4 border-t border-white/20 pt-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-[22px] font-semibold leading-tight md:text-[32px]">{stat.value}</p>
                <p className="mt-2 text-[14px] text-white md:text-[16px]">{stat.label}</p>
              </div>
            ))}
          </div>
          <DemoNotice>{t('demo.metrics')}</DemoNotice>
          <p className="mt-2 text-sm text-white/70">{t('demo.markets')}</p>
        </div>
        <div className="relative hidden h-[560px] lg:block" aria-hidden="true">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,#3d6d92_1.2px,transparent_1.4px)] [background-size:14px_14px] opacity-70" />
          {coverageMarkets.map((market, index) => (
            <span
              key={market}
              className={`absolute rounded-full bg-white px-4 py-1 text-[16px] font-semibold leading-8 text-black/90 ${positions[index]}`}
            >
              {market}
            </span>
          ))}
        </div>
        <ul className="flex flex-wrap gap-2 lg:hidden">
          {coverageMarkets.map((market) => (
            <li key={market} className="rounded-full bg-white px-4 py-1 text-sm font-semibold text-black/90">
              {market}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
