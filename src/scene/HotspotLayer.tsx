import { HOTSPOTS, WINDOW } from '@/config/scene.config'
import { useWorld } from '@/hooks/useWorldScale'
import { useSiteStore } from '@/store/useSiteStore'
import { Hotspot } from './Hotspot'

const xs = WINDOW.polygons.flat().map((p) => p[0])
const ys = WINDOW.polygons.flat().map((p) => p[1])
const WINDOW_BOX = { x: Math.min(...xs), y: Math.min(...ys), w: Math.max(...xs) - Math.min(...xs), h: Math.max(...ys) - Math.min(...ys) }

export function HotspotLayer() {
  const { toClient, scale, viewport } = useWorld()
  const lamp = useSiteStore((s) => s.lamp)
  const rain = useSiteStore((s) => s.rain)
  const toggleLamp = useSiteStore((s) => s.toggleLamp)
  const toggleRain = useSiteStore((s) => s.toggleRain)
  const win = toClient(WINDOW_BOX.x, WINDOW_BOX.y)

  return (
    <>
      {/* easter egg: the window itself toggles the rain — no dot, no caption */}
      <button
        type="button"
        className="hotspot hotspot-silent"
        style={{ left: win.x, top: win.y, width: WINDOW_BOX.w * scale, height: WINDOW_BOX.h * scale }}
        aria-label={rain ? 'Pause the rain' : 'Let it rain'}
        title={rain ? 'Pause the rain' : 'Let it rain'}
        onClick={toggleRain}
      />
      {HOTSPOTS.map((h) => {
        const p = toClient(h.x, h.y)
        const dot = h.dot ?? { x: 0.5, y: 0.5 }
        const width = h.w * scale
        const dotX = p.x + width * dot.x
        const align = dotX < 140 ? 'left' : dotX > viewport.width - 140 ? 'right' : 'center'
        // if the box itself runs off screen, push the caption back inside the viewport
        const captionInset = align === 'left' ? Math.max(0, 12 - p.x) : align === 'right' ? Math.max(0, p.x + width - (viewport.width - 12)) : 0
        const box = { left: p.x, top: p.y, width, height: h.h * scale, dot, align, captionInset } as const
        if (h.to) {
          return <Hotspot key={h.id} id={h.id} {...box} to={h.to} label={`Open ${h.label}`} caption={h.label} arrow revealed primary />
        }
        return (
          <Hotspot
            key={h.id}
            {...box}
            label={lamp ? 'Turn the lamp off' : 'Turn the lamp on'}
            caption={lamp ? 'Lights off' : 'Lights on'}
            pressed={lamp}
            onClick={toggleLamp}
          />
        )
      })}
    </>
  )
}
