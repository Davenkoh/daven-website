import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Icon } from '@/components/Icon'
import type { ComponentProps } from 'react'
import { HobbiesCard } from './cards/HobbiesCard'
import { LanguagesCard } from './cards/LanguagesCard'
import { QuoteCard } from './cards/QuoteCard'

type IconName = ComponentProps<typeof Icon>['name']

interface BentoItemProps {
  title: string
  icon?: IconName
  glyph?: string
  className?: string
  children: ReactNode
}

export function BentoItem({ title, icon, glyph, className, children }: BentoItemProps) {
  return (
    <section className={cn('group flex flex-col rounded-card border border-line bg-card p-5 sm:p-6', className)}>
      <h3 className="mb-5 flex items-center gap-2 text-base text-fg/85">
        {icon ? <Icon name={icon} size={14} /> : <span aria-hidden="true">{glyph}</span>}
        {title}
      </h3>
      {children}
    </section>
  )
}

/** Languages and the quote side by side, then the hobbies across the full width. */
export function Bento() {
  return (
    <div className="mt-10 grid gap-4 md:grid-cols-2">
      <LanguagesCard />
      <QuoteCard />
      <HobbiesCard />
    </div>
  )
}
