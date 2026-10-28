import { useEffect } from "react"

import { appConfig } from "@/lib/app-config.ts"
import type { PageMetadata } from "@/types/index.ts"

const metadata: PageMetadata = {
  title: appConfig.name,
  description: "Static pages for this project start here.",
}

export function HomePage() {
  useEffect(() => {
    document.title = metadata.title
  }, [])

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 py-16 sm:px-6 sm:py-24">
      <div className="flex max-w-2xl flex-col gap-4">
        <p className="text-sm font-medium text-muted-foreground">Frontend</p>
        <h1 className="text-4xl font-medium tracking-tight sm:text-5xl">
          {metadata.title}
        </h1>
        <p className="text-base leading-7 text-muted-foreground sm:text-lg">
          {metadata.description}
        </p>
      </div>
    </section>
  )
}
