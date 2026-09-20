import { PORTRAIT } from '@/config/scene.config'

/** Daven on his chair, facing the visitor. Lives inside the World (world px). */
export function Portrait() {
  return (
    <div className="portrait" style={{ left: PORTRAIT.x, top: PORTRAIT.y, width: PORTRAIT.w }}>
      <img
        src={PORTRAIT.src}
        alt="Daven sitting on a chair, facing you"
        className="portrait-img"
        draggable={false}
        decoding="async"
        fetchPriority="high"
      />
    </div>
  )
}
