export type Tag = 'GTM' | 'Operations' | 'Software & AI'
export const TAGS: readonly Tag[] = ['GTM', 'Operations', 'Software & AI']

/** One room colour per category: lamp amber, rug red, window blue. `paper` is the darker ink for light backgrounds. */
export const TAG_COLOURS: Record<Tag, { dark: string; paper: string }> = {
  GTM: { dark: '#e0a63c', paper: '#b57a14' },
  Operations: { dark: '#e5705a', paper: '#b8452f' },
  'Software & AI': { dark: '#5fa8d8', paper: '#2c72a8' },
}

export type Topic = 'career' | 'education' | 'projects' | 'communities'
export const TOPICS: readonly Topic[] = ['career', 'education', 'projects', 'communities']

export type Mode = 'interactive' | 'classic'

export interface EntryMeta {
  label: string
  value: string
  href?: string
}

export interface EntryLink {
  label: string
  href: string
}

/** A labelled piece at the end of the detail dialog: one image (architecture, spec) or a deck of slides. */
export interface EntryFigure {
  label: string
  src?: string
  /** slide images shown inline with arrows */
  slides?: string[]
}

export interface Entry {
  slug: string
  title: string
  subtitle?: string
  org?: string
  location?: string
  period?: string
  tags: Tag[]
  /** hero image (kept for backwards compatibility; prefer `photos`) */
  image?: string
  /** photos on the card and in the detail dialog: the first is the cover */
  photos?: string[]
  logo?: string
  /** Initials or emoji used when there is no logo image */
  icon?: string
  meta?: EntryMeta[]
  /** the one-paragraph description on the gallery card (falls back to `summary`) */
  body?: string
  /** "Summary" in the detail dialog: a paragraph or bullet points */
  summary?: string | string[]
  context?: string
  /** highest-impact item */
  impact?: string
  result?: string
  description?: string
  /** "The full story" in the detail dialog */
  bullets?: string[]
  /** "Tech Stack" in the detail dialog */
  stack?: string[]
  /** Architecture, Product Spec, Pitch Deck… */
  figures?: EntryFigure[]
  links?: EntryLink[]
  status?: string
}

export interface Track {
  id: string
  title: string
  /** record side letter, shown as "Title (Side A)" */
  side?: string
  artist: string
  src: string
  colour: string
}

export interface TimelineItem {
  org: string
  role: string
  period: string
  logo?: string
  icon?: string
  href?: string
}

export interface Hobby {
  name: string
  caption?: string
  photos: string[]
}

export interface Language {
  code: string
  flag: string
  name: string
  greeting: string
  level: string
}

export interface SkillItem {
  name: string
  /** svg/png path under public/ */
  icon?: string
  /** 1–3 character lettermark when there is no logo */
  mark?: string
  /** lettermark colour */
  colour?: string
}

export interface SkillGroup {
  label: string
  items: SkillItem[]
}
