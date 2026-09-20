import { ROOM } from '@/config/scene.config'

export function RoomImage() {
  return (
    <picture>
      <source srcSet={ROOM.src} type="image/webp" />
      <img src={ROOM.fallback} alt="" className="room-photo" draggable={false} decoding="async" fetchPriority="high" />
    </picture>
  )
}
