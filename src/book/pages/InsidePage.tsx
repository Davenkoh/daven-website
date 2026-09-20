import type { Topic } from '@/data/types'
import { TOPIC_LABEL } from '@/config/site.config'

export function InsidePage({ topic, count, showTags }: { topic: Topic; count: number; showTags: boolean }) {
  return (
    <div className="page-paper page-inside">
      <p className="page-kicker">{TOPIC_LABEL[topic]}</p>
      <p className="page-body">
        {count === 1 ? 'One entry' : `${count} entries`} in this volume. Click the right page, scroll, or press → to turn; click the left page to go back.
      </p>
      {showTags && <p className="page-body page-muted">Use the filters above the book to show only GTM, Operations, Software or AI.</p>}
    </div>
  )
}
