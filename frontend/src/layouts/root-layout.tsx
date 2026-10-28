import type { ReactNode } from "react"

import { SiteHeader } from "@/components/site-header.tsx"

type RootLayoutProps = {
  children: ReactNode
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="flex-1">{children}</main>
    </div>
  )
}
