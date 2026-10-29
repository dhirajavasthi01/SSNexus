import type { PayInRequest, PayOutRequest, ProviderReadiness, PublicPayment } from '@/domain/uaePayments'

type Failure = { ok: false; message: string; conflict?: boolean }
type PaymentResult = { ok: true; payment: PublicPayment } | Failure

class PaymentApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

type ApiPayment = {
  id: string
  kind: PublicPayment['kind']
  amount: string
  currency: 'AED'
  reference: string
  method: PublicPayment['method']
  status: PublicPayment['status']
  message: string
  created_at: string
  email?: string | null
  beneficiary_name?: string | null
  destination_masked?: string | null
  provider: PublicPayment['provider']
  provider_reference?: string | null
  approve_url?: string | null
}

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response
  try {
    response = await fetch(path, {
      ...init,
      signal: AbortSignal.timeout(20000),
      headers: { 'Content-Type': 'application/json', Accept: 'application/json', ...init?.headers },
    })
  } catch (error) {
    throw new PaymentApiError(connectionMessage(error), 0)
  }
  const body = (await response.json().catch(() => ({}))) as T & { message?: string }
  if (!response.ok) {
    throw new PaymentApiError(body.message || `The payment service returned ${response.status}.`, response.status)
  }
  return body
}

function connectionMessage(error: unknown) {
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    return 'You are offline. This payment was not confirmed. Stay on this page and try again when the connection returns.'
  }
  if (error instanceof DOMException && error.name === 'TimeoutError') {
    return 'The request timed out before a confirmation came back. Try again with the same details.'
  }
  return 'The connection dropped before a confirmation came back. Try again with the same details.'
}

function toPayment(raw: ApiPayment): PublicPayment {
  return {
    id: raw.id,
    kind: raw.kind,
    amount: raw.amount,
    currency: raw.currency,
    reference: raw.reference,
    method: raw.method,
    status: raw.status,
    message: raw.message,
    createdAt: raw.created_at,
    email: raw.email ?? undefined,
    beneficiaryName: raw.beneficiary_name ?? undefined,
    destinationMasked: raw.destination_masked ?? undefined,
    provider: raw.provider,
    providerReference: raw.provider_reference ?? undefined,
    approveUrl: raw.approve_url ?? undefined,
  }
}

export async function getPaymentReadiness(): Promise<ProviderReadiness | null> {
  try {
    return await requestJson<ProviderReadiness>('/api/v1/payments/readiness')
  } catch {
    return null
  }
}

export async function createPayIn(values: PayInRequest, idempotencyKey: string): Promise<PaymentResult> {
  return postPayment(
    '/api/v1/payments/pay-in',
    {
      amount: values.amount,
      email: values.email,
      reference: values.reference,
      method: values.method,
    },
    idempotencyKey,
  )
}

export async function createPayOut(values: PayOutRequest, idempotencyKey: string): Promise<PaymentResult> {
  return postPayment(
    '/api/v1/payments/pay-out',
    {
      amount: values.amount,
      beneficiary_name: values.beneficiaryName,
      reference: values.reference,
      destination: values.destination,
      iban: values.iban,
      paypal_email: values.paypalEmail || null,
    },
    idempotencyKey,
  )
}

export async function getPayment(kind: 'pay-in' | 'pay-out', id: string): Promise<PaymentResult> {
  try {
    const body = await requestJson<ApiPayment>(`/api/v1/payments/${kind}/${id}`)
    return { ok: true, payment: toPayment(body) }
  } catch (error) {
    return { ok: false, message: error instanceof Error ? error.message : 'The payment could not be loaded.' }
  }
}

export async function capturePayIn(id: string): Promise<PaymentResult> {
  return postPayment(`/api/v1/payments/pay-in/${id}/capture`, {})
}

export async function cancelPayIn(id: string): Promise<PaymentResult> {
  return postPayment(`/api/v1/payments/pay-in/${id}/cancel`, {})
}

async function postPayment(path: string, values: unknown, idempotencyKey?: string): Promise<PaymentResult> {
  try {
    const body = await requestJson<ApiPayment>(path, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined,
    })
    return { ok: true, payment: toPayment(body) }
  } catch (error) {
    return {
      ok: false,
      conflict: error instanceof PaymentApiError && error.status === 409,
      message: error instanceof Error ? error.message : 'The payment could not be saved.',
    }
  }
}
