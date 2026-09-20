import type { CSSProperties } from 'react'
import { VINYL } from '@/config/scene.config'
import { tracks } from '@/data/tracks'
import { useAudioStore } from '@/store/useAudioStore'
import { cn } from '@/lib/cn'

interface VinylProps {
  cx?: number
  cy?: number
  r?: number
  /** vertical squash to match the camera angle (1 = a perfect circle) */
  squash?: number
  className?: string
  /** when given, the record becomes a button */
  onClick?: () => void
  label?: string
}

/** A record on the platter with a tonearm; spins while music plays, label colour follows the track. */
export function Vinyl({ cx = VINYL.cx, cy = VINYL.cy, r = VINYL.r, squash = 1, className, onClick, label }: VinylProps) {
  const playing = useAudioStore((s) => s.playing)
  const trackIndex = useAudioStore((s) => s.trackIndex)
  const track = tracks[trackIndex] ?? tracks[0]
  const style: CSSProperties = {
    left: cx - r,
    top: cy - r,
    width: r * 2,
    height: r * 2,
    transform: squash === 1 ? undefined : `scaleY(${squash})`,
    '--label': track.colour,
  } as CSSProperties
  const inner = (
    <>
      <span className={cn('vinyl-disc', playing && 'is-playing')}>
        <span className="vinyl-label" />
        <span className="vinyl-spindle" />
      </span>
      <span className="vinyl-sheen" />
      <span className="vinyl-arm-pivot">
        <span className={cn('vinyl-arm', playing && 'is-playing')} />
      </span>
    </>
  )
  if (onClick) {
    return (
      <button type="button" className={cn('vinyl', className)} style={style} onClick={onClick} aria-label={label ?? (playing ? 'Pause the record' : 'Play the record')}>
        {inner}
      </button>
    )
  }
  return (
    <div className={cn('vinyl', className)} style={style} aria-hidden="true">
      {inner}
    </div>
  )
}
