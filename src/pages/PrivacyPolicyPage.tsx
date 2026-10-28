import { LegalHeading, LegalShell } from '@/components/common/LegalShell'

export function PrivacyPolicyPage() {
  return (
    <LegalShell
      title="Data Privacy"
      description="Draft privacy notice for SS Nexus. It requires legal review before publication."
      path="/privacy-policy"
    >
      <section>
        <LegalHeading>Who this draft is for</LegalHeading>
        <p className="mt-3">
          This draft describes how a future SS Nexus site might handle enquiry data. It is not an approved privacy
          policy and does not copy another company’s legal terms.
        </p>
      </section>
      <section>
        <LegalHeading>Information the form asks for</LegalHeading>
        <p className="mt-3">
          The contact form requests a name, business email, company, country, solution of interest, optional volume, and
          a message. A hidden field is used only as a simple spam check.
        </p>
      </section>
      <section>
        <LegalHeading>What happens on submit</LegalHeading>
        <p className="mt-3">
          If no delivery endpoint is configured, the message stays in the browser and is not stored by this website. If
          an endpoint is configured, the form sends the fields to that service. The operator of that service is
          responsible for the processing notice.
        </p>
      </section>
      <section>
        <LegalHeading>Contact</LegalHeading>
        <p className="mt-3">Replace this section with the approved privacy contact, retention period, and regional rights.</p>
      </section>
    </LegalShell>
  )
}
