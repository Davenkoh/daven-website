import type { CSSProperties, KeyboardEvent } from 'react'
import type { Entry } from '@/data/types'
import { entryBlurb, entryPhotos } from '@/data'
import { Icon } from '@/components/Icon'
import { TagChips } from '@/components/TagChips'
import { cn } from '@/lib/cn'

export function EntryIcon({ entry, className, size = 'md' }: { entry: Entry; className?: string; size?: 'md' | 'lg' }) {
  const box = size === 'lg' ? 'h-16 w-16 rounded-2xl' : 'h-10 w-10 rounded-xl'
  if (entry.logo) {
    return <img src={entry.logo} alt="" className={cn(box, 'shrink-0 object-cover', className)} />
  }
  const glyph = entry.icon ?? entry.title.slice(0, 1)
  const isEmoji = /\p{Extended_Pictographic}/u.test(glyph)
  return (
    <span
      className={cn(box, 'grid shrink-0 place-items-center border border-white/10 bg-white/5 font-medium', isEmoji ? (size === 'lg' ? 'text-4xl' : 'text-xl') : size === 'lg' ? 'text-xl' : 'text-sm', className)}
      aria-hidden="true"
    >
      {glyph}
    </span>
  )
}

interface GalleryCardProps {
  entry: Entry
  colour: string
  showTags: boolean
  onOpen: (entry: Entry) => void
}

/** One entry in the gallery: cover photo, logo + title + subtitle, one paragraph, then "View details". */
export function GalleryCard({ entry, colour, showTags, onOpen }: GalleryCardProps) {
  const cover = entry.cover ?? entryPhotos(entry)[0]
  const blurb = entryBlurb(entry)
  const open = () => onOpen(entry)
  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      open()
    }
  }
  return (
    <article className="gallery-card" role="button" tabIndex={0} style={{ '--c': colour } as CSSProperties} onClick={open} onKeyDown={onKeyDown}>
      <div className="gallery-media">
        {cover ? (
          <img src={cover} alt="" loading="lazy" decoding="async" />
        ) : (
          <div className="gallery-placeholder">
            <EntryIcon entry={entry} size="lg" />
          </div>
        )}
      </div>
      <div className="gallery-body">
        <div className="flex items-start gap-3">
          <EntryIcon entry={entry} />
          <div className="min-w-0 flex-1">
            <h3 className="font-medium leading-snug">{entry.title}</h3>
            {entry.subtitle && <p className="mt-0.5 text-sm text-muted">{entry.subtitle}</p>}
          </div>
        </div>
        {blurb && <p className="gallery-blurb">{blurb}</p>}
        <div className="gallery-foot">
          {showTags ? <TagChips tags={entry.tags} tone="dark" className="text-[11px]" /> : <span />}
          <span className="gallery-more">
            View details <Icon name="arrow-right" size={14} />
          </span>
        </div>
      </div>
    </article>
  )
}
