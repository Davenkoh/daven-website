import { useEffect } from 'react'
import { audioEngine } from './AudioEngine'
import { useAudioStore } from '@/store/useAudioStore'
import { trackLabel, tracks } from '@/data/tracks'

/** Mount once (in App): mirrors engine events into the store and wires Media Session. */
export function useAudioEngine() {
  useEffect(() => {
    const { trackIndex, volume, muted } = useAudioStore.getState()
    audioEngine.setVolume(volume)
    audioEngine.setMuted(muted)
    audioEngine.load(trackIndex)

    const updateMediaSession = (index: number) => {
      if (!('mediaSession' in navigator)) return
      const t = tracks[index]
      navigator.mediaSession.metadata = new MediaMetadata({ title: trackLabel(t), artist: t.artist })
    }

    const unsubscribe = audioEngine.subscribe((e) => {
      const set = useAudioStore.setState
      switch (e.type) {
        case 'play':
          set({ playing: true, unlocked: true, blocked: false, error: false, trackIndex: e.index })
          updateMediaSession(e.index)
          break
        case 'pause':
        case 'ended':
          set({ playing: false })
          break
        case 'trackchange':
          set({ trackIndex: e.index, error: false })
          break
        case 'blocked':
          set({ playing: false, blocked: true })
          break
        case 'error':
          set({ playing: false, error: true })
          break
      }
    })

    if ('mediaSession' in navigator) {
      const ms = navigator.mediaSession
      ms.setActionHandler('play', () => void audioEngine.play())
      ms.setActionHandler('pause', () => audioEngine.pause())
      ms.setActionHandler('nexttrack', () => void audioEngine.next())
      ms.setActionHandler('previoustrack', () => void audioEngine.prev())
    }

    return unsubscribe
  }, [])
}
