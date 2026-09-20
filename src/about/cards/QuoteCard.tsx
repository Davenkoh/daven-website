import { quote } from '@/data/about'
import { BentoItem } from '../Bento'

export function QuoteCard() {
  return (
    <BentoItem title="Favourite quote" glyph="❝">
      <figure className="flex flex-1 flex-col justify-end">
        <blockquote className="text-2xl italic leading-snug text-fg/95">“{quote.text}”</blockquote>
        <figcaption className="mt-4 text-sm text-muted">— {quote.author}</figcaption>
      </figure>
    </BentoItem>
  )
}
