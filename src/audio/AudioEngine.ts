import { tracks } from '@/data/tracks'
import { clamp } from '@/lib/math'

export type EngineEventType = 'play' | 'pause' | 'ended' | 'trackchange' | 'blocked' | 'error'
export interface EngineEvent {
  type: EngineEventType
  index: number
}
type Listener = (e: EngineEvent) => void

const wrap = (i: number) => ((i % tracks.length) + tracks.length) % tracks.length

/**
 * Playlist engine built on two HTMLAudioElements (A/B) so tracks can crossfade.
 * Lives outside React; the store mirrors its state through `subscribe`.
 *
 * Browser autoplay rules: the first `play()` must be called synchronously inside
 * a user gesture (the welcome Start click). Everything before the await here is sync.
 */
class AudioEngine {
  private els: [HTMLAudioElement, HTMLAudioElement]
  private active = 0
  private index = 0
  private volume = 0.6
  private muted = false
  private listeners = new Set<Listener>()

  constructor() {
    this.els = [new Audio(), new Audio()]
    this.els.forEach((el) => {
      el.preload = 'metadata'
      el.addEventListener('ended', () => {
        if (el === this.el) {
          this.emit('ended')
          void this.crossfadeTo(this.index + 1, 0)
        }
      })
      el.addEventListener('error', () => {
        if (el === this.el) this.emit('error')
      })
    })
  }

  private get el() {
    return this.els[this.active]
  }

  get trackIndex() {
    return this.index
  }

  get isPlaying() {
    return !this.el.paused && !this.el.ended
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener)
    return () => {
      this.listeners.delete(listener)
    }
  }

  private emit(type: EngineEventType, index = this.index) {
    for (const l of this.listeners) l({ type, index })
  }

  private targetVolume() {
    return this.muted ? 0 : this.volume
  }

  /** Point the active element at a track without playing it. */
  load(index: number) {
    this.index = wrap(index)
    const src = tracks[this.index].src
    if (!this.el.src.endsWith(src)) {
      this.el.src = src
      this.el.load()
    }
    this.emit('trackchange')
  }

  /** Resolves true when playback started, false when blocked or the file is missing. */
  async play(index: number = this.index): Promise<boolean> {
    if (wrap(index) !== this.index || !this.el.src) this.load(index)
    this.el.volume = this.targetVolume()
    try {
      await this.el.play()
      this.emit('play')
      return true
    } catch (err) {
      const name = err instanceof DOMException ? err.name : ''
      this.emit(name === 'NotAllowedError' ? 'blocked' : 'error')
      return false
    }
  }

  pause() {
    this.el.pause()
    this.emit('pause')
  }

  toggle() {
    if (this.isPlaying) {
      this.pause()
      return Promise.resolve(false)
    }
    return this.play()
  }

  next() {
    return this.crossfadeTo(this.index + 1)
  }

  prev() {
    return this.crossfadeTo(this.index - 1)
  }

  /** Switch tracks; when something is playing, fade the old one out while the new one fades in. */
  async crossfadeTo(index: number, ms = 700): Promise<boolean> {
    const target = wrap(index)
    if (target === this.index && this.isPlaying) return true
    const wasPlaying = this.isPlaying
    const from = this.el
    this.active = 1 - this.active
    this.index = target
    this.el.src = tracks[target].src
    this.el.load()
    this.emit('trackchange')
    if (!wasPlaying) {
      from.pause()
      return this.play(target)
    }
    this.el.volume = 0
    try {
      await this.el.play()
    } catch (err) {
      const name = err instanceof DOMException ? err.name : ''
      this.emit(name === 'NotAllowedError' ? 'blocked' : 'error')
      return false
    }
    void this.fade(from, 0, ms).then(() => {
      from.pause()
      from.currentTime = 0
    })
    await this.fade(this.el, this.targetVolume(), ms)
    this.emit('play')
    return true
  }

  setVolume(v: number) {
    this.volume = clamp(v, 0, 1)
    this.el.volume = this.targetVolume()
  }

  setMuted(m: boolean) {
    this.muted = m
    this.el.volume = this.targetVolume()
  }

  private fade(el: HTMLAudioElement, to: number, ms: number) {
    return new Promise<void>((resolve) => {
      if (ms <= 0) {
        el.volume = to
        resolve()
        return
      }
      const from = el.volume
      const start = performance.now()
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / ms)
        el.volume = clamp(from + (to - from) * t, 0, 1)
        if (t < 1) requestAnimationFrame(step)
        else resolve()
      }
      requestAnimationFrame(step)
    })
  }
}

export const audioEngine = new AudioEngine()
