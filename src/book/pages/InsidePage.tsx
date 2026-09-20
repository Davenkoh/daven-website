import type { Topic } from '@/data/types'
import { TOPIC_LABEL } from '@/config/site.config'

export function InsidePage({ topic, count }: { topic: Topic; count: number; showTags: boolean }) {
  return (
    <div className="page-paper page-inside">
      <p className="page-kicker">{TOPIC_LABEL[topic]}</p>
      <p className="inside-count">
        {count} {count === 1 ? 'entry' : 'entries'}
      </p>
      <p className="inside-hint">Click a line in the contents to jump straight to it.</p>
    </div>
  )
}
