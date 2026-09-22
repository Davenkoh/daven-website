import { Outlet } from 'react-router'
import { Footer } from '@/components/Footer'
import { NavPill } from '@/components/NavPill'
import { InteractiveToggle } from '@/scene/InteractiveToggle'

/** Classic mode: the dark pages with the footer and the floating nav. */
export function ClassicLayout() {
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <main className="mx-auto max-w-6xl px-6 pt-8 md:pt-12">
        <Outlet />
      </main>
      <Footer />
      <NavPill homeLabel="Home" extra={<InteractiveToggle label="Interactive" />} />
    </div>
  )
}
