import { cn } from '@/lib/cn'
import { VINYL } from '@/config/scene.config'
import { useSiteStore } from '@/store/useSiteStore'
import { useAudioStore } from '@/store/useAudioStore'
import { Portrait } from '@/portrait/Portrait'
import { SummaryCard } from '@/portrait/SummaryCard'
import { World } from './World'
import { RoomImage } from './RoomImage'
import { WindowLayer } from './WindowLayer'
import { LampGlow } from './LampGlow'
import { Vinyl } from './Vinyl'
import { VinylControls } from './VinylControls'
import { LaptopClock } from './LaptopClock'
import { HotspotLayer } from './HotspotLayer'

/** The room: scaled image layers inside the World, plus screen-space overlays (card, controls, hotspots). */
export function Scene() {
  const lamp = useSiteStore((s) => s.lamp)
  const rain = useSiteStore((s) => s.rain)
  const toggle = useAudioStore((s) => s.toggle)
  return (
    <>
      <World className={cn(!lamp && 'lights-dimmed', !rain && 'rain-paused')}>
        <RoomImage />
        <WindowLayer />
        <LampGlow />
        <Vinyl squash={VINYL.squash} onClick={() => void toggle()} />
        <Portrait />
      </World>
      <div className="scene-overlay">
        <LaptopClock />
        <SummaryCard />
        <VinylControls />
        <HotspotLayer />
      </div>
    </>
  )
}
