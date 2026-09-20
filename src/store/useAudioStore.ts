import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { audioEngine } from '@/audio/AudioEngine'
import { tracks } from '@/data/tracks'
import { TOPIC_TRACK } from '@/config/site.config'
import type { Topic } from '@/data/types'

interface AudioState {
  trackIndex: number
  playing: boolean
  volume: number
  muted: boolean
  /** a user gesture has successfully started playback at least once */
  unlocked: boolean
  /** the browser refused to play (autoplay policy) */
  blocked: boolean
  /** the track file could not be loaded (e.g. MP3 missing) */
  error: boolean
  unlock: () => Promise<void>
  play: (index?: number) => Promise<void>
  pause: () => void
  toggle: () => Promise<void>
  next: () => Promise<void>
  prev: () => Promise<void>
  setVolume: (v: number) => void
  setMuted: (m: boolean) => void
  toggleMuted: () => void
  playForTopic: (topic: Topic) => void
  /** jump to a specific track (crossfades when playing, otherwise starts it) */
  selectTrack: (index: number) => Promise<void>
}

export const useAudioStore = create<AudioState>()(
  persist(
    (set, get) => ({
      trackIndex: 0,
      playing: false,
      volume: 0.6,
      muted: false,
      unlocked: false,
      blocked: false,
      error: false,
      unlock: async () => {
        const ok = await audioEngine.play(get().trackIndex)
        if (ok) set({ unlocked: true, blocked: false })
      },
      play: async (index) => {
        await audioEngine.play(index ?? get().trackIndex)
      },
      pause: () => audioEngine.pause(),
      toggle: async () => {
        await audioEngine.toggle()
      },
      next: async () => {
        await audioEngine.next()
      },
      prev: async () => {
        await audioEngine.prev()
      },
      setVolume: (v) => {
        audioEngine.setVolume(v)
        audioEngine.setMuted(false)
        set({ volume: v, muted: false })
      },
      setMuted: (m) => {
        audioEngine.setMuted(m)
        set({ muted: m })
      },
      toggleMuted: () => get().setMuted(!get().muted),
      selectTrack: async (index) => {
        await audioEngine.crossfadeTo(index)
      },
      playForTopic: (topic) => {
        const idx = tracks.findIndex((t) => t.id === TOPIC_TRACK[topic])
        if (idx < 0 || idx === get().trackIndex) return
        if (get().playing) void audioEngine.crossfadeTo(idx)
        else audioEngine.load(idx)
      },
    }),
    {
      name: 'daven.audio',
      partialize: (s) => ({ trackIndex: s.trackIndex, volume: s.volume, muted: s.muted }),
    },
  ),
)
