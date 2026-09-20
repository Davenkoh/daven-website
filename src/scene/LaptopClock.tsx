import { useEffect, useState } from 'react'
import { LAPTOP } from '@/config/scene.config'
import { SITE } from '@/config/site.config'
import { useWorld } from '@/hooks/useWorldScale'

const fmt = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
  timeZone: SITE.timeZone,
})

/** Live 24-hour clock with seconds, drawn over the laptop screen. Screen px, scaled with the room. */
export function LaptopClock() {
  const { toClient, scale } = useWorld()
  const [now, setNow] = useState(() => fmt.format(new Date()))
  useEffect(() => {
    const id = window.setInterval(() => setNow(fmt.format(new Date())), 1000)
    return () => window.clearInterval(id)
  }, [])
  const p = toClient(LAPTOP.x, LAPTOP.y)
  return (
    <span className="laptop-clock" style={{ left: p.x, top: p.y, fontSize: LAPTOP.fontSize * scale }} aria-hidden="true">
      {now}
    </span>
  )
}
