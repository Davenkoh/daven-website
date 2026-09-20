import { hobbies } from '@/data/about'
import { BentoItem } from '../Bento'
import { PhotoFan } from '../PhotoFan'

export function HobbiesCard() {
  return (
    <BentoItem title="Off the clock" glyph="✦" className="md:col-span-2">
      <div className="grid gap-8 sm:grid-cols-2">
        {hobbies.map((h) => (
          <div key={h.name} className="group flex flex-col items-center text-center">
            <PhotoFan photos={h.photos} />
            <p className="mt-4 font-medium">{h.name}</p>
            {h.caption && <p className="text-sm text-muted">{h.caption}</p>}
          </div>
        ))}
      </div>
    </BentoItem>
  )
}
