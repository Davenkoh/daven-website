import { useState } from 'react'
import { languages } from '@/data/about'
import { cn } from '@/lib/cn'
import { BentoItem } from '../Bento'

export function LanguagesCard() {
  const [index, setIndex] = useState(1)
  const lang = languages[index]
  const other = languages[(index + 1) % languages.length]
  return (
    <BentoItem title="Languages" glyph="🌐">
      <div className="flex flex-1 flex-col items-center justify-center gap-5 text-center">
        <button
          type="button"
          role="switch"
          aria-checked={index === 1}
          aria-label={`Switch to ${other.name}`}
          onClick={() => setIndex((i) => (i + 1) % languages.length)}
          className="relative h-12 w-24 rounded-full border border-white/10 bg-white/5 transition hover:bg-white/10"
        >
          <span
            className={cn(
              'absolute top-1 grid h-10 w-10 place-items-center rounded-full bg-white/15 text-2xl shadow transition-all duration-300',
              index === 0 ? 'left-1' : 'left-[calc(100%-2.75rem)]',
            )}
            aria-hidden="true"
          >
            {lang.flag}
          </span>
        </button>
        <div>
          <p className="text-2xl font-medium">{lang.greeting}</p>
          <p className="mt-1 text-sm text-muted">{lang.level}</p>
        </div>
      </div>
    </BentoItem>
  )
}
