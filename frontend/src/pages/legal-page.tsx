import { containerClass } from "@/data/site.ts"
import { usePageTitle } from "@/hooks/use-page-title.ts"
import { appConfig } from "@/lib/app-config.ts"

const documents = {
  privacy: {
    title: "Data Privacy",
    paragraphs: [
      "SS Nexus collects only the account, contact, and transaction details needed to provide payment services.",
      "Payment data is used to process collections and payouts, prevent fraud, and produce reconciliation reports. It is not sold.",
      "Access is limited to people and systems that need it for those purposes. You can ask for a copy of the business contact details we hold, or ask us to correct them.",
    ],
  },
  sustainability: {
    title: "Sustainability",
    paragraphs: [
      "SS Nexus designs payment flows that reduce repeated failed attempts, which keeps unnecessary processing work down.",
      "We prefer durable integrations over one-off manual operations so merchants spend less time reworking the same transfers.",
      "Operational choices, including hosting and vendor selection, will be reviewed as the platform is built out.",
    ],
  },
  terms: {
    title: "Terms & Conditions",
    paragraphs: [
      "These pages describe the SS Nexus payment platform. Using the marketing site does not by itself open a merchant account.",
      "Live payment services will be governed by a separate agreement that covers fees, settlement timing, acceptable use, and each party's responsibilities.",
      "Until that agreement is in place, information on this site is an introduction to the product and can change as the service is finalized.",
    ],
  },
} as const

type LegalSlug = keyof typeof documents

export function LegalPage({ slug }: { slug: LegalSlug }) {
  const document = documents[slug]
  usePageTitle(`${document.title} | ${appConfig.name}`)

  return (
    <>
      <section className="hero-canvas">
        <div className={`${containerClass} py-16 lg:py-24`}>
          <p className="eyebrow">Global Payment Solutions</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">
            {document.title}
          </h1>
        </div>
      </section>
      <section className={`${containerClass} py-16`}>
        <div className="solution-card max-w-3xl space-y-4 rounded-3xl p-6 leading-7 text-ink/75 sm:p-8">
          {document.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>
    </>
  )
}
