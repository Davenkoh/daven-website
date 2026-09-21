import { useState, type CSSProperties } from 'react'
import { highlights, highlightsClosing, highlightsHeader, type HighlightBlock, type HighlightPhoto } from '@/data/highlights'
import { Icon } from '@/components/Icon'
import { cn } from '@/lib/cn'
import { rich } from './rich'

interface HighlightsProps {
  variant: 'overlay' | 'page'
  onStart: () => void
  startLabel?: string
}

function Photo({ photo }: { photo: HighlightPhoto }) {
  const [broken, setBroken] = useState(false)
  if (broken) return null
  return (
    <figure className={cn('hl-figure', photo.wide && 'is-wide')}>
      <img src={photo.src} alt={photo.alt ?? photo.caption} loading="lazy" decoding="async" onError={() => setBroken(true)} />
      <figcaption>{photo.caption}</figcaption>
    </figure>
  )
}

function Block({ block, colour }: { block: HighlightBlock; colour: string }) {
  switch (block.type) {
    case 'headline':
      return <h3 className="hl-headline">{block.text}</h3>
    case 'p':
      return <p className="hl-p">{rich(block.text, colour)}</p>
    case 'quote':
      return <p className="hl-quote">{block.text}</p>
    case 'stats':
      return (
        <ul className="hl-stats">
          {block.items.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      )
    case 'list':
      return (
        <ul className="hl-list">
          {block.items.map((s) => {
            const [head, ...rest] = s.split(' · ')
            return (
              <li key={s}>
                <strong>{head}</strong>
                {rest.length > 0 && <span> · {rest.join(' · ')}</span>}
              </li>
            )
          })}
        </ul>
      )
    case 'photos':
      return (
        <div className={cn('hl-photos', block.photos.length === 1 && 'is-single')}>
          {block.photos.map((p) => (
            <Photo key={p.src} photo={p} />
          ))}
        </div>
      )
  }
}

/** The journey timeline: big years on the left, a rail with dots, content and photos on the right. */
export function Highlights({ variant, onStart, startLabel = 'Start exploring' }: HighlightsProps) {
  return (
    <article className={cn('hl', variant === 'overlay' ? 'hl-in-overlay' : 'hl-in-page')}>
      <header className="hl-head">
        <p className="hl-eyebrow">{highlightsHeader.eyebrow}</p>
        <h2 className="hl-title">
          Business <span className="hl-times">×</span> Tech: <span className="hl-title-accent">how I got here</span>
        </h2>
        <p className="hl-intro">{highlightsHeader.intro}</p>
        <p className="hl-cue">{highlightsHeader.cue}</p>
      </header>

      <ol className="hl-timeline">
        {highlights.map((s, i) => (
          <li key={s.id} className={cn('hl-section', i === 0 && 'is-first', i === highlights.length - 1 && 'is-last')} style={{ '--c': s.colour } as CSSProperties}>
            <div className="hl-year" aria-hidden="true">
              {s.yearBig}
            </div>
            <div className="hl-rail" aria-hidden="true">
              <span className="hl-dot" />
            </div>
            <div className="hl-body">
              <p className="hl-kicker">
                <span className="hl-index">{s.index}</span>
                {s.years && <span> / {s.years}</span>}
                <span> · {s.kicker}</span>
              </p>
              {s.blocks.map((b, j) => (
                <Block key={j} block={b} colour={s.colour} />
              ))}
            </div>
          </li>
        ))}
      </ol>

      <footer className="hl-end">
        <p className="hl-end-name">{highlightsClosing.name}</p>
        <p className="hl-end-role">{highlightsClosing.role}</p>
        <p className="hl-end-tag">{highlightsClosing.tagline}</p>
        <p className="hl-end-thanks">{highlightsClosing.thanks}</p>
        <button type="button" className="hl-start" onClick={onStart}>
          {startLabel} <Icon name="arrow-right" size={18} />
        </button>
      </footer>
    </article>
  )
}
