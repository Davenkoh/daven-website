import { Icon } from '@/components/Icon'
import type { ComponentProps } from 'react'

type IconName = ComponentProps<typeof Icon>['name']

interface HudButtonProps {
  icon: IconName
  label: string
  pressed?: boolean
  onClick?: () => void
}

export function HudButton({ icon, label, pressed, onClick }: HudButtonProps) {
  return (
    <button type="button" className="hud-btn" aria-label={label} title={label} aria-pressed={pressed} onClick={onClick}>
      <Icon name={icon} size={15} />
    </button>
  )
}
