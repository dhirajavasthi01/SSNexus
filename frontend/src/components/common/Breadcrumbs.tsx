import { Link } from 'react-router-dom'

type Crumb = { label: string; to?: string }

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-black/60">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const last = index === items.length - 1
          return (
            <li key={item.label} className="flex items-center gap-2">
              {index > 0 ? <span aria-hidden="true">/</span> : null}
              {item.to && !last ? (
                <Link to={item.to} className="hover:text-[#0096f7]">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={last ? 'page' : undefined} className="text-black/80">
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
