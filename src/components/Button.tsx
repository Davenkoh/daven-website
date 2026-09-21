import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'accent' | 'ghost' | 'pill'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
}

const styles: Record<Variant, string> = {
  primary:
    'inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg transition hover:bg-white active:scale-[0.98]',
  accent:
    'inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-[#1b1408] shadow-[0_10px_30px_rgba(224,166,60,0.35)] transition hover:brightness-110 active:scale-[0.98]',
  ghost:
    'inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-fg/80 transition hover:border-white/25 hover:text-fg',
  pill: 'inline-flex items-center gap-1.5 rounded-full glass px-4 py-2 text-xs font-medium text-fg/90 transition hover:bg-white/10',
}

export function Button({ variant = 'primary', className, type = 'button', ...rest }: ButtonProps) {
  return <button type={type} className={cn(styles[variant], className)} {...rest} />
}
