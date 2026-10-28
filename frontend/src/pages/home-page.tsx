import { ArrowRight, Cpu, Gauge, ShieldCheck, Sparkles } from "lucide-react"
import { Link } from "react-router-dom"

import { DashboardPreview } from "@/components/dashboard-preview.tsx"
import { MarketGlobe } from "@/components/market-globe.tsx"
import { Reveal } from "@/components/reveal.tsx"
import { RollingNumber } from "@/components/rolling-number.tsx"
import { containerClass, partners } from "@/data/site.ts"
import { usePageTitle } from "@/hooks/use-page-title.ts"
import { appConfig } from "@/lib/app-config.ts"

const reasons = [
  {
    title: "High Success Rates",
    description: "Enjoy up to 95% success rates with intelligent payment routing.",
    icon: Gauge,
  },
  {
    title: "Advanced Security",
    description: "Protect every transfer with encryption, controls, and screening.",
    icon: ShieldCheck,
  },
  {
    title: "Fast & Free Onboarding",
    description: "Launch quickly with guided setup and a sandbox from day one.",
    icon: Sparkles,
  },
  {
    title: "Innovative Technology",
    description: "Use a modern API and dashboard built for high-growth teams.",
    icon: Cpu,
  },
]

const solutions = [
  {
    title: "Pay in",
    description: "Accept local payment methods in one integration.",
    to: "/pay-in",
  },
  {
    title: "Pay out",
    description: "Instant, automated disbursements worldwide.",
    to: "/pay-out",
  },
  {
    title: "Integration",
    description: "Developer-friendly APIs and sandbox.",
    to: "/integration",
  },
]

export function HomePage() {
  usePageTitle(`${appConfig.name} | Global Payment Solutions`)

  return (
    <div className="bg-white">
      <section className="hero-canvas relative overflow-hidden">
        <div className={`${containerClass} grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24`}>
          <div>
            <p className="eyebrow hero-rise">Global Payment Solutions</p>
            <h1 className="hero-rise mt-4 max-w-xl text-4xl leading-[1.05] font-semibold tracking-tight text-ink sm:text-6xl [animation-delay:80ms]">
              Seamless Payments, Settled Instantly
            </h1>
            <p className="hero-rise mt-5 max-w-md text-base leading-7 text-ink/65 [animation-delay:160ms]">
              {appConfig.name} is a global payment aggregator helping businesses
              accept 100+ local payment methods and process payouts instantly,
              securely, and at scale.
            </p>
            <div className="hero-rise mt-8 flex flex-wrap gap-3 [animation-delay:240ms]">
              <Link
                to="/contact"
                className="btn-brand inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5"
              >
                Enquire Now
                <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/integration"
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-5 py-2.5 text-sm font-medium text-ink transition-transform duration-200 hover:-translate-y-0.5 hover:border-sky hover:text-sky"
              >
                View integration
              </Link>
            </div>
          </div>
          <div className="hero-rise [animation-delay:180ms]">
            <DashboardPreview />
          </div>
        </div>
      </section>

      <section className="border-y border-black/5 bg-[#f7fbfe] py-6">
        <p className="text-center text-[11px] font-semibold tracking-[0.16em] text-ink/40 uppercase">
          Trusted by growing merchants
        </p>
        <div className="marquee mt-4 overflow-hidden">
          <div className="marquee-track flex w-max items-center gap-3 px-3">
            {[...partners, ...partners].map((name, index) => (
              <span key={`${name}-${index}`} className="merchant-badge">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className={`${containerClass} py-20`}>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-4xl font-semibold tracking-tight">Who We Serve</h2>
            <p className="mt-4 max-w-lg leading-7 text-ink/65">
              {appConfig.name} empowers emerging businesses with fast, reliable
              global payments. With 100+ local methods — bank transfers,
              e-wallets, and virtual accounts — reach customers worldwide while
              checkout and settlement stay reliable.
            </p>
            <dl className="mt-8 grid gap-3 sm:grid-cols-3">
              {(
                [
                  { value: 6000, suffix: "+", label: "Merchants", delay: 0 },
                  { value: 200, suffix: " Million", label: "Transactions/month", delay: 140 },
                  { value: 100, suffix: "+", label: "Payment methods", delay: 280 },
                ] as const
              ).map((stat) => (
                <div
                  key={stat.label}
                  className="stat-card rounded-2xl px-4 py-5 shadow-[0_12px_28px_rgba(20,60,110,0.06)]"
                >
                  <dt className="text-2xl font-semibold text-[#0c2340]">
                    <RollingNumber value={stat.value} suffix={stat.suffix} startDelay={stat.delay} />
                  </dt>
                  <dd className="mt-1 text-xs text-ink/55">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <MarketGlobe />
        </div>
      </section>

      <section className="panel-navy py-20 text-white">
        <div className={containerClass}>
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="icon-well mx-auto flex size-12 items-center justify-center rounded-2xl text-white">
              <ShieldCheck className="size-6" />
            </span>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight">
              Why Choose {appConfig.name}
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/70">
              Instant settlements, 99.99% success rates, and licensed-ready
              controls. Built for high-growth industries that need secure and
              borderless payments.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((reason, index) => (
              <Reveal key={reason.title} delay={index * 80}>
                <article className="feature-card h-full rounded-3xl p-6 transition-transform duration-200 hover:-translate-y-1">
                  <span className="icon-well flex size-10 items-center justify-center rounded-xl text-white">
                    <reason.icon className="size-5" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{reason.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/65">
                    {reason.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={`${containerClass} py-20`}>
        <Reveal>
          <h2 className="text-center text-4xl font-semibold tracking-tight">
            Our Solutions
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {solutions.map((solution, index) => (
            <Reveal key={solution.title} delay={index * 90}>
              <article className="solution-card group flex h-full flex-col rounded-3xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                <h3 className="text-xl font-semibold">{solution.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-ink/65">
                  {solution.description}
                </p>
                <Link
                  to={solution.to}
                  className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-sky"
                >
                  Learn more
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className={`${containerClass} pb-20`}>
        <Reveal>
          <div className="cta-banner relative overflow-hidden rounded-[32px] px-6 py-16 text-center text-white sm:px-12">
            <div className="cta-orb pointer-events-none absolute -top-24 -right-8 size-72" />
            <div className="cta-orb-deep pointer-events-none absolute right-10 -bottom-28 size-64" />
            <h2 className="relative text-3xl font-semibold tracking-tight sm:text-4xl">
              Ready to go global with {appConfig.name}?
            </h2>
            <p className="relative mx-auto mt-3 max-w-xl text-sm leading-6 text-white/70">
              Fast, free onboarding. Start accepting 100+ local payment methods
              and move payouts the same day.
            </p>
            <Link
              to="/contact"
              className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-navy transition-transform duration-200 hover:-translate-y-0.5"
            >
              Enquire Now
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
