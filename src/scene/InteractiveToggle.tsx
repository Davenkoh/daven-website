import { cn } from '@/lib/cn'
import { useSiteStore } from '@/store/useSiteStore'

/** "Interactive" ON/OFF switch: on = the room, off = classic pages. Lives in the nav pill. */
export function InteractiveToggle({ className }: { className?: string }) {
  const mode = useSiteStore((s) => s.mode)
  const setMode = useSiteStore((s) => s.setMode)
  const on = mode === 'interactive'
  return (
    <span className={cn('flex items-center gap-2 pl-1 pr-1', className)}>
      <span className="hidden font-hud text-[11px] uppercase tracking-[0.14em] text-fg/70 sm:inline">Interactive</span>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label="Interactive mode"
        title={on ? 'Switch to the classic pages' : 'Switch to the interactive room'}
        onClick={() => setMode(on ? 'classic' : 'interactive', true)}
        className={cn('switch', on && 'is-on')}
      >
        <span className="switch-text" aria-hidden="true">
          {on ? 'ON' : 'OFF'}
        </span>
        <span className="switch-knob" aria-hidden="true" />
      </button>
    </span>
  )
}
