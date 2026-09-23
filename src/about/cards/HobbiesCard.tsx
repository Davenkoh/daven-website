import { hobbies } from '@/data/about'
import { BentoItem } from '../Bento'

export function HobbiesCard() {
  return (
    <BentoItem title="Off the clock" glyph="✦" className="md:col-span-2">
      <div className="grid gap-5 sm:grid-cols-2">
        {hobbies.map((h) => (
          <figure key={h.name} className="group/hobby m-0">
            <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
              <img
                src={h.photos[0]}
                alt={h.name}
                loading="lazy"
                decoding="async"
                className="aspect-[16/15] w-full object-cover transition-transform duration-700 group-hover/hobby:scale-[1.03]"
              />
            </div>
            <figcaption className="mt-3 flex items-baseline justify-between gap-3">
              <span className="text-lg font-medium">{h.name}</span>
              {h.caption && <span className="text-sm text-muted">{h.caption}</span>}
            </figcaption>
          </figure>
        ))}
      </div>
    </BentoItem>
  )
}
