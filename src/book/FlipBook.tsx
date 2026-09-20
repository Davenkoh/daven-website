import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import type { Book } from './buildPages'
import { Leaf } from './Leaf'
import type { PageContext } from './pages/PageFace'

interface FlipBookProps {
  book: Book
  current: number
  onCurrentChange: (next: number) => void
  ctx: Omit<PageContext, 'side'>
}

/** Two-page spread with CSS-3D leaf flips. `current` = number of leaves turned. */
export function FlipBook({ book, current, onCurrentChange, ctx }: FlipBookProps) {
  const { leaves } = book
  const total = leaves.length
  const [animating, setAnimating] = useState<number | null>(null)
  const fallback = useRef(0)

  const flipTo = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(total, next))
      if (clamped === current || animating !== null) return
      setAnimating(clamped > current ? current : clamped)
      window.clearTimeout(fallback.current)
      fallback.current = window.setTimeout(() => setAnimating(null), 900)
      onCurrentChange(clamped)
    },
    [animating, current, onCurrentChange, total],
  )

  const next = useCallback(() => flipTo(current + 1), [flipTo, current])
  const prev = useCallback(() => flipTo(current - 1), [flipTo, current])
  const settled = useCallback((index: number) => {
    setAnimating((a) => (a === index ? null : a))
  }, [])

  // touch swipe
  const start = useRef<{ x: number; y: number } | null>(null)
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse') return
    start.current = { x: e.clientX, y: e.clientY }
  }
  const onPointerUp = (e: React.PointerEvent) => {
    if (!start.current) return
    const dx = e.clientX - start.current.x
    const dy = e.clientY - start.current.y
    start.current = null
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) next()
      else prev()
    }
  }

  useEffect(() => () => window.clearTimeout(fallback.current), [])

  return (
    <div className="book" onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
      <div className="book-shadow" aria-hidden="true" />
      <motion.div
        className="spread"
        initial={false}
        animate={{ x: current === 0 ? '-25%' : current === total ? '25%' : '0%' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {leaves.map((leaf, i) => {
          const flipped = i < current
          const zIndex = animating === i ? total + 5 : flipped ? i + 1 : total - i
          return (
            <Leaf
              key={leaf.id}
              leaf={leaf}
              flipped={flipped}
              zIndex={zIndex}
              isCover={i === 0}
              isLast={i === total - 1}
              ctx={ctx}
              onNext={next}
              onPrev={prev}
              onSettled={settled}
            />
          )
        })}
      </motion.div>
    </div>
  )
}
