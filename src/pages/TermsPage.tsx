import { LegalHeading, LegalShell } from '@/components/common/LegalShell'

export function TermsPage() {
  return (
    <LegalShell
      title="Terms and Conditions"
      description="Draft terms for the SS Nexus website. They require legal review."
      path="/terms"
    >
      <section>
        <LegalHeading>Using this website</LegalHeading>
        <p className="mt-3">
          These draft terms cover browsing the SS Nexus marketing site. They do not create a payment-processing
          agreement. Commercial terms are issued separately after review.
        </p>
      </section>
      <section>
        <LegalHeading>No payment service from this page</LegalHeading>
        <p className="mt-3">
          Nothing on this website moves money, opens a merchant account, or confirms a license. Figures marked as
          demonstration content are not performance promises.
        </p>
      </section>
      <section>
        <LegalHeading>Content</LegalHeading>
        <p className="mt-3">
          Blog entries are samples. Legal pages are drafts and need review before they are treated as policy.
        </p>
      </section>
      <section>
        <LegalHeading>Liability</LegalHeading>
        <p className="mt-3">Add the approved limitation, governing law, and contact details before this page is treated as binding.</p>
      </section>
    </LegalShell>
  )
}
