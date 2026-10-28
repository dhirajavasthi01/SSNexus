import { Link } from 'react-router-dom'
import { Container } from '@/components/common/Container'
import { ContactForm } from '@/components/forms/ContactForm'
import { PageMeta } from '@/components/common/PageMeta'

const topics = [
  { title: 'Onboarding', to: '/contact', body: 'Start with an enquiry. There is no self-serve account on this site.' },
  { title: 'Integration help', to: '/integration', body: 'See the integration presentation, then ask for the real documentation path.' },
  { title: 'FAQs', to: '/faqs', body: 'Search sample answers covering payments, payouts, and security language.' },
  { title: 'Security review', to: '/security', body: 'Read what is and is not claimed before you send a questionnaire.' },
]

export function SupportPage() {
  return (
    <>
      <PageMeta
        title="Support | SS Nexus"
        description="Support routes for SS Nexus enquiries. The contact form reports honestly when delivery is not connected."
        path="/support"
      />
      <section className="bg-[#e3effe]">
        <Container className="py-16">
          <h1 className="text-[44px] font-semibold">Support</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-black/65">
            The reference support page is not published. Use the paths below, or send a message. A success state appears
            only after a configured endpoint accepts the form.
          </p>
        </Container>
      </section>
      <section className="py-14">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="grid gap-4">
            {topics.map((topic) => (
              <Link key={topic.title} to={topic.to} className="rounded-2xl border border-black/5 p-5 hover:border-[#32b9ff]">
                <h2 className="text-xl font-semibold">{topic.title}</h2>
                <p className="mt-2 text-black/65">{topic.body}</p>
              </Link>
            ))}
          </div>
          <div className="rounded-[28px] bg-[#f7fbff] p-6 md:p-8">
            <h2 className="mb-6 text-2xl font-semibold">Contact support</h2>
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  )
}
