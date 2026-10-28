import { containerClass } from "@/data/site.ts"
import { usePageTitle } from "@/hooks/use-page-title.ts"
import { appConfig } from "@/lib/app-config.ts"

const values = [
  {
    title: "Local by default",
    description:
      "Customers should pay with the method they already trust, not a method that only works in one country.",
  },
  {
    title: "Settlement you can explain",
    description:
      "Finance teams get a clear trail from checkout to payout, with reports they can hand to auditors.",
  },
  {
    title: "Operators in the loop",
    description:
      "Automation handles the happy path. People can still pause, review, and release a payment when it matters.",
  },
]

export function AboutPage() {
  usePageTitle(`About Us | ${appConfig.name}`)

  return (
    <section className={`${containerClass} py-16 lg:py-24`}>
      <p className="text-sm font-medium text-sky">Global Payment Solutions</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        About {appConfig.name}
      </h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-ink/70">
        {appConfig.name} builds payment infrastructure for businesses that sell
        across borders. The platform accepts local payment methods and moves
        payouts with the same operational controls.
      </p>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {values.map((value) => (
          <article key={value.title} className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">{value.title}</h2>
            <p className="mt-3 leading-7 text-ink/70">{value.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
