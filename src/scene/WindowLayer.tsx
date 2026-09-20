import { ROOM, WINDOW } from '@/config/scene.config'
import { Rain } from './Rain'

const CLIP_ID = 'window-clip'

/** Rain streaks and a glass sheen, clipped to the window pane polygon(s). */
export function WindowLayer() {
  const points = WINDOW.polygons.map((poly) => poly.map(([px, py]) => `${(px / ROOM.width).toFixed(4)},${(py / ROOM.height).toFixed(4)}`).join(' '))
  const xs = WINDOW.polygons.flat().map((p) => p[0])
  const ys = WINDOW.polygons.flat().map((p) => p[1])
  const box = { x: Math.min(...xs), y: Math.min(...ys), w: Math.max(...xs) - Math.min(...xs), h: Math.max(...ys) - Math.min(...ys) }

  return (
    <>
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <clipPath id={CLIP_ID} clipPathUnits="objectBoundingBox">
            {points.map((p, i) => (
              <polygon key={i} points={p} />
            ))}
          </clipPath>
        </defs>
      </svg>
      <div className="window-clip" style={{ clipPath: `url(#${CLIP_ID})` }}>
        <Rain x={box.x} y={box.y} w={box.w} h={box.h} />
        <div className="window-sheen" style={{ left: box.x, top: box.y, width: box.w, height: box.h }} />
      </div>
    </>
  )
}
