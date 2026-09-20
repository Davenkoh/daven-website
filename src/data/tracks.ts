import type { Track } from './types'

/**
 * MP3s live in public/audio/. Keep the ids stable — config/site.config.ts maps topics to track ids.
 * Current tracks: the first 30 minutes of the Lofi Girl jazz mix Daven supplied, as three
 * consecutive 10-minute sides. The original 3-hour file was discarded at Daven's request.
 */
export const tracks: Track[] = [
  { id: 'track-1', title: 'Jazz Lofi', side: 'A', artist: 'Lofi Girl mix · 0–10 min', src: '/audio/track-1.mp3', colour: '#e0a63c' },
  { id: 'track-2', title: 'Jazz Lofi', side: 'B', artist: 'Lofi Girl mix · 10–20 min', src: '/audio/track-2.mp3', colour: '#5fc0b4' },
  { id: 'track-3', title: 'Jazz Lofi', side: 'C', artist: 'Lofi Girl mix · 20–30 min', src: '/audio/track-3.mp3', colour: '#e07a7a' },
]

export const trackLabel = (t: Track) => (t.side ? `${t.title} (Side ${t.side})` : t.title)
