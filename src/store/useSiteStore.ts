import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Mode, Tag } from '@/data/types'

interface SiteState {
  mode: Mode
  /** true once the visitor picked a mode explicitly; auto-detection then stops */
  modeOverride: boolean
  lamp: boolean
  rain: boolean
  filters: Tag[]
  calibration: boolean
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
      }),
    },
  ),
)
