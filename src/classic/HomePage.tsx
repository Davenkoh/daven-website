import { Link } from 'react-router'
import { SITE, TOPIC_BLURB, TOPIC_COLOURS, TOPIC_LABEL } from '@/config/site.config'
import { TOPICS } from '@/data/types'
import { entriesByTopic } from '@/data'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useCoarsePointer } from '@/hooks/useMediaQuery'
import { useSiteStore } from '@/store/useSiteStore'
import { useAudioStore } from '@/store/useAudioStore'
import { Icon } from '@/components/Icon'
import { Button } from '@/components/Button'
import { Highlights } from '@/highlights/Highlights'

const cardStyle = (colour: string) => ({
  borderColor: `${colour}59`,
  background: `linear-gradient(160deg, ${colour}24, ${colour}08 55%, transparent)`,
})

export function HomePage() {
  useDocumentTitle(SITE.title, SITE.description)
  const coarse = useCoarsePointer()
  const setMode = useSiteStore((s) => s.setMode)
  const play = useAudioStore((s) => s.play)
  const enterRoom = () => {
    setMode('interactive', true)
    if (!useSiteStore.getState().highlightsOpen) void play()
  }

  return (
    <>
      <Highlights variant="page" onStart={enterRoom} startLabel="Enter the room" />

      <section className="mt-4 grid gap-4 md:grid-cols-3" aria-label="Explore">
        {TOPICS.map((t) => (
          <Link
            key={t}
            to={`/${t}`}
            className="group flex flex-col gap-3 rounded-card border bg-card p-6 transition hover:brightness-125"
            style={cardStyle(TOPIC_COLOURS[t])}
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: TOPIC_COLOURS[t] }}>
              {entriesByTopic[t].length} entries
            </span>
            <span className="text-2xl font-medium">{TOPIC_LABEL[t]}</span>
            <span className="text-sm text-fg/70">{TOPIC_BLURB[t]}</span>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm text-fg/80 transition group-hover:text-fg">
              Open <Icon name="arrow-right" size={14} />
            </span>
          </Link>
        ))}
        <Link
          to="/about"
          className="group flex flex-col gap-3 rounded-card border bg-card p-6 transition hover:brightness-125 md:col-span-3 md:flex-row md:items-center md:justify-between"
          style={cardStyle(TOPIC_COLOURS.about)}
        >
          <span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: TOPIC_COLOURS.about }}>
              Who I am
            </span>
            <span className="mt-2 block text-2xl font-medium">About me</span>
            <span className="block text-sm text-fg/70">
              A video intro, how to reach me, my toolkit, then hobbies, the music I play, my languages and the communities I build.
            </span>
          </span>
          <span className="inline-flex items-center gap-1 text-sm text-fg/80 transition group-hover:text-fg">
            Open <Icon name="arrow-right" size={14} />
          </span>
        </Link>
        <div
          className="flex flex-col gap-4 rounded-card border bg-card p-6 md:col-span-3 md:flex-row md:items-center md:justify-between"
          style={cardStyle(TOPIC_COLOURS.room)}
        >
          <span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: TOPIC_COLOURS.room }}>
              Interactive version
            </span>
            <span className="mt-2 block text-2xl font-medium">The room</span>
            <span className="block text-sm text-fg/70">
              A workspace you can explore, with music.
              {coarse && ' Best on a desktop with a mouse.'}
            </span>
          </span>
          <Button variant="ghost" onClick={enterRoom}>
            Enter the room <Icon name="arrow-right" size={14} />
          </Button>
        </div>
      </section>
    </>
  )
}
