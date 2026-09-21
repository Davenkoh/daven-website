import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Mode, Tag } from '@/data/types'
import { readStorage, writeStorage } from '@/lib/storage'

const HIGHLIGHTS_KEY = 'daven.highlightsSeen'

export type BookView = 'book' | 'linear'

interface SiteState {
  mode: Mode
  /** true once the visitor picked a mode explicitly; auto-detection then stops */
  modeOverride: boolean
  lamp: boolean
  rain: boolean
  filters: Tag[]
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
  toggleFilter: (tag: Tag) => void
  clearFilters: () => void
  toggleCalibration: () => void
}

export const useSiteStore = create<SiteState>()(
  persist(
    (set) => ({
      mode: 'interactive',
      modeOverride: false,
      lamp: true,
      rain: true,
      filters: [],
      calibration: false,
      bookView: 'book',
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
      toggleFilter: (tag) =>
        set((s) => ({
          filters: s.filters.includes(tag) ? s.filters.filter((t) => t !== tag) : [...s.filters, tag],
        })),
      clearFilters: () => set({ filters: [] }),
      toggleCalibration: () => set((s) => ({ calibration: !s.calibration })),
    }),
    {
      name: 'daven.site',
      partialize: (s) => ({
        mode: s.mode,
        modeOverride: s.modeOverride,
        lamp: s.lamp,
        rain: s.rain,
        filters: s.filters,
        bookView: s.bookView,
      }),
    },
  ),
)
