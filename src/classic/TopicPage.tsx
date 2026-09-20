import type { Topic } from '@/data/types'
import { entriesByTopic } from '@/data'
import { SITE, TOPIC_BLURB, TOPIC_LABEL } from '@/config/site.config'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { EntryCard } from './EntryCard'

export function TopicPage({ topic }: { topic: Topic }) {
  const entries = entriesByTopic[topic]
  useDocumentTitle(`${TOPIC_LABEL[topic]} · ${SITE.name}`, TOPIC_BLURB[topic])
  const showTags = topic !== 'events'

  return (
    <>
      <header>
        <h1 className="title-arrow text-6xl font-medium tracking-tight md:text-7xl lg:text-8xl">{TOPIC_LABEL[topic]}</h1>
        <p className="mt-4 max-w-xl text-lg text-muted">{TOPIC_BLURB[topic]}</p>
      </header>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map((e) => (
          <EntryCard key={e.slug} entry={e} showTags={showTags} />
        ))}
      </div>
    </>
  )
}
