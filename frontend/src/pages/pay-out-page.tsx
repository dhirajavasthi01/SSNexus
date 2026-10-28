import { containerClass } from "@/data/site.ts"
import { usePageTitle } from "@/hooks/use-page-title.ts"
import { appConfig } from "@/lib/app-config.ts"

const solutions = [
  {
    title: "Popular Local APMs",
    description:
      "Send funds to local banks, virtual accounts, and e-wallets that recipients already use.",
  },
  {
    title: "Automated Payouts",
    description:
      "Trigger payouts from your own system through the API so disbursements keep pace with your product.",
  },
  {
    title: "Less Manual Work",
    description:
      "Upload one batch file to release thousands of payments instead of moving money one transfer at a time.",
  },
  {
    title: "Reliable Routing",
    description:
      "The platform picks a healthy bank route and retries automatically when a path fails.",
  },
  {
    title: "Dashboard Controls",
    description:
      "Operations teams can release a single payout or a batch from the back office when a human check is required.",
  },
  {
    title: "Data Reporting",
    description:
      "Follow each transfer as it moves and download reconciliation reports from the same dashboard.",
  },
]

const useCases = [
  {
    title: "Direct fund transfer",
    description: "Lending and wallet platforms paying borrowers or users.",
  },
  {
    title: "Fintech disbursement",
    description: "High-volume money movement with routing that stays fast.",
  },
  {
    title: "Player withdrawals",
    description: "Localized payout options for gaming and digital goods.",
  },
  {
    title: "Merchant settlements",
    description: "Businesses paying partners, suppliers, and affiliates.",
  },
]

export function PayOutPage() {
  usePageTitle(`Pay out | ${appConfig.name}`)

  return (
    <>
      <section className={`${containerClass} py-16 lg:py-24`}>
        <p className="text-sm font-medium text-sky">Global Payment Solutions</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
          365 Days Real-Time Payout Made Easy
        </h1>
        <p className="mt-5 max-w-2xl leading-7 text-ink/70">
          Fast, secure disbursements for teams that need money to arrive the
          way recipients expect. Your funds, on your schedule.
        </p>
      </section>
      <section className="bg-white">
        <div className={`${containerClass} py-16`}>
          <h2 className="text-3xl font-semibold">Solutions</h2>
          <p className="mt-3 max-w-3xl leading-7 text-ink/70">
            Real-time payouts, automated processing, and intelligent routing
            keep disbursements moving without a separate tool for every market.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {solutions.map((item) => (
              <article key={item.title} className="rounded-3xl bg-ice p-6">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink/70">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className={`${containerClass} py-16`}>
        <h2 className="text-3xl font-semibold">Support Global Payments</h2>
        <p className="mt-3 max-w-3xl leading-7 text-ink/70">
          {appConfig.name} gives finance teams one disbursement flow for banks
          and digital wallets across the markets you operate in.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {useCases.map((item) => (
            <article key={item.title} className="rounded-3xl bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink/70">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
