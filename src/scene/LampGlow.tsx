import { LAMP } from '@/config/scene.config'

/** Warm light pool when the lamp is on; a shadow over the shade when it is off. */
export function LampGlow() {
  const { glow, shade } = LAMP
  return (
    <>
      <div
        className="lamp-glow"
        style={{
          background: `radial-gradient(circle at ${glow.x}px ${glow.y}px, rgba(255,196,120,0.42) 0, rgba(255,170,80,0.14) ${glow.r * 0.55}px, transparent ${glow.r}px)`,
        }}
        aria-hidden="true"
      />
      <div
        className="lamp-shade-off"
        style={{ left: shade.x - shade.w * 0.2, top: shade.y - shade.h * 0.2, width: shade.w * 1.4, height: shade.h * 1.4 }}
        aria-hidden="true"
      />
    </>
  )
}
