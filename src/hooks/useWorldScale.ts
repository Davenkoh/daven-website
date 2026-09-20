import { createContext, useContext, useMemo } from 'react'
import { ROOM, SAFE } from '@/config/scene.config'
import { useViewportSize } from './useViewportSize'

export interface WorldTransform {
  /** screen px per world px */
  scale: number
  /** screen offset of the world's top-left corner */
  left: number
  top: number
  viewport: { width: number; height: number }
  /** world px → screen px */
  toClient: (x: number, y: number) => { x: number; y: number }
  /** screen px → world px */
  toWorld: (clientX: number, clientY: number) => { x: number; y: number }
}

/**
 * "Cover" fit: the room fills the viewport and is cropped at the edges, but the
 * scale is capped so the SAFE region (all the interactive objects) always stays on screen.
 */
export function useWorldScale(): WorldTransform {
  const viewport = useViewportSize()
  return useMemo(() => {
    const { width: vw, height: vh } = viewport
    const cover = Math.max(vw / ROOM.width, vh / ROOM.height)
    const safeFit = Math.min(vw / SAFE.w, vh / SAFE.h)
    const scale = Math.min(cover, Math.max(safeFit, Math.min(vw / ROOM.width, vh / ROOM.height)))
    const w = ROOM.width * scale
    const h = ROOM.height * scale
    // centre, then nudge so the SAFE region is inside the viewport
    let left = (vw - w) / 2
    let top = (vh - h) / 2
    const safeL = left + SAFE.x * scale
    const safeR = left + (SAFE.x + SAFE.w) * scale
    const safeT = top + SAFE.y * scale
    const safeB = top + (SAFE.y + SAFE.h) * scale
    if (safeL < 0) left -= safeL
    else if (safeR > vw) left -= safeR - vw
    if (safeT < 0) top -= safeT
    else if (safeB > vh) top -= safeB - vh
    return {
      scale,
      left,
      top,
      viewport,
      toClient: (x, y) => ({ x: left + x * scale, y: top + y * scale }),
      toWorld: (cx, cy) => ({ x: (cx - left) / scale, y: (cy - top) / scale }),
    }
  }, [viewport])
}

export const WorldContext = createContext<WorldTransform | null>(null)

export function useWorld(): WorldTransform {
  const ctx = useContext(WorldContext)
  if (!ctx) throw new Error('useWorld must be used inside <WorldContext>')
  return ctx
}
