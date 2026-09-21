import type { ReactNode } from 'react'

/** Renders `**bold**` spans in the given colour; everything else as plain text. */
export function rich(text: string, colour: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={i} style={{ color: colour }}>
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  )
}
