import { useEffect, useState, type MouseEvent } from 'react'
import { HOTSPOTS, LAMP, PORTRAIT, SAFE, VINYL, WINDOW } from '@/config/scene.config'
import { useWorld } from '@/hooks/useWorldScale'

/**
 * DEV-only helper (press `c`): shows every configured box on top of the room and prints
 * world-pixel coordinates. Click = copy `{ x, y }`; shift-click = add a polygon vertex
 * (printed as `[[x, y], …]` for WINDOW.polygons); Esc = clear the polygon.
 */
export function CalibrationOverlay() {
  const { toWorld, toClient, scale } = useWorld()
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [poly, setPoly] = useState<[number, number][]>([])
  const [msg, setMsg] = useState('click: copy point · shift-click: polygon vertex · esc: clear · c: close')

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPoly([])
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const rect = (x: number, y: number, w: number, h: number) => {
    const p = toClient(x, y)
    return { left: p.x, top: p.y, width: w * scale, height: h * scale }
  }

  const onMove = (e: MouseEvent) => {
    const w = toWorld(e.clientX, e.clientY)
    setPos({ x: Math.round(w.x), y: Math.round(w.y) })
  }

  const onClick = (e: MouseEvent) => {
    const w = toWorld(e.clientX, e.clientY)
    const pt: [number, number] = [Math.round(w.x), Math.round(w.y)]
    if (e.shiftKey) {
      const nextPoly = [...poly, pt]
      setPoly(nextPoly)
      const text = JSON.stringify(nextPoly)
      console.info('[calibration] polygon', text)
      void navigator.clipboard?.writeText(text)
      setMsg(`polygon (${nextPoly.length} pts) copied: ${text}`)
    } else {
      const text = `{ x: ${pt[0]}, y: ${pt[1]} }`
      console.info('[calibration] point', text)
      void navigator.clipboard?.writeText(text)
      setMsg(`copied ${text}`)
    }
  }

  const portraitH = PORTRAIT.w * PORTRAIT.aspect
  const face = toClient(PORTRAIT.x + PORTRAIT.w * PORTRAIT.face.x, PORTRAIT.y + portraitH * PORTRAIT.face.y)

  return (
    <div className="calib" onMouseMove={onMove} onClick={onClick}>
      <div className="calib-box" style={{ ...rect(SAFE.x, SAFE.y, SAFE.w, SAFE.h), borderColor: 'rgba(80,200,120,.9)' }}>
        <span className="calib-label" style={{ background: 'rgba(80,200,120,.9)' }}>SAFE</span>
      </div>
      {HOTSPOTS.map((h) => (
        <div key={h.id} className="calib-box" style={rect(h.x, h.y, h.w, h.h)}>
          <span className="calib-label">{h.id}</span>
        </div>
      ))}
      <div className="calib-box" style={{ ...rect(PORTRAIT.x, PORTRAIT.y, PORTRAIT.w, portraitH), borderColor: 'rgba(120,160,255,.9)' }}>
        <span className="calib-label" style={{ background: 'rgba(120,160,255,.9)' }}>PORTRAIT</span>
      </div>
      <div className="calib-box" style={{ ...rect(LAMP.shade.x, LAMP.shade.y, LAMP.shade.w, LAMP.shade.h), borderColor: 'rgba(255,200,80,.9)' }}>
        <span className="calib-label" style={{ background: 'rgba(255,200,80,.9)', color: '#000' }}>LAMP.shade</span>
      </div>
      <div
        className="calib-box"
        style={{ ...rect(VINYL.cx - VINYL.r, VINYL.cy - VINYL.r, VINYL.r * 2, VINYL.r * 2), borderRadius: '50%', borderColor: 'rgba(255,120,200,.9)' }}
      >
        <span className="calib-label" style={{ background: 'rgba(255,120,200,.9)' }}>VINYL</span>
      </div>
      <div style={{ position: 'absolute', left: face.x - 6, top: face.y - 6, width: 12, height: 12, borderRadius: '50%', background: 'rgba(120,160,255,.9)' }} />
      <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
        {WINDOW.polygons.map((pg, i) => (
          <polygon key={i} points={pg.map(([x, y]) => { const p = toClient(x, y); return `${p.x},${p.y}` }).join(' ')} fill="rgba(80,160,255,.12)" stroke="rgba(80,160,255,.9)" strokeDasharray="6 4" />
        ))}
        {poly.length > 0 && (
          <polyline points={poly.map(([x, y]) => { const p = toClient(x, y); return `${p.x},${p.y}` }).join(' ')} fill="none" stroke="#fff" strokeWidth={2} />
        )}
      </svg>
      <div className="calib-readout" style={{ left: toClient(pos.x, pos.y).x, top: toClient(pos.x, pos.y).y }}>
        x: {pos.x} · y: {pos.y}
      </div>
      <div className="calib-hint">{msg}</div>
    </div>
  )
}
