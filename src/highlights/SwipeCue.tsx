/** A hand swiping up, on repeat: the "you can scroll" signal at the bottom of the journey panel. */
export function SwipeCue() {
  return (
    <span className="hl-swipe-icon">
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="hl-swipe-hand">
        <path d="M9 11V4.5a1.5 1.5 0 0 1 3 0V11" />
        <path d="M12 10.5V8a1.5 1.5 0 0 1 3 0v3.5" />
        <path d="M15 11.5V10a1.5 1.5 0 0 1 3 0v3" />
        <path d="M18 13v-1a1.5 1.5 0 0 1 3 0v4c0 3.6-2.6 6-6.2 6h-2.3c-2 0-3.6-.8-4.7-2.3L4.2 16.3a1.45 1.45 0 0 1 2.1-2L9 17V11" />
      </svg>
      <span className="hl-swipe-trail" />
    </span>
  )
}
