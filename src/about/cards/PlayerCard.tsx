import { BentoItem } from '../Bento'
import { AboutPlayer } from '../player/AboutPlayer'

export function PlayerCard() {
  return (
    <BentoItem title="What I'm listening to" glyph="♫" className="md:col-span-2">
      <AboutPlayer />
    </BentoItem>
  )
}
