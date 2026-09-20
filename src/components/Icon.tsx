import type { SVGProps } from 'react'

type IconName =
  | 'speaker'
  | 'speaker-off'
  | 'lamp'
  | 'rain'
  | 'play'
  | 'pause'
  | 'next'
  | 'close'
  | 'arrow-right'
  | 'arrow-left'
  | 'eye'
  | 'copy'
  | 'external'

const paths: Record<IconName, React.ReactNode> = {
  speaker: (
    <>
      <path d="M11 5 6 9H2v6h4l5 4z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
      <path d="M18.5 5.5a9 9 0 0 1 0 13" />
    </>
  ),
  'speaker-off': (
    <>
      <path d="M11 5 6 9H2v6h4l5 4z" />
      <path d="m22 9-6 6" />
      <path d="m16 9 6 6" />
    </>
  ),
  lamp: (
    <>
      <path d="M8 2h8l4 10H4z" />
      <path d="M12 12v6" />
      <path d="M8 22h8" />
    </>
  ),
  rain: (
    <>
      <path d="M20 16.6A5 5 0 0 0 18 7h-1.3A7 7 0 1 0 6 15.3" />
      <path d="M8 19v2" />
      <path d="M12 17v4" />
      <path d="M16 19v2" />
    </>
  ),
  play: <path d="M7 4v16l13-8z" />,
  pause: (
    <>
      <path d="M7 4h3v16H7z" />
      <path d="M14 4h3v16h-3z" />
    </>
  ),
  next: (
    <>
      <path d="M5 4v16l10-8z" />
      <path d="M19 4v16" />
    </>
  ),
  close: (
    <>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </>
  ),
  'arrow-right': (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  'arrow-left': (
    <>
      <path d="M19 12H5" />
      <path d="m11 18-6-6 6-6" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  copy: (
    <>
      <rect x="9" y="9" width="12" height="12" rx="2" />
      <path d="M5 15V5a2 2 0 0 1 2-2h10" />
    </>
  ),
  external: (
    <>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </>
  ),
}

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName
  size?: number
}

export function Icon({ name, size = 16, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {paths[name]}
    </svg>
  )
}
