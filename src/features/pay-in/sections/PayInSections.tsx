import { Container } from '@/components/common/Container'
import { PrimaryButton } from '@/components/common/PrimaryButton'
import { useI18n } from '@/lib/i18n'

const methods = [
  { label: 'Cash Payment', className: 'right-[8%] top-[8%] lg:right-[18%] lg:top-[7%]' },
  { label: 'ATM Offline', className: 'left-[4%] top-[18%] lg:left-[6%] lg:top-[16%]' },
  { label: 'Card Payment', className: 'left-0 top-[46%]' },
  { label: 'QR Code Payment', className: 'right-0 top-[32%]' },
  { label: 'E-Wallet', className: 'right-[6%] bottom-[28%]' },
  { label: 'Local Bank', className: 'left-[18%] bottom-[16%]' },
]

export function PayInHero() {
  const { t } = useI18n()
  return (
    <section className="overflow-hidden bg-gradient-to-b from-[#dce9ff] to-[#f3f8ff]">
      <div className="mx-auto grid max-w-[1280px] items-center gap-8 px-5 py-16 md:px-8 lg:min-h-[704px] lg:grid-cols-[594px_1fr] lg:py-0">
        <div className="lg:pt-16">
          <h1 className="text-[36px] font-semibold uppercase leading-[1.2] text-[#1a1a1a] md:text-[48px] lg:text-[55px]">
            {t('payin.h1a')} <span className="text-[#00b3ff]">{t('payin.h1b')}</span> {t('payin.h1c')}
          </h1>
          <p className="mt-4 max-w-[540px] text-[18px] leading-7 text-[#666]">{t('payin.lead')}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <PrimaryButton to="/pay/collect">Collect in AED</PrimaryButton>
            <PrimaryButton to="/contact" variant="outline">
              {t('cta.enquire')}
            </PrimaryButton>
          </div>
        </div>
        <div className="relative h-[420px] lg:h-[560px]">
          <div className="absolute left-1/2 top-[18%] size-[250px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_30%_30%,#ffffff,#9fd8ff_42%,#1d6dff_78%)] shadow-[0_30px_60px_rgba(29,109,255,0.25)] lg:size-[334px]" />
          <svg viewBox="0 0 334 334" className="absolute left-1/2 top-[18%] size-[250px] -translate-x-1/2 lg:size-[334px]" aria-hidden="true">
            <ellipse cx="167" cy="167" rx="120" ry="48" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2" />
            <ellipse cx="167" cy="167" rx="48" ry="120" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2" />
            <path d="M40 170h254M167 40v254" stroke="rgba(255,255,255,0.25)" />
          </svg>
          {methods.map((method) => (
            <div
              key={method.label}
              className={`absolute flex h-[60px] items-center gap-2 rounded-2xl bg-gradient-to-r from-[#e5f3ff] to-white px-4 shadow-[8px_12px_30px_rgba(0,0,0,0.05)] ${method.className}`}
            >
              <MethodGlyph label={method.label} />
              <span className="text-[15px] text-black/90 lg:text-[16px]">{method.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function MethodGlyph({ label }: { label: string }) {
  return (
    <span className="grid size-9 place-items-center rounded-lg bg-[#0096f7]/10 text-[10px] font-semibold text-[#0096f7]">
      {label.slice(0, 2).toUpperCase()}
    </span>
  )
}

export function ConnectSection() {
  return (
    <section
      className="bg-white"
      style={{ backgroundImage: 'radial-gradient(rgba(0,0,0,0.1) 1px, transparent 0)', backgroundSize: '20px 20px' }}
    >
      <Container className="py-24">
        <h2 className="text-center text-[36px] font-semibold leading-tight text-[#000d3b] md:text-[48px] md:leading-[57px]">
          Connect the World
          <br />
          Serve the Globe
        </h2>
        <WorldRoutes />
      </Container>
    </section>
  )
}

function WorldRoutes() {
  return (
    <svg viewBox="0 0 1100 420" className="mx-auto mt-12 h-auto w-full max-w-[1000px]" role="img" aria-label="Routes connecting regions">
      <ellipse cx="550" cy="220" rx="420" ry="150" fill="#e7f3ff" />
      <path d="M180 230 C 320 80, 480 80, 550 200 S 820 360, 940 180" fill="none" stroke="#32b9ff" strokeWidth="3" />
      <path d="M220 180 C 400 260, 700 80, 900 240" fill="none" stroke="#0096f7" strokeWidth="2" strokeDasharray="6 8" />
      {[
        [220, 190],
        [400, 150],
        [550, 210],
        [760, 160],
        [920, 200],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="10" fill="#fff" stroke="#0096f7" strokeWidth="3" />
          <circle cx={x} cy={y} r="3" fill="#0096f7" />
        </g>
      ))}
    </svg>
  )
}

export function ApmSection() {
  return (
    <section className="relative flex min-h-[560px] items-center overflow-hidden bg-[#06284a] text-white lg:min-h-[700px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(50,185,255,0.35),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(0,150,247,0.35),transparent_42%)]" />
      <Container className="relative max-w-[816px] py-24 text-center">
        <h2 className="text-[36px] font-semibold md:text-[48px] md:leading-[58px]">Popular Local APMs</h2>
        <div className="mx-auto mt-6 h-0.5 w-[60px] bg-white" />
        <p className="mt-10 text-[18px] leading-8 text-white/70 md:text-[20px]">
          Offer multiple collection options, including local bank transfers, virtual bank accounts, e-wallets, QR
          payments, and payment links. The methods a business can enable are confirmed during onboarding.
        </p>
      </Container>
    </section>
  )
}

export function PlatformSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-10 px-5 py-16 md:px-8 lg:h-[714px] lg:flex-row lg:justify-between">
        <div className="max-w-[574px]">
          <h2 className="mb-8 text-[36px] font-semibold leading-tight text-black/90 md:text-[48px] md:leading-[58px]">
            Multi-Platform Compatibility
          </h2>
          <p className="text-[20px] leading-[30px] text-black/65">
            Support iOS, Android, Web, and H5-style mobile web, so a checkout can meet customers on the device they
            already use.
          </p>
        </div>
        <Devices />
      </div>
    </section>
  )
}

function Devices() {
  return (
    <div className="relative h-[360px] w-full max-w-[520px] lg:h-[480px]" aria-hidden="true">
      <div className="absolute bottom-6 left-6 h-[300px] w-[170px] rounded-[28px] border-[8px] border-[#12324f] bg-[#eff5ff] shadow-xl">
        <div className="m-3 h-24 rounded-2xl bg-[#32b9ff]/30" />
        <div className="mx-3 mt-3 h-3 rounded bg-[#12324f]/15" />
        <div className="mx-3 mt-2 h-3 w-2/3 rounded bg-[#12324f]/10" />
      </div>
      <div className="absolute right-0 top-0 h-[250px] w-[320px] rounded-2xl border-[8px] border-[#0b2a4a] bg-white shadow-xl">
        <div className="flex h-8 items-center gap-1 bg-[#0b2a4a] px-3">
          <span className="size-2 rounded-full bg-white/70" />
          <span className="size-2 rounded-full bg-white/40" />
        </div>
        <div className="grid grid-cols-3 gap-3 p-4">
          {['iOS', 'Android', 'Web'].map((name) => (
            <div key={name} className="rounded-xl bg-[#eff5ff] p-3 text-center text-xs font-semibold text-[#0096f7]">
              {name}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function TransferSection() {
  return (
    <section className="bg-[#eff5ff]">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-10 px-5 py-16 md:px-8 lg:h-[714px] lg:flex-row lg:justify-between">
        <TransferArt />
        <div className="max-w-[574px]">
          <h2 className="mb-8 text-[36px] font-semibold leading-tight text-black/90 md:text-[48px] md:leading-[58px]">
            Real Time Transfer 24/7/365
          </h2>
          <p className="text-[20px] leading-[30px] text-black/65">
            Real-time transfer workflows with round-the-clock operational support. Bank and wallet coverage is confirmed
            for each market before go-live, rather than listed as a universal guarantee.
          </p>
        </div>
      </div>
    </section>
  )
}

function TransferArt() {
  return (
    <div className="grid w-full max-w-[520px] gap-4" aria-hidden="true">
      {[
        ['Collection received', '00:01'],
        ['Route selected', '00:02'],
        ['Beneficiary credited', '00:03'],
      ].map(([label, time]) => (
        <div key={label} className="flex items-center justify-between rounded-2xl bg-white px-6 py-5 shadow-sm">
          <div>
            <p className="text-sm text-black/50">Transfer step</p>
            <p className="text-lg font-semibold">{label}</p>
          </div>
          <span className="rounded-full bg-[#e7f7ff] px-4 py-2 text-sm font-semibold text-[#0096f7]">{time}</span>
        </div>
      ))}
    </div>
  )
}
