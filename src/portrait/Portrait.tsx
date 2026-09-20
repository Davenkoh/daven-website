import { useCallback, useEffect, useRef, useState } from 'react'
import { PORTRAIT } from '@/config/scene.config'
import { useWorld } from '@/hooks/useWorldScale'
import { useCoarsePointer, usePrefersReducedMotion } from '@/hooks/useMediaQuery'
import { preloadImages } from '@/lib/preload'
import { useHeadTracking } from './useHeadTracking'

const FRAMES = [0, 1, 2].flatMap((row) => [0, 1, 2].map((col) => ({ row, col, src: `${PORTRAIT.frames}/${row}-${col}.${PORTRAIT.ext}` })))
const CENTRE_SRC = `${PORTRAIT.frames}/1-1.${PORTRAIT.ext}`

/**
 * Daven on his chair, facing the visitor. Nine stacked frames cross-blend as the cursor moves.
 * Lives inside the World (world px).
 */
export function Portrait() {
  const world = useWorld()
  const coarse = useCoarsePointer()
  const reduced = usePrefersReducedMotion()
  const [ready, setReady] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const frameRefs = useRef<(HTMLImageElement | null)[]>([])

  useEffect(() => {
    let cancelled = false
    void preloadImages(FRAMES.map((f) => f.src)).then(() => {
      if (!cancelled) setReady(true)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const getAnchor = useCallback(() => {
    const fx = PORTRAIT.x + PORTRAIT.w * PORTRAIT.face.x
    const fy = PORTRAIT.y + PORTRAIT.w * PORTRAIT.aspect * PORTRAIT.face.y
    return world.toClient(fx, fy)
  }, [world])

  useHeadTracking(ready && !coarse && !reduced, getAnchor, containerRef, frameRefs)

  return (
    <div
      ref={containerRef}
      className="portrait"
      role="img"
      aria-label="Daven sitting on a chair, facing you"
      style={{ left: PORTRAIT.x, top: PORTRAIT.y, width: PORTRAIT.w }}
    >
      <img src={CENTRE_SRC} alt="" className="portrait-base" draggable={false} decoding="async" />
      {FRAMES.map((f, i) => (
        <img
          key={f.src}
          ref={(el) => {
            frameRefs.current[i] = el
          }}
          src={f.src}
          alt=""
          draggable={false}
          decoding="async"
          loading={i === 4 ? 'eager' : 'lazy'}
          className="portrait-frame"
          style={{ opacity: i === 4 ? 1 : 0 }}
        />
      ))}
    </div>
  )
}
