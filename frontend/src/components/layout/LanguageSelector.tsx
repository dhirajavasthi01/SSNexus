import { useEffect, useId, useRef, useState } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { languages, type LanguageCode } from '@/data/i18n'
import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export function LanguageSelector({ className, onSelect }: { className?: string; onSelect?: () => void }) {
  const { language, setLanguage, t } = useI18n()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const listId = useId()
  const current = languages.find((item) => item.code === language) ?? languages[0]

  useEffect(() => {
    function onPointer(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  function choose(code: LanguageCode) {
    setLanguage(code)
    setOpen(false)
    onSelect?.()
  }

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      <button
        type="button"
        className="inline-flex items-center gap-1 px-2 py-2 text-[16px] text-black/90"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={t('lang.menu')}
        onClick={() => setOpen((value) => !value)}
      >
        <span>{current.short}</span>
        <ChevronDown className={cn('size-4 transition', open && 'rotate-180')} aria-hidden="true" />
      </button>
      <ul
        id={listId}
        role="listbox"
        aria-label={t('lang.menu')}
        className={cn(
          'absolute right-0 z-50 mt-2 w-44 rounded-md bg-white py-2 shadow-[0_1px_30px_rgba(0,0,0,0.1)]',
          open ? 'visible opacity-100' : 'invisible opacity-0',
        )}
      >
        {languages.map((item) => {
          const selected = item.code === language
          return (
            <li key={item.code} role="option" aria-selected={selected}>
              <button
                type="button"
                className="flex w-full items-center justify-between px-4 py-2 text-left text-[15px] hover:text-[#0096f7]"
                onClick={() => choose(item.code)}
              >
                {item.label}
                {selected ? <Check className="size-4 text-[#0096f7]" aria-hidden="true" /> : null}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
