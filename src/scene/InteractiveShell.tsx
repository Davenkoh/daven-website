import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { SITE } from '@/config/site.config'
import { WorldContext, useWorldScale } from '@/hooks/useWorldScale'
import { useSiteStore } from '@/store/useSiteStore'
import { NavPill } from '@/components/NavPill'
import { InteractiveToggle } from './InteractiveToggle'
import { Scene } from './Scene'
import { SceneHUD } from './SceneHUD'
import { CalibrationOverlay } from './CalibrationOverlay'
import { useCalibrationHotkey } from './useCalibrationHotkey'

/** Interactive home: the room stays mounted; books open on top via the <Outlet/>. */
export function InteractiveShell() {
  const world = useWorldScale()
  const { pathname } = useLocation()
  const overlayOpen = pathname !== '/'
  const calibration = useSiteStore((s) => s.calibration)
  useCalibrationHotkey()
  // books set their own title; restore ours whenever the room is back in front
  useEffect(() => {
    if (!overlayOpen) document.title = SITE.title
  }, [overlayOpen])

  return (
    <WorldContext value={world}>
      <div inert={overlayOpen}>
        <Scene />
        <SceneHUD />
        <NavPill homeLabel="Room" extra={<InteractiveToggle />} />
      </div>
      {import.meta.env.DEV && calibration && !overlayOpen && <CalibrationOverlay />}
      <Outlet />
    </WorldContext>
  )
}
