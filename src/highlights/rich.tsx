import type { ReactNode } from 'react'

/** Renders `*emphasis*` and `**emphasis**` spans bold in the given colour; everything else as plain text. */
export function rich(text: string, colour: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, i) => {
    if (part.length > 2 && part.startsWith('*') && part.endsWith('*')) {
      const trim = part.startsWith('**') ? 2 : 1
      return (
        <strong key={i} style={{ color: colour }}>
          {part.slice(trim, -trim)}
        </strong>
      )
    }
    return <span key={i}>{part}</span>
  })
}
