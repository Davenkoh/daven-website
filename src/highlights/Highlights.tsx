import { useState, type CSSProperties } from 'react'
import { highlights, highlightsClosing, highlightsHeader, type HighlightBlock, type HighlightFigure, type HighlightPhoto } from '@/data/highlights'
import { Icon } from '@/components/Icon'
import { cn } from '@/lib/cn'
import { rich } from './rich'

interface HighlightsProps {
  variant: 'overlay' | 'page'
  /** shows the closing button when given; the classic home ends on the thanks line instead */
  onStart?: () => void
  startLabel?: string
}

const ACCENT = '#e0a63c'

function Img({ photo, alt }: { photo: HighlightPhoto; alt: string }) {
  const [broken, setBroken] = useState(false)
  if (broken) return null
  return (
    <img
      src={photo.src}
      alt={photo.alt ?? alt}
      loading="lazy"
      decoding="async"
      className={cn(photo.fit === 'contain' && 'is-contain')}
      style={photo.focus ? { objectPosition: photo.focus } : undefined}
      onError={() => setBroken(true)}
    />
  )
}

function Figure({ figure }: { figure: HighlightFigure }) {
  const pair = figure.photos.length > 1 && figure.layout !== 'stack'
  return (
    <figure className={cn('hl-figure', pair && 'is-pair', figure.layout === 'full' && 'is-full', figure.layout === 'stack' && 'is-stack')}>
      <div className="hl-media">
        {figure.photos.map((p) => (
          <Img key={p.src} photo={p} alt={figure.caption} />
        ))}
      </div>
      <figcaption>{figure.caption}</figcaption>
    </figure>
  )
}

function Block({ block, colour }: { block: HighlightBlock; colour: string }) {
  switch (block.type) {
    case 'p':
      return <p className="hl-p">{rich(block.text, colour)}</p>
    case 'results':
      return (
        <div className="hl-results">
          <p className="hl-label">Results</p>
          <ul className="hl-pills">
            {block.items.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      )
    case 'subhead':
      return (
        <div className="hl-subhead">
          <h4>{block.text}</h4>
          {block.sub && <p className="hl-sub">{block.sub}</p>}
        </div>
      )
    case 'photos':
      return (
        <div className="hl-grid">
          {block.figures.map((f) => (
            <Figure key={f.photos[0].src} figure={f} />
          ))}
        </div>
      )
  }
}

/** The journey timeline: years flush left on a thin rail, the story and photos to the right. */
export function Highlights({ variant, onStart, startLabel = 'Start Exploring' }: HighlightsProps) {
  return (
    <article className={cn('hl', variant === 'overlay' ? 'hl-in-overlay' : 'hl-in-page')}>
      <header className="hl-head">
        <h2 className="hl-greeting">{highlightsHeader.greeting}</h2>
        <p className="hl-role">{highlightsHeader.role}</p>
        <p className="hl-tagline">{highlightsHeader.tagline}</p>
        <div className="hl-me">
          <img src={highlightsHeader.photo.src} alt={highlightsHeader.photo.alt} decoding="async" />
        </div>
        <p className="hl-intro">{highlightsHeader.intro}</p>
        <p className="hl-cue">
          {highlightsHeader.cue} <Icon name="arrow-down" size={15} />
        </p>
      </header>

      <ol className="hl-timeline">
        {highlights.map((s, i) => (
          <li key={s.id} className={cn('hl-section', i === highlights.length - 1 && 'is-last')} style={{ '--c': s.colour } as CSSProperties}>
            <div className="hl-year">{s.year}</div>
            <div className="hl-rail" aria-hidden="true">
              <span className="hl-dot" />
            </div>
            <div className="hl-body">
              <h3 className="hl-title">{s.title}</h3>
              {s.blocks.map((b, j) => (
                <Block key={j} block={b} colour={s.colour} />
              ))}
            </div>
          </li>
        ))}
      </ol>

      <footer className="hl-end">
        <p className="hl-end-thanks">{rich(highlightsClosing.thanks, ACCENT)}</p>
        {onStart && (
          <button type="button" className="hl-start" onClick={onStart}>
            {startLabel} <Icon name="arrow-right" size={18} />
          </button>
        )}
      </footer>
    </article>
  )
}
