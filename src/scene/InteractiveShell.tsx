import { useCallback, useEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router'
import { AnimatePresence } from 'motion/react'
import { readStorage, writeStorage } from '@/lib/storage'
import { TourOverlay } from './TourOverlay'
import { HighlightsOverlay } from '@/highlights/HighlightsOverlay'
import { useAudioStore } from '@/store/useAudioStore'
import { SITE } from '@/config/site.config'
import { WorldContext, useWorldScale } from '@/hooks/useWorldScale'
import { useSiteStore } from '@/store/useSiteStore'
import { NavPill } from '@/components/NavPill'
import { InteractiveToggle } from './InteractiveToggle'
import { Scene } from './Scene'
import { SceneHUD } from './SceneHUD'
import { CalibrationOverlay } from './CalibrationOverlay'
import { useCalibrationHotkey } from './useCalibrationHotkey'

const TOUR_KEY = 'daven.tourSeen'

/** Interactive home: the room stays mounted; pages open as panels on top via the <Outlet/>. */
export function InteractiveShell() {
  const world = useWorldScale()
  const { pathname } = useLocation()
  const overlayOpen = pathname !== '/'
  const calibration = useSiteStore((s) => s.calibration)
  const highlightsOpen = useSiteStore((s) => s.highlightsOpen)
  const closeHighlights = useSiteStore((s) => s.closeHighlights)
  const unlock = useAudioStore((s) => s.unlock)
  const unlocked = useAudioStore((s) => s.unlocked)
  const unlockRequested = useRef(false)
  const requestUnlock = useCallback(() => {
    if (unlockRequested.current || useAudioStore.getState().unlocked) return
    // the journey is silent for as long as it is on screen; the music waits for it to close
    if (useSiteStore.getState().highlightsOpen) return
    unlockRequested.current = true
    void unlock().finally(() => {
      // blocked by the browser: allow another try on the next click
      if (!useAudioStore.getState().unlocked) unlockRequested.current = false
    })
  }, [unlock])
  useCalibrationHotkey()
  const finishHighlights = useCallback(() => {
    closeHighlights()
    // closing the journey is a click, so it doubles as the audio unlock gesture (a no-op once the music is on)
    requestUnlock()
  }, [closeHighlights, requestUnlock])
  // no Start screen any more: the first click in the room itself (journey and panels closed) starts the music.
  // Listening for `click` rather than `pointerdown` means a click that opens the journey is seen after
  // the journey has opened, so it stays silent.
  useEffect(() => {
    if (unlocked || highlightsOpen || overlayOpen) return
    window.addEventListener('click', requestUnlock)
    return () => window.removeEventListener('click', requestUnlock)
  }, [unlocked, highlightsOpen, overlayOpen, requestUnlock])
  // first time in the room: spotlight everything clickable
  const [tourOpen, setTourOpen] = useState(() => readStorage('local', TOUR_KEY) !== '1')
  const endTour = useCallback(() => {
    writeStorage('local', TOUR_KEY, '1')
    setTourOpen(false)
  }, [])
  // panels set their own title; restore ours whenever the room is back in front
  useEffect(() => {
    if (!overlayOpen) document.title = SITE.title
  }, [overlayOpen])

  return (
    <WorldContext value={world}>
      <div inert={overlayOpen || highlightsOpen} data-tour={tourOpen && !overlayOpen && !highlightsOpen ? '' : undefined}>
        <Scene />
        <SceneHUD />
        <NavPill homeLabel="Room" extra={<InteractiveToggle label="Interactive" />} />
      </div>
      {import.meta.env.DEV && calibration && !overlayOpen && <CalibrationOverlay />}
      <AnimatePresence>{tourOpen && !overlayOpen && !highlightsOpen && <TourOverlay key="tour" onDone={endTour} />}</AnimatePresence>
      <AnimatePresence>{highlightsOpen && !overlayOpen && <HighlightsOverlay key="highlights" onClose={finishHighlights} />}</AnimatePresence>
      <Outlet />
    </WorldContext>
  )
}
