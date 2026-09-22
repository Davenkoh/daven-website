import { lazy, Suspense, useLayoutEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation, useParams } from 'react-router'
import { AnimatePresence } from 'motion/react'
import { CLASSIC_BREAKPOINT } from '@/config/site.config'
import { TOPICS, type Topic } from '@/data/types'
import { useCoarsePointer, useMediaQuery } from '@/hooks/useMediaQuery'
import { readStorage, writeStorage } from '@/lib/storage'
import { useSiteStore } from '@/store/useSiteStore'
import { useAudioStore } from '@/store/useAudioStore'
import { useAudioEngine } from '@/audio/useAudioEngine'
import { WelcomeGate } from '@/welcome/WelcomeGate'
import { ClassicLayout } from '@/classic/ClassicLayout'
import { HomePage } from '@/classic/HomePage'
import { TopicPage } from '@/classic/TopicPage'
import { InteractiveShell } from '@/scene/InteractiveShell'

const BookOverlay = lazy(() => import('@/book/BookOverlay'))
const AboutPage = lazy(() => import('@/about/AboutPage'))

const WELCOME_KEY = 'daven.welcomed'

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

  const [welcomed, setWelcomed] = useState(() => readStorage('session', WELCOME_KEY) === '1')
  const unlock = useAudioStore((s) => s.unlock)
  const highlightsSeen = useSiteStore((s) => s.highlightsSeen)
  const enter = () => {
    writeStorage('session', WELCOME_KEY, '1')
    // The journey page comes first and stays silent; music starts when it closes.
    // (If it was already seen this session, start the music now while we still have the click.)
    if (mode === 'interactive' && highlightsSeen) void unlock()
    setWelcomed(true)
  }

  return (
    <>
      <AnimatePresence>
        {!welcomed && <WelcomeGate key="gate" onEnter={enter} />}
      </AnimatePresence>
      {welcomed && (
        <Suspense fallback={null}>
          <Routes>
            <Route element={<Shell />}>
              <Route index element={mode === 'classic' ? <HomePage /> : null} />
              <Route path="contact" element={<AboutPage />} />
              <Route path="about" element={<Navigate to="/contact" replace />} />
              <Route path=":topic" element={<TopicRoute />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      )}
    </>
  )
}

/** Interactive mode renders the room; classic mode (and /contact in any mode) renders the dark pages. */
function Shell() {
  const mode = useSiteStore((s) => s.mode)
  const { pathname } = useLocation()
  if (mode === 'classic' || pathname.startsWith('/contact')) return <ClassicLayout roomAvailable={mode === 'interactive'} />
  return <InteractiveShell />
}

function TopicRoute() {
  const { topic } = useParams()
  const mode = useSiteStore((s) => s.mode)
  if (!topic || !(TOPICS as readonly string[]).includes(topic)) return <Navigate to="/" replace />
  const t = topic as Topic
  return mode === 'classic' ? <TopicPage topic={t} /> : <BookOverlay key={t} topic={t} />
}
