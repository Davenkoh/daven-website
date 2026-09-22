import { TAGS, TAG_COLOURS, type Tag } from '@/data/types'
import { cn } from '@/lib/cn'

interface TagChipsProps {
  tags: Tag[]
  /** 'paper' for light backgrounds, 'dark' for the cards and dialogs */
  tone?: 'paper' | 'dark'
  className?: string
}

/**
 * Radio-looking category indicators: every category is listed, the ones that
 * apply are lit in their own colour. Read-only — the FilterBar is the interactive counterpart.
 */
export function TagChips({ tags, tone = 'paper', className }: TagChipsProps) {
  const label = tags.length ? `Categories: ${tags.join(', ')}` : 'No categories'
  return (
    <ul className={cn('tag-chips flex flex-wrap gap-x-4 gap-y-1.5', className)} aria-label={label}>
      {TAGS.map((t) => {
        const on = tags.includes(t)
        const colour = TAG_COLOURS[t][tone]
        return (
          <li
            key={t}
            className={cn('flex items-center gap-1.5 font-mono uppercase tracking-[0.14em]', !on && (tone === 'paper' ? 'text-ink-muted/60' : 'text-muted/60'))}
            style={on ? { color: colour } : undefined}
            aria-hidden="true"
          >
            <span
              className="grid h-3.5 w-3.5 place-items-center rounded-full border"
              style={{ borderColor: on ? colour : tone === 'paper' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.3)' }}
            >
              <span className="h-2 w-2 rounded-full transition" style={{ background: on ? colour : 'transparent' }} />
            </span>
            {t}
          </li>
        )
      })}
    </ul>
  )
}
