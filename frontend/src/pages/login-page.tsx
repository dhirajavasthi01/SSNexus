import { useState } from "react"
import type { FormEvent } from "react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Label } from "@/components/ui/label.tsx"
import { usePageTitle } from "@/hooks/use-page-title.ts"
import { appConfig } from "@/lib/app-config.ts"

export function LoginPage() {
  const [submitted, setSubmitted] = useState(false)
  usePageTitle(`Login | ${appConfig.name}`)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="hero-canvas">
      <div className="mx-auto flex w-full max-w-md flex-col px-4 py-16 sm:py-24">
      <p className="eyebrow">Global Payment Solutions</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">Login</h1>
      <p className="mt-3 text-sm leading-6 text-ink/65">
        Sign in to the {appConfig.name} dashboard. Account access will connect
        when the backend is ready.
      </p>
      <form
        onSubmit={handleSubmit}
        className="solution-card mt-8 rounded-3xl p-6"
      >
        {submitted ? (
          <p className="text-sm leading-6 text-ink">
            Thanks. These details stay in this browser session until sign-in is
            connected.
          </p>
        ) : (
          <div className="grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="login-email">Work email</Label>
              <Input
                id="login-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@company.com"
                className="h-11"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="login-password">Password</Label>
              <Input
                id="login-password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="Enter your password"
                className="h-11"
              />
            </div>
            <Button type="submit" className="btn-brand h-11 rounded-full border-0">
              Sign in
            </Button>
          </div>
        )}
      </form>
      <p className="mt-4 text-sm text-ink/60">
        New to {appConfig.name}?{" "}
        <Link to="/contact" className="font-medium text-sky">
          Enquire now
        </Link>
      </p>
      </div>
    </section>
  )
}
