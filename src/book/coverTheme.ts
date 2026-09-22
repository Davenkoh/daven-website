import type { Topic } from '@/data/types'

export const COVER_THEME: Record<Topic, { bg: string; ink: string; accent: string; soft: string }> = {
  career: { bg: 'linear-gradient(165deg, #dff1e6 0%, #b9dcc6 100%)', ink: '#173d2c', accent: '#2f8a58', soft: 'rgba(47,138,88,0.18)' },
  education: { bg: 'linear-gradient(165deg, #e4efff 0%, #c2d7f5 100%)', ink: '#1c3559', accent: '#2c72a8', soft: 'rgba(44,114,168,0.18)' },
  projects: { bg: 'linear-gradient(165deg, #f1e9ff 0%, #d9c8f5 100%)', ink: '#3b2a6e', accent: '#7a5bd8', soft: 'rgba(122,91,216,0.18)' },
  communities: { bg: 'linear-gradient(165deg, #ffe9d6 0%, #f5c9a3 100%)', ink: '#5a2e14', accent: '#e07a2f', soft: 'rgba(224,122,47,0.2)' },
}
