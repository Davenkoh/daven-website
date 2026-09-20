import { useEffect } from 'react'
import { useSiteStore } from '@/store/useSiteStore'

/** `c` toggles the overlay (DEV only). */
export function useCalibrationHotkey() {
  const toggle = useSiteStore((s) => s.toggleCalibration)
  useEffect(() => {
    if (!import.meta.env.DEV) return
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return
      if (e.key === 'c' && !e.metaKey && !e.ctrlKey && !e.altKey) toggle()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [toggle])
}
