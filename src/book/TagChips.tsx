import { TAGS, type Tag } from '@/data/types'
import { cn } from '@/lib/cn'

interface TagChipsProps {
  tags: Tag[]
  /** 'paper' for book pages (light), 'dark' for the classic cards */
  tone?: 'paper' | 'dark'
  className?: string
}

/**
 * Radio-looking category indicators: every category is listed, the ones that
 * apply are lit. Read-only — the FilterBar is the interactive counterpart.
 */
export function TagChips({ tags, tone = 'paper', className }: TagChipsProps) {
  const label = tags.length ? `Categories: ${tags.join(', ')}` : 'No categories'
  return (
    <ul className={cn('flex flex-wrap gap-x-4 gap-y-1.5', className)} aria-label={label}>
      {TAGS.map((t) => {
        const on = tags.includes(t)
        return (
          <li
            key={t}
            className={cn(
              'flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em]',
              tone === 'paper'
                ? on
                  ? 'text-ink'
                  : 'text-ink-muted/70'
                : on
                  ? 'text-fg'
                  : 'text-muted/70',
            )}
            aria-hidden="true"
          >
            <span
              className={cn(
                'grid h-3 w-3 place-items-center rounded-full border',
                tone === 'paper' ? 'border-ink/50' : 'border-white/40',
                on && (tone === 'paper' ? 'border-ink' : 'border-fg'),
              )}
            >
              <span
                className={cn(
                  'h-1.5 w-1.5 rounded-full transition',
                  on ? (tone === 'paper' ? 'bg-ink' : 'bg-accent') : 'bg-transparent',
                )}
              />
            </span>
            {t}
          </li>
        )
      })}
    </ul>
  )
}
