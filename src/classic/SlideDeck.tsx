import { useState, type KeyboardEvent } from 'react'
import { Icon } from '@/components/Icon'

/** A deck of slide images shown one at a time, with arrows, a counter and ← → when focused. */
export function SlideDeck({ slides, label }: { slides: string[]; label: string }) {
  const [index, setIndex] = useState(0)
  const n = slides.length
  const go = (delta: number) => setIndex((i) => (i + delta + n) % n)
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      go(1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      go(-1)
    }
  }
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
        <span>Click the arrows or use ← →</span>
      </div>
    </div>
  )
}
