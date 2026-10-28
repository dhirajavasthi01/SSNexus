import { useState } from "react"
import { ChevronDown, Menu, X } from "lucide-react"
import { NavLink } from "react-router-dom"

import { Logo } from "@/components/logo.tsx"
import { pageLinks, solutionLinks } from "@/data/site.ts"
import { cn } from "@/lib/utils.ts"

function linkClass(isActive: boolean) {
  return cn(
    "text-sm font-medium text-ink/70 transition-colors hover:text-ink",
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
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/90 backdrop-blur">
      <div className="relative mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex">
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
              className="inline-flex items-center gap-1 text-sm font-medium text-ink/70 transition-colors hover:text-ink"
              aria-expanded={solutionsOpen}
              onClick={() => setSolutionsOpen((open) => !open)}
            >
              Solution
              <ChevronDown
                className={cn(
                  "size-4 transition-transform duration-200",
                  solutionsOpen && "rotate-180"
                )}
              />
            </button>
            <div
              className={cn(
                "absolute top-full left-1/2 z-20 w-52 -translate-x-1/2 pt-3 transition-all duration-200",
                solutionsOpen
                  ? "visible translate-y-0 opacity-100"
                  : "invisible -translate-y-1 opacity-0"
              )}
            >
              <div className="rounded-2xl bg-white p-2 shadow-xl ring-1 ring-black/5">
                {solutionLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={closeMenus}
                    className={({ isActive }) =>
                      cn(
                        "block rounded-xl px-3 py-2 text-sm text-ink/80 transition-colors hover:bg-ice hover:text-ink",
                        isActive && "bg-ice text-ink"
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </div>
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
        <div className="hidden items-center gap-3 lg:flex">
          <NavLink
            to="/login"
            className={({ isActive }) => linkClass(isActive)}
          >
            Login
          </NavLink>
          <NavLink
            to="/contact"
            className="rounded-full bg-navy px-4 py-2 text-sm font-medium text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#01345c]"
          >
            Contact us
          </NavLink>
        </div>
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
        <div className="border-t border-black/5 bg-white px-4 py-4 lg:hidden">
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
            <NavLink
              to="/login"
              onClick={closeMenus}
              className="rounded-xl px-3 py-2 text-sm font-medium"
            >
              Login
            </NavLink>
            <NavLink
              to="/contact"
              onClick={closeMenus}
              className="mt-2 rounded-full bg-navy px-4 py-2 text-center text-sm font-medium text-white"
            >
              Contact us
            </NavLink>
          </div>
        </div>
      ) : null}
    </header>
  )
}
