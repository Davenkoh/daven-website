import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { Icon } from '@/components/Icon'
import { cn } from '@/lib/cn'

interface SlideDeckProps {
  slides: string[]
  thumbs?: string[]
  label: string
}

/**
 * A deck of slide images: one big slide with arrows and ← →, plus a filmstrip of every slide
 * underneath to scroll through and jump around, the current one highlighted.
 */
export function SlideDeck({ slides, thumbs = slides, label }: SlideDeckProps) {
  const [index, setIndex] = useState(0)
  const strip = useRef<HTMLDivElement>(null)
  const n = slides.length
  const go = (delta: number) => setIndex((i) => (i + delta + n) % n)

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      go(1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      go(-1)
    } else if (e.key === 'Home') {
      e.preventDefault()
      setIndex(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      setIndex(n - 1)
    }
  }

  // keep the current thumbnail centred in the strip (horizontal only, so the dialog never jumps)
  useEffect(() => {
    const el = strip.current
    const thumb = el?.children[index] as HTMLElement | undefined
    if (!el || !thumb) return
    el.scrollTo({ left: thumb.offsetLeft - (el.clientWidth - thumb.offsetWidth) / 2, behavior: 'smooth' })
  }, [index])

  // a mouse wheel over the strip scrolls it sideways instead of scrolling the dialog
  useEffect(() => {
    const el = strip.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return
      e.preventDefault()
      el.scrollLeft += e.deltaY
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  return (
    <div className="deck" tabIndex={0} onKeyDown={onKeyDown} aria-label={`${label}, slide ${index + 1} of ${n}`}>
      <div className="deck-stage">
        <img src={slides[index]} alt={`${label}, slide ${index + 1}`} decoding="async" />
        {/* warm the cache for the next slide */}
        <link rel="prefetch" href={slides[(index + 1) % n]} />
        <button type="button" className="deck-arrow is-prev" onClick={() => go(-1)} aria-label="Previous slide">
          <Icon name="arrow-left" size={18} />
        </button>
        <button type="button" className="deck-arrow is-next" onClick={() => go(1)} aria-label="Next slide">
          <Icon name="arrow-right" size={18} />
        </button>
      </div>
      <div className="deck-bar">
        <span>
          {index + 1} / {n}
        </span>
        <span>Click a slide below, the arrows, or use ← →</span>
      </div>
      <div ref={strip} className="deck-strip" role="tablist" aria-label={`${label} slides`}>
        {thumbs.map((src, i) => (
          <button
            key={src}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Slide ${i + 1}`}
            className={cn('deck-thumb', i === index && 'is-active')}
            onClick={() => setIndex(i)}
          >
            <img src={src} alt="" loading="lazy" decoding="async" />
            <span>{i + 1}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
