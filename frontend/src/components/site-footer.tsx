import { Link } from "react-router-dom"

import { legalLinks } from "@/data/site.ts"
import { appConfig } from "@/lib/app-config.ts"

const footerLinks = [
  { label: "Home", to: "/" },
  { label: "Pay in", to: "/pay-in" },
  { label: "Pay out", to: "/pay-out" },
  { label: "About Us", to: "/about" },
  { label: "Contact Us", to: "/contact" },
  ...legalLinks,
]

export function SiteFooter() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-5 px-4 py-8 text-center sm:px-6">
        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {footerLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-xs text-white/70 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="text-xs text-white/55">
          Copyright © All rights Reserved. {appConfig.name}.
        </p>
      </div>
    </footer>
  )
}
