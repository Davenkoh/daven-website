import { useCallback, useEffect, useRef, type ReactNode } from 'react'
import { useNavigate } from 'react-router'
import { motion } from 'motion/react'
import { Icon } from '@/components/Icon'
import { useFocusTrap } from '@/hooks/useFocusTrap'

interface MicrositeOverlayProps {
  label: string
  children: ReactNode
}

/**
 * A page as a large panel over the room, the room showing around the edges as the cue that it can be
 * closed. Closes from Close, Escape or a click on the room around it, back to `/`.
 */
export function MicrositeOverlay({ label, children }: MicrositeOverlayProps) {
  const navigate = useNavigate()
  const close = useCallback(() => navigate('/'), [navigate])
  const panel = useRef<HTMLElement>(null)
  useFocusTrap(panel)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [close])

  return (
    <motion.div
      className="ms-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) close()
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <motion.section
        ref={panel}
        className="ms-panel"
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <button type="button" className="ms-close" onClick={close} aria-label="Close and go back to the room">
          <Icon name="close" size={16} /> Close
        </button>
        <div className="ms-scroller">
          <div className="ms-content">{children}</div>
        </div>
      </motion.section>
    </motion.div>
  )
}
