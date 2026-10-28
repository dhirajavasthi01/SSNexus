import { z } from 'zod'

export const contactSchema = z.object({
  fullName: z.string().trim().min(2, 'Enter your full name.'),
  email: z.string().trim().email('Enter a valid business email.'),
  company: z.string().trim().min(2, 'Enter your company name.'),
  country: z.string().trim().min(2, 'Enter a country or region.'),
  solution: z.enum(['pay-in', 'pay-out', 'both', 'integration', 'other'], {
    message: 'Select a payment solution.',
  }),
  volume: z.string().trim().max(80).optional().or(z.literal('')),
  message: z.string().trim().min(10, 'Add a short message (at least 10 characters).').max(2000),
  website: z.string().max(0, 'Unable to submit this form.').optional().or(z.literal('')),
})

export type ContactFormValues = z.infer<typeof contactSchema>

export const solutionOptions = [
  { value: 'pay-in', label: 'Pay In' },
  { value: 'pay-out', label: 'Pay Out' },
  { value: 'both', label: 'Pay In and Pay Out' },
  { value: 'integration', label: 'Integration' },
  { value: 'other', label: 'Other' },
] as const
