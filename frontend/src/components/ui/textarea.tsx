import * as React from 'react'
import { cn } from '@/lib/utils'

export function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      className={cn(
        'flex min-h-32 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-base text-[#1a1a1a] outline-none transition placeholder:text-black/35 focus:border-[#0096f7]',
        className,
      )}
      {...props}
    />
  )
}
