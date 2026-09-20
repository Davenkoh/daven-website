import { useState } from 'react'
import { cn } from '@/lib/cn'

const FALLBACKS = [
  'linear-gradient(135deg, #2f3b4a, #1b2230)',
  'linear-gradient(135deg, #4a3b2f, #2a2019)',
  'linear-gradient(135deg, #2f4a3d, #1a2c24)',
]

/** Three tilted photos fanned like Preston's hobby card; broken images fall back to soft gradients. */
export function PhotoFan({ photos, className }: { photos: string[]; className?: string }) {
  const [broken, setBroken] = useState<Record<string, boolean>>({})
  const trio = photos.slice(0, 3)
  return (
    <div className={cn('relative mx-auto h-40 w-44', className)} aria-hidden="true">
      {trio.map((src, i) => {
        const rotate = (i - 1) * 10
        const style = {
          transform: `translate(-50%, -50%) rotate(${rotate}deg) translateX(${(i - 1) * 26}px)`,
          zIndex: i,
          background: broken[src] ? FALLBACKS[i % FALLBACKS.length] : undefined,
        }
        return (
          <div
            key={src}
            className="absolute left-1/2 top-1/2 h-32 w-28 overflow-hidden rounded-lg border border-white/15 bg-card shadow-[0_10px_30px_rgba(0,0,0,0.45)] transition-transform duration-500 group-hover:[transform:translate(-50%,-50%)_rotate(var(--r))_translateX(var(--x))]"
            style={style}
          >
            {!broken[src] && <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" onError={() => setBroken((b) => ({ ...b, [src]: true }))} />}
          </div>
        )
      })}
    </div>
  )
}
