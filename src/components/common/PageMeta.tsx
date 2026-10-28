import { useEffect } from 'react'
import { siteConfig } from '@/data/siteConfig'

type PageMetaProps = {
  title: string
  description: string
  path: string
}

function upsertMeta(name: string, content: string, attribute: 'name' | 'property') {
  let tag = document.head.querySelector(`meta[${attribute}="${name}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attribute, name)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

export function PageMeta({ title, description, path }: PageMetaProps) {
  useEffect(() => {
    document.title = title
    const url = `${siteConfig.siteUrl}${path}`
    upsertMeta('description', description, 'name')
    upsertMeta('og:title', title, 'property')
    upsertMeta('og:description', description, 'property')
    upsertMeta('og:url', url, 'property')
    upsertMeta('og:type', 'website', 'property')
    upsertMeta('twitter:card', 'summary_large_image', 'name')
    upsertMeta('twitter:title', title, 'name')
    upsertMeta('twitter:description', description, 'name')

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', url)
  }, [title, description, path])

  return null
}
