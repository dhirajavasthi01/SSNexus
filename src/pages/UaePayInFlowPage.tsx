import { useParams } from 'react-router-dom'
import { PageMeta } from '@/components/common/PageMeta'
import { UaeFlowLayout } from '@/features/uae/UaeFlowLayout'
import { PayInForm } from '@/features/uae/PaymentForms'
import { PaymentRecord } from '@/features/uae/PaymentRecord'

export function UaePayInFlowPage() {
  const { id } = useParams()
  return (
    <>
      <PageMeta
        title="Collect AED | SS Nexus"
        description="UAE dirham collection flow. A payment is marked paid only after PayPal or the acquirer confirms it."
        path="/pay/collect"
      />
      <UaeFlowLayout
        title="Collect a payment in AED"
        lede="Create a Dubai collection for PayPal, cards, or Google Pay. Cards and Google Pay go to the acquirer. Nothing is marked paid until the provider confirms it."
      >
        {id ? <PaymentRecord kind="pay-in" id={id} /> : <PayInForm />}
      </UaeFlowLayout>
    </>
  )
}
