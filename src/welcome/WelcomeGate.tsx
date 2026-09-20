import { motion } from 'motion/react'
import { SITE } from '@/config/site.config'
import { Button } from '@/components/Button'
import { Icon } from '@/components/Icon'
import { useClock } from '@/hooks/useClock'
import { InteractiveToggle } from '@/scene/InteractiveToggle'

interface WelcomeGateProps {
  /** whether the interactive room follows (shows the sound hint) */
  interactive: boolean
  onEnter: () => void
}

const stagger = (i: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
})

export function WelcomeGate({ interactive, onEnter }: WelcomeGateProps) {
  const time = useClock(SITE.timeZone)
  return (
    <motion.section
      key="welcome"
      className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-bg px-6 text-center"
      exit={{ opacity: 0, scale: 1.02, transition: { duration: 0.7, ease: 'easeInOut' } }}
      aria-label="Welcome"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 60%, oklch(0.82 0.16 75 / 0.14), transparent 70%), radial-gradient(40% 35% at 20% 20%, oklch(0.6 0.08 250 / 0.12), transparent 70%)',
        }}
      />
      <div className="relative max-w-3xl">
        <motion.h1 {...stagger(0)} className="text-5xl font-medium tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
          {SITE.greeting}
        </motion.h1>
        <motion.p {...stagger(1)} className="mt-6 text-xl text-fg/90 sm:text-2xl md:text-3xl">
          {SITE.taglines[0]}
        </motion.p>
        <motion.p {...stagger(2)} className="mt-2 font-mono text-sm text-muted md:text-base">
          {SITE.taglines[1]}
        </motion.p>
        <motion.div {...stagger(3)} className="mt-12 flex flex-col items-center gap-5">
          <div className="glass flex items-center gap-3 rounded-full py-2 pl-5 pr-3">
            <InteractiveToggle controlsAudio={false} />
          </div>
          <Button onClick={onEnter} className="px-8 py-3.5 text-base" autoFocus>
            Start <Icon name="arrow-right" size={16} />
          </Button>
          <p className="inline-flex items-center gap-2 font-mono text-xs text-muted">
            {interactive ? (
              <>
                <Icon name="speaker" size={14} /> Sound on for the full experience
              </>
            ) : (
              <>
                <Icon name="speaker-off" size={14} /> Classic pages, no music
              </>
            )}
          </p>
        </motion.div>
      </div>
      <p className="absolute bottom-8 font-hud text-[11px] uppercase tracking-[0.2em] text-muted/70">
        {SITE.location} · {time} {SITE.timeZoneLabel}
      </p>
    </motion.section>
  )
}
