import { cn } from '@/lib/cn'
import { useSiteStore } from '@/store/useSiteStore'
import { useAudioStore } from '@/store/useAudioStore'

interface InteractiveToggleProps {
  className?: string
  /** start the music when switching to the room and pause it when leaving (off on the welcome gate) */
  controlsAudio?: boolean
}

/** "Interactive" ON/OFF switch: on = the room, off = classic pages. */
export function InteractiveToggle({ className, controlsAudio = true }: InteractiveToggleProps) {
  const mode = useSiteStore((s) => s.mode)
  const setMode = useSiteStore((s) => s.setMode)
  const play = useAudioStore((s) => s.play)
  const pause = useAudioStore((s) => s.pause)
  const on = mode === 'interactive'
  const toggle = () => {
    const next = on ? 'classic' : 'interactive'
    setMode(next, true)
    if (!controlsAudio) return
    if (next === 'interactive') void play()
    else pause()
  }
  return (
    <span className={cn('interactive-toggle', on && 'is-on', className)}>
      <span className="interactive-toggle-label">Interactive Mode (3D)</span>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label="Interactive mode"
        title={on ? 'Switch to the classic pages' : 'Switch to the interactive room'}
        onClick={toggle}
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
