import { PageMeta } from '@/components/common/PageMeta'
import { PaymentActivity } from '@/features/uae/PaymentRecord'
import { UaeFlowLayout } from '@/features/uae/UaeFlowLayout'

export function UaeActivityPage() {
  return (
    <>
      <PageMeta
        title="UAE payment activity | SS Nexus"
        description="Local record of AED collection and payout requests."
        path="/pay/activity"
      />
      <UaeFlowLayout
        title="UAE payment activity"
        lede="Each collection and payout saved by this local flow. Status names the provider result, and an unconfigured provider does not count as paid."
      >
        <PaymentActivity />
      </UaeFlowLayout>
    </>
  )
}