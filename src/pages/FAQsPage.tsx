import { useMemo, useState } from 'react'
import { Container } from '@/components/common/Container'
import { PageMeta } from '@/components/common/PageMeta'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import { faqCategories, faqs } from '@/data/faqs'
import { useI18n } from '@/lib/i18n'

export function FAQsPage() {
  const { t } = useI18n()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<(typeof faqCategories)[number] | 'All'>('All')

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return faqs.filter((item) => {
      const inCategory = category === 'All' || item.category === category
      const inText = !needle || `${item.question} ${item.answer}`.toLowerCase().includes(needle)
      return inCategory && inText
    })
  }, [query, category])

  return (
    <>
      <PageMeta
        title="FAQs | SS Nexus"
        description="Searchable questions about SS Nexus payments, payouts, integration, and security. Answers are sample support copy."
        path="/faqs"
      />
      <section className="bg-[#f3f8ff]">
        <Container className="py-16">
          <h1 className="text-[44px] font-semibold">Frequently asked questions</h1>
          <p className="mt-4 max-w-2xl text-lg text-black/65">
            The reference FAQ page was unavailable. These answers are maintained in src/data/faqs.ts and marked as sample
            support copy.
          </p>
          <label className="mt-8 block max-w-xl">
            <span className="sr-only">{t('search.faqs')}</span>
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t('search.faqs')}
              aria-label={t('search.faqs')}
            />
          </label>
          <div className="mt-5 flex flex-wrap gap-2" role="tablist" aria-label="FAQ categories">
            {(['All', ...faqCategories] as const).map((item) => (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={category === item}
                className={`rounded-full px-4 py-2 text-sm font-semibold ${category === item ? 'bg-[#111] text-white' : 'bg-white text-black'}`}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </Container>
      </section>
      <section className="py-12">
        <Container className="max-w-3xl">
          {results.length === 0 ? (
            <p className="rounded-2xl bg-[#f7fbff] px-6 py-10 text-center text-black/70" role="status">
              {t('search.empty')}
            </p>
          ) : (
            <Accordion type="single" collapsible className="w-full">
              {results.map((item) => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionTrigger>
                    <span>
                      <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-[#0096f7]">{item.category}</span>
                      {item.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </Container>
      </section>
    </>
  )
}
