import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export function Pill({ className, ...rest }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-line px-3 py-1 font-mono text-[11px] tracking-wide text-muted',
        className,
      )}
      {...rest}
    />
  )
}
