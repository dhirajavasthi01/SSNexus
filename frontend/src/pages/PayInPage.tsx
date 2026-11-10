import { PageMeta } from '@/components/common/PageMeta'
import { ApmSection, ConnectSection, PayInHero, PlatformSection, TransferSection } from '@/features/pay-in/sections/PayInSections'

export function PayInPage() {
  return (
    <>
      <PageMeta
        title="Pay In | SS Nexus"
        description="Tailored payment collection for global operations, including local methods, multi-platform checkout, and real-time transfer workflows."
        path="/pay-in"
      />
      <PayInHero />
      <ConnectSection />
      <ApmSection />
      <PlatformSection />
      <TransferSection />
    </>
  )
}
