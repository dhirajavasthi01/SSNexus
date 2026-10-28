import { containerClass } from "@/data/site.ts"
import { usePageTitle } from "@/hooks/use-page-title.ts"
import { appConfig } from "@/lib/app-config.ts"

const steps = [
  {
    title: "Sandbox first",
    description:
      "Create test keys and run pay-in, payout, and refund scenarios before any live traffic.",
  },
  {
    title: "REST API",
    description:
      "Create charges, payouts, and customers with predictable JSON requests and idempotency keys.",
  },
  {
    title: "Webhooks",
    description:
      "Receive signed events when a payment succeeds, a payout settles, or a review is required.",
  },
  {
    title: "Go live",
    description:
      "Swap sandbox credentials for production keys after certification and reconciliation checks.",
  },
]

export function IntegrationPage() {
  usePageTitle(`Integration | ${appConfig.name}`)

  return (
    <>
    <section className="hero-canvas">
      <div className={`${containerClass} py-16 lg:py-24`}>
        <p className="eyebrow">Global Payment Solutions</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Integrate once. Operate in every market.
        </h1>
        <p className="mt-5 max-w-2xl leading-7 text-ink/65">
          {appConfig.name} connects to your product through one API. Checkout,
          payouts, and reporting share the same authentication model.
        </p>
      </div>
    </section>
    <section className={`${containerClass} py-16`}>
      <div className="grid gap-4 md:grid-cols-2">
        {steps.map((step, index) => (
          <article key={step.title} className="solution-card rounded-3xl p-6">
            <p className="text-sm font-semibold text-sky">0{index + 1}</p>
            <h2 className="mt-2 text-xl font-semibold">{step.title}</h2>
            <p className="mt-2 leading-7 text-ink/70">{step.description}</p>
          </article>
        ))}
      </div>
      <pre className="panel-navy mt-10 overflow-x-auto rounded-3xl p-6 text-sm leading-6 text-white">
        <code>{`POST /v1/payments
Authorization: Bearer sk_live_...

{
  "amount": 250000,
  "currency": "IDR",
  "method": "ewallet",
  "reference": "order_1842"
}`}</code>
      </pre>
    </section>
    </>
  )
}
