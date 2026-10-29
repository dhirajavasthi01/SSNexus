import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PrimaryButton } from '@/components/common/PrimaryButton'
import {
  formatAed,
  payInMethodLabels,
  payOutDestinationLabels,
  type PayInMethod,
  type PayOutDestination,
  type PublicPayment,
} from '@/domain/uaePayments'
import { cancelPayIn, capturePayIn, getPayment } from '@/services/uaePaymentService'

export function PaymentRecord({ kind, id }: { kind: 'pay-in' | 'pay-out'; id: string }) {
  const [payment, setPayment] = useState<PublicPayment | null>(null)
  const [message, setMessage] = useState('Loading payment…')
  const [pending, setPending] = useState(false)

  async function load() {
    const result = await getPayment(kind, id)
    if (!result.ok) {
      setPayment(null)
      setMessage(result.message)
      return
    }
    setPayment(result.payment)
    setMessage(result.payment.message)
  }

  useEffect(() => {
    let active = true
    void getPayment(kind, id).then((result) => {
      if (!active) return
      if (!result.ok) {
        setMessage(result.message)
        return
      }
      setPayment(result.payment)
      setMessage(result.payment.message)
    })
    return () => {
      active = false
    }
  }, [kind, id])

  async function capture() {
    setPending(true)
    const result = await capturePayIn(id)
    setPending(false)
    if (!result.ok) {
      setMessage(result.message)
      return
    }
    setPayment(result.payment)
    setMessage(result.payment.message)
  }

  async function cancel() {
    setPending(true)
    const result = await cancelPayIn(id)
    setPending(false)
    if (!result.ok) {
      setMessage(result.message)
      return
    }
    setPayment(result.payment)
    setMessage(result.payment.message)
  }

  if (!payment) {
    return <p className="text-black/70">{message}</p>
  }

  const methodLabel = payment.kind === 'pay-in'
    ? payInMethodLabels[payment.method as PayInMethod]
    : payOutDestinationLabels[payment.method as PayOutDestination]

  return (
    <div className="grid gap-4">
      <p className="text-sm font-semibold uppercase tracking-wide text-[#0096f7]">{payment.status.replaceAll('_', ' ')}</p>
      <p className="text-3xl font-semibold text-[#000d3b]">{formatAed(payment.amount)}</p>
      <dl className="grid gap-3 text-sm leading-6 text-black/70">
        <div><dt className="font-semibold text-black">Method</dt><dd>{methodLabel}</dd></div>
        <div><dt className="font-semibold text-black">Reference</dt><dd>{payment.reference}</dd></div>
        {payment.beneficiaryName && <div><dt className="font-semibold text-black">Beneficiary</dt><dd>{payment.beneficiaryName}</dd></div>}
        {payment.destinationMasked && <div><dt className="font-semibold text-black">Destination</dt><dd>{payment.destinationMasked}</dd></div>}
        {payment.providerReference && <div><dt className="font-semibold text-black">Provider reference</dt><dd>{payment.providerReference}</dd></div>}
      </dl>
      <p className="rounded-2xl bg-[#f4f8ff] p-4 text-sm leading-6 text-black/75">{message}</p>
      <div className="flex flex-wrap gap-3">
        {payment.approveUrl && payment.status === 'awaiting_customer' && (
          <PrimaryButton href={payment.approveUrl}>Continue to provider</PrimaryButton>
        )}
        {payment.provider === 'paypal' && payment.status === 'awaiting_customer' && (
          <PrimaryButton type="button" onClick={() => void capture()} disabled={pending}>
            {pending ? 'Checking…' : 'Capture PayPal payment'}
          </PrimaryButton>
        )}
        {payment.kind === 'pay-in' && payment.status !== 'paid' && payment.status !== 'cancelled' && (
          <PrimaryButton variant="outline" onClick={() => void cancel()} disabled={pending}>Cancel</PrimaryButton>
        )}
        <button type="button" className="text-sm font-semibold text-[#0096f7]" onClick={() => void load()}>Refresh</button>
      </div>
    </div>
  )
}

export function PaymentActivity() {
  return (
    <div className="grid gap-4 text-black/70">
      <p>Each collection and payout is stored by the payment API. The confirmation page keeps the link to that record.</p>
      <p>Administrators review the full list after signing in. This page does not publish every payment.</p>
      <Link to="/admin/login" className="font-semibold text-[#0096f7]">Open the admin panel</Link>
    </div>
  )
}
