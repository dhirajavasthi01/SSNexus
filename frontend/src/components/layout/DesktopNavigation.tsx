import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { isNavGroup, mainNav } from '@/data/navigation'
import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/utils'

const linkClass = 'block px-[23px] py-5 text-[16px] text-black transition hover:text-[#0096f7]'

export function DesktopNavigation() {
  const { t } = useI18n()
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <ul className="hidden items-center lg:flex">
      {mainNav.map((item) => {
        if (!isNavGroup(item)) {
          return (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => cn(linkClass, isActive && 'font-semibold text-[#0096f7]')}
              >
                {t(item.labelKey)}
              </NavLink>
            </li>
          )
        }

        const open = openId === item.id
        return (
          <li
            key={item.id}
            className="relative"
            onMouseEnter={() => setOpenId(item.id)}
            onMouseLeave={() => setOpenId(null)}
          >
            <button
              type="button"
              className={cn(linkClass, 'inline-flex items-center gap-1')}
              aria-expanded={open}
              aria-haspopup="true"
              onClick={() => setOpenId(open ? null : item.id)}
            >
              {t(item.labelKey)}
              <ChevronDown className={cn('size-4 transition', open && 'rotate-180')} aria-hidden="true" />
            </button>
            <ul
              className={cn(
                'absolute left-4 top-full z-40 w-44 rounded-md bg-white py-2 shadow-[0_1px_30px_rgba(0,0,0,0.1)] transition',
                open ? 'visible opacity-100' : 'invisible opacity-0',
              )}
            >
              {item.items.map((child) => (
                <li key={child.to}>
                  <NavLink
                    to={child.to}
                    className={({ isActive }) =>
                      cn('block px-5 py-2.5 text-[15px] hover:text-[#0096f7]', isActive && 'font-semibold text-[#0096f7]')
                    }
                    onClick={() => setOpenId(null)}
                  >
                    {t(child.labelKey)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </li>
        )
      })}
    </ul>
  )
}
