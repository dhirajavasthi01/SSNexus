import { Building2, CreditCard, QrCode, Wallet } from "lucide-react"

import { containerClass } from "@/data/site.ts"
import { usePageTitle } from "@/hooks/use-page-title.ts"
import { appConfig } from "@/lib/app-config.ts"

const methods = [
  { label: "Card Payment", icon: CreditCard },
  { label: "QR Code Payment", icon: QrCode },
  { label: "E-Wallet", icon: Wallet },
  { label: "Local Bank", icon: Building2 },
]

const stats = [
  { value: "24", label: "Hours a day", tone: "light" },
  { value: "365", label: "Days a year", tone: "light" },
  { value: "100+", label: "Banks", tone: "solid" },
  { value: "7", label: "Days a week", tone: "light" },
  { value: "99%", label: "Success rate", tone: "soft" },
]

export function PayInPage() {
  usePageTitle(`Pay in | ${appConfig.name}`)

  return (
    <>
      <section className="overflow-hidden">
        <div className={`${containerClass} grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24`}>
          <div>
            <p className="text-sm font-medium text-sky">Global Payment Solutions</p>
            <h1 className="mt-4 text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
              TAILORED <span className="text-sky">PAYMENT SOLUTIONS</span> FOR
              GLOBAL OPERATIONS
            </h1>
            <p className="mt-5 max-w-lg leading-7 text-ink/70">
              Expand your reach and simplify international operations with a
              platform customers already know how to pay on.
            </p>
          </div>
          <div className="relative mx-auto size-72 sm:size-80">
            <div className="absolute inset-10 rounded-full bg-[radial-gradient(circle_at_30%_30%,#7fd0ff,#1d6fe0_55%,#0b3f86)] shadow-xl" />
            <div className="absolute inset-4 rounded-full border border-sky/30" />
            <div className="absolute inset-0 rounded-full border border-sky/20" />
            {methods.map((method, index) => {
              const positions = [
                "top-8 left-0",
                "top-6 right-0",
                "right-2 bottom-16",
                "bottom-6 left-8",
              ]
              return (
                <div
                  key={method.label}
                  className={`absolute ${positions[index]} flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-medium shadow-lg`}
                >
                  <method.icon className="size-4 text-sky" />
                  {method.label}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-navy text-white">
        <div className={`${containerClass} py-16`}>
          <h2 className="text-3xl font-semibold">Connect the World. Serve the Globe.</h2>
          <p className="mt-4 max-w-2xl leading-7 text-white/75">
            Pay-in coverage is assembled market by market, so a shopper in
            Jakarta, Mexico City, or Nairobi can pay with a method they already
            use.
          </p>
        </div>
      </section>

      <section className={`${containerClass} grid items-center gap-10 py-20 lg:grid-cols-2`}>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={
                stat.tone === "solid"
                  ? "rounded-3xl bg-sky p-5 text-white"
                  : stat.tone === "soft"
                    ? "rounded-3xl bg-[#8fd4ff] p-5 text-white"
                    : "rounded-3xl bg-white p-5 text-ink shadow-sm"
              }
            >
              <p className="text-3xl font-semibold">{stat.value}</p>
              <p className="mt-1 text-sm opacity-80">{stat.label}</p>
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-4xl font-semibold tracking-tight">
            Real Time Transfer 24/7/365
          </h2>
          <p className="mt-4 leading-7 text-ink/70">
            Collections stay available all year, with routing across banks and
            e-wallets so a declined path can be retried without asking the
            customer to start again.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className={`${containerClass} grid gap-8 py-16 lg:grid-cols-2`}>
          <article>
            <h2 className="text-2xl font-semibold">Popular Local APMs</h2>
            <p className="mt-3 leading-7 text-ink/70">
              Offer local bank transfers, virtual accounts, e-wallets, QR
              payments, and payment links alongside cards.
            </p>
          </article>
          <article>
            <h2 className="text-2xl font-semibold">Multi-Platform Compatibility</h2>
            <p className="mt-3 leading-7 text-ink/70">
              The same checkout works on iOS, Android, web, and mobile web, so
              product teams do not maintain a separate payment flow per device.
            </p>
          </article>
        </div>
      </section>
    </>
  )
}
