import logo from '@/assets/logos/logo.png'
import { siteConfig } from '@/data/siteConfig'

export function BrandLogo({ className = 'h-10 w-auto' }: { className?: string }) {
  return (
    <img
      src={logo}
      alt={siteConfig.name}
      width={443}
      height={376}
      className={`block max-w-none object-contain object-left ${className}`}
    />
  )
}
