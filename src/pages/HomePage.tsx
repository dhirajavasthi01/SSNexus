import { PageMeta } from '@/components/common/PageMeta'
import { EventsSection } from '@/features/home/sections/EventsSection'
import { HeroSection } from '@/features/home/sections/HeroSection'
import { TrustedSection } from '@/features/home/sections/TrustedSection'
import { WhoWeServeSection } from '@/features/home/sections/WhoWeServeSection'
import { WhyChooseSection } from '@/features/home/sections/WhyChooseSection'
import { siteConfig } from '@/data/siteConfig'

export function HomePage() {
  return (
    <>
      <PageMeta
        title={`${siteConfig.name} | Global Payment Solutions`}
        description={siteConfig.description}
        path="/"
      />
      <HeroSection />
      <WhoWeServeSection />
      <WhyChooseSection />
      <EventsSection />
      <TrustedSection />
    </>
  )
}
