import { timeline } from '@/data/about'
import { Pill } from '@/components/Pill'

export function Timeline() {
  return (
    <ol className="mt-16 divide-y divide-line border-y border-line">
      {timeline.map((item) => (
        <li key={item.org + item.role} className="flex items-center justify-between gap-4 py-5">
          <div className="flex items-center gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5 text-sm font-medium" aria-hidden="true">
              {item.logo ? <img src={item.logo} alt="" className="h-full w-full rounded-xl object-cover" /> : item.icon}
            </span>
            <div>
              <p className="font-medium">{item.org}</p>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">{item.role}</p>
            </div>
          </div>
          <Pill className="shrink-0">{item.period}</Pill>
        </li>
      ))}
    </ol>
  )
}
