import { writeStorage } from './storage'

export const HIGHLIGHTS_KEY = 'daven.highlightsSeen'

/**
 * A visitor who arrives on a deep link (any page but the room itself, e.g. /contact) goes straight
 * to that page; the journey waits behind the "My Highlights" button. Evaluated once per page load.
 */
export const DEEP_LINKED = typeof window !== 'undefined' && window.location.pathname !== '/'
if (DEEP_LINKED) writeStorage('session', HIGHLIGHTS_KEY, '1')
