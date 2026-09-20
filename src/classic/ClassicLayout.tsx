import { Link, Outlet } from 'react-router'
import { Footer } from '@/components/Footer'
import { NavPill } from '@/components/NavPill'
import { Icon } from '@/components/Icon'
import { InteractiveToggle } from '@/scene/InteractiveToggle'

interface ClassicLayoutProps {
  /** true when the visitor is in interactive mode and this page sits on top of the room (e.g. /about) */
  roomAvailable?: boolean
}

export function ClassicLayout({ roomAvailable = false }: ClassicLayoutProps) {
  return (
    <div className="min-h-dvh bg-bg text-fg">
      {roomAvailable && (
        <div className="mx-auto max-w-6xl px-6 pt-6">
          <Link to="/" className="inline-flex items-center gap-2 font-hud text-xs text-muted transition hover:text-fg">
            <Icon name="arrow-left" size={14} /> Back to the room
          </Link>
        </div>
      )}
      <main className={roomAvailable ? 'mx-auto max-w-6xl px-6 pt-12 md:pt-16' : 'mx-auto max-w-6xl px-6 pt-20 md:pt-28'}>
        <Outlet />
      </main>
      <Footer />
      <NavPill homeLabel={roomAvailable ? 'Room' : 'Home'} extra={<InteractiveToggle />} />
    </div>
  )
}
