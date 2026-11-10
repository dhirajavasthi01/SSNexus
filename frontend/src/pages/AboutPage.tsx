import { Container } from '@/components/common/Container'
import { BrandLogo } from '@/components/common/BrandLogo'
import { PageMeta } from '@/components/common/PageMeta'
import { EnquiryCTA } from '@/components/common/EnquiryCTA'
import { siteConfig } from '@/data/siteConfig'

const paragraphs = [
  'SS Nexus is a global payment gateway built for businesses operating across borders. We connect merchants to local payment methods and enable fast, secure payouts at scale, without adding friction to growth.',
  'Our clients rely on us for instant settlement, consistently high transaction success, and a compliance-first infrastructure. We work closely with high-growth industries where payment reliability is not optional, and where every delay or failed transaction carries a cost.',
  'Beyond the technology, we stay close to the markets we serve. Through regular participation in industry events, we listen to merchants, track shifting regulatory and commercial realities, and refine our solutions around what businesses actually need, not what payment providers assume they need.',
  'SS Nexus exists to make payments simpler, safer, and more dependable, so companies can focus on expanding with confidence.',
]

export function AboutPage() {
  return (
    <>
      <PageMeta
        title="About Us | SS Nexus"
        description={siteConfig.description}
        path="/about"
      />
      <section className="bg-[#0b2a4a] text-white">
        <Container className="flex flex-col gap-8 py-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="text-sm uppercase tracking-wide text-[#7ad7ff]">Company</p>
            <h1 className="mt-3 text-[48px] font-semibold">About Us</h1>
            <p className="mt-4 text-lg leading-8 text-white/75">{paragraphs[0]}</p>
          </div>
          <div className="grid h-36 w-36 shrink-0 place-items-center rounded-3xl bg-white">
            <BrandLogo className="h-24 w-auto" />
          </div>
        </Container>
      </section>
      <section className="py-16">
        <Container className="max-w-3xl">
          <div className="mb-10 h-px w-16 bg-[#32b9ff]" />
          <div className="space-y-8 text-lg leading-8 text-black/75">
            {paragraphs.slice(1).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-12 rounded-[13px] border border-black/10 bg-[#eff5ff] px-6 py-5">
            <p className="text-sm uppercase tracking-wide text-black/50">Telegram</p>
            <a
              href={siteConfig.telegram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-xl font-semibold text-[#000d3b] underline-offset-4 hover:text-[#0096f7] hover:underline"
            >
              {siteConfig.telegram.handle}
            </a>
          </div>
        </Container>
      </section>
      <EnquiryCTA title="Talk with SS Nexus" body="Share the markets and payment flows you want to discuss." />
    </>
  )
}
