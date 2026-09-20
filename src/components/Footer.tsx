import { useState } from 'react'
import { Link } from 'react-router'
import { SITE } from '@/config/site.config'

/** Preston-style footer columns — deliberately without the giant wordmark. */
export function Footer() {
  const [copied, setCopied] = useState(false)
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${SITE.email}`
    }
  }

  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className="font-medium">{SITE.name}</p>
          <p className="text-sm text-muted">{SITE.role}</p>
        </div>
        <FooterColumn title="Pages">
          {SITE.pages.map((p) => (
            <Link key={p.to} to={p.to} className="hover:text-fg">
              {p.label}
            </Link>
          ))}
        </FooterColumn>
        <FooterColumn title="Social">
          {SITE.socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="hover:text-fg">
              {s.label}
            </a>
          ))}
        </FooterColumn>
        <FooterColumn title="Resources">
          <a href={SITE.resumeUrl} target="_blank" rel="noreferrer" className="hover:text-fg">
            Download resume
          </a>
          <button type="button" onClick={copyEmail} className="text-left hover:text-fg">
            {copied ? 'Copied!' : 'Copy email'}
          </button>
          <a href={SITE.videoIntroUrl} target="_blank" rel="noreferrer" className="hover:text-fg">
            Video intro
          </a>
        </FooterColumn>
      </div>
      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 px-6 pb-28 text-xs text-muted">
        <span>© {new Date().getFullYear()} {SITE.name}</span>
        <span>Designed & built by hand</span>
      </div>
    </footer>
  )
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 text-sm text-fg/70">
      <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{title}</p>
      {children}
    </div>
  )
}
