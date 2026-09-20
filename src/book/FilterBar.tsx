import { TAGS } from '@/data/types'
import { cn } from '@/lib/cn'
import { useSiteStore } from '@/store/useSiteStore'

interface FilterBarProps {
  tone?: 'dark' | 'paper'
  className?: string
}

/** Multi-select category filter shared by the books and the classic pages. */
export function FilterBar({ tone = 'dark', className }: FilterBarProps) {
  const filters = useSiteStore((s) => s.filters)
  const toggleFilter = useSiteStore((s) => s.toggleFilter)
  const clearFilters = useSiteStore((s) => s.clearFilters)
  const dark = tone === 'dark'

  const base = 'rounded-full border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] transition'
  const off = dark
    ? 'border-white/12 text-fg/60 hover:border-white/30 hover:text-fg'
    : 'border-ink/15 text-ink-soft hover:border-ink/40 hover:text-ink'
  const on = dark ? 'border-accent/70 bg-accent/15 text-fg' : 'border-ink bg-ink text-paper'

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)} role="group" aria-label="Filter by category">
      <button
        type="button"
        onClick={clearFilters}
        aria-pressed={filters.length === 0}
        className={cn(base, filters.length === 0 ? on : off)}
      >
        All
      </button>
      {TAGS.map((t) => {
        const active = filters.includes(t)
        return (
          <button key={t} type="button" onClick={() => toggleFilter(t)} aria-pressed={active} className={cn(base, active ? on : off)}>
            {t}
          </button>
        )
      })}
    </div>
  )
}
