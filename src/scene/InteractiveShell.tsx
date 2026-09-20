import { useCallback, useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router'
import { AnimatePresence } from 'motion/react'
import { readStorage, writeStorage } from '@/lib/storage'
import { TourOverlay } from './TourOverlay'
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

/** Interactive home: the room stays mounted; books open on top via the <Outlet/>. */
export function InteractiveShell() {
  const world = useWorldScale()
  const { pathname } = useLocation()
  const overlayOpen = pathname !== '/'
  const calibration = useSiteStore((s) => s.calibration)
  useCalibrationHotkey()
  // first time in the room: spotlight everything clickable
  const [tourOpen, setTourOpen] = useState(() => readStorage('local', TOUR_KEY) !== '1')
  const endTour = useCallback(() => {
    writeStorage('local', TOUR_KEY, '1')
    setTourOpen(false)
  }, [])
  // books set their own title; restore ours whenever the room is back in front
  useEffect(() => {
    if (!overlayOpen) document.title = SITE.title
  }, [overlayOpen])

  return (
    <WorldContext value={world}>
      <div inert={overlayOpen} data-tour={tourOpen && !overlayOpen ? '' : undefined}>
        <Scene />
        <SceneHUD />
        <NavPill homeLabel="Room" extra={<InteractiveToggle />} />
      </div>
      {import.meta.env.DEV && calibration && !overlayOpen && <CalibrationOverlay />}
      <AnimatePresence>{tourOpen && !overlayOpen && <TourOverlay key="tour" onDone={endTour} />}</AnimatePresence>
      <Outlet />
    </WorldContext>
  )
}
