import { useCallback, useEffect, useState } from 'react'
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
  const highlightsSeen = useSiteStore((s) => s.highlightsSeen)
  const closeHighlights = useSiteStore((s) => s.closeHighlights)
  const unlock = useAudioStore((s) => s.unlock)
  useCalibrationHotkey()
  const finishHighlights = useCallback(() => {
    const first = !highlightsSeen
    closeHighlights()
    // first close of the session doubles as the audio unlock gesture
    if (first) void unlock()
  }, [highlightsSeen, closeHighlights, unlock])
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
