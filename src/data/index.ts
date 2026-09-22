import type { Entry, Topic } from './types'
import { career } from './career'
import { education } from './education'
import { projects } from './projects'
import { communities } from './communities'

export const entriesByTopic: Record<Topic, Entry[]> = { career, education, projects, communities }

/** The one-paragraph description on a card: `body`, else the summary (or its first line). */
export const entryBlurb = (entry: Entry): string | undefined => entry.body ?? (Array.isArray(entry.summary) ? entry.summary[0] : entry.summary)

/** Photos for an entry: `photos` wins, `image` is the legacy single hero. */
export const entryPhotos = (entry: Entry): string[] => entry.photos ?? (entry.image ? [entry.image] : [])
