import { Container } from '@/components/common/Container'
import { PrimaryButton } from '@/components/common/PrimaryButton'
import { useI18n } from '@/lib/i18n'

const tiles = ['Local bank', 'E-wallet', 'QR pay', 'Card', 'Virtual account', 'Payment link', 'Cash', 'Payout file']

export function TrustedSection() {
  const { t } = useI18n()
  const row = [...tiles, ...tiles]

  return (
    <section className="relative overflow-hidden bg-[#c0d8e5]">
      <Container className="grid gap-8 py-20 lg:grid-cols-[0.7fr_1.3fr] lg:py-28">
        <h2 className="text-[40px] font-semibold text-black md:text-[48px]">{t('home.trusted')}</h2>
        <div className="lg:text-right">
          <p className="ml-auto max-w-[624px] text-left text-[20px] leading-8 text-black/90">{t('home.trustedBody')}</p>
          <div className="mt-8 flex lg:justify-end">
            <PrimaryButton to="/contact" variant="outline">
              {t('cta.contact')}
            </PrimaryButton>
          </div>
          <p className="mt-4 text-left text-sm text-black/60 lg:text-right">{t('demo.partners')}</p>
        </div>
      </Container>
      <div className="space-y-4 pb-10">
        <Marquee items={row} />
        <Marquee items={[...row].reverse()} reverse />
      </div>
    </section>
  )
}

function Marquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="overflow-hidden">
      <div className={`flex w-max gap-5 ${reverse ? 'animate-[marquee_32s_linear_infinite_reverse]' : 'animate-[marquee_36s_linear_infinite]'}`}>
        {items.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="grid h-[70px] min-w-[180px] place-items-center rounded-full bg-white/80 px-6 text-sm font-semibold text-[#000d3b]"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
