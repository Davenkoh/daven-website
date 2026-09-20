import type { Page } from '../buildPages'
import type { Topic } from '@/data/types'
import { CoverPage, BackCoverPage } from './CoverPage'
import { InsidePage } from './InsidePage'
import { TocPage } from './TocPage'
import { EntryPage } from './EntryPage'
import { BlankPage } from './BlankPage'

export interface PageContext {
  topic: Topic
  side: 'left' | 'right'
  /** category chips at the bottom of entry pages (career and projects only) */
  showTags: boolean
  goToPage: (pageIndex: number) => void
}

/** Renders one page face by kind. */
export function PageFace({ page, ctx }: { page: Page; ctx: PageContext }) {
  switch (page.kind) {
    case 'cover':
      return <CoverPage topic={page.topic} />
    case 'back':
      return <BackCoverPage topic={page.topic} ctx={ctx} />
    case 'inside':
      return <InsidePage topic={page.topic} count={page.count} showTags={ctx.showTags} />
    case 'toc':
      return <TocPage page={page} ctx={ctx} />
    case 'entry':
      return <EntryPage entry={page.entry} number={page.number} side={ctx.side} showTags={ctx.showTags} />
    case 'blank':
      return <BlankPage number={page.number} side={ctx.side} />
  }
}
