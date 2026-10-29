import { useState, type ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema, solutionOptions, type ContactFormValues } from '@/lib/validation'
import { submitContact } from '@/services/contactService'
import { useI18n } from '@/lib/i18n'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { PrimaryButton } from '@/components/common/PrimaryButton'

const defaults: ContactFormValues = {
  fullName: '',
  email: '',
  phone: '',
  company: '',
  country: '',
  solution: 'pay-in',
  volume: '',
  message: '',
  website: '',
}

export function ContactForm() {
  const { t } = useI18n()
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorText, setErrorText] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: defaults,
  })

  async function onSubmit(values: ContactFormValues) {
    setStatus('idle')
    const result = await submitContact(values)
    if (result.status === 'success') {
      setStatus('success')
      reset(defaults)
      return
    }
    setErrorText(result.message)
    setStatus('error')
  }

  return (
    <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Field label={t('form.name')} error={errors.fullName?.message} htmlFor="fullName">
        <Input id="fullName" autoComplete="name" {...register('fullName')} />
      </Field>
      <Field label={t('form.email')} error={errors.email?.message} htmlFor="email">
        <Input id="email" type="email" autoComplete="email" {...register('email')} />
      </Field>
      <Field label={t('form.phone')} error={errors.phone?.message} htmlFor="phone">
        <Input id="phone" type="tel" autoComplete="tel" {...register('phone')} />
      </Field>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label={t('form.company')} error={errors.company?.message} htmlFor="company">
          <Input id="company" autoComplete="organization" {...register('company')} />
        </Field>
        <Field label={t('form.country')} error={errors.country?.message} htmlFor="country">
          <Input id="country" autoComplete="country-name" {...register('country')} />
        </Field>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label={t('form.solution')} error={errors.solution?.message} htmlFor="solution">
          <select
            id="solution"
            className="flex h-12 w-full rounded-xl border border-black/10 bg-white px-4 text-base outline-none focus:border-[#0096f7]"
            {...register('solution')}
          >
            {solutionOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t('form.volume')} error={errors.volume?.message} htmlFor="volume">
          <Input id="volume" {...register('volume')} placeholder="Optional" />
        </Field>
      </div>
      <Field label={t('form.message')} error={errors.message?.message} htmlFor="message">
        <Textarea id="message" {...register('message')} />
      </Field>
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="website">{t('form.honeypot')}</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>
      {status === 'success' ? (
        <p className="rounded-xl bg-emerald-50 px-4 py-3 text-emerald-800" role="status">
          {t('form.success')}
        </p>
      ) : null}
      {status === 'error' ? (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-red-800" role="alert">
          {errorText || t('form.error')}
        </p>
      ) : null}
      <PrimaryButton type="submit" disabled={isSubmitting} className="w-fit">
        {isSubmitting ? t('form.sending') : t('form.submit')}
      </PrimaryButton>
    </form>
  )
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string
  htmlFor: string
  error?: string
  children: ReactNode
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} className="text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
