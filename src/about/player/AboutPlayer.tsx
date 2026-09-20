import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, type PanInfo } from 'motion/react'
import { audioEngine } from '@/audio/AudioEngine'
import { useAudioStore } from '@/store/useAudioStore'
import { isIOS } from '@/lib/platform'
import { cn } from '@/lib/cn'
import { records, type Record } from './records'
import { RecordDisc } from './RecordDisc'

type Phase = 'empty' | 'placing' | 'arming' | 'playing' | 'paused'
const ARM_MS = 900
const PLACE_FALLBACK_MS = 800
const spring = { type: 'spring', stiffness: 240, damping: 28 } as const

/**
 * Turntable for the About page. Drag a record onto the platter (or click its sleeve):
 * the disc slides over, the tonearm comes down and it plays. While a record plays, the
 * room's lofi pauses; it resumes when the record stops, scrolls out of view or the page changes.
 */
export function AboutPlayer() {
  const [loadedId, setLoadedId] = useState<string | null>(null)
  const [phase, setPhase] = useState<Phase>('empty')
  const [error, setError] = useState(false)
  const [volume, setVolume] = useState(0.7)
  const phaseRef = useRef<Phase>('empty')
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const platterRef = useRef<HTMLDivElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const resumeRoom = useRef(false)
  const timer = useRef(0)
  const loaded = records.find((r) => r.id === loadedId) ?? null

  const setPhaseSafe = (p: Phase) => {
    phaseRef.current = p
    setPhase(p)
  }
  const resumeRoomIfNeeded = useCallback(() => {
    if (resumeRoom.current) {
      resumeRoom.current = false
      void audioEngine.play()
    }
  }, [])
  const stop = useCallback(() => {
    window.clearTimeout(timer.current)
    audioRef.current?.pause()
    if (phaseRef.current !== 'empty') setPhaseSafe('paused')
    resumeRoomIfNeeded()
  }, [resumeRoomIfNeeded])

  useEffect(() => {
    const el = new Audio()
    el.preload = 'metadata'
    audioRef.current = el
    const onEnded = () => stop()
    const onError = () => {
      setError(true)
      stop()
    }
    el.addEventListener('ended', onEnded)
    el.addEventListener('error', onError)
    return () => {
      window.clearTimeout(timer.current)
      el.pause()
      el.removeEventListener('ended', onEnded)
      el.removeEventListener('error', onError)
      if (resumeRoom.current) void audioEngine.play()
    }
  }, [stop])

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

  // scrolled out of view → the record stops and the room's music comes back
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && phaseRef.current === 'playing') stop()
      },
      { threshold: 0.15 },
    )
    io.observe(root)
    return () => io.disconnect()
  }, [stop])

  const startPlayback = async () => {
    const el = audioRef.current
    if (!el) return
    if (useAudioStore.getState().playing) {
      audioEngine.pause()
      resumeRoom.current = true
    }
    try {
      await el.play()
      setError(false)
      setPhaseSafe('playing')
    } catch {
      setError(true)
      setPhaseSafe('paused')
      resumeRoomIfNeeded()
    }
  }
  const arm = () => {
    setPhaseSafe('arming')
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => void startPlayback(), ARM_MS)
  }
  const load = (rec: Record) => {
    if (loadedId === rec.id) {
      if (phaseRef.current === 'paused') arm()
      return
    }
    const el = audioRef.current
    if (el) {
      el.pause()
      el.src = rec.src
      el.load()
    }
    setError(false)
    setLoadedId(rec.id)
    setPhaseSafe('placing')
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => {
      if (phaseRef.current === 'placing') arm()
    }, PLACE_FALLBACK_MS)
  }
  const toggle = () => {
    if (!loaded) return
    if (phaseRef.current === 'playing' || phaseRef.current === 'arming') stop()
    else if (phaseRef.current === 'paused') arm()
  }
  const onDragEnd = (rec: Record) => (_: unknown, info: PanInfo) => {
    const r = platterRef.current?.getBoundingClientRect()
    if (!r) return
    const x = info.point.x - window.scrollX
    const y = info.point.y - window.scrollY
    if (x >= r.left - 20 && x <= r.right + 20 && y >= r.top - 20 && y <= r.bottom + 20) load(rec)
  }

  const armDown = phase === 'arming' || phase === 'playing'
  const status = phase === 'playing' ? 'Now playing' : phase === 'arming' ? 'Needle coming down' : phase === 'placing' ? 'Loading the record' : loaded ? 'On the platter' : 'Pick a record'

  return (
    <div ref={rootRef} className="player">
      <div className="turntable">
        <div className="plinth">
          <div ref={platterRef} className={cn('platter', loaded && 'has-record')} onClick={toggle} role="button" tabIndex={0} aria-label={phase === 'playing' ? 'Stop the record' : 'Play the record'} onKeyDown={(e) => e.key === 'Enter' && toggle()}>
            <span className="platter-mat" />
            {loaded && (
              <motion.div
                layoutId={`disc-${loaded.id}`}
                className="disc-slot"
                transition={spring}
                onLayoutAnimationComplete={() => {
                  if (phaseRef.current === 'placing') arm()
                }}
              >
                <RecordDisc record={loaded} spinning={phase === 'playing'} />
              </motion.div>
            )}
            <span className="spindle" />
          </div>
          <div className="tonearm-base">
            <div className={cn('tonearm', armDown && 'is-down')}>
              <span className="counterweight" />
              <span className="headshell" />
            </div>
          </div>
          <button type="button" className={cn('tt-power', phase === 'playing' && 'is-on')} onClick={toggle} disabled={!loaded}>
            {phase === 'playing' ? 'STOP' : 'START'}
          </button>
          <div className="tt-speed" aria-hidden="true">
            <span className="is-on">33</span>
            <span>45</span>
          </div>
          <span className="tt-plate" aria-hidden="true">
            DK·1200
          </span>
        </div>
        <div className="player-status">
          <p className="player-kicker">{status}</p>
          <p className="player-title">{loaded ? loaded.title : 'Drag a record onto the platter, or click its sleeve.'}</p>
          {loaded && <p className="player-artist">{loaded.artist}</p>}
          {error && <p className="player-hint">No file yet: drop MP3s into public/audio/records</p>}
          {!isIOS && (
            <label className="player-volume">
              <span>Vol</span>
              <input type="range" className="hud-range" min={0} max={1} step={0.02} value={volume} onChange={(e) => setVolume(Number(e.target.value))} aria-label="Record volume" />
            </label>
          )}
        </div>
      </div>
      <ul className="rack" aria-label="Records">
        {records.map((rec) => (
          <li key={rec.id} className={cn('sleeve', loadedId === rec.id && 'is-empty')} style={{ '--c': rec.colour } as React.CSSProperties}>
            <button type="button" className="sleeve-face" onClick={() => load(rec)} aria-label={`Play ${rec.title}`}>
              <span className="sleeve-title">{rec.title}</span>
              <span className="sleeve-artist">{rec.artist}</span>
            </button>
            {loadedId !== rec.id && (
              <motion.div
                layoutId={`disc-${rec.id}`}
                className="sleeve-disc"
                drag
                dragSnapToOrigin
                dragElastic={0.3}
                dragMomentum={false}
                whileDrag={{ scale: 1.06, zIndex: 30 }}
                whileHover={{ x: 10 }}
                transition={spring}
                onDragEnd={onDragEnd(rec)}
                onClick={() => load(rec)}
                title="Drag me onto the platter"
              >
                <RecordDisc record={rec} />
              </motion.div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
