import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { languages, translate, type LanguageCode, type MessageKey } from '@/data/i18n'

type LanguageContextValue = {
  language: LanguageCode
  setLanguage: (language: LanguageCode) => void
  t: (key: MessageKey) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function isLanguage(value: string | null): value is LanguageCode {
  return languages.some((language) => language.code === value)
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<LanguageCode>(() => {
    if (typeof window === 'undefined') return 'en'
    const stored = window.localStorage.getItem('ssn-lang')
    return isLanguage(stored) ? stored : 'en'
  })

  useEffect(() => {
    const html = languages.find((item) => item.code === language)?.html ?? 'en'
    document.documentElement.lang = html
    window.localStorage.setItem('ssn-lang', language)
  }, [language])

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      t: (key) => translate(language, key),
    }),
    [language],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

// Hook shares this module with the provider so the context stays private.
// eslint-disable-next-line react-refresh/only-export-components
export function useI18n() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useI18n must be used within LanguageProvider')
  }
  return context
}
