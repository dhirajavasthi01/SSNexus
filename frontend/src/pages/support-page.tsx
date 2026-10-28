import { Link } from "react-router-dom"

import { containerClass } from "@/data/site.ts"
import { usePageTitle } from "@/hooks/use-page-title.ts"
import { appConfig } from "@/lib/app-config.ts"

const channels = [
  {
    title: "Launch support",
    description:
      "Implementation specialists stay with your team from sandbox certification through the first live settlements.",
  },
  {
    title: "Operations desk",
    description:
      "Payment operations can help trace a transaction, explain a decline, or review a payout that needs attention.",
  },
  {
    title: "Status and FAQs",
    description:
      "Common setup questions live in the FAQ. For anything account-specific, send an enquiry from the contact page.",
  },
]

export function SupportPage() {
  usePageTitle(`Support | ${appConfig.name}`)

  return (
    <>
    <section className="hero-canvas">
      <div className={`${containerClass} py-16 lg:py-24`}>
        <p className="eyebrow">Global Payment Solutions</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Support that stays with the integration
        </h1>
        <p className="mt-5 max-w-2xl leading-7 text-ink/65">
          {appConfig.name} support covers onboarding, live payments, and the
          questions finance teams ask after launch.
        </p>
      </div>
    </section>
    <section className={`${containerClass} py-16`}>
      <div className="grid gap-4 md:grid-cols-3">
        {channels.map((item) => (
          <article key={item.title} className="solution-card rounded-3xl p-6">
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="mt-2 leading-7 text-ink/70">{item.description}</p>
          </article>
        ))}
      </div>
      <Link
        to="/contact"
        className="btn-brand mt-8 inline-flex h-10 items-center rounded-full px-5 text-sm font-medium"
      >
        Contact support
      </Link>
    </section>
    </>
  )
}
