import { trackLabel, tracks } from '@/data/tracks'
import { useAudioStore } from '@/store/useAudioStore'
import { isIOS } from '@/lib/platform'
import { cn } from '@/lib/cn'
import { Icon } from '@/components/Icon'
import { Vinyl } from '@/scene/Vinyl'
import { BentoItem } from '../Bento'

export function ListeningCard() {
  const playing = useAudioStore((s) => s.playing)
  const trackIndex = useAudioStore((s) => s.trackIndex)
  const volume = useAudioStore((s) => s.volume)
  const muted = useAudioStore((s) => s.muted)
  const error = useAudioStore((s) => s.error)
  const toggle = useAudioStore((s) => s.toggle)
  const next = useAudioStore((s) => s.next)
  const setVolume = useAudioStore((s) => s.setVolume)
  const selectTrack = useAudioStore((s) => s.selectTrack)
  const track = tracks[trackIndex] ?? tracks[0]

  return (
    <BentoItem title="What I'm listening to" glyph="♫" className="md:col-span-2">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={() => void toggle()}
          aria-label={playing ? 'Pause the record' : 'Play the record'}
          className="relative mx-auto h-48 w-48 shrink-0 rounded-full transition hover:scale-[1.02]"
        >
          <Vinyl cx={96} cy={96} r={84} />
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-black/60 text-fg backdrop-blur transition group-hover:bg-black/70">
              <Icon name={playing ? 'pause' : 'play'} size={18} />
            </span>
          </span>
        </button>
        <div className="flex flex-1 flex-col gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{playing ? 'Now playing' : 'Paused'}</p>
            <p className="mt-1 text-xl font-medium">{trackLabel(track)}</p>
            <p className="text-sm text-muted">{track.artist}</p>
            {error && <p className="mt-2 text-xs text-accent">No music yet — drop MP3s into public/audio.</p>}
          </div>
          <div className="flex items-center gap-3">
            <button type="button" className="hud-btn glass" aria-label="Next track" onClick={() => void next()}>
              <Icon name="next" size={15} />
            </button>
            {!isIOS && (
              <label className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted">
                Vol
                <input type="range" className="hud-range" min={0} max={1} step={0.02} value={muted ? 0 : volume} onChange={(e) => setVolume(Number(e.target.value))} aria-label="Volume" />
              </label>
            )}
          </div>
        </div>
      </div>
      <ul className="mt-6 grid grid-cols-3 gap-3 border-t border-line pt-5">
        {tracks.map((t, i) => (
          <li key={t.id}>
            <button
              type="button"
              onClick={() => void selectTrack(i)}
              aria-pressed={i === trackIndex}
              className={cn(
                'flex w-full flex-col gap-2 rounded-xl border p-3 text-left transition',
                i === trackIndex ? 'border-white/25 bg-white/5' : 'border-line hover:border-white/20',
              )}
            >
              <span className="h-10 w-full rounded-md" style={{ background: `linear-gradient(135deg, ${t.colour}, #111)` }} aria-hidden="true" />
              <span className="truncate text-sm font-medium">{trackLabel(t)}</span>
              <span className="truncate text-xs text-muted">{t.artist}</span>
            </button>
          </li>
        ))}
      </ul>
    </BentoItem>
  )
}
