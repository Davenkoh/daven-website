import { useState } from 'react'
import { cn } from '@/lib/cn'
import { SITE } from '@/config/site.config'

/** Round avatar: uses /photos/avatar.jpg when present, otherwise the initials. */
export function Avatar({ size = 36, className }: { size?: number; className?: string }) {
  const [broken, setBroken] = useState(false)
  return (
    <span
      className={cn('inline-grid shrink-0 place-items-center overflow-hidden rounded-full bg-white/10 text-xs font-medium', className)}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {broken ? (
        <span>{SITE.shortName[0]}</span>
      ) : (
        <img src="/photos/avatar.jpg" alt="" className="h-full w-full object-cover" onError={() => setBroken(true)} />
      )}
    </span>
  )
}
