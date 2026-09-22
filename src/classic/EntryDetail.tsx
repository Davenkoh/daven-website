import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'motion/react'
import type { Entry } from '@/data/types'
import { entryPhotos } from '@/data'
import { Icon } from '@/components/Icon'
import { Pill } from '@/components/Pill'
import { TagChips } from '@/components/TagChips'
import { cn } from '@/lib/cn'
import { EntryIcon } from './EntryCard'
import { SlideDeck } from './SlideDeck'

interface EntryDetailProps {
  entry: Entry
  colour: string
  showTags: boolean
  onClose: () => void
}

function Section({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="entry-dialog-section">
      <h3>{label}</h3>
      {children}
    </section>
  )
}

/**
 * Everything about one entry, in a dialog over the gallery: the remaining photos, summary, the full
 * story, tech stack, then labelled figures (architecture, specs, a slide deck). Escape, × or a click
 * outside closes it.
 */
export function EntryDetail({ entry, colour, showTags, onClose }: EntryDetailProps) {
  const dialog = useRef<HTMLDivElement>(null)
  // with a dedicated cover crop every photo shows inside; otherwise the first photo is the cover
  const photos = entryPhotos(entry)
  const inside = entry.cover ? photos : photos.slice(1)
  const facts: [string, string | undefined][] = [
    ['Context', entry.context],
    ['Highest impact', entry.impact],
    ['Result', entry.result],
  ]
  const presentFacts = facts.filter((f): f is [string, string] => !!f[1])

  useEffect(() => {
    dialog.current?.focus({ preventScroll: true })
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    // capture phase, then stop: the panel underneath listens for Escape too and must stay open
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      e.stopPropagation()
      onClose()
    }
    window.addEventListener('keydown', onKey, true)
    return () => {
      window.removeEventListener('keydown', onKey, true)
      document.body.style.overflow = previous
    }
  }, [onClose])

  return createPortal(
    <motion.div
      className="entry-modal"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
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
          <header className="entry-dialog-head">
            <EntryIcon entry={entry} size="lg" />
            <div className="min-w-0">
              <h2 className="text-2xl font-medium leading-tight md:text-3xl">{entry.title}</h2>
              {entry.subtitle && <p className="mt-1 text-base text-muted">{entry.subtitle}</p>}
            </div>
          </header>
          {(entry.period || entry.location || entry.status) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {entry.period && <Pill>{entry.period}</Pill>}
              {entry.location && <Pill>{entry.location}</Pill>}
              {entry.status && <Pill className="border-accent/40 text-accent">{entry.status}</Pill>}
            </div>
          )}

          {inside.length > 0 && (
            <div className={cn('entry-dialog-photos', inside.length === 1 && 'is-single')}>
              {inside.map((src) => (
                <img key={src} src={src} alt="" loading="lazy" decoding="async" />
              ))}
            </div>
          )}

          {entry.summary && (
            <Section label="Summary">
              {Array.isArray(entry.summary) ? (
                <ul>
                  {entry.summary.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              ) : (
                <p>{entry.summary}</p>
              )}
            </Section>
          )}
          {presentFacts.length > 0 && (
            <dl className="entry-dialog-facts">
              {presentFacts.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          )}
          {entry.bullets && (
            <Section label="The full story">
              <ul>
                {entry.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </Section>
          )}
          {entry.stack && (
            <Section label="Tech Stack">
              <ul className="entry-dialog-stack">
                {entry.stack.map((s, i) => (
                  <li key={`${s}-${i}`}>{s}</li>
                ))}
              </ul>
            </Section>
          )}
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
          {entry.figures?.map((f) => (
            <Section key={f.label} label={f.label}>
              {f.slides ? <SlideDeck slides={f.slides} label={f.label} /> : f.src ? <img className="entry-dialog-figure" src={f.src} alt={f.label} loading="lazy" decoding="async" /> : null}
            </Section>
          ))}
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
          {showTags && <TagChips tags={entry.tags} tone="dark" className="mt-7 border-t border-line pt-4 text-[11px]" />}
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  )
}
