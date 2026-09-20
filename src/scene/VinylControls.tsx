import { VINYL } from '@/config/scene.config'
import { trackLabel, tracks } from '@/data/tracks'
import { useWorld } from '@/hooks/useWorldScale'
import { isIOS } from '@/lib/platform'
import { clamp } from '@/lib/math'
import { useAudioStore } from '@/store/useAudioStore'
import { HudButton } from './HudButton'

const WIDTH = 300

/** Play / skip / title / volume, anchored just below the turntable. Screen px. */
export function VinylControls() {
  const { toClient, scale, viewport } = useWorld()
  const playing = useAudioStore((s) => s.playing)
  const muted = useAudioStore((s) => s.muted)
  const volume = useAudioStore((s) => s.volume)
  const trackIndex = useAudioStore((s) => s.trackIndex)
  const blocked = useAudioStore((s) => s.blocked)
  const error = useAudioStore((s) => s.error)
  const toggle = useAudioStore((s) => s.toggle)
  const next = useAudioStore((s) => s.next)
  const setVolume = useAudioStore((s) => s.setVolume)
  const track = tracks[trackIndex] ?? tracks[0]

  const anchor = toClient(VINYL.cx, VINYL.cy + VINYL.r * VINYL.squash)
  const left = clamp(anchor.x - WIDTH / 2, 12, viewport.width - WIDTH - 12)
  const top = anchor.y + 14 * scale + 10

  return (
    <div className="vinyl-controls" style={{ left, top, width: WIDTH }} role="group" aria-label="Music">
      <HudButton icon={playing ? 'pause' : 'play'} label={playing ? 'Pause music' : 'Play music'} onClick={() => void toggle()} />
      <HudButton icon="next" label="Next side" onClick={() => void next()} />
      <span className="vinyl-title" style={{ color: track.colour }} title={track.artist}>
        {trackLabel(track)}
      </span>
      {!isIOS && (
        <input
          type="range"
          className="hud-range ml-auto"
          min={0}
          max={1}
          step={0.02}
          value={muted ? 0 : volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          aria-label="Volume"
        />
      )}
      {(blocked || error) && (
        <p className="vinyl-status" role="status">
          {error ? 'No music yet: drop MP3s into public/audio' : 'Sound is off: press play'}
        </p>
      )}
    </div>
  )
}
