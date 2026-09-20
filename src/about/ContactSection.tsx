import { useState } from 'react'
import { SITE } from '@/config/site.config'
import { Icon } from '@/components/Icon'

/** Contact, socials and the resume, right under the video. */
export function ContactSection() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${SITE.email}`
    }
  }
  const socials = SITE.socials.filter((s) => s.label !== 'Email')
  return (
    <section className="mt-10 grid gap-4 rounded-card border border-line bg-card p-6 md:grid-cols-[1.2fr_1fr_1fr]">
      <div>
        <p className="text-base text-muted">Contact me</p>
        <button type="button" onClick={copy} className="mt-3 inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm transition hover:border-white/30">
          <Icon name="copy" size={14} /> {copied ? 'Copied!' : SITE.email}
        </button>
      </div>
      <div>
        <p className="text-base text-muted">Socials</p>
        <div className="mt-3 flex flex-wrap gap-3 text-sm text-fg/80">
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-full border border-line px-4 py-2 transition hover:border-white/30 hover:text-fg">
              {s.label} <Icon name="external" size={13} />
            </a>
          ))}
        </div>
      </div>
      <div>
        <p className="text-base text-muted">Resume</p>
        <a href={SITE.resumeUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2 text-sm font-medium text-bg transition hover:bg-white">
          Download resume <Icon name="arrow-right" size={14} />
        </a>
      </div>
    </section>
  )
}
