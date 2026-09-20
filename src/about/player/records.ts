export interface Record {
  id: string
  title: string
  artist: string
  src: string
  /** label + sleeve colour */
  colour: string
}

/**
 * The records on the About page player (separate from the room's lofi jazz).
 * Drop MP3s into public/audio/records/ and describe them here.
 */
export const records: Record[] = [
  { id: 'rec-1', title: 'Add your first record', artist: 'public/audio/records/rec-1.mp3', src: '/audio/records/rec-1.mp3', colour: '#e0a63c' },
  { id: 'rec-2', title: 'Add your second record', artist: 'public/audio/records/rec-2.mp3', src: '/audio/records/rec-2.mp3', colour: '#5fa8d8' },
  { id: 'rec-3', title: 'Add your third record', artist: 'public/audio/records/rec-3.mp3', src: '/audio/records/rec-3.mp3', colour: '#e5705a' },
]
