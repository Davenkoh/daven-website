import type { CSSProperties, ReactNode } from 'react'
import { ROOM } from '@/config/scene.config'
import { useWorld } from '@/hooks/useWorldScale'
import { cn } from '@/lib/cn'

/** Fixed-size stage in room-image pixels, scaled to the viewport. Children use world px. */
export function World({ children, className }: { children: ReactNode; className?: string }) {
  const { scale, left, top } = useWorld()
  const style = {
    width: ROOM.width,
    height: ROOM.height,
    transform: `translate(${left}px, ${top}px) scale(${scale})`,
    '--world-scale': scale,
  } as CSSProperties
  return (
    <div className="world-viewport">
      <img src={ROOM.fallback} alt="" className="world-backdrop" aria-hidden="true" draggable={false} />
      <div className={cn('world', className)} style={style}>
        {children}
      </div>
    </div>
  )
}
