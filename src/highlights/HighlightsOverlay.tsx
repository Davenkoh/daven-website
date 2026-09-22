import { useEffect, useRef, type MouseEvent } from 'react'
import { motion } from 'motion/react'
import { Icon } from '@/components/Icon'
import { Highlights } from './Highlights'

/**
 * The journey as a large panel over the room: the room stays visible around the edges as a cue
 * that this can be closed. Closes from Close, "Start Exploring", Escape, or a click on the room around it.
 */
export function HighlightsOverlay({ onClose }: { onClose: () => void }) {
  const scroller = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scroller.current?.focus({ preventScroll: true })
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const jumpTo = (where: 'top' | 'end') => {
    const el = scroller.current
    if (!el) return
    el.scrollTo({ top: where === 'top' ? 0 : el.scrollHeight, behavior: 'smooth' })
  }

  // a click on the dimmed room around the panel closes it; clicks inside never bubble here as the target
  const onBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <motion.div
      className="hl-overlay"
      onClick={onBackdropClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
      transition={{ duration: 0.5 }}
    >
      <motion.section
        className="hl-panel"
        role="dialog"
        aria-modal="true"
        aria-label="My Highlights"
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.985, transition: { duration: 0.35 } }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <button type="button" className="hl-close" onClick={onClose} aria-label="Close and enter the room">
          <Icon name="close" size={16} /> Close
        </button>

        <div ref={scroller} className="hl-scroller" tabIndex={-1}>
          <Highlights variant="overlay" onStart={onClose} />
        </div>

        <div className="hl-dock" role="group" aria-label="Scroll shortcuts">
          <button type="button" className="hl-dock-btn" onClick={() => jumpTo('top')}>
            Back to top <Icon name="arrow-up" size={15} />
          </button>
          <button type="button" className="hl-dock-btn" onClick={() => jumpTo('end')}>
            Jump to the end <Icon name="arrow-down" size={15} />
          </button>
        </div>
      </motion.section>
    </motion.div>
  )
}
