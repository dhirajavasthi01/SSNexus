import type { ContactFormValues } from '@/lib/validation'
import { siteConfig } from '@/data/siteConfig'

export type ContactSubmitResult =
  | { status: 'unconfigured' }
  | { status: 'success' }
  | { status: 'error'; message: string }

export async function submitContact(values: ContactFormValues): Promise<ContactSubmitResult> {
  if (values.website) {
    return { status: 'error', message: 'Unable to submit this form.' }
  }

  const endpoint = siteConfig.contactEndpoint
  if (!endpoint) {
    return { status: 'unconfigured' }
  }

  const { website: _honeypot, ...payload } = values
  void _honeypot

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!response.ok) {
      return { status: 'error', message: `The endpoint returned ${response.status}.` }
    }
    return { status: 'success' }
  } catch {
    return { status: 'error', message: 'The enquiry could not be sent.' }
  }
}
