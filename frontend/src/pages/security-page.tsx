import { containerClass } from "@/data/site.ts"
import { usePageTitle } from "@/hooks/use-page-title.ts"
import { appConfig } from "@/lib/app-config.ts"

const controls = [
  {
    title: "Encrypted transport",
    description:
      "Payment requests and webhooks travel over TLS, and stored credentials are isolated from application logs.",
  },
  {
    title: "Access by role",
    description:
      "Finance, support, and engineering each see only the actions their role needs. Sensitive operations can require a second approval.",
  },
  {
    title: "Fraud screening",
    description:
      "Rules watch velocity, device signals, and destination changes so unusual payouts can be held for review.",
  },
  {
    title: "Audit history",
    description:
      "Every status change is recorded with the actor and timestamp, which keeps reconciliation and reviews straightforward.",
  },
]

export function SecurityPage() {
  usePageTitle(`Security | ${appConfig.name}`)

  return (
    <section className={`${containerClass} py-16 lg:py-24`}>
      <p className="text-sm font-medium text-sky">Global Payment Solutions</p>
      <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
        Security built into every transfer
      </h1>
      <p className="mt-5 max-w-2xl leading-7 text-ink/70">
        {appConfig.name} treats collections and payouts as regulated money
        movement. Controls sit in the product, not in a separate checklist.
      </p>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {controls.map((item) => (
          <article key={item.title} className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="mt-2 leading-7 text-ink/70">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
