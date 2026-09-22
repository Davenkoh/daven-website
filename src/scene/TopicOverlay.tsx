import { useEffect } from 'react'
import type { Topic } from '@/data/types'
import { TOPIC_LABEL } from '@/config/site.config'
import { useAudioStore } from '@/store/useAudioStore'
import { TopicPage } from '@/classic/TopicPage'
import { MicrositeOverlay } from './MicrositeOverlay'

/** A topic's gallery as a panel over the room; the vinyl switches to the topic's track. */
export function TopicOverlay({ topic }: { topic: Topic }) {
  const playForTopic = useAudioStore((s) => s.playForTopic)
  useEffect(() => {
    playForTopic(topic)
  }, [topic, playForTopic])
  return (
    <MicrositeOverlay label={TOPIC_LABEL[topic]}>
      <TopicPage topic={topic} />
    </MicrositeOverlay>
  )
}
