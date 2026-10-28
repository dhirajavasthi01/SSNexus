import {
  Cpu,
  Gauge,
  ShieldCheck,
  Sparkles,
  WalletCards,
} from "lucide-react"

import { DashboardPreview } from "@/components/dashboard-preview.tsx"
import { containerClass, markets } from "@/data/site.ts"
import { usePageTitle } from "@/hooks/use-page-title.ts"
import { appConfig } from "@/lib/app-config.ts"

const reasons = [
  {
    title: "High Success Rates",
    description:
      "Smart routing keeps checkout completion high across cards, banks, and wallets.",
    icon: Gauge,
  },
  {
    title: "Advanced Security",
    description:
      "Encryption, access controls, and screening protect every collection and payout.",
    icon: ShieldCheck,
  },
  {
    title: "Fast & Free Onboarding",
    description:
      "Go live with a guided setup, sandbox keys, and a team that stays through launch.",
    icon: Sparkles,
  },
  {
    title: "Innovative Technology",
    description:
      "APIs, webhooks, and a live dashboard keep operations reliable as volume grows.",
    icon: Cpu,
  },
]

export function HomePage() {
  usePageTitle(`${appConfig.name} | Global Payment Solutions`)

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-24 -left-20 size-[28rem] rounded-full bg-[#d5ebfc]" />
        <div className="pointer-events-none absolute top-10 -right-24 size-[36rem] rounded-full bg-[#cfe6fb]" />
        <div className={`${containerClass} relative grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24`}>
          <div className="max-w-xl">
            <p className="text-sm font-medium tracking-wide text-sky">
              Global Payment Solutions
            </p>
            <h1 className="mt-4 text-4xl leading-tight font-semibold tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Seamless
              <span className="block text-sky">Payments</span>
              Settled Instantly
            </h1>
            <p className="mt-6 max-w-md text-base leading-7 text-ink/70">
              {appConfig.name} helps businesses accept local payment methods and
              process payouts instantly, securely, efficiently, and at scale.
            </p>
          </div>
          <DashboardPreview />
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy text-white">
        <div
          className="pointer-events-none absolute top-0 right-0 h-full w-full opacity-40 sm:w-1/2"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.55) 1px, transparent 1.4px)",
            backgroundSize: "12px 12px",
            maskImage:
              "radial-gradient(circle at 70% 50%, black 0%, transparent 68%)",
          }}
        />
        <div className={`${containerClass} relative py-20`}>
          <div className="max-w-xl">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Who We Serve
            </h2>
            <p className="mt-5 text-base leading-7 text-white/75">
              {appConfig.name} supports growing businesses with fast global
              payments. Local bank transfers, e-wallets, and virtual accounts
              help you reach customers while checkout and settlement stay
              reliable.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {markets.map((market) => (
              <span
                key={market}
                className="rounded-full bg-white px-3 py-1 text-xs font-medium text-ink"
              >
                {market}
              </span>
            ))}
          </div>
          <dl className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              ["100+", "Payment methods"],
              ["24/7", "Settlement window"],
              ["99.99%", "Target success rate"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl bg-white/8 px-4 py-5">
                <dt className="text-2xl font-semibold">{value}</dt>
                <dd className="mt-1 text-sm text-white/70">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className={`${containerClass} py-20`}>
        <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Why Choose {appConfig.name}
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-ink/70">
          Merchants choose {appConfig.name} for instant settlements, high
          success rates, and controls built for regulated payment operations.
          The platform is shaped for high-growth businesses that need secure,
          borderless payments.
        </p>
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <article className="rounded-3xl bg-white p-8 shadow-[0_16px_40px_rgba(15,40,80,0.06)]">
            <WalletCards className="size-8 text-sky" />
            <h3 className="mt-5 text-2xl font-semibold">Our Solutions</h3>
            <p className="mt-3 leading-7 text-ink/70">
              From accepting payments to automating payouts, {appConfig.name}{" "}
              delivers a complete global payment gateway. Fraud screening,
              real-time reporting, and a straightforward API make it practical
              to operate across regions.
            </p>
          </article>
          <div className="grid gap-4 sm:grid-cols-2">
            {reasons.map((reason) => (
              <article
                key={reason.title}
                className="rounded-3xl bg-white p-5 shadow-[0_16px_40px_rgba(15,40,80,0.06)]"
              >
                <reason.icon className="size-6 text-sky" />
                <h3 className="mt-4 text-lg font-semibold">{reason.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink/70">
                  {reason.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className={`${containerClass} py-20`}>
          <h2 className="text-4xl font-semibold tracking-tight">Trusted by</h2>
          <p className="mt-4 max-w-3xl leading-7 text-ink/70">
            {appConfig.name}, anytime, anywhere. The platform is built for
            merchants that need consistent checkout and payout performance
            across markets.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {["NovaPay", "Orbit", "Lumen", "Harbor", "Kinetic", "North"].map(
              (name) => (
                <div
                  key={name}
                  className="flex h-16 items-center justify-center rounded-2xl bg-ice text-sm font-semibold text-ink/70"
                >
                  {name}
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </>
  )
}
