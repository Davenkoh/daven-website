import { useMemo, type CSSProperties } from 'react'
import { mulberry32 } from '@/lib/random'

interface RainProps {
  /** bounding box in world px — streaks fall inside it */
  x: number
  y: number
  w: number
  h: number
  count?: number
}

/** CSS rain streaks (à la Afterhours): 1–2px gradients falling on a seeded schedule. */
export function Rain({ x, y, w, h, count = 56 }: RainProps) {
  const drops = useMemo(() => {
    const rnd = mulberry32(42)
    return Array.from({ length: count }, (_, i) => ({
      x: (i / count) * 100 + rnd() * (100 / count),
      len: 50 + rnd() * 110,
      dur: 1.7 + rnd() * 1.7,
      delay: -rnd() * 4,
      opacity: 0.45 + rnd() * 0.55,
    }))
  }, [count])

  return (
    <div className="rain" style={{ left: x, top: y, width: w, height: h, '--fall': `${h + 400}px` } as CSSProperties} aria-hidden="true">
      {drops.map((d, i) => (
        <i
          key={i}
          style={
            {
              '--x': `${d.x}%`,
              '--len': `${d.len}px`,
              '--dur': `${d.dur}s`,
              '--delay': `${d.delay}s`,
              opacity: d.opacity,
            } as CSSProperties
          }
        />
      ))}
    </div>
  )
}
