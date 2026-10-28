import { Outlet } from "react-router-dom"

import { SiteFooter } from "@/components/site-footer.tsx"
import { SiteHeader } from "@/components/site-header.tsx"

export function SiteLayout() {
  return (
    <div className="flex min-h-svh flex-col bg-[#f7fbff] text-ink">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}
