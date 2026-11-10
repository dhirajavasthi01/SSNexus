import { Link } from 'react-router-dom'
import { Container } from '@/components/common/Container'
import { PageMeta } from '@/components/common/PageMeta'
import { blogPosts } from '@/data/blog'
import { useI18n } from '@/lib/i18n'

export function BlogPage() {
  const { t } = useI18n()
  return (
    <>
      <PageMeta
        title="Blog | SS Nexus"
        description="Sample articles for the SS Nexus blog layout. They are not published company news."
        path="/blog"
      />
      <section className="bg-[#f7fbff]">
        <Container className="py-16">
          <h1 className="text-[44px] font-semibold">Blog</h1>
          <p className="mt-4 max-w-2xl text-lg text-black/65">
            Original event write-ups from the reference site belong to another brand. These cards are sample articles so
            the listing and article routes work.
          </p>
        </Container>
      </section>
      <section className="py-12">
        <Container className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {blogPosts.map((post) => (
            <article key={post.slug} className="flex flex-col overflow-hidden rounded-2xl border border-black/5">
              <div className="h-40 bg-gradient-to-br from-[#0b2a4a] to-[#32b9ff]" />
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#0096f7]">
                  {t('blog.sample')} · {post.category}
                </p>
                <h2 className="mt-2 text-xl font-semibold">
                  <Link to={`/blog/${post.slug}`} className="hover:text-[#0096f7]">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 flex-1 text-black/65">{post.excerpt}</p>
                <p className="mt-4 text-sm text-black/50">
                  <time dateTime={post.date}>{post.date}</time> · {post.readMinutes} min
                </p>
              </div>
            </article>
          ))}
        </Container>
      </section>
    </>
  )
}
