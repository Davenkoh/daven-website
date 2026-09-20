import { skills } from '@/data/about'
import { Pill } from '@/components/Pill'

export function SkillsStrip() {
  return (
    <section className="mt-24">
      <h2 className="title-arrow text-4xl font-medium tracking-tight md:text-5xl">Toolkit</h2>
      <dl className="mt-8 divide-y divide-line border-y border-line">
        {skills.map((g) => (
          <div key={g.label} className="grid gap-3 py-5 md:grid-cols-[200px_1fr]">
            <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">{g.label}</dt>
            <dd className="flex flex-wrap gap-2">
              {g.items.map((s) => (
                <Pill key={s} className="text-fg/80">
                  {s}
                </Pill>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
