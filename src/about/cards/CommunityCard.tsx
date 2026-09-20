import { community } from '@/data/about'
import { Pill } from '@/components/Pill'
import { BentoItem } from '../Bento'

export function CommunityCard() {
  return (
    <BentoItem title="Community" glyph="⌂" className="md:col-span-3">
      <ul className="divide-y divide-line">
        {community.map((c) => (
          <li key={c.org} className="flex flex-wrap items-center justify-between gap-2 py-3">
            <div>
              <p className="font-medium">{c.org}</p>
              <p className="text-sm text-muted">{c.role}</p>
            </div>
            <Pill>{c.period}</Pill>
          </li>
        ))}
      </ul>
    </BentoItem>
  )
}
