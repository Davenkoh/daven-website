import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { Icon } from '@/components/Icon'
import { Highlights } from './Highlights'

/**
 * Full-screen journey shown after Start. Closes only from the × or the "Start exploring" button
 * (and Escape), never by clicking around it.
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

  return (
    <motion.div
      className="hl-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="How I got here"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      transition={{ duration: 0.6 }}
    >
      <button type="button" className="hl-close glass" onClick={onClose} aria-label="Close and enter the room">
        <Icon name="close" size={18} />
      </button>
      <div ref={scroller} className="hl-scroller" tabIndex={-1}>
        <Highlights variant="overlay" onStart={onClose} />
      </div>
    </motion.div>
  )
}
