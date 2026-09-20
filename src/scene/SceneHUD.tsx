import { SITE } from '@/config/site.config'
import { useClock } from '@/hooks/useClock'

/** Fixed chrome around the room: the clock and the hint. Screen px, never scaled. */
export function SceneHUD() {
  const time = useClock(SITE.timeZone)
  return (
    <div className="hud">
      <p className="absolute left-6 top-5 text-[11px] uppercase tracking-[0.22em] text-fg/70">
        {SITE.location} · {time} {SITE.timeZoneLabel}
      </p>
      <p className="hud-hint absolute bottom-7 left-6">
        Move your cursor · Click a{' '}
        <span className="inline-grid h-4 w-4 place-items-center rounded-full border border-fg/60 align-middle text-[10px]">+</span>{' '}
        to explore
      </p>
    </div>
  )
}
