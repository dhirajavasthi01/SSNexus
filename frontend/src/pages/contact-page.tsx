import { useState } from "react"
import type { FormEvent } from "react"

import { Button } from "@/components/ui/button.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Label } from "@/components/ui/label.tsx"
import { Textarea } from "@/components/ui/textarea.tsx"
import { containerClass } from "@/data/site.ts"
import { usePageTitle } from "@/hooks/use-page-title.ts"
import { appConfig } from "@/lib/app-config.ts"

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  usePageTitle(`Contact Us | ${appConfig.name}`)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className={`${containerClass} grid gap-12 py-16 lg:grid-cols-[1fr_1.1fr] lg:py-24`}>
      <div>
        <p className="text-sm font-medium text-sky">Global Payment Solutions</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Contact Us
        </h1>
        <p className="mt-5 max-w-md leading-7 text-ink/70">
          Tell us about your markets, volume, and whether you need pay-in,
          payout, or both. {appConfig.name} will use this brief to shape the
          next conversation.
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl bg-white p-6 shadow-[0_16px_40px_rgba(15,40,80,0.06)] sm:p-8"
      >
        {submitted ? (
          <p className="text-base leading-7 text-ink">
            Thank you. Your enquiry is recorded in this session. Delivery to
            the {appConfig.name} inbox will be connected when the backend is
            ready.
          </p>
        ) : (
          <div className="grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" required className="h-11 bg-white" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Work email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                className="h-11 bg-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="company">Company</Label>
              <Input id="company" name="company" required className="h-11 bg-white" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">How can we help?</Label>
              <Textarea id="message" name="message" required rows={5} />
            </div>
            <Button type="submit" className="h-11 rounded-full">
              Enquire now
            </Button>
          </div>
        )}
      </form>
    </section>
  )
}
