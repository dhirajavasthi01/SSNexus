import { Container } from '@/components/common/Container'
import { PrimaryButton } from '@/components/common/PrimaryButton'
import { useI18n } from '@/lib/i18n'

export function EnquiryCTA({ title, body }: { title: string; body: string }) {
  const { t } = useI18n()
  return (
    <section className="bg-[#c0d8e5]">
      <Container className="flex flex-col items-start justify-between gap-8 py-16 md:flex-row md:items-center md:py-20">
        <div className="max-w-2xl">
          <h2 className="text-[32px] font-semibold leading-tight text-black md:text-[40px]">{title}</h2>
          <p className="mt-4 text-lg leading-8 text-black/75">{body}</p>
        </div>
        <PrimaryButton to="/contact" variant="outline" className="shrink-0">
          {t('cta.enquire')}
        </PrimaryButton>
      </Container>
    </section>
  )
}
