import { Link } from 'react-router-dom'
import { Container } from '@/components/common/Container'
import { PageMeta } from '@/components/common/PageMeta'
import { useI18n } from '@/lib/i18n'

export function NotFoundPage() {
  const { t } = useI18n()
  return (
    <Container className="py-24">
      <PageMeta title="Page not found | SS Nexus" description="The requested SS Nexus page does not exist." path="/404" />
      <h1 className="text-[48px] font-semibold">{t('notFound.title')}</h1>
      <p className="mt-4 text-lg text-black/65">{t('notFound.body')}</p>
      <Link to="/" className="mt-8 inline-flex rounded-full bg-[rgba(0,0,0,0.9)] px-8 py-3 font-semibold text-white">
        {t('notFound.home')}
      </Link>
    </Container>
  )
}
