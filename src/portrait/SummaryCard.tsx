import { SUMMARY } from '@/config/scene.config'
import { SITE } from '@/config/site.config'
import { useWorld } from '@/hooks/useWorldScale'

const WIDTH = 320

/** The "who is this" card beside Daven. Anchored to a world point, drawn at screen size. */
export function SummaryCard() {
  const { toClient, viewport } = useWorld()
  const p = toClient(SUMMARY.x, SUMMARY.y)
  const left = Math.max(16, Math.min(p.x, viewport.width - WIDTH - 16))
  const top = Math.max(16, Math.min(p.y, viewport.height - 260))
  return (
    <div className="summary-card" style={{ left, top, width: WIDTH }}>
      <p className="font-hud text-[10px] uppercase tracking-[0.22em] text-fg/60">Aloha! I&apos;m</p>
      <h1 className="mt-1 text-4xl font-medium tracking-tight text-white">{SITE.shortName}</h1>
      <p className="mt-2 text-lg leading-tight text-fg">{SITE.taglines[0]}</p>
      <p className="mt-1 font-mono text-[11px] text-fg/70">{SITE.taglines[1]}</p>
      <p className="mt-4 text-sm leading-relaxed text-fg/90">{SITE.summary}</p>
    </div>
  )
}
