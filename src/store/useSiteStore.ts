import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Mode } from '@/data/types'
import { readStorage, writeStorage } from '@/lib/storage'

const HIGHLIGHTS_KEY = 'daven.highlightsSeen'

interface SiteState {
  mode: Mode
  /** true once the visitor picked a mode explicitly; auto-detection then stops */
  modeOverride: boolean
  lamp: boolean
  rain: boolean
  calibration: boolean
  /** the journey one-pager shown after Start in the room (once per session, or on demand) */
  highlightsOpen: boolean
  highlightsSeen: boolean
  openHighlights: () => void
  closeHighlights: () => void
  setMode: (mode: Mode, override?: boolean) => void
  toggleLamp: () => void
  toggleRain: () => void
  toggleCalibration: () => void
}

const partialize = (s: SiteState) => ({ mode: s.mode, modeOverride: s.modeOverride, lamp: s.lamp, rain: s.rain })
type Persisted = ReturnType<typeof partialize>

export const useSiteStore = create<SiteState>()(
  persist(
    (set) => ({
      mode: 'interactive',
      modeOverride: false,
      lamp: true,
      rain: true,
      calibration: false,
      highlightsOpen: readStorage('session', HIGHLIGHTS_KEY) !== '1',
      highlightsSeen: readStorage('session', HIGHLIGHTS_KEY) === '1',
      openHighlights: () => set({ highlightsOpen: true }),
      closeHighlights: () => {
        writeStorage('session', HIGHLIGHTS_KEY, '1')
        set({ highlightsOpen: false, highlightsSeen: true })
      },
      setMode: (mode, override = true) => set({ mode, modeOverride: override }),
      toggleLamp: () => set((s) => ({ lamp: !s.lamp })),
      toggleRain: () => set((s) => ({ rain: !s.rain })),
      toggleCalibration: () => set((s) => ({ calibration: !s.calibration })),
    }),
    {
      name: 'daven.site',
      version: 3,
      partialize,
      // v3: the flip-book (and its reading-view preference) is gone
      migrate: (persisted) => {
        const state = { ...(persisted as Record<string, unknown>) }
        delete state.bookView
        delete state.filters
        return state as Persisted
      },
    },
  ),
)
