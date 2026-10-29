import { z } from 'zod'

export const payInMethods = ['paypal', 'card', 'google_pay'] as const
export const payOutDestinations = ['uae_iban', 'paypal'] as const

export const paymentStatuses = [
  'recorded',
  'awaiting_customer',
  'provider_rejected',
  'paid',
  'payout_submitted',
  'cancelled',
] as const

export type PayInMethod = (typeof payInMethods)[number]
export type PayOutDestination = (typeof payOutDestinations)[number]
export type PaymentStatus = (typeof paymentStatuses)[number]

export type PublicPayment = {
  id: string
  kind: 'pay-in' | 'pay-out'
  amount: string
  currency: 'AED'
  reference: string
  method: PayInMethod | PayOutDestination
  status: PaymentStatus
  message: string
  createdAt: string
  email?: string
  beneficiaryName?: string
  destinationMasked?: string
  provider: 'paypal' | 'acquirer' | 'none'
  providerReference?: string
  approveUrl?: string
}

export type ProviderReadiness = {
  market: 'UAE'
  currency: 'AED'
  paypal: boolean
  acquirer: boolean
  note: string
}

const money = z.coerce
  .number({ message: 'Enter an amount in AED.' })
  .positive('Enter an amount greater than zero.')
  .max(1_000_000, 'Amount must be AED 1,000,000 or less.')
  .refine((value) => Math.abs(value * 100 - Math.round(value * 100)) < 0.001, 'Use at most two decimal places.')

export const payInRequestSchema = z.object({
  amount: money,
  email: z.string().trim().email('Enter a valid email.'),
  reference: z.string().trim().min(2, 'Enter a reference.').max(40, 'Use 40 characters or fewer.'),
  method: z.enum(payInMethods, { message: 'Choose a pay-in method.' }),
})

export const payOutRequestSchema = z
  .object({
    amount: money,
    beneficiaryName: z.string().trim().min(2, 'Enter the beneficiary name.').max(80),
    reference: z.string().trim().min(2, 'Enter a reference.').max(40, 'Use 40 characters or fewer.'),
    destination: z.enum(payOutDestinations, { message: 'Choose a payout destination.' }),
    iban: z.string().trim().optional().or(z.literal('')),
    paypalEmail: z.string().trim().optional().or(z.literal('')),
  })
  .superRefine((value, context) => {
    if (value.destination === 'uae_iban' && !isUaeIban(value.iban ?? '')) {
      context.addIssue({ code: 'custom', path: ['iban'], message: 'Enter a valid UAE IBAN.' })
    }
    if (value.destination === 'paypal') {
      const parsed = z.string().email().safeParse(value.paypalEmail ?? '')
      if (!parsed.success) {
        context.addIssue({ code: 'custom', path: ['paypalEmail'], message: 'Enter the beneficiary PayPal email.' })
      }
    }
  })

export type PayInRequest = z.infer<typeof payInRequestSchema>
export type PayOutRequest = z.infer<typeof payOutRequestSchema>

export function formatAed(amount: string) {
  return `AED ${amount}`
}

export function isUaeIban(input: string) {
  const iban = input.replace(/\s+/g, '').toUpperCase()
  if (!/^AE\d{21}$/.test(iban)) return false
  const rearranged = `${iban.slice(4)}${iban.slice(0, 4)}`
  const numeric = rearranged.replace(/[A-Z]/g, (character) => String(character.charCodeAt(0) - 55))
  let remainder = 0
  for (const digit of numeric) {
    remainder = (remainder * 10 + Number(digit)) % 97
  }
  return remainder === 1
}

export function maskIban(input: string) {
  const iban = input.replace(/\s+/g, '').toUpperCase()
  if (iban.length < 8) return iban
  return `${iban.slice(0, 4)} •••• ${iban.slice(-4)}`
}

export const payInMethodLabels: Record<PayInMethod, string> = {
  paypal: 'PayPal',
  card: 'Card through a UAE acquirer',
  google_pay: 'Google Pay through a UAE acquirer',
}

export const payOutDestinationLabels: Record<PayOutDestination, string> = {
  uae_iban: 'UAE bank account',
  paypal: 'PayPal',
}
