import { lazy, Suspense, useLayoutEffect } from 'react'
import { Navigate, Route, Routes, useParams } from 'react-router'
import { CLASSIC_BREAKPOINT } from '@/config/site.config'
import { TOPICS, type Topic } from '@/data/types'
import { useCoarsePointer, useMediaQuery } from '@/hooks/useMediaQuery'
import '@/lib/session'
import { useSiteStore } from '@/store/useSiteStore'
import { useAudioEngine } from '@/audio/useAudioEngine'
import { ClassicLayout } from '@/classic/ClassicLayout'
import { HomePage } from '@/classic/HomePage'
import { TopicPage } from '@/classic/TopicPage'
import { InteractiveShell } from '@/scene/InteractiveShell'
import { MicrositeOverlay } from '@/scene/MicrositeOverlay'
import { TopicOverlay } from '@/scene/TopicOverlay'

const AboutPage = lazy(() => import('@/about/AboutPage'))

export default function App() {
  const mode = useSiteStore((s) => s.mode)
  const modeOverride = useSiteStore((s) => s.modeOverride)
  const setMode = useSiteStore((s) => s.setMode)
  const small = useMediaQuery(`(max-width: ${CLASSIC_BREAKPOINT - 1}px)`)
  const coarse = useCoarsePointer()

  // Auto-pick the mode from the device until the visitor chooses explicitly.
  useLayoutEffect(() => {
    if (!modeOverride) setMode(small || coarse ? 'classic' : 'interactive', false)
  }, [small, coarse, modeOverride, setMode])

  useAudioEngine()

  return (
    <Suspense fallback={null}>
      <Routes>
        <Route element={<Shell />}>
          <Route index element={mode === 'classic' ? <HomePage /> : null} />
          <Route path="contact" element={<ContactRoute />} />
          <Route path="about" element={<Navigate to="/contact" replace />} />
          <Route path=":topic" element={<TopicRoute />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}

/** Interactive mode renders the room with pages as panels over it; classic mode renders the dark pages. */
function Shell() {
  const mode = useSiteStore((s) => s.mode)
  return mode === 'classic' ? <ClassicLayout /> : <InteractiveShell />
}

function ContactRoute() {
  const mode = useSiteStore((s) => s.mode)
  if (mode === 'classic') return <AboutPage />
  return (
    <MicrositeOverlay label="Contact me">
      <AboutPage />
    </MicrositeOverlay>
  )
}

function TopicRoute() {
  const { topic } = useParams()
  const mode = useSiteStore((s) => s.mode)
  if (!topic || !(TOPICS as readonly string[]).includes(topic)) return <Navigate to="/" replace />
  const t = topic as Topic
  return mode === 'classic' ? <TopicPage topic={t} /> : <TopicOverlay key={t} topic={t} />
}
