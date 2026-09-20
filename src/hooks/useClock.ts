import { useEffect, useState } from 'react'

/** Formatted local time in the given IANA time zone, refreshed every 15 s. */
export function useClock(timeZone: string) {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 15_000)
    return () => window.clearInterval(id)
  }, [])
  return new Intl.DateTimeFormat('en-SG', { hour: 'numeric', minute: '2-digit', timeZone }).format(now)
}
