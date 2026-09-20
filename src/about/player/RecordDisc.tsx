import type { CSSProperties } from 'react'
import { cn } from '@/lib/cn'
import type { Record } from './records'

/** A vinyl record: grooves, a coloured label with a marker so spinning is visible. */
export function RecordDisc({ record, spinning, className }: { record: Record; spinning?: boolean; className?: string }) {
  return (
    <div className={cn('record', spinning && 'is-spinning', className)} style={{ '--label': record.colour } as CSSProperties} aria-hidden="true">
      <span className="record-label" />
      <span className="record-hole" />
    </div>
  )
}
