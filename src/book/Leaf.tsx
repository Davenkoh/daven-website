import { motion } from 'motion/react'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'
import type { Leaf as LeafData } from './buildPages'
import { PageFace, type PageContext } from './pages/PageFace'
import { cn } from '@/lib/cn'

interface LeafProps {
  leaf: LeafData
  flipped: boolean
  zIndex: number
  isCover: boolean
  isLast: boolean
  ctx: Omit<PageContext, 'side'>
  onNext: () => void
  onPrev: () => void
  onSettled: (index: number) => void
}

const EASE = [0.645, 0.045, 0.355, 1] as const

/** One sheet of the book: a front face (right page) and a back face (left page), rotating on its left edge. */
export function Leaf({ leaf, flipped, zIndex, isCover, isLast, ctx, onNext, onPrev, onSettled }: LeafProps) {
  const reduced = usePrefersReducedMotion()
  return (
    <motion.div
      className={cn('leaf', isCover && 'leaf-cover', isLast && 'leaf-last')}
      style={{ zIndex, transformPerspective: 2200 }}
      initial={false}
      animate={{ rotateY: flipped ? -180 : 0 }}
      transition={reduced ? { duration: 0 } : { duration: 0.75, ease: EASE }}
      onAnimationComplete={() => onSettled(leaf.index)}
    >
      <div className="leaf-face leaf-front" inert={flipped} onClick={onNext}>
        <PageFace page={leaf.front} ctx={{ ...ctx, side: 'right' }} />
      </div>
      <div className="leaf-face leaf-back" inert={!flipped} onClick={onPrev}>
        <PageFace page={leaf.back} ctx={{ ...ctx, side: 'left' }} />
      </div>
    </motion.div>
  )
}
