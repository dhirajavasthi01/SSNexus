import * as React from 'react'
import { cn } from '@/lib/utils'

export function Input({ className, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      className={cn(
        'flex h-12 w-full rounded-xl border border-black/10 bg-white px-4 text-base text-[#1a1a1a] outline-none transition placeholder:text-black/35 focus:border-[#0096f7]',
        className,
      )}
      {...props}
    />
  )
}
