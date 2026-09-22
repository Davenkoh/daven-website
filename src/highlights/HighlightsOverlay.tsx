import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Icon } from '@/components/Icon'
import { Highlights } from './Highlights'

const END_THRESHOLD_PX = 160

/**
 * The journey as a large panel over the room: the room stays visible around the edges as a cue
 * that this can be closed. Closes only from Close, Skip, "Start Exploring" or Escape.
 */
export function HighlightsOverlay({ onClose }: { onClose: () => void }) {
  const scroller = useRef<HTMLDivElement>(null)
  const [atEnd, setAtEnd] = useState(false)

  useEffect(() => {
    scroller.current?.focus({ preventScroll: true })
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const onScroll = () => {
    const el = scroller.current
    if (!el) return
    setAtEnd(el.scrollTop + el.clientHeight >= el.scrollHeight - END_THRESHOLD_PX)
  }

  const jump = () => {
    const el = scroller.current
    if (!el) return
    el.scrollTo({ top: atEnd ? 0 : el.scrollHeight, behavior: 'smooth' })
  }

  return (
    <motion.div className="hl-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.4 } }} transition={{ duration: 0.5 }}>
      <motion.section
        className="hl-panel"
        role="dialog"
        aria-modal="true"
        aria-label="How I got here"
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.985, transition: { duration: 0.35 } }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <button type="button" className="hl-close" onClick={onClose} aria-label="Close and enter the room">
          <Icon name="close" size={16} /> Close
        </button>

        <div ref={scroller} className="hl-scroller" tabIndex={-1} onScroll={onScroll}>
          <Highlights variant="overlay" onStart={onClose} />
        </div>

        <div className="hl-dock" role="group" aria-label="Journey shortcuts">
          <button type="button" className="hl-dock-btn" onClick={jump}>
            {atEnd ? (
              <>
                Back to top <Icon name="arrow-up" size={15} />
              </>
            ) : (
              <>
                Jump to the end <Icon name="arrow-down" size={15} />
              </>
            )}
          </button>
          <button type="button" className="hl-dock-btn is-skip" onClick={onClose}>
            Skip to the room <Icon name="arrow-right" size={15} />
          </button>
        </div>
      </motion.section>
    </motion.div>
  )
}
