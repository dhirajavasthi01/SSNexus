import { Link, useParams } from 'react-router-dom'
import { Breadcrumbs } from '@/components/common/Breadcrumbs'
import { Container } from '@/components/common/Container'
import { PageMeta } from '@/components/common/PageMeta'
import { getPost, relatedPosts } from '@/data/blog'
import { useI18n } from '@/lib/i18n'

export function BlogArticlePage() {
  const { slug = '' } = useParams()
  const { t } = useI18n()
  const post = getPost(slug)

  if (!post) {
    return (
      <Container className="py-24">
        <PageMeta title="Article not found | SS Nexus" description="This article is not on the SS Nexus site." path={`/blog/${slug}`} />
        <h1 className="text-4xl font-semibold">{t('notFound.title')}</h1>
        <p className="mt-4 text-black/65">{t('notFound.body')}</p>
        <Link to="/blog" className="mt-6 inline-block font-semibold text-[#0096f7]">
          {t('cta.backBlog')}
        </Link>
      </Container>
    )
  }

  const related = relatedPosts(post.slug)

  return (
    <>
      <PageMeta title={`${post.title} | SS Nexus`} description={post.excerpt} path={`/blog/${post.slug}`} />
      <article className="py-14">
        <Container className="max-w-3xl">
          <Breadcrumbs items={[{ label: 'Blog', to: '/blog' }, { label: post.title }]} />
          <p className="text-sm font-semibold uppercase tracking-wide text-[#0096f7]">{t('blog.sample')}</p>
          <h1 className="mt-3 text-[40px] font-semibold leading-tight">{post.title}</h1>
          <p className="mt-4 text-black/50">
            <time dateTime={post.date}>{post.date}</time> · {post.category} · {post.readMinutes} min read
          </p>
          <div className="mt-8 space-y-5 text-lg leading-8 text-black/75">
            {post.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <Link to="/blog" className="mt-10 inline-block font-semibold text-[#0096f7]">
            {t('cta.backBlog')}
          </Link>
        </Container>
      </article>
      <section className="bg-[#f7fbff] py-14">
        <Container>
          <h2 className="text-2xl font-semibold">{t('cta.related')}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <Link key={item.slug} to={`/blog/${item.slug}`} className="rounded-2xl bg-white p-5 shadow-sm hover:text-[#0096f7]">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-black/60">{item.excerpt}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
