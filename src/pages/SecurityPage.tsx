import { Container } from '@/components/common/Container'
import { EnquiryCTA } from '@/components/common/EnquiryCTA'
import { PageMeta } from '@/components/common/PageMeta'

const topics = [
  { title: 'Transaction security', body: 'Access to payment actions is meant to be limited to authorised operators, with a record of who initiated a transfer.' },
  { title: 'Fraud prevention', body: 'Unusual activity can be reviewed before funds move. This page does not demonstrate a live rules engine.' },
  { title: 'Risk monitoring', body: 'Operations teams need a view of failed, pending, and completed payments. Thresholds are set per agreement.' },
  { title: 'Data protection', body: 'Personal and payment data should be collected only for the service being provided. Retention periods are a legal and contract matter.' },
  { title: 'Operational reliability', body: 'Routing and retries are part of the payout story. Uptime figures are not published here.' },
  { title: 'Compliance', body: 'SS Nexus does not claim PCI DSS, ISO, licensing, or regulator status on this website.' },
]

export function SecurityPage() {
  return (
    <>
      <PageMeta
        title="Security | SS Nexus"
        description="How SS Nexus describes transaction security, monitoring, and data protection without claiming unverified certifications."
        path="/security"
      />
      <section className="bg-[#06284a] text-white">
        <Container className="py-20">
          <h1 className="max-w-3xl text-[40px] font-semibold leading-tight md:text-[56px]">Security for payment operations</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
            The reference security page is not available. This page describes the controls a payments site should be
            ready to explain. It is not an audit, a certificate, or a product demo.
          </p>
        </Container>
      </section>
      <section className="py-16">
        <Container className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {topics.map((topic) => (
            <article key={topic.title} className="rounded-2xl border border-black/5 p-6">
              <h2 className="text-2xl font-semibold">{topic.title}</h2>
              <p className="mt-3 leading-7 text-black/65">{topic.body}</p>
            </article>
          ))}
        </Container>
      </section>
      <EnquiryCTA
        title="Security questions"
        body="Ask for the controls that matter to your review. We will not answer with a certification this site has not been given."
      />
    </>
  )
}
