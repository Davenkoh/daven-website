import { useState } from 'react'
import { SITE } from '@/config/site.config'
import { Icon } from '@/components/Icon'
import { BentoItem } from '../Bento'

export function ContactCard() {
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
  return (
    <BentoItem title="Say hello" glyph="✉">
      <div className="flex flex-1 flex-col justify-end gap-3">
        <p className="text-sm text-fg/75">Building something in GTM, ops or AI? I would love to hear about it.</p>
        <button type="button" onClick={copy} className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm transition hover:border-white/30">
          <Icon name="copy" size={14} /> {copied ? 'Copied!' : SITE.email}
        </button>
        <div className="flex flex-wrap gap-3 text-sm text-fg/70">
          {SITE.socials
            .filter((s) => s.label !== 'Email')
            .map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-fg">
                {s.label} <Icon name="external" size={13} />
              </a>
            ))}
        </div>
      </div>
    </BentoItem>
  )
}
