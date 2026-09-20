import type { Topic } from '@/data/types'
import { SITE, TOPIC_BLURB, TOPIC_LABEL } from '@/config/site.config'
import { COVER_THEME } from '../coverTheme'
import type { PageContext } from './PageFace'


function Motif({ topic, colour }: { topic: Topic; colour: string }) {
  if (topic === 'career') {
    return (
      <svg viewBox="0 0 200 200" className="cover-motif" aria-hidden="true">
        <g fill="none" stroke={colour} strokeWidth="4" strokeLinecap="round">
          <path d="M30 170h40v-40h40v-40h40V50h30" />
          <circle cx="30" cy="170" r="6" fill={colour} />
          <circle cx="180" cy="50" r="6" fill={colour} />
        </g>
      </svg>
    )
  }
  if (topic === 'projects') {
    return (
      <svg viewBox="0 0 200 200" className="cover-motif" aria-hidden="true">
        <g fill="none" stroke={colour} strokeWidth="4" strokeLinejoin="round">
          <path d="M100 30 170 65v70l-70 35-70-35V65z" />
          <path d="M100 30v70M100 100l70-35M100 100 30 65M100 100v70" />
          <path d="M65 47.5 135 82.5M135 47.5 65 82.5M65 117.5v35M135 117.5v35" opacity=".5" />
        </g>
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 200 200" className="cover-motif" aria-hidden="true">
      <g fill={colour}>
        {[
          [40, 60, 8], [80, 40, 6], [130, 55, 10], [165, 90, 6], [60, 110, 6], [110, 100, 12], [150, 140, 8], [45, 155, 10], [95, 160, 6],
        ].map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} opacity={0.55 + (i % 3) * 0.15} />
        ))}
      </g>
      <path d="M30 185h140" stroke={colour} strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

export function CoverPage({ topic }: { topic: Topic }) {
  const t = COVER_THEME[topic]
  return (
    <div className="page-cover" style={{ background: t.bg, color: t.ink }}>
      <p className="cover-kicker" style={{ color: t.accent }}>
        {SITE.shortName} · Vol. {topic === 'career' ? 'I' : topic === 'projects' ? 'II' : 'III'}
      </p>
      <h2 className="cover-title" style={{ color: t.accent }}>
        {TOPIC_LABEL[topic]}
      </h2>
      <p className="cover-sub">{TOPIC_BLURB[topic]}</p>
      <Motif topic={topic} colour={t.accent} />
      <p className="cover-foot">Tap to open</p>
    </div>
  )
}

export function BackCoverPage({ topic, ctx }: { topic: Topic; ctx: PageContext }) {
  const t = COVER_THEME[topic]
  return (
    <div className="page-cover page-cover-back" style={{ background: t.bg, color: t.ink }}>
      <p className="cover-thanks" style={{ color: t.accent }}>
        Thanks for reading
      </p>
      <p className="cover-sub">{SITE.name}</p>
      <button
        type="button"
        className="cover-button"
        style={{ background: t.accent }}
        onClick={(e) => {
          e.stopPropagation()
          ctx.goToPage(0)
        }}
      >
        Back to Front Page
      </button>
    </div>
  )
}
