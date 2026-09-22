import { useCallback, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import type { Entry, Topic } from '@/data/types'
import { entriesByTopic } from '@/data'
import { SITE, TOPIC_BLURB, TOPIC_COLOURS, TOPIC_LABEL } from '@/config/site.config'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { Icon } from '@/components/Icon'
import { GalleryCard } from './EntryCard'
import { EntryDetail } from './EntryDetail'

/** A topic as a gallery of cards; any card opens the full entry in a dialog. */
export function TopicPage({ topic }: { topic: Topic }) {
  const entries = entriesByTopic[topic]
  const [open, setOpen] = useState<Entry | null>(null)
  const close = useCallback(() => setOpen(null), [])
  useDocumentTitle(`${TOPIC_LABEL[topic]} · ${SITE.name}`, TOPIC_BLURB[topic])
  const showTags = topic === 'career' || topic === 'projects'
  const colour = TOPIC_COLOURS[topic]

  return (
    <>
      <header>
        <h1 className="title-arrow text-6xl font-medium tracking-tight md:text-7xl lg:text-8xl">{TOPIC_LABEL[topic]}</h1>
        <p className="mt-4 max-w-xl text-lg text-muted">{TOPIC_BLURB[topic]}</p>
        <p className="mt-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em]" style={{ color: colour }}>
          <Icon name="eye" size={14} /> Click any card for the full story
        </p>
      </header>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map((e) => (
          <GalleryCard key={e.slug} entry={e} colour={colour} showTags={showTags} onOpen={setOpen} />
        ))}
      </div>
      <AnimatePresence>{open && <EntryDetail key={open.slug} entry={open} colour={colour} showTags={showTags} onClose={close} />}</AnimatePresence>
    </>
  )
}
