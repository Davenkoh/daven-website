import { SITE } from '@/config/site.config'
import { useClock } from '@/hooks/useClock'

/** Fixed chrome around the room: just the clock. Screen px, never scaled. */
export function SceneHUD() {
  const time = useClock(SITE.timeZone)
  return (
    <div className="hud">
      <p className="absolute left-6 top-5 text-[11px] uppercase tracking-[0.22em] text-fg/70">
        {SITE.location} · {time} {SITE.timeZoneLabel}
      </p>
    </div>
  )
}
