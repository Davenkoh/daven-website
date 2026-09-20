import type { Entry } from '@/data/types'
import { EntryIcon } from '@/classic/EntryCard'
import { TagChips } from '../TagChips'

interface EntryPageProps {
  entry: Entry
  number: number
  side: 'left' | 'right'
}

const stop = (e: React.MouseEvent) => e.stopPropagation()

export function EntryPage({ entry, number, side }: EntryPageProps) {
  return (
    <article className="page-paper page-entry">
      <header className="entry-head">
        <EntryIcon entry={entry} className="entry-icon" />
        <div className="entry-titles">
          <h2 className="entry-title">{entry.title}</h2>
          {entry.subtitle && <p className="entry-sub">{entry.subtitle}</p>}
        </div>
      </header>
      {entry.image ? (
        <img src={entry.image} alt="" className="entry-hero" loading="lazy" />
      ) : (
        <div className="entry-strip">
          {entry.period && <span>{entry.period}</span>}
          {entry.location && <span>{entry.location}</span>}
          {entry.status && <span className="entry-status">{entry.status}</span>}
        </div>
      )}
      {entry.meta && (
        <dl className="entry-meta">
          {entry.meta.map((m) => (
            <div key={m.label}>
              <dt>{m.label}</dt>
              <dd>
                {m.href ? (
                  <a href={m.href} target="_blank" rel="noreferrer" onClick={stop}>
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
      {entry.description && <p className="page-body">{entry.description}</p>}
      {entry.bullets && (
        <ul className="entry-bullets">
          {entry.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      )}
      {entry.links && (
        <p className="entry-links">
          {entry.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noreferrer" onClick={stop}>
              {l.label} ↗
            </a>
          ))}
        </p>
      )}
      <footer className="entry-foot">
        <TagChips tags={entry.tags} tone="paper" />
      </footer>
      <span className={`page-num page-num-${side}`}>{number}</span>
    </article>
  )
}
