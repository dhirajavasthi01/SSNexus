import { Link } from "react-router-dom"

import { appConfig } from "@/lib/app-config.ts"

type LogoProps = {
  compact?: boolean
}

export function Logo({ compact = false }: LogoProps) {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <img
        src="/logo.png"
        alt=""
        className="h-9 w-auto sm:h-10"
      />
      {compact ? null : (
        <span className="text-sm font-semibold tracking-[0.14em] text-ink">
          {appConfig.name.toUpperCase()}
        </span>
      )}
    </Link>
  )
}
