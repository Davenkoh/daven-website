import { useEffect, type RefObject } from 'react'

interface Options {
  next: () => void
  prev: () => void
  enabled?: boolean
}

/**
 * Turns wheel / trackpad scrolling into exactly one page flip per gesture:
 * deltas accumulate until a threshold, then the handler locks for 750 ms so
 * trackpad momentum cannot riffle through the book.
 */
export function useWheelFlip(ref: RefObject<HTMLElement | null>, { next, prev, enabled = true }: Options) {
  useEffect(() => {
    const el = ref.current
    if (!el || !enabled) return
    let acc = 0
    let locked = false
    let idle = 0
    let lock = 0
    const onWheel = (e: WheelEvent) => {
      // a page with overflowing content scrolls first; only flip once it is at the end
      const scroller = (e.target as HTMLElement | null)?.closest<HTMLElement>('.page-scroll')
      if (scroller && scroller.scrollHeight > scroller.clientHeight + 1) {
        const atTop = scroller.scrollTop <= 0
        const atBottom = scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 1
        if ((e.deltaY > 0 && !atBottom) || (e.deltaY < 0 && !atTop)) return
      }
      e.preventDefault()
      if (locked) return
      const raw = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX
      const delta = raw * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 400 : 1)
      acc += delta
      window.clearTimeout(idle)
      idle = window.setTimeout(() => {
        acc = 0
      }, 150)
      if (Math.abs(acc) > 60) {
        if (acc > 0) next()
        else prev()
        acc = 0
        locked = true
        window.clearTimeout(lock)
        lock = window.setTimeout(() => {
          locked = false
        }, 750)
      }
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      el.removeEventListener('wheel', onWheel)
      window.clearTimeout(idle)
      window.clearTimeout(lock)
    }
  }, [ref, next, prev, enabled])
}
