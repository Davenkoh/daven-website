import { useEffect, type RefObject } from 'react'
import { clamp } from '@/lib/math'

/** How far (as a fraction of half the viewport) the cursor must travel for a full head turn. */
const GAIN = 1.5
/** easing per frame for the pointer (tilt) and for the frame crossfade */
const POINTER_SMOOTHING = 0.12
const BLEND_SMOOTHING = 0.14
const LEAVE_MS = 800
const CENTRE_INDEX = 4
const ENTER = { col: 0.3, up: 0.34, down: 0.4 }
const EXIT = { col: 0.18, up: 0.2, down: 0.26 }

function nextCol(nx: number, cur: number) {
  if (cur === 1) return nx > ENTER.col ? 2 : nx < -ENTER.col ? 0 : 1
  if (cur === 2) return nx < EXIT.col ? (nx < -ENTER.col ? 0 : 1) : 2
  return nx > -EXIT.col ? (nx > ENTER.col ? 2 : 1) : 0
}

function nextRow(ny: number, cur: number) {
  if (cur === 1) return ny < -ENTER.up ? 0 : ny > ENTER.down ? 2 : 1
  if (cur === 0) return ny > -EXIT.up ? (ny > ENTER.down ? 2 : 1) : 0
  return ny < EXIT.down ? (ny < -ENTER.up ? 0 : 1) : 2
}

/**
 * Smooth head-follow for a 3×3 grid of photos.
 * - The pointer (relative to the face, normalised to the viewport) is eased every frame and
 *   drives a subtle perspective tilt of the whole portrait, so the motion is continuous.
 * - The frame to show is chosen with hysteresis, then the blend position eases toward it, so
 *   frames cross-fade instead of snapping — but at rest exactly one frame is visible
 *   (no permanent double image).
 * Styles are written directly (no React state): pointer-rate updates never re-render the scene.
 */
export function useHeadTracking(
  enabled: boolean,
  getAnchor: () => { x: number; y: number } | null,
  containerRef: RefObject<HTMLElement | null>,
  frameRefs: RefObject<(HTMLImageElement | null)[]>,
) {
  useEffect(() => {
    const container = containerRef.current
    const frames = frameRefs.current
    if (!container || !frames) return

    const showCentre = () => {
      frames.forEach((img, i) => {
        if (img) img.style.opacity = i === CENTRE_INDEX ? '1' : '0'
      })
      container.style.transform = ''
    }
    if (!enabled) {
      showCentre()
      return
    }

    const target = { x: 0, y: 0 }
    const pointer = { x: 0, y: 0 }
    const cell = { col: 1, row: 1 }
    const blend = { u: 1, v: 1 }
    let raf = 0
    let leaveTimer = 0

    const onMove = (e: PointerEvent) => {
      const a = getAnchor()
      if (!a) return
      window.clearTimeout(leaveTimer)
      target.x = clamp(((e.clientX - a.x) / (window.innerWidth / 2)) * GAIN, -1, 1)
      target.y = clamp(((e.clientY - a.y) / (window.innerHeight / 2)) * GAIN, -1, 1)
    }
    const onLeave = () => {
      window.clearTimeout(leaveTimer)
      leaveTimer = window.setTimeout(() => {
        target.x = 0
        target.y = 0
      }, LEAVE_MS)
    }
    const tick = () => {
      pointer.x += (target.x - pointer.x) * POINTER_SMOOTHING
      pointer.y += (target.y - pointer.y) * POINTER_SMOOTHING
      cell.col = nextCol(pointer.x, cell.col)
      cell.row = nextRow(pointer.y, cell.row)
      blend.u += (cell.col - blend.u) * BLEND_SMOOTHING
      blend.v += (cell.row - blend.v) * BLEND_SMOOTHING
      // snap the last few percent so the resting state is a single crisp frame
      if (Math.abs(blend.u - cell.col) < 0.02) blend.u = cell.col
      if (Math.abs(blend.v - cell.row) < 0.02) blend.v = cell.row
      frames.forEach((img, i) => {
        if (!img) return
        const row = Math.floor(i / 3)
        const col = i % 3
        const w = Math.max(0, 1 - Math.abs(blend.u - col)) * Math.max(0, 1 - Math.abs(blend.v - row))
        img.style.opacity = w.toFixed(3)
      })
      container.style.transform = `perspective(1400px) rotateY(${(pointer.x * 5).toFixed(2)}deg) rotateX(${(-pointer.y * 3).toFixed(2)}deg)`
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    window.addEventListener('blur', onLeave)
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(leaveTimer)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('blur', onLeave)
      showCentre()
    }
  }, [enabled, getAnchor, containerRef, frameRefs])
}
