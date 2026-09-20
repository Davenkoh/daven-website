import type { Entry, Topic } from '@/data/types'

export interface TocItem {
  title: string
  subtitle?: string
  number: number
  /** index into the flat pages array */
  pageIndex: number
}

export type Page =
  | { kind: 'cover'; id: string; topic: Topic }
  | { kind: 'inside'; id: string; topic: Topic; count: number }
  | { kind: 'toc'; id: string; number: number; items: TocItem[]; part: number; parts: number }
  | { kind: 'entry'; id: string; number: number; entry: Entry }
  | { kind: 'blank'; id: string; number?: number }
  | { kind: 'back'; id: string; topic: Topic }

export interface Leaf {
  id: string
  index: number
  front: Page
  back: Page
}

export interface Book {
  pages: Page[]
  leaves: Leaf[]
  /** page index of the first table-of-contents page */
  tocPageIndex: number
}

const TOC_PER_PAGE = 12

/** Lays out cover → inside cover → TOC → one entry per page → back cover, as leaves (front/back). */
export function buildBook(topic: Topic, entries: Entry[]): Book {
  const tocPages = Math.max(1, Math.ceil(entries.length / TOC_PER_PAGE))
  const firstEntryNumber = tocPages + 1
  const firstEntryPageIndex = 2 + tocPages

  const entryPages: Page[] = entries.map((entry, i) => ({
    kind: 'entry',
    id: `entry:${entry.slug}`,
    number: firstEntryNumber + i,
    entry,
  }))

  const tocItems: TocItem[] = entries.map((entry, i) => ({
    title: entry.title,
    subtitle: entry.period ?? entry.subtitle,
    number: firstEntryNumber + i,
    pageIndex: firstEntryPageIndex + i,
  }))

  const toc: Page[] = Array.from({ length: tocPages }, (_, part) => ({
    kind: 'toc',
    id: `toc:${part}`,
    number: part + 1,
    items: tocItems.slice(part * TOC_PER_PAGE, (part + 1) * TOC_PER_PAGE),
    part: part + 1,
    parts: tocPages,
  }))

  const content: Page[] = [...toc, ...entryPages]
  // cover + inside + content + back must be an even count so the back cover is a leaf's back face
  if (content.length % 2 === 0) content.push({ kind: 'blank', id: 'blank:pad' })

  const pages: Page[] = [
    { kind: 'cover', id: 'cover', topic },
    { kind: 'inside', id: 'inside', topic, count: entries.length },
    ...content,
    { kind: 'back', id: 'back', topic },
  ]

  const leaves: Leaf[] = []
  for (let i = 0; i < pages.length; i += 2) {
    leaves.push({ id: `${pages[i].id}|${pages[i + 1].id}`, index: i / 2, front: pages[i], back: pages[i + 1] })
  }
  return { pages, leaves, tocPageIndex: 2 }
}

/** How many leaves must be flipped for `pageIndex` to be visible in the spread. */
export const currentForPage = (pageIndex: number) => Math.ceil(pageIndex / 2)
