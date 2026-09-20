import { useEffect, useState } from 'react'

const read = () => ({ width: window.innerWidth, height: window.innerHeight })

/** Viewport size, rAF-throttled, also listening to the visual viewport (mobile URL bar). */
export function useViewportSize() {
  const [size, setSize] = useState(read)
  useEffect(() => {
    let raf = 0
    const onResize = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => setSize(read()))
    }
    window.addEventListener('resize', onResize)
    window.visualViewport?.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.visualViewport?.removeEventListener('resize', onResize)
    }
  }, [])
  return size
}
