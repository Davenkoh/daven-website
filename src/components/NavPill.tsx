import { Fragment, type ReactNode } from 'react'
import { NavLink } from 'react-router'
import { cn } from '@/lib/cn'
import { SITE } from '@/config/site.config'

interface NavPillProps {
  /** Label for the "/" link (Home in classic mode, Room in the scene) */
  homeLabel?: string
  /** Extra controls rendered after the divider (e.g. the mode switch) */
  extra?: ReactNode
  className?: string
}

const Divider = () => <span className="mx-0.5 h-6 w-px shrink-0 bg-white/10 sm:mx-1" aria-hidden="true" />

/** Preston-style floating navigation pill, fixed bottom-centre. */
export function NavPill({ homeLabel = 'Home', extra, className }: NavPillProps) {
  return (
    <nav
      aria-label="Primary"
      className={cn(
        'pointer-events-none fixed inset-x-0 bottom-5 z-50 flex justify-center px-3 pb-[env(safe-area-inset-bottom)] sm:bottom-6',
        className,
      )}
    >
      <div className="pointer-events-auto flex max-w-full items-center gap-0.5 overflow-x-auto rounded-full border border-white/10 bg-black/70 p-1 shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl [scrollbar-width:none] sm:gap-1 sm:p-1.5">
        {SITE.pages.map((p) => (
          <Fragment key={p.to}>
            <NavLink
              to={p.to}
              end={p.to === '/'}
              className={({ isActive }) =>
                cn(
                  'whitespace-nowrap rounded-full px-2.5 py-2 text-[13px] transition sm:px-4 sm:text-sm',
                  isActive ? 'bg-white/12 font-medium text-fg' : 'text-fg/60 hover:text-fg',
                )
              }
            >
              {p.to === '/' ? homeLabel : p.label}
            </NavLink>
            {/* the room / home link stands apart from the topics */}
            {p.to === '/' && <Divider />}
          </Fragment>
        ))}
        <Divider />
        {extra}
      </div>
    </nav>
  )
}
