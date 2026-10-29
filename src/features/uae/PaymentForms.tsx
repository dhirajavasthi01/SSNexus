import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useRef, useState, type ReactNode } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PrimaryButton } from '@/components/common/PrimaryButton'
import {
  payInMethodLabels,
  payInMethods,
  payInRequestSchema,
  payOutDestinationLabels,
  payOutDestinations,
  payOutRequestSchema,
  type PayInRequest,
  type PayOutDestination,
  type PayOutRequest,
} from '@/domain/uaePayments'
import { createPayIn, createPayOut } from '@/services/uaePaymentService'

export function PayInForm() {
  const navigate = useNavigate()
  const [errorText, setErrorText] = useState('')
  const attempt = useAttempt('ssn-pay-in-attempt')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PayInRequest>({
    resolver: zodResolver(payInRequestSchema),
    defaultValues: { amount: 100, email: '', reference: '', method: 'card' },
  })

  async function onSubmit(values: PayInRequest) {
    setErrorText('')
    const result = await createPayIn(values, attempt.current)
    if (!result.ok) {
      if (result.conflict) attempt.rotate()
      setErrorText(result.message)
      return
    }
    attempt.clear()
    navigate(`/pay/collect/${result.payment.id}`)
  }

  return (
    <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)} noValidate>
      <p className="text-sm leading-6 text-black/60">
        Amounts are in AED. Card and Google Pay do not ask for a card number on this site. If the connection drops, stay on this page and submit again. That retry uses the same attempt and does not create a second payment.
      </p>
      <Field label="Amount (AED)" error={errors.amount?.message} htmlFor="amount">
        <Input id="amount" inputMode="decimal" {...register('amount')} />
      </Field>
      <Field label="Payer email" error={errors.email?.message} htmlFor="email">
        <Input id="email" type="email" autoComplete="email" {...register('email')} />
      </Field>
      <Field label="Reference" error={errors.reference?.message} htmlFor="reference">
        <Input id="reference" {...register('reference')} />
      </Field>
      <Field label="Method" error={errors.method?.message} htmlFor="method">
        <select id="method" className={selectClass} {...register('method')}>
          {payInMethods.map((method) => (
            <option key={method} value={method}>{payInMethodLabels[method]}</option>
          ))}
        </select>
      </Field>
      {errorText && <p className="text-sm text-red-700" role="alert">{errorText}</p>}
      <PrimaryButton type="submit" disabled={isSubmitting}>{isSubmitting ? 'Saving…' : errorText ? 'Try again' : 'Create collection'}</PrimaryButton>
    </form>
  )
}

export function PayOutForm() {
  const navigate = useNavigate()
  const [errorText, setErrorText] = useState('')
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PayOutRequest>({
    resolver: zodResolver(payOutRequestSchema),
    defaultValues: { amount: 100, beneficiaryName: '', reference: '', destination: 'uae_iban', iban: '', paypalEmail: '' },
  })
  const [destination, setDestination] = useState<PayOutDestination>('uae_iban')
  const attempt = useAttempt('ssn-pay-out-attempt')

  async function onSubmit(values: PayOutRequest) {
    setErrorText('')
    const result = await createPayOut(values, attempt.current)
    if (!result.ok) {
      if (result.conflict) attempt.rotate()
      setErrorText(result.message)
      return
    }
    attempt.clear()
    navigate(`/pay/disburse/${result.payment.id}`)
  }

  return (
    <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)} noValidate>
      <p className="text-sm leading-6 text-black/60">
        A payout is saved for approval. A UAE bank transfer is not sent from this form. If the connection drops, stay on this page and submit again. That retry uses the same attempt and does not create a second payout.
      </p>
      <Field label="Amount (AED)" error={errors.amount?.message} htmlFor="payout-amount">
        <Input id="payout-amount" inputMode="decimal" {...register('amount')} />
      </Field>
      <Field label="Beneficiary name" error={errors.beneficiaryName?.message} htmlFor="beneficiaryName">
        <Input id="beneficiaryName" autoComplete="name" {...register('beneficiaryName')} />
      </Field>
      <Field label="Reference" error={errors.reference?.message} htmlFor="payout-reference">
        <Input id="payout-reference" {...register('reference')} />
      </Field>
      <Field label="Destination" error={errors.destination?.message} htmlFor="destination">
        <select
          id="destination"
          className={selectClass}
          value={destination}
          onChange={(event) => {
            const next = event.target.value as PayOutDestination
            setDestination(next)
            setValue('destination', next, { shouldValidate: true })
          }}
        >
          {payOutDestinations.map((item) => (
            <option key={item} value={item}>{payOutDestinationLabels[item]}</option>
          ))}
        </select>
      </Field>
      {destination === 'uae_iban' ? (
        <Field label="UAE IBAN" error={errors.iban?.message} htmlFor="iban">
          <Input id="iban" autoComplete="off" placeholder="AE07 ACCT 000030" {...register('iban')} />
        </Field>
      ) : (
        <Field label="PayPal email" error={errors.paypalEmail?.message} htmlFor="paypalEmail">
          <Input id="paypalEmail" type="email" autoComplete="email" {...register('paypalEmail')} />
        </Field>
      )}
      {errorText && <p className="text-sm text-red-700" role="alert">{errorText}</p>}
      <PrimaryButton type="submit" disabled={isSubmitting}>{isSubmitting ? 'Saving…' : errorText ? 'Try again' : 'Create payout'}</PrimaryButton>
    </form>
  )
}

function useAttempt(storageKey: string) {
  const key = useRef(sessionValue(storageKey))
  return {
    get current() {
      return key.current
    },
    rotate() {
      key.current = crypto.randomUUID()
      sessionStorage.setItem(storageKey, key.current)
    },
    clear() {
      sessionStorage.removeItem(storageKey)
    },
  }
}

function sessionValue(storageKey: string) {
  const existing = sessionStorage.getItem(storageKey)
  if (existing) return existing
  const created = crypto.randomUUID()
  sessionStorage.setItem(storageKey, created)
  return created
}

function Field({ label, error, htmlFor, children }: { label: string; error?: string; htmlFor: string; children: ReactNode }) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error && <p className="text-sm text-red-700">{error}</p>}
    </div>
  )
}

const selectClass = 'flex h-12 w-full rounded-xl border border-black/10 bg-white px-4 text-base outline-none focus:border-[#0096f7]'
