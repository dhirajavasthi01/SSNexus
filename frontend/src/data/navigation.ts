import type { MessageKey } from '@/data/i18n'

export type NavLink = {
  labelKey: MessageKey
  to: string
}

export type NavGroup = {
  id: string
  labelKey: MessageKey
  to?: string
  items: NavLink[]
}

export const solutionLinks: NavLink[] = [
  { labelKey: 'nav.payIn', to: '/pay-in' },
  { labelKey: 'nav.payOut', to: '/pay-out' },
  { labelKey: 'nav.integration', to: '/integration' },
  { labelKey: 'nav.security', to: '/security' },
]

export const aboutLinks: NavLink[] = [
  { labelKey: 'nav.about', to: '/about' },
  { labelKey: 'nav.support', to: '/support' },
  { labelKey: 'nav.faqs', to: '/faqs' },
]

export const mainNav: Array<NavLink | NavGroup> = [
  { labelKey: 'nav.home', to: '/' },
  { id: 'solution', labelKey: 'nav.solution', items: solutionLinks },
  { id: 'about', labelKey: 'nav.about', to: '/about', items: aboutLinks },
  { labelKey: 'nav.blog', to: '/blog' },
  { labelKey: 'nav.contact', to: '/contact' },
]

export function isNavGroup(item: NavLink | NavGroup): item is NavGroup {
  return 'items' in item
}

export const footerColumns: Array<{ titleKey: MessageKey; links: NavLink[] }> = [
  {
    titleKey: 'footer.solutions',
    links: solutionLinks,
  },
  {
    titleKey: 'footer.company',
    links: [
      { labelKey: 'nav.about', to: '/about' },
      { labelKey: 'nav.support', to: '/support' },
      { labelKey: 'nav.faqs', to: '/faqs' },
      { labelKey: 'nav.blog', to: '/blog' },
      { labelKey: 'nav.contact', to: '/contact' },
    ],
  },
  {
    titleKey: 'footer.legal',
    links: [
      { labelKey: 'footer.privacy', to: '/privacy-policy' },
      { labelKey: 'footer.sustainability', to: '/sustainability' },
      { labelKey: 'footer.terms', to: '/terms' },
    ],
  },
]
