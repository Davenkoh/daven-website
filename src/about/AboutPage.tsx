import { SITE } from '@/config/site.config'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { VideoIntro } from './VideoIntro'
import { ContactSection } from './ContactSection'
import { SkillsStrip } from './SkillsStrip'
import { Bento } from './Bento'

/** About micropage: title, video, contact, toolkit, then "Beyond the Desk". */
export default function AboutPage() {
  useDocumentTitle(`About · ${SITE.name}`, SITE.description)
  return (
    <>
      <header>
        <h1 className="title-arrow text-6xl font-medium tracking-tight md:text-7xl lg:text-8xl">About Me</h1>
      </header>
      <VideoIntro />
      <ContactSection />
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
