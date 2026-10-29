import { Container } from '@/components/common/Container'
import { PrimaryButton } from '@/components/common/PrimaryButton'
import { useI18n } from '@/lib/i18n'

const solutions = [
  {
    title: 'Popular Local APMs',
    body: 'Multiple payout destinations can include local bank transfers, virtual accounts, e-wallets, and QR-linked accounts. Availability is confirmed per country.',
  },
  {
    title: 'Automated Payouts',
    body: 'Payouts can be initiated through an API so finance teams do not re-key every transfer. The API reference is published only when documentation is ready.',
  },
  {
    title: 'Minimize Manual Processes and Errors',
    body: 'Batch payouts are described as a file upload instead of one-by-one transfers. File size and row limits are agreed during onboarding.',
  },
  {
    title: 'Reliability',
    body: 'The operating story includes route selection and a retry when a transfer fails. Specific success rates are demonstration figures until measured for SS Nexus.',
  },
  {
    title: 'User-Friendly Dashboard',
    body: 'Manual payouts and batch processing are shown as back-office actions. This site does not include a live merchant dashboard.',
  },
  {
    title: 'Data Reporting',
    body: 'Transaction tracking and downloadable reconciliation reports are part of the payout presentation.',
  },
]

const cases = [
  {
    title: 'P2P direct fund transfer',
    body: 'Peer-to-peer platforms moving funds to borrowers or recipients.',
  },
  {
    title: 'Optimized transfer for fintechs',
    body: 'Fintech teams that need a clearer path for cross-border disbursement.',
  },
  {
    title: 'Localized payments for players',
    body: 'Platforms that pay players in the local method they already use.',
  },
  {
    title: 'Merchant payouts made easy',
    body: 'Merchants disbursing funds to partners, sellers, or affiliates.',
  },
]

export function PayOutHero() {
  const { t } = useI18n()
  return (
    <section className="overflow-hidden bg-gradient-to-b from-[#dce9ff] to-[#f3f8ff]">
      <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-5 py-16 md:px-8 lg:min-h-[704px] lg:grid-cols-2">
        <div>
          <h1 className="text-[36px] font-semibold uppercase leading-[1.2] md:text-[48px] lg:text-[55px]">
            {t('payout.h1a')} <span className="text-[#00b3ff]">{t('payout.h1b')}</span> {t('payout.h1c')}
          </h1>
          <p className="mt-4 max-w-[580px] text-[18px] leading-7 text-[#666]">{t('payout.lead')}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <PrimaryButton to="/pay/disburse">Send an AED payout</PrimaryButton>
            <PrimaryButton to="/contact" variant="outline">
              {t('cta.enquire')}
            </PrimaryButton>
          </div>
        </div>
        <PayoutVisual />
      </div>
    </section>
  )
}

function PayoutVisual() {
  return (
    <div className="relative mx-auto h-[360px] w-full max-w-[520px]" aria-hidden="true">
      <div className="absolute inset-x-8 top-8 rounded-[28px] bg-white p-6 shadow-[0_20px_40px_rgba(15,50,90,0.12)]">
        <p className="text-sm text-black/50">Payout batch</p>
        <p className="mt-2 text-3xl font-semibold">Ready to send</p>
        <div className="mt-6 space-y-3">
          {['Local bank', 'E-wallet', 'Partner account'].map((row, index) => (
            <div key={row} className="flex items-center justify-between rounded-xl bg-[#f4f8ff] px-4 py-3">
              <span className="font-medium">{row}</span>
              <span className="text-sm text-[#0096f7]">{index === 2 ? 'Queued' : 'Sent'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function PayOutSolutions() {
  return (
    <section className="bg-white py-24">
      <Container>
        <h2 className="text-center text-[40px] font-semibold text-[#000d3b] md:text-[48px]">Solutions</h2>
        <p className="mx-auto mt-6 max-w-[900px] text-center text-[20px] leading-8 text-black/65">
          A payout stack built around local methods, automated transfers, batch files, routing, a dashboard, and
          reports. Claims about live coverage stay out of this page until they are approved.
        </p>
        <div className="mt-16 grid gap-x-8 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
          {solutions.map((item, index) => (
            <article key={item.title}>
              <div className="mb-6 grid size-14 place-items-center rounded-2xl bg-[#e7f4ff] text-lg font-semibold text-[#0096f7]">
                {index + 1}
              </div>
              <h3 className="text-[28px] font-semibold leading-9">{item.title}</h3>
              <p className="mt-3 text-[16px] leading-6 text-black/65">{item.body}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}

export function GlobalPayouts() {
  return (
    <section className="flex min-h-[520px] items-center bg-[#06284a] bg-[radial-gradient(circle_at_70%_40%,rgba(50,185,255,0.35),transparent_45%)] py-24 text-white lg:min-h-[700px]">
      <Container className="max-w-[816px] text-center">
        <h2 className="text-[36px] font-semibold md:text-[48px]">Support Global Payments</h2>
        <div className="mx-auto my-6 h-0.5 w-[60px] bg-white" />
        <p className="text-[20px] leading-8 text-white/65">
          A disbursement view for banks and digital wallets in the markets you agree to support. Country lists are not
          published as a guarantee on this site.
        </p>
      </Container>
    </section>
  )
}

export function UseCases() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-5 md:px-8 lg:grid-cols-2">
        <div>
          <h2 className="pt-4 text-[40px] font-semibold text-[#000d3b] md:text-[48px]">Use Cases Include</h2>
          <div className="mt-8 space-y-6">
            {cases.map((item) => (
              <article key={item.title} className="flex gap-4">
                <span className="mt-1 grid size-8 shrink-0 place-items-center rounded-full bg-[#e7f7ff] text-[#0096f7]">✓</span>
                <div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-1 text-black/65">{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="relative min-h-[460px] rounded-[32px] bg-[#f3f8ff] p-8">
          {cases.map((item, index) => (
            <article
              key={item.title}
              className="absolute left-8 right-8 rounded-2xl bg-white p-5 shadow-lg"
              style={{ top: 36 + index * 92 }}
            >
              <h3 className="text-lg font-semibold">{item.title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
