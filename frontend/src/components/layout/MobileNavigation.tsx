import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ChevronDown, X } from 'lucide-react'
import { isNavGroup, mainNav } from '@/data/navigation'
import { useI18n } from '@/lib/i18n'
import { LanguageSelector } from '@/components/layout/LanguageSelector'
import { cn } from '@/lib/utils'

export function MobileNavigation({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useI18n()
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    if (open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button type="button" className="absolute inset-0 bg-black/40" aria-label={t('nav.close')} onClick={onClose} />
      <nav
        className="absolute right-0 top-0 flex h-full w-[min(100%,360px)] flex-col overflow-y-auto bg-white px-6 py-6 shadow-xl"
        aria-label="Mobile"
      >
        <button type="button" className="mb-6 self-end p-2" aria-label={t('nav.close')} onClick={onClose}>
          <X className="size-5" />
        </button>
        <ul className="flex flex-col">
          {mainNav.map((item) => {
            if (!isNavGroup(item)) {
              return (
                <li key={item.to} className="border-b border-black/5">
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      cn('block py-4 text-[17px]', isActive && 'font-semibold text-[#0096f7]')
                    }
                    onClick={onClose}
                  >
                    {t(item.labelKey)}
                  </NavLink>
                </li>
              )
            }
            const isOpen = expanded === item.id
            return (
              <li key={item.id} className="border-b border-black/5">
                <button
                  type="button"
                  className="flex w-full items-center justify-between py-4 text-left text-[17px]"
                  aria-expanded={isOpen}
                  onClick={() => setExpanded(isOpen ? null : item.id)}
                >
                  {t(item.labelKey)}
                  <ChevronDown className={cn('size-4 transition', isOpen && 'rotate-180')} />
                </button>
                {isOpen ? (
                  <ul className="pb-3 pl-3">
                    {item.items.map((child) => (
                      <li key={child.to}>
                        <NavLink
                          to={child.to}
                          className={({ isActive }) =>
                            cn('block py-3 text-[16px] text-black/80', isActive && 'font-semibold text-[#0096f7]')
                          }
                          onClick={onClose}
                        >
                          {t(child.labelKey)}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            )
          })}
        </ul>
        <LanguageSelector className="mt-6" onSelect={onClose} />
      </nav>
    </div>
  )
}
