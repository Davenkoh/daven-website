import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import type { Book } from './buildPages'
import { PageFace, type PageContext } from './pages/PageFace'
import { Icon } from '@/components/Icon'
import { playFlipSound } from '@/audio/flipSound'

interface PageStackProps {
  book: Book
  page: number
  onPageChange: (next: number) => void
  ctx: Omit<PageContext, 'side'>
}

const variants = {
  enter: (dir: number) => ({ x: dir * 28, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir * -28, opacity: 0 }),
}

/** One page at a time (phones / portrait viewports): slide instead of 3D flips. */
export function PageStack({ book, page, onPageChange, ctx }: PageStackProps) {
  const { pages } = book
  const [dir, setDir] = useState(1)
  const go = (next: number) => {
    const clamped = Math.max(0, Math.min(pages.length - 1, next))
    if (clamped === page) return
    playFlipSound()
    setDir(clamped > page ? 1 : -1)
    onPageChange(clamped)
  }
  const [startX, setStartX] = useState<number | null>(null)
  const current = pages[page]

  return (
    <div className="page-stack">
      <div
        className="page-stack-viewport"
        onPointerDown={(e) => setStartX(e.clientX)}
        onPointerUp={(e) => {
          if (startX === null) return
          const dx = e.clientX - startX
          setStartX(null)
          if (Math.abs(dx) > 40) go(dx < 0 ? page + 1 : page - 1)
        }}
      >
        <AnimatePresence mode="popLayout" initial={false} custom={dir}>
          <motion.div
            key={current.id}
            className="page-stack-page"
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <PageFace page={current} ctx={{ ...ctx, side: page % 2 === 0 ? 'right' : 'left' }} />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="page-stack-nav">
        <button type="button" className="hud-btn" aria-label="Previous page" onClick={() => go(page - 1)} disabled={page === 0}>
          <Icon name="arrow-left" />
        </button>
        <span className="font-hud text-[11px] text-fg/70">
          {page + 1} / {pages.length}
        </span>
        <button type="button" className="hud-btn" aria-label="Next page" onClick={() => go(page + 1)} disabled={page === pages.length - 1}>
          <Icon name="arrow-right" />
        </button>
      </div>
    </div>
  )
}
