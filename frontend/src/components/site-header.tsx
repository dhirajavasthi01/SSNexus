import { appConfig } from "@/lib/app-config.ts"
import { ThemeToggle } from "@/components/theme-toggle.tsx"

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <p className="truncate text-sm font-medium">{appConfig.name}</p>
        <ThemeToggle />
      </div>
    </header>
  )
}
