import { Link } from 'react-router-dom'
import { BrandLogo } from '@/components/common/BrandLogo'
import { footerColumns } from '@/data/navigation'
import { useI18n } from '@/lib/i18n'

export function SiteFooter() {
  const { t } = useI18n()

  return (
    <footer className="bg-[rgba(0,0,0,0.9)] text-white">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-20 md:grid-cols-[1.3fr_1fr_1fr_1fr] md:px-8">
        <div>
          <div className="inline-flex rounded-2xl bg-white p-2">
            <BrandLogo className="h-12 w-auto" />
          </div>
          <p className="mt-6 max-w-xs text-[16px] leading-[30px] text-white/65">{t('footer.blurb')}</p>
        </div>
        {footerColumns.map((column) => (
          <div key={column.titleKey}>
            <h2 className="mb-3 text-[22px] font-normal leading-[50px] text-white">{t(column.titleKey)}</h2>
            <ul>
              {column.links.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-[16px] leading-[30px] text-white/65 hover:text-white">
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto max-w-[1280px] border-t border-white/10 px-5 py-8 md:px-8">
        <p className="text-sm text-white/65">{t('footer.copyright')}</p>
      </div>
    </footer>
  )
}
