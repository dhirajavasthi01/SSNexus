import { Link } from "react-router-dom"

import { Logo } from "@/components/logo.tsx"
import { legalLinks } from "@/data/site.ts"
import { appConfig } from "@/lib/app-config.ts"

const columns = [
  {
    title: "Solutions",
    links: [
      { label: "Pay in", to: "/pay-in" },
      { label: "Pay out", to: "/pay-out" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Blog", to: "/blog" },
      { label: "Contact us", to: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: legalLinks,
  },
]

export function SiteFooter() {
  return (
    <footer className="panel-navy text-white">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Logo tone="light" />
          <p className="mt-4 max-w-xs text-sm leading-6 text-white/65">
            Seamless payments, settled instantly. {appConfig.name} helps
            businesses accept local methods and move payouts worldwide.
          </p>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <p className="text-sm font-semibold">{column.title}</p>
            <ul className="mt-4 space-y-2">
              {column.links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/65 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="border-t border-white/10 py-5 text-center text-xs text-white/50">
        © {new Date().getFullYear()} {appConfig.name}. All rights reserved.
      </p>
    </footer>
  )
}
