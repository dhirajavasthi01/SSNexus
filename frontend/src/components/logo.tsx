import { Link } from "react-router-dom"

import { appConfig } from "@/lib/app-config.ts"
import { cn } from "@/lib/utils.ts"

type LogoProps = {
  compact?: boolean
  tone?: "dark" | "light"
}

export function Logo({ compact = false, tone = "dark" }: LogoProps) {
  return (
    <Link to="/" className="flex items-center gap-2">
      <img src="/logo.png" alt="" className="h-8 w-auto sm:h-9" />
      {compact ? null : (
        <span
          className={cn(
            "text-sm font-semibold",
            tone === "light" ? "text-white" : "text-ink"
          )}
        >
          {appConfig.name}
        </span>
      )}
    </Link>
  )
}
