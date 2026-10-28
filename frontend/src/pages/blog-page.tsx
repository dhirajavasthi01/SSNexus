import { Reveal } from "@/components/reveal.tsx"
import { containerClass } from "@/data/site.ts"
import { usePageTitle } from "@/hooks/use-page-title.ts"
import { appConfig } from "@/lib/app-config.ts"

const posts = [
  {
    title: "How local payment methods lift checkout completion",
    date: "March 12, 2026",
    summary:
      "Shoppers abandon checkout when the method on screen is one they do not use at home. A local mix changes that.",
  },
  {
    title: "What finance teams should see in a payout report",
    date: "February 2, 2026",
    summary:
      "A useful payout report names the recipient, the route, the status, and the moment funds left the account.",
  },
  {
    title: "Sandbox first: a cleaner path to go-live",
    date: "January 15, 2026",
    summary:
      "Certify pay-in, payout, and webhook handling with test keys before the first live transaction.",
  },
]

export function BlogPage() {
  usePageTitle(`Blog | ${appConfig.name}`)

  return (
    <>
    <section className="hero-canvas">
      <div className={`${containerClass} py-16 lg:py-24`}>
        <p className="eyebrow">Global Payment Solutions</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Blog
        </h1>
        <p className="mt-4 max-w-2xl leading-7 text-ink/65">
          Notes on checkout, payouts, and going live with {appConfig.name}.
        </p>
      </div>
    </section>
    <section className={`${containerClass} py-16`}>
      <div className="grid gap-4 md:grid-cols-3">
        {posts.map((post, index) => (
          <Reveal key={post.title} delay={index * 80}>
            <article className="solution-card flex h-full flex-col rounded-3xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
              <p className="text-xs font-medium text-sky">{post.date}</p>
              <h2 className="mt-3 text-xl font-semibold">{post.title}</h2>
              <p className="mt-3 text-sm leading-6 text-ink/65">{post.summary}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
    </>
  )
}
