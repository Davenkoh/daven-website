import type { CSSProperties } from 'react'
import { Link } from 'react-router'
import { cn } from '@/lib/cn'

interface HotspotProps {
  id?: string
  /** accessible name */
  label: string
  /** visible caption text */
  caption: string
  to?: string
  onClick?: () => void
  pressed?: boolean
  left: number
  top: number
  width: number
  height: number
  dot: { x: number; y: number }
  /** caption visible without hovering */
  revealed?: boolean
  /** breathing glow on the dot */
  primary?: boolean
  arrow?: boolean
  /** keep the caption on screen when the dot sits near a viewport edge */
  align?: 'left' | 'center' | 'right'
  /** px inset from the box edge for left/right alignment (so an off-screen box still shows its caption) */
  captionInset?: number
  className?: string
}

/** Afterhours-style clickable object: a translucent "+" dot and a mono caption. Screen px. */
export function Hotspot({ id, label, caption, to, onClick, pressed, left, top, width, height, dot, revealed, primary, arrow, align = 'center', captionInset = 0, className }: HotspotProps) {
  const style: CSSProperties = { left, top, width, height }
  const dotStyle: CSSProperties = { left: `${dot.x * 100}%`, top: `${dot.y * 100}%` }
  const captionStyle: CSSProperties =
    align === 'left'
      ? { left: captionInset, top: `calc(${dot.y * 100}% + 20px)` }
      : align === 'right'
        ? { right: captionInset, top: `calc(${dot.y * 100}% + 20px)` }
        : { left: `${dot.x * 100}%`, top: `calc(${dot.y * 100}% + 20px)` }
  const cls = cn('hotspot', revealed && 'is-revealed', primary && 'hotspot-primary', className)
  const inner = (
    <>
      <span className="hotspot-dot" style={dotStyle} aria-hidden="true" />
      <span className={cn('hotspot-caption', align !== 'center' && `align-${align}`)} style={captionStyle} aria-hidden="true">
        {caption}
        {arrow && <span>↗</span>}
      </span>
    </>
  )
  if (to) {
    return (
      <Link to={to} className={cls} style={style} aria-label={label} data-id={id}>
        {inner}
      </Link>
    )
  }
  return (
    <button type="button" className={cls} style={style} aria-label={label} aria-pressed={pressed} onClick={onClick} data-id={id}>
      {inner}
    </button>
  )
}
