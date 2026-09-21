import { useState } from 'react'
import { SITE } from '@/config/site.config'
import { Icon } from '@/components/Icon'

const pill =
  'inline-flex items-center gap-2 rounded-full border border-accent/50 bg-accent/15 px-4 py-2 text-sm font-medium text-[#ffd98a] shadow-[0_6px_20px_rgba(224,166,60,0.18)] transition hover:bg-accent/25 hover:text-white'

function LinkedInMark() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#0A66C2" />
      <text x="12" y="16.5" fontSize="12" fontWeight="700" fill="#fff" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif">
        in
      </text>
    </svg>
  )
}

/** Email, LinkedIn, GitHub and the resume, beside the About title. */
export function ConnectLinks() {
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
  const linkedin = SITE.socials.find((s) => s.label === 'LinkedIn')
  const github = SITE.socials.find((s) => s.label === 'GitHub')
  return (
    <div className="md:text-right">
      <div className="flex flex-wrap gap-2 md:justify-end">
        <button type="button" onClick={copy} className={pill} title="Copy email">
          <Icon name="mail" size={16} /> {copied ? 'Copied!' : SITE.email}
        </button>
        {linkedin && (
          <a href={linkedin.href} target="_blank" rel="noreferrer" className={pill}>
            <LinkedInMark /> LinkedIn
          </a>
        )}
        {github && (
          <a href={github.href} target="_blank" rel="noreferrer" className={pill}>
            <img src="/logos/tools/github.svg" alt="" className="h-[18px] w-[18px]" /> GitHub
          </a>
        )}
        <a href={SITE.resumeUrl} target="_blank" rel="noreferrer" className={pill}>
          <Icon name="download" size={16} /> Resume
        </a>
      </div>
    </div>
  )
}
