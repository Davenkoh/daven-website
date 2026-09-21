import { useEffect, useRef, useSyncExternalStore } from 'react'
import { motion } from 'motion/react'
import { HOTSPOTS } from '@/config/scene.config'
import { useWorld } from '@/hooks/useWorldScale'

interface Box {
  id: string
  left: number
  top: number
  width: number
  height: number
}

const PAD = 10
/** the overlay fades in after this delay… */
const SHOW_DELAY_MS = 800
/** …and dismisses itself this long after it is visible (a click or key ends it sooner) */
const AUTO_DISMISS_MS = 3000

function union(rects: DOMRect[]): DOMRect | null {
  if (rects.length === 0) return null
  const left = Math.min(...rects.map((r) => r.left))
  const top = Math.min(...rects.map((r) => r.top))
  const right = Math.max(...rects.map((r) => r.right))
  const bottom = Math.max(...rects.map((r) => r.bottom))
  return new DOMRect(left, top, right - left, bottom - top)
}

/** Measures the on-screen "+" dots with their captions so the holes fit exactly. */
function measureBoxes(): Box[] {
  const out: Box[] = []
  for (const h of HOTSPOTS) {
    if (!h.to) continue // the lamp is not part of the tour
    const root = document.querySelector<HTMLElement>(`.hotspot[data-id="${h.id}"]`)
    if (!root) continue
    const parts = [root.querySelector('.hotspot-dot'), root.querySelector('.hotspot-caption')].filter((el): el is Element => !!el)
    const r = union(parts.map((el) => el.getBoundingClientRect()))
    if (r) out.push({ id: h.id, left: r.left - PAD, top: r.top - PAD, width: r.width + PAD * 2, height: r.height + PAD * 2 })
  }
  return out
}

// re-measure shortly after a resize, once the hotspots have moved
const subscribe = (onChange: () => void) => {
  let t = 0
  const onResize = () => {
    window.clearTimeout(t)
    t = window.setTimeout(onChange, 80)
  }
  window.addEventListener('resize', onResize)
  return () => {
    window.clearTimeout(t)
    window.removeEventListener('resize', onResize)
  }
}

function useMeasuredBoxes(): Box[] {
  const cache = useRef<{ key: string; boxes: Box[] }>({ key: '', boxes: [] })
  return useSyncExternalStore(subscribe, () => {
    const boxes = measureBoxes()
    const key = JSON.stringify(boxes)
    if (key !== cache.current.key) cache.current = { key, boxes }
    return cache.current.boxes
  })
}

/**
 * One-pane first-visit tutorial: darkens the room and cuts a tight spotlight around each
 * topic's "+" dot and label. It goes away by itself after 3 s, or sooner on any click or key.
 */
export function TourOverlay({ onDone }: { onDone: () => void }) {
  const { viewport } = useWorld()
  const boxes = useMeasuredBoxes()

  useEffect(() => {
    const onKey = () => onDone()
    window.addEventListener('keydown', onKey)
    const timer = window.setTimeout(onDone, SHOW_DELAY_MS + AUTO_DISMISS_MS)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.clearTimeout(timer)
    }
  }, [onDone])

  return (
    <motion.div
      className="tour"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.35 } }}
      transition={{ duration: 0.6, delay: SHOW_DELAY_MS / 1000 }}
      onClick={onDone}
      role="dialog"
      aria-label="What you can click in the room"
    >
      <svg className="tour-mask" width={viewport.width} height={viewport.height} aria-hidden="true">
        <defs>
          <mask id="tour-holes">
            <rect width="100%" height="100%" fill="#fff" />
            {boxes.map((b) => (
              <rect key={b.id} x={b.left} y={b.top} width={b.width} height={b.height} rx="14" fill="#000" />
            ))}
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="rgba(4, 4, 6, 0.74)" mask="url(#tour-holes)" />
        {boxes.map((b) => (
          <rect key={`ring-${b.id}`} className="tour-ring" x={b.left} y={b.top} width={b.width} height={b.height} rx="14" />
        ))}
      </svg>
      <p className="tour-caption">Click these</p>
    </motion.div>
  )
}
