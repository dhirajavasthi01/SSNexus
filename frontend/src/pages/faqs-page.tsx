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
    <section className={`${containerClass} py-16 lg:py-24`}>
      <p className="text-sm font-medium text-sky">Global Payment Solutions</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        Frequently asked questions
      </h1>
      <p className="mt-4 max-w-2xl leading-7 text-ink/70">
        Answers for teams evaluating pay-in, payout, and integration with{" "}
        {appConfig.name}.
      </p>
      <Accordion className="mt-10 max-w-3xl rounded-3xl bg-white px-5 py-2 shadow-sm">
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
  )
}
