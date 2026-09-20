import { skills } from '@/data/about'
import type { SkillItem } from '@/data/types'

function SkillPill({ item }: { item: SkillItem }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line py-1.5 pl-1.5 pr-3.5 text-[13px] text-fg/85">
      {item.icon ? (
        <img src={item.icon} alt="" className="h-5 w-5" loading="lazy" />
      ) : (
        <span
          className="grid h-5 min-w-5 place-items-center rounded-[5px] px-1 font-mono text-[9px] font-semibold tracking-wide"
          style={{ background: `${item.colour ?? '#888'}26`, color: item.colour ?? '#ddd' }}
          aria-hidden="true"
        >
          {item.mark}
        </span>
      )}
      {item.name}
    </span>
  )
}

export function SkillsStrip() {
  return (
    <section className="mt-20">
      <h2 className="title-arrow text-4xl font-medium tracking-tight md:text-5xl">Toolkit</h2>
      <dl className="mt-8 divide-y divide-line border-y border-line">
        {skills.map((g) => (
          <div key={g.label} className="grid gap-3 py-5 md:grid-cols-[200px_1fr]">
            <dt className="font-mono text-[13px] uppercase tracking-[0.16em] text-white">{g.label}</dt>
            <dd className="flex flex-wrap gap-2">
              {g.items.map((item) => (
                <SkillPill key={item.name} item={item} />
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
