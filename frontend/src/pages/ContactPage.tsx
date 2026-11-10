import { Container } from '@/components/common/Container'
import { ContactForm } from '@/components/forms/ContactForm'
import { PageMeta } from '@/components/common/PageMeta'

export function ContactPage() {
  return (
    <>
      <PageMeta
        title="Contact Us | SS Nexus"
        description="Enquire about SS Nexus pay-in, pay-out, and integration. The form does not report success unless a backend accepts it."
        path="/contact"
      />
      <section className="bg-gradient-to-b from-[#dce9ff] to-white">
        <Container className="grid gap-12 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:py-20">
          <div>
            <h1 className="text-[44px] font-semibold leading-tight">Contact Us</h1>
            <p className="mt-5 text-lg leading-8 text-black/65">
              Enquire Now and Contact Us across the site come here. Tell us who you are and which payment flow you want
              to discuss.
            </p>
            <ul className="mt-8 space-y-3 text-black/70">
              <li>Pay-in and pay-out questions</li>
              <li>Integration and documentation requests</li>
              <li>Security questionnaires</li>
            </ul>
          </div>
          <div className="rounded-[28px] bg-white p-6 shadow-[0_10px_30px_rgba(15,50,90,0.08)] md:p-8">
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  )
}
