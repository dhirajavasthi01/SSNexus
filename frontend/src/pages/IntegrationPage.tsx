import { Link } from 'react-router-dom'
import { Container } from '@/components/common/Container'
import { EnquiryCTA } from '@/components/common/EnquiryCTA'
import { PageMeta } from '@/components/common/PageMeta'
import { siteConfig } from '@/data/siteConfig'

const steps = [
  { title: 'Enquire', body: 'Tell us the markets, methods, and whether you need collection, payouts, or both.' },
  { title: 'Review', body: 'SS Nexus confirms what can be supported. This page does not list live endpoints.' },
  { title: 'Connect', body: 'Credentials and documentation are shared through an approved channel, not from this website.' },
  { title: 'Reconcile', body: 'Reporting and settlement files are part of the operating picture once an integration is agreed.' },
]

export function IntegrationPage() {
  return (
    <>
      <PageMeta
        title="Integration | SS Nexus"
        description="Presentation of the SS Nexus integration path. API documentation is linked only when a real docs URL is configured."
        path="/integration"
      />
      <section className="bg-gradient-to-b from-[#dce9ff] to-white">
        <Container className="py-20">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#0096f7]">Developer presentation</p>
          <h1 className="mt-3 max-w-3xl text-[40px] font-semibold leading-tight text-[#1a1a1a] md:text-[56px]">
            Payment API integration, without invented endpoints
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-black/65">
            The reference integration page is not published. This page explains the intended workflow and keeps
            documentation links configurable. No SDKs, languages, or URLs are implied beyond what is configured.
          </p>
        </Container>
      </section>
      <section className="bg-white py-8">
        <Container className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => (
            <article key={step.title} className="rounded-2xl border border-black/5 bg-[#f7fbff] p-6">
              <p className="text-sm font-semibold text-[#0096f7]">0{index + 1}</p>
              <h2 className="mt-3 text-2xl font-semibold">{step.title}</h2>
              <p className="mt-3 leading-7 text-black/65">{step.body}</p>
            </article>
          ))}
        </Container>
      </section>
      <section className="py-16">
        <Container className="grid gap-8 rounded-[28px] bg-[#06284a] p-8 text-white md:grid-cols-[1.4fr_0.8fr] md:p-12">
          <div>
            <h2 className="text-3xl font-semibold">Documentation</h2>
            <p className="mt-4 max-w-xl leading-7 text-white/75">
              {siteConfig.docsUrl
                ? 'A documentation URL is configured for this environment.'
                : 'VITE_DOCS_URL is empty, so this button stays on the site instead of pointing at a placeholder API host.'}
            </p>
          </div>
          {siteConfig.docsUrl ? (
            <a
              href={siteConfig.docsUrl}
              className="self-center justify-self-start rounded-full bg-white px-8 py-4 font-semibold text-[#06284a]"
              target="_blank"
              rel="noreferrer"
            >
              Open documentation
            </a>
          ) : (
            <Link to="/contact" className="self-center justify-self-start rounded-full bg-white px-8 py-4 font-semibold text-[#06284a]">
              Ask about integration
            </Link>
          )}
        </Container>
      </section>
      <EnquiryCTA
        title="Need an integration conversation?"
        body="Share the platforms you use and the methods you want to offer. Technical support starts from the enquiry, not from a simulated API console."
      />
    </>
  )
}
