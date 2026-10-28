import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion.tsx"
import { containerClass, faqs } from "@/data/site.ts"
import { usePageTitle } from "@/hooks/use-page-title.ts"
import { appConfig } from "@/lib/app-config.ts"

export function FaqsPage() {
  usePageTitle(`FAQs | ${appConfig.name}`)

  return (
    <>
    <section className="hero-canvas">
      <div className={`${containerClass} py-16 lg:py-24`}>
        <p className="eyebrow">Global Payment Solutions</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Frequently asked questions
        </h1>
        <p className="mt-4 max-w-2xl leading-7 text-ink/65">
          Answers for teams evaluating pay-in, payout, and integration with{" "}
          {appConfig.name}.
        </p>
      </div>
    </section>
    <section className={`${containerClass} py-16`}>
      <Accordion className="solution-card max-w-3xl rounded-3xl px-5 py-2">
        {faqs.map((item) => (
          <AccordionItem key={item.question} value={item.question}>
            <AccordionTrigger className="text-base">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-ink/70">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
    </>
  )
}
