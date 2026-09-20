import { useEffect } from 'react'
import { motion } from 'motion/react'
import { HOTSPOTS, VINYL } from '@/config/scene.config'
import { useWorld } from '@/hooks/useWorldScale'

const PAD = 12

/**
 * One-pane first-visit tutorial: darkens the room and cuts spotlights around everything
 * that can be clicked (except the window easter egg), with each item's name. Any click ends it.
 */
export function TourOverlay({ onDone }: { onDone: () => void }) {
  const { toClient, scale, viewport } = useWorld()

  useEffect(() => {
    const onKey = () => onDone()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onDone])

  const spots = [
    ...HOTSPOTS.map((h) => ({ id: h.id, label: h.label, x: h.x, y: h.y, w: h.w, h: h.h })),
    // the record player plus its control strip underneath
    { id: 'music', label: 'Music', x: VINYL.cx - VINYL.r - 60, y: VINYL.cy - VINYL.r - 10, w: (VINYL.r + 60) * 2, h: VINYL.r * 2 * VINYL.squash + 120 / scale },
  ].map((s) => {
    const p = toClient(s.x, s.y)
    return { ...s, left: p.x - PAD, top: p.y - PAD, width: s.w * scale + PAD * 2, height: s.h * scale + PAD * 2 }
  })

  return (
    <motion.div
      className="tour"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.35 } }}
      transition={{ duration: 0.6, delay: 0.8 }}
      onClick={onDone}
      role="dialog"
      aria-label="What you can click in the room"
    >
      <svg className="tour-mask" width={viewport.width} height={viewport.height} aria-hidden="true">
        <defs>
          <mask id="tour-holes">
            <rect width="100%" height="100%" fill="#fff" />
            {spots.map((s) => (
              <rect key={s.id} x={s.left} y={s.top} width={s.width} height={s.height} rx="18" fill="#000" />
            ))}
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="rgba(4, 4, 6, 0.74)" mask="url(#tour-holes)" />
        {spots.map((s) => (
          <rect key={`ring-${s.id}`} className="tour-ring" x={s.left} y={s.top} width={s.width} height={s.height} rx="18" />
        ))}
      </svg>
      {spots.map((s) => (
        <span key={`label-${s.id}`} className="tour-label" style={{ left: s.left + s.width / 2, top: s.top + s.height + 10 }}>
          {s.label}
        </span>
      ))}
      <div className="tour-caption">
        <p className="tour-caption-title">Here is everything you can click.</p>
        <p className="tour-caption-sub">Click anywhere to start exploring.</p>
      </div>
    </motion.div>
  )
}
