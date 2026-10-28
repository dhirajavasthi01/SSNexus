import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { BrandLogo } from '@/components/common/BrandLogo'
import { DesktopNavigation } from '@/components/layout/DesktopNavigation'
import { LanguageSelector } from '@/components/layout/LanguageSelector'
import { MobileNavigation } from '@/components/layout/MobileNavigation'
import { siteConfig } from '@/data/siteConfig'
import { useI18n } from '@/lib/i18n'

export function SiteHeader() {
  const { t } = useI18n()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white">
      <div className="mx-auto flex h-[79px] max-w-[1280px] items-center justify-between px-5 md:px-8">
        <Link to="/" className="shrink-0" aria-label={t('nav.home')}>
          <BrandLogo />
        </Link>
        <DesktopNavigation />
        <div className="hidden items-center gap-2 lg:flex">
          <LanguageSelector />
          {siteConfig.loginUrl ? (
            <a
              href={siteConfig.loginUrl}
              className="rounded-full px-4 py-2 text-[15px] text-black"
              target="_blank"
              rel="noreferrer"
            >
              {t('nav.login')}
            </a>
          ) : null}
          <Link
            to="/contact"
            className="rounded-full bg-[rgba(0,0,0,0.9)] px-6 py-[10px] text-[15px] text-white transition hover:bg-[#32b9ff]"
          >
            {t('cta.contact')}
          </Link>
        </div>
        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-md lg:hidden"
          aria-label={t('nav.menu')}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="size-6" />
        </button>
      </div>
      <MobileNavigation open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  )
}
