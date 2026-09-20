import { Link } from 'react-router'
import { SITE, TOPIC_BLURB, TOPIC_LABEL } from '@/config/site.config'
import { TOPICS } from '@/data/types'
import { entriesByTopic } from '@/data'
import { aboutIntro } from '@/data/about'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useCoarsePointer } from '@/hooks/useMediaQuery'
import { useSiteStore } from '@/store/useSiteStore'
import { Icon } from '@/components/Icon'
import { Button } from '@/components/Button'

export function HomePage() {
  useDocumentTitle(SITE.title, SITE.description)
  const coarse = useCoarsePointer()
  const setMode = useSiteStore((s) => s.setMode)

  return (
    <>
      <section>
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted">Aloha! I&apos;m</p>
        <h1 className="title-arrow mt-2 text-6xl font-medium tracking-tight md:text-7xl lg:text-8xl">{SITE.shortName}</h1>
        <p className="mt-8 text-2xl md:text-3xl">{SITE.taglines[0]}</p>
        <p className="mt-2 font-mono text-sm text-muted md:text-base">{SITE.taglines[1]}</p>
        <p className="mt-8 max-w-2xl text-xl leading-relaxed text-fg/90">{SITE.summary}</p>
        <p className="mt-4 max-w-2xl leading-relaxed text-fg/60">{aboutIntro}</p>
      </section>

      <section className="mt-16 grid gap-4 md:grid-cols-3" aria-label="Explore">
        {TOPICS.map((t) => (
          <Link
            key={t}
            to={`/${t}`}
            className="group flex flex-col gap-3 rounded-card border border-line bg-card p-6 transition hover:border-white/25"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              {entriesByTopic[t].length} entries
            </span>
            <span className="text-2xl font-medium">{TOPIC_LABEL[t]}</span>
            <span className="text-sm text-muted">{TOPIC_BLURB[t]}</span>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm text-fg/70 transition group-hover:text-fg">
              Open <Icon name="arrow-right" size={14} />
            </span>
          </Link>
        ))}
        <Link
          to="/about"
          className="group flex flex-col gap-3 rounded-card border border-line bg-card p-6 transition hover:border-white/25 md:col-span-3 md:flex-row md:items-center md:justify-between"
        >
          <span>
            <span className="block text-2xl font-medium">About me</span>
            <span className="block text-sm text-muted">Hobbies, music, languages, community and a favourite quote.</span>
          </span>
          <span className="inline-flex items-center gap-1 text-sm text-fg/70 transition group-hover:text-fg">
            Open <Icon name="arrow-right" size={14} />
          </span>
        </Link>
      </section>

      <section className="mt-16 flex flex-col gap-4 rounded-card border border-dashed border-line p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-medium">There is an interactive version of this site.</p>
          <p className="text-sm text-muted">
            A workspace you can explore, with rain on the window and lofi on the turntable.
            {coarse && ' Best on a desktop with a mouse.'}
          </p>
        </div>
        <Button variant="ghost" onClick={() => setMode('interactive', true)}>
          Enter the room <Icon name="arrow-right" size={14} />
        </Button>
      </section>
    </>
  )
}
