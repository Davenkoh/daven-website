import { SITE } from '@/config/site.config'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { VideoIntro } from './VideoIntro'
import { ConnectLinks } from './ConnectLinks'
import { SkillsStrip } from './SkillsStrip'
import { Bento } from './Bento'

/** Contact micropage: title with the ways to reach me, video, toolkit, then "Beyond the Desk". */
export default function AboutPage() {
  useDocumentTitle(`Contact · ${SITE.name}`, SITE.description)
  return (
    <>
      <header className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <h1 className="title-arrow text-5xl font-medium tracking-tight md:text-6xl">Contact Me</h1>
        <ConnectLinks />
      </header>
      <VideoIntro />
      <SkillsStrip />
      <section className="mt-24">
        <h2 className="text-5xl font-medium leading-[1.05] tracking-tight md:text-6xl">
          Beyond the
          <br />
          <span className="title-arrow font-pixel">Desk</span>
        </h2>
        <Bento />
      </section>
    </>
  )
}
