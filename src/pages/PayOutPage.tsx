import { PageMeta } from '@/components/common/PageMeta'
import { GlobalPayouts, PayOutHero, PayOutSolutions, UseCases } from '@/features/pay-out/sections/PayOutSections'

export function PayOutPage() {
  return (
    <>
      <PageMeta
        title="Pay Out | SS Nexus"
        description="A payout presentation covering local methods, automated and batch disbursements, reporting, and common use cases."
        path="/pay-out"
      />
      <PayOutHero />
      <PayOutSolutions />
      <GlobalPayouts />
      <UseCases />
    </>
  )
}
