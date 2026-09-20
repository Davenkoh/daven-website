import { useState } from 'react'
import { SITE } from '@/config/site.config'
import { aboutIntro } from '@/data/about'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { Timeline } from './Timeline'
import { Bento } from './Bento'
import { SkillsStrip } from './SkillsStrip'

function HeroMedia() {
  const [broken, setBroken] = useState(false)
  return (
    <div className="relative mt-10 aspect-video overflow-hidden rounded-card border border-line bg-card">
      {broken ? (
        <div
          className="grid h-full w-full place-items-center"
          style={{ background: 'radial-gradient(60% 80% at 30% 20%, oklch(0.82 0.16 75 / 0.25), transparent), linear-gradient(160deg, #1d1a17, #0f0e0d)' }}
        >
          <p className="px-6 text-center font-mono text-xs uppercase tracking-[0.2em] text-muted">
            Drop a photo at public/photos/about-hero.jpg
          </p>
        </div>
      ) : (
        <img src="/photos/about-hero.jpg" alt={`${SITE.name} in the workspace`} className="h-full w-full object-cover" onError={() => setBroken(true)} />
      )}
      <span className="absolute bottom-6 right-6 rounded-full bg-[#2f8a58] px-4 py-2 text-sm font-medium text-white shadow-lg" aria-hidden="true">
        {SITE.shortName}
      </span>
    </div>
  )
}

/** Preston-style About micropage: title, media, timeline, "Beyond the Desk" bento, toolkit. */
export default function AboutPage() {
  useDocumentTitle(`About · ${SITE.name}`, aboutIntro)
  return (
    <>
      <header>
        <h1 className="title-arrow text-6xl font-medium tracking-tight md:text-7xl lg:text-8xl">About Me</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg/75">{aboutIntro}</p>
      </header>
      <HeroMedia />
      <Timeline />
      <section className="mt-24">
        <h2 className="text-5xl font-medium leading-[1.05] tracking-tight md:text-6xl">
          Beyond the
          <br />
          <span className="title-arrow font-pixel">Desk</span>
        </h2>
        <Bento />
      </section>
      <SkillsStrip />
    </>
  )
}
