import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Mode } from '@/data/types'
import { readStorage, writeStorage } from '@/lib/storage'

const HIGHLIGHTS_KEY = 'daven.highlightsSeen'

export type BookView = 'book' | 'linear'

interface SiteState {
  mode: Mode
  /** true once the visitor picked a mode explicitly; auto-detection then stops */
  modeOverride: boolean
  lamp: boolean
  rain: boolean
  calibration: boolean
  /** how the topics read inside the room: the flip-book or a linear scrolling page */
  bookView: BookView
  setBookView: (view: BookView) => void
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

const partialize = (s: SiteState) => ({ mode: s.mode, modeOverride: s.modeOverride, lamp: s.lamp, rain: s.rain, bookView: s.bookView })
type Persisted = ReturnType<typeof partialize>

export const useSiteStore = create<SiteState>()(
  persist(
    (set) => ({
      mode: 'interactive',
      modeOverride: false,
      lamp: true,
      rain: true,
      calibration: false,
      bookView: 'linear',
      setBookView: (view) => set({ bookView: view }),
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
      version: 2,
      partialize,
      // v2: the list view became the default reading view
      migrate: (persisted) => ({ ...(persisted as Persisted), bookView: 'linear' as BookView }),
    },
  ),
)
