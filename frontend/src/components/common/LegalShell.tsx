import type { ReactNode } from 'react'
import { Container } from '@/components/common/Container'
import { PageMeta } from '@/components/common/PageMeta'
import { useI18n } from '@/lib/i18n'

export function LegalShell({
  title,
  description,
  path,
  children,
}: {
  title: string
  description: string
  path: string
  children: ReactNode
}) {
  const { t } = useI18n()
  return (
    <>
      <PageMeta title={`${title} | SS Nexus`} description={description} path={path} />
      <Container className="max-w-3xl py-16">
        <p className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-950" role="note">
          {t('draft.legal')}
        </p>
        <h1 className="mt-8 text-[40px] font-semibold">{title}</h1>
        <div className="mt-8 space-y-8 text-[17px] leading-8 text-black/75">{children}</div>
      </Container>
    </>
  )
}

export function LegalHeading({ children }: { children: ReactNode }) {
  return <h2 className="text-2xl font-semibold text-[#1a1a1a]">{children}</h2>
}
