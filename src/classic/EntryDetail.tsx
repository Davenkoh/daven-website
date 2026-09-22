import { useEffect, useRef, type CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'motion/react'
import type { Entry } from '@/data/types'
import { entryPhotos } from '@/data'
import { Icon } from '@/components/Icon'
import { Pill } from '@/components/Pill'
import { TagChips } from '@/book/TagChips'
import { EntryIcon, FactList } from './EntryCard'

interface EntryDetailProps {
  entry: Entry
  colour: string
  showTags: boolean
  onClose: () => void
}

/** Everything about one entry, in a dialog over the gallery. Escape, the × or a click outside closes it. */
export function EntryDetail({ entry, colour, showTags, onClose }: EntryDetailProps) {
  const dialog = useRef<HTMLDivElement>(null)
  const photos = entryPhotos(entry)

  useEffect(() => {
    dialog.current?.focus({ preventScroll: true })
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [onClose])

  return createPortal(
    <motion.div
      className="entry-modal"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      // keys inside the dialog must not reach the book underneath (its Escape closes the whole book);
      // stopping them here also stops the window listener, so Escape is handled right here too
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose()
        e.stopPropagation()
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      transition={{ duration: 0.25 }}
    >
      <motion.div
        ref={dialog}
        className="entry-dialog"
        role="dialog"
        aria-modal="true"
        aria-label={entry.title}
        tabIndex={-1}
        style={{ '--c': colour } as CSSProperties}
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.985, transition: { duration: 0.2 } }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <button type="button" className="entry-dialog-close" onClick={onClose} aria-label="Close">
          <Icon name="close" size={18} />
        </button>
        <div className="entry-dialog-scroll">
          {photos.length > 0 && (
            <div className="entry-dialog-photos">
              <img src={photos[0]} alt="" className="entry-dialog-hero" decoding="async" />
              {photos.length > 1 && (
                <div className="entry-dialog-thumbs">
                  {photos.slice(1, 7).map((src) => (
                    <img key={src} src={src} alt="" loading="lazy" decoding="async" />
                  ))}
                </div>
              )}
            </div>
          )}
          <header className="entry-dialog-head">
            <EntryIcon entry={entry} size="lg" />
            <div className="min-w-0">
              <h2 className="text-2xl font-medium leading-tight md:text-3xl">{entry.title}</h2>
              {entry.subtitle && <p className="mt-1 text-base text-muted">{entry.subtitle}</p>}
            </div>
          </header>
          <div className="mt-4 flex flex-wrap gap-2">
            {entry.period && <Pill>{entry.period}</Pill>}
            {entry.location && <Pill>{entry.location}</Pill>}
            {entry.status && <Pill className="border-accent/40 text-accent">{entry.status}</Pill>}
          </div>
          <FactList entry={entry} className="entry-dialog-facts" />
          {entry.meta && (
            <dl className="entry-dialog-meta">
              {entry.meta.map((m) => (
                <div key={m.label}>
                  <dt>{m.label}</dt>
                  <dd>
                    {m.href ? (
                      <a href={m.href} target="_blank" rel="noreferrer">
                        {m.value}
                      </a>
                    ) : (
                      m.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          )}
          {entry.bullets && (
            <section className="entry-dialog-section">
              <h3>The full story</h3>
              <ul>
                {entry.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </section>
          )}
          {entry.description && <p className="mt-5 text-fg/80">{entry.description}</p>}
          {entry.links && (
            <div className="mt-5 flex flex-wrap gap-3">
              {entry.links.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm text-fg/80 hover:text-fg">
                  {l.label} <Icon name="external" size={14} />
                </a>
              ))}
            </div>
          )}
          {showTags && <TagChips tags={entry.tags} tone="dark" className="mt-6 border-t border-line pt-4 text-[11px]" />}
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  )
}
