import type { Entry, Topic } from './types'
import { career } from './career'
import { education } from './education'
import { projects } from './projects'
import { communities } from './communities'

export const entriesByTopic: Record<Topic, Entry[]> = { career, education, projects, communities }

/** Photos for an entry: `photos` wins, `image` is the legacy single hero. */
export const entryPhotos = (entry: Entry): string[] => entry.photos ?? (entry.image ? [entry.image] : [])
