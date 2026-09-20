export type Tag = 'GTM' | 'Operations' | 'Software' | 'AI'
export const TAGS: readonly Tag[] = ['GTM', 'Operations', 'Software', 'AI']

export type Topic = 'career' | 'projects' | 'events'
export const TOPICS: readonly Topic[] = ['career', 'projects', 'events']

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

export interface Entry {
  slug: string
  title: string
  subtitle?: string
  org?: string
  location?: string
  period?: string
  tags: Tag[]
  image?: string
  logo?: string
  /** Initials or emoji used when there is no logo image */
  icon?: string
  meta?: EntryMeta[]
  description?: string
  bullets?: string[]
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

export interface CommunityItem {
  org: string
  role: string
  period: string
  href?: string
}

export interface SkillGroup {
  label: string
  items: string[]
}
