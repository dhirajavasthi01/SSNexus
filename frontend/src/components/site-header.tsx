import { useState } from "react"
import { ChevronDown, Menu, X } from "lucide-react"
import { NavLink } from "react-router-dom"

import { Logo } from "@/components/logo.tsx"
import { pageLinks, solutionLinks } from "@/data/site.ts"
import { cn } from "@/lib/utils.ts"

function linkClass(isActive: boolean) {
  return cn(
    "text-sm font-medium text-ink/75 transition-colors hover:text-ink",
    isActive && "text-ink"
  )
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [solutionsOpen, setSolutionsOpen] = useState(false)

  function closeMenus() {
    setMenuOpen(false)
    setSolutionsOpen(false)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-white/70 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-6 px-4 sm:px-6 lg:justify-center lg:gap-12">
        <Logo />
        <nav className="hidden items-center gap-8 lg:flex">
          <NavLink to="/" end className={({ isActive }) => linkClass(isActive)}>
            Home
          </NavLink>
          <div
            className="relative"
            onMouseEnter={() => setSolutionsOpen(true)}
            onMouseLeave={() => setSolutionsOpen(false)}
          >
            <button
              type="button"
              className="inline-flex items-center gap-1 text-sm font-medium text-ink/75 hover:text-ink"
              aria-expanded={solutionsOpen}
              onClick={() => setSolutionsOpen((open) => !open)}
            >
              Solution
              <ChevronDown className="size-4" />
            </button>
            {solutionsOpen ? (
              <div className="absolute top-full left-1/2 z-20 w-48 -translate-x-1/2 pt-3">
                <div className="rounded-2xl bg-white p-2 shadow-xl ring-1 ring-black/5">
                  {solutionLinks.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      onClick={closeMenus}
                      className={({ isActive }) =>
                        cn(
                          "block rounded-xl px-3 py-2 text-sm text-ink/80 hover:bg-ice hover:text-ink",
                          isActive && "bg-ice text-ink"
                        )
                      }
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
          {pageLinks.slice(1).map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => linkClass(isActive)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-full text-ink lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
      {menuOpen ? (
        <div className="border-t border-ice bg-white px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            <NavLink
              to="/"
              end
              onClick={closeMenus}
              className="rounded-xl px-3 py-2 text-sm font-medium"
            >
              Home
            </NavLink>
            <p className="px-3 pt-3 text-xs font-semibold tracking-wide text-ink/50 uppercase">
              Solution
            </p>
            {solutionLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={closeMenus}
                className="rounded-xl px-3 py-2 text-sm"
              >
                {link.label}
              </NavLink>
            ))}
            {pageLinks.slice(1).map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={closeMenus}
                className="rounded-xl px-3 py-2 text-sm font-medium"
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  )
}
