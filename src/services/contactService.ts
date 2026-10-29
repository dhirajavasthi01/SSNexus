import type { ContactFormValues } from '@/lib/validation'

export type ContactSubmitResult =
  | { status: 'success' }
  | { status: 'error'; message: string }

export async function submitContact(values: ContactFormValues): Promise<ContactSubmitResult> {
  if (values.website) {
    return { status: 'error', message: 'Unable to submit this form.' }
  }

  try {
    const response = await fetch('/api/v1/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        full_name: values.fullName,
        email: values.email,
        phone: values.phone,
        company: values.company,
        country: values.country,
        solution: values.solution,
        volume: values.volume || null,
        message: values.message,
      }),
    })
    const body = (await response.json().catch(() => ({}))) as { message?: string }
    if (!response.ok) {
      return { status: 'error', message: body.message || 'The enquiry could not be sent.' }
    }
    return { status: 'success' }
  } catch {
    return { status: 'error', message: 'The enquiry could not be sent.' }
  }
}
