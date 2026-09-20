import type { Entry, Tag, Topic } from './types'
import { career } from './career'
import { projects } from './projects'
import { events } from './events'

export const entriesByTopic: Record<Topic, Entry[]> = { career, projects, events }

export function filterEntries(entries: Entry[], filters: Tag[]): Entry[] {
  if (filters.length === 0) return entries
  return entries.filter((e) => e.tags.some((t) => filters.includes(t)))
}

/** Photos for an entry: `photos` wins, `image` is the legacy single hero. */
export const entryPhotos = (entry: Entry): string[] => entry.photos ?? (entry.image ? [entry.image] : [])
