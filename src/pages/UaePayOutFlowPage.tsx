import { useParams } from 'react-router-dom'
import { PageMeta } from '@/components/common/PageMeta'
import { UaeFlowLayout } from '@/features/uae/UaeFlowLayout'
import { PayOutForm } from '@/features/uae/PaymentForms'
import { PaymentRecord } from '@/features/uae/PaymentRecord'

export function UaePayOutFlowPage() {
  const { id } = useParams()
  return (
    <>
      <PageMeta
        title="AED payout | SS Nexus"
        description="UAE dirham payout flow for a UAE IBAN or PayPal. Bank transfers stay unsent until a licensed payout provider is connected."
        path="/pay/disburse"
      />
      <UaeFlowLayout
        title="Send a payout in AED"
        lede="Record a payout to a UAE bank account or a PayPal email. A bank payout stays here until a licensed UAE provider is connected."
      >
        {id ? <PaymentRecord kind="pay-out" id={id} /> : <PayOutForm />}
      </UaeFlowLayout>
    </>
  )
}
