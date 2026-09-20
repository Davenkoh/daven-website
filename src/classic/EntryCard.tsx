import type { Entry } from '@/data/types'
import { entryPhotos } from '@/data'
import { Pill } from '@/components/Pill'
import { Icon } from '@/components/Icon'
import { TagChips } from '@/book/TagChips'
import { cn } from '@/lib/cn'

export function EntryIcon({ entry, className }: { entry: Entry; className?: string }) {
  if (entry.logo) {
    return <img src={entry.logo} alt="" className={cn('h-10 w-10 rounded-xl object-cover', className)} />
  }
  const glyph = entry.icon ?? entry.title.slice(0, 1)
  const isEmoji = /\p{Extended_Pictographic}/u.test(glyph)
  return (
    <span
      className={cn(
        'grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5 font-medium',
        isEmoji ? 'text-xl' : 'text-sm',
        className,
      )}
      aria-hidden="true"
    >
      {glyph}
    </span>
  )
}

export function EntryCard({ entry, showTags = true }: { entry: Entry; showTags?: boolean }) {
  const photos = entryPhotos(entry)
  return (
    <article className="flex flex-col gap-4 rounded-card border border-line bg-card p-5 transition hover:border-white/20">
      {photos.length > 0 && (
        <div className="flex flex-col gap-2">
          <img src={photos[0]} alt="" loading="lazy" className="aspect-video w-full rounded-xl object-cover" />
          {photos.length > 1 && (
            <div className="grid grid-cols-3 gap-2">
              {photos.slice(1, 4).map((src) => (
                <img key={src} src={src} alt="" loading="lazy" className="aspect-[4/3] w-full rounded-lg object-cover" />
              ))}
            </div>
          )}
        </div>
      )}
      <div className="flex items-start gap-3">
        <EntryIcon entry={entry} />
        <div className="min-w-0 flex-1">
          <h3 className="font-medium leading-snug">{entry.title}</h3>
          {entry.subtitle && <p className="text-sm text-muted">{entry.subtitle}</p>}
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {entry.period && <Pill>{entry.period}</Pill>}
        {entry.location && <Pill>{entry.location}</Pill>}
        {entry.status && <Pill className="border-accent/40 text-accent">{entry.status}</Pill>}
      </div>
      {entry.meta && (
        <dl className="grid gap-1.5 text-sm">
          {entry.meta.map((m) => (
            <div key={m.label} className="flex gap-3">
              <dt className="w-24 shrink-0 font-mono text-[11px] uppercase tracking-wider text-muted">{m.label}</dt>
              <dd className="text-fg/85">
                {m.href ? (
                  <a href={m.href} target="_blank" rel="noreferrer" className="underline decoration-white/30 underline-offset-4 hover:decoration-white">
                    {m.value}
                  </a>
                ) : (
                  m.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      )}
      {entry.bullets && (
        <ul className="list-disc space-y-1.5 pl-4 text-sm text-fg/70">
          {entry.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      )}
      {entry.description && <p className="text-sm text-fg/70">{entry.description}</p>}
      {entry.links && (
        <div className="flex flex-wrap gap-3">
          {entry.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm text-fg/80 hover:text-fg">
              {l.label} <Icon name="external" size={14} />
            </a>
          ))}
        </div>
      )}
      {showTags && <TagChips tags={entry.tags} tone="dark" className="mt-auto border-t border-line pt-4 text-[11px]" />}
    </article>
  )
}
