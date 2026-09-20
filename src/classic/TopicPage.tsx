import { useMemo } from 'react'
import type { Topic } from '@/data/types'
import { entriesByTopic, filterEntries } from '@/data'
import { SITE, TOPIC_BLURB, TOPIC_LABEL } from '@/config/site.config'
import { useSiteStore } from '@/store/useSiteStore'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { FilterBar } from '@/book/FilterBar'
import { EntryCard } from './EntryCard'

export function TopicPage({ topic }: { topic: Topic }) {
  const filters = useSiteStore((s) => s.filters)
  const clearFilters = useSiteStore((s) => s.clearFilters)
  const entries = useMemo(() => filterEntries(entriesByTopic[topic], filters), [topic, filters])
  useDocumentTitle(`${TOPIC_LABEL[topic]} · ${SITE.name}`, TOPIC_BLURB[topic])

  return (
    <>
      <header>
        <h1 className="title-arrow text-6xl font-medium tracking-tight md:text-7xl lg:text-8xl">{TOPIC_LABEL[topic]}</h1>
        <p className="mt-4 max-w-xl text-lg text-muted">{TOPIC_BLURB[topic]}</p>
        <FilterBar className="mt-8" />
      </header>
      {entries.length ? (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {entries.map((e) => (
            <EntryCard key={e.slug} entry={e} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-muted">
          Nothing here matches those filters.{' '}
          <button type="button" onClick={clearFilters} className="underline underline-offset-4 hover:text-fg">
            Show everything
          </button>
        </p>
      )}
    </>
  )
}
