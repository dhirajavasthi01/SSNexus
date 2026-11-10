import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const variants = {
  dark: 'bg-[rgba(0,0,0,0.9)] text-white hover:bg-[#32b9ff]',
  sky: 'bg-[#39c2ff] text-white hover:bg-[#2ba8e0]',
  outline: 'border border-black bg-transparent text-black hover:border-[#32b9ff] hover:bg-[#32b9ff] hover:text-white',
}

type PrimaryButtonProps = {
  children: ReactNode
  to?: string
  href?: string
  type?: 'button' | 'submit'
  variant?: keyof typeof variants
  className?: string
  disabled?: boolean
  onClick?: () => void
}

export function PrimaryButton({
  children,
  to,
  href,
  type = 'button',
  variant = 'dark',
  className,
  disabled,
  onClick,
}: PrimaryButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center rounded-full px-10 py-[15px] text-[16px] font-semibold transition duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60',
    variants[variant],
    className,
  )

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noreferrer">
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}
