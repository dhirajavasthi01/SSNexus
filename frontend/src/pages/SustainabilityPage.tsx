import { LegalHeading, LegalShell } from '@/components/common/LegalShell'

export function SustainabilityPage() {
  return (
    <LegalShell
      title="Sustainability"
      description="Draft sustainability statement for SS Nexus. It is not an approved environmental report."
      path="/sustainability"
    >
      <section>
        <LegalHeading>Purpose of this page</LegalHeading>
        <p className="mt-3">
          The reference sustainability page was not available. This draft holds a place in the footer until SS Nexus
          approves a statement. It does not report emissions, offsets, or certifications.
        </p>
      </section>
      <section>
        <LegalHeading>What can be said now</LegalHeading>
        <p className="mt-3">
          A payments website can reduce unnecessary travel for routine support by offering clear written material. Any
          environmental target, office practice, or supplier standard should be added only from an approved source.
        </p>
      </section>
      <section>
        <LegalHeading>Next step</LegalHeading>
        <p className="mt-3">Replace this draft with the reviewed sustainability text, or remove the page if it should not be public.</p>
      </section>
    </LegalShell>
  )
}
