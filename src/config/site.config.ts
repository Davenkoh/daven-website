import type { Topic } from '@/data/types'

export const SITE = {
  name: 'Daven Koh',
  fullName: 'Daven Koh Shao Jun',
  shortName: 'Daven',
  role: 'Business x Tech',
  title: 'Daven Koh | Business x Tech',
  description: 'Daven Koh, a business and technology builder working across GTM, business operations, software and AI systems.',
  greeting: "Aloha! I'm Daven",
  taglines: ['Business x Tech', 'I specialize in GTM, business operations, software & AI systems'] as const,
  summary: 'I build and grow businesses & the systems behind them.',
  location: 'Singapore',
  timeZone: 'Asia/Singapore',
  timeZoneLabel: 'SGT',
  email: 'Davenkoh3@gmail.com',
  resumeUrl: '/Daven-Koh-Resume.pdf',
  socials: [
    { label: 'LinkedIn', href: 'https://linkedin.com/in/daven-koh' },
    { label: 'GitHub', href: 'https://github.com/Davenkoh' },
    { label: 'Email', href: 'mailto:Davenkoh3@gmail.com' },
  ],
  pages: [
    { label: 'Home', to: '/' },
    { label: 'Career', to: '/career' },
    { label: 'Education', to: '/education' },
    { label: 'Projects', to: '/projects' },
    { label: 'Communities', to: '/communities' },
    { label: 'Contact', to: '/contact' },
  ],
} as const

export const TOPIC_LABEL: Record<Topic, string> = {
  career: 'Career',
  education: 'Education',
  projects: 'Projects',
  communities: 'Communities',
}

export const TOPIC_BLURB: Record<Topic, string> = {
  career: 'Where I have worked and built.',
  education: 'Where I have studied, and what I took from it.',
  projects: 'Things I have shipped, hacked together and pitched.',
  communities: 'Rooms I have filled with founders, students and friends.',
}

/** One room colour per category: lamp amber, plant green, window blue, rug red. */
export const TOPIC_COLOURS: Record<Topic, string> = {
  career: '#e0a63c',
  education: '#6dbf8a',
  projects: '#5fa8d8',
  communities: '#e5705a',
}

/** Which vinyl track plays when a topic opens (ids from data/tracks.ts). */
export const TOPIC_TRACK: Record<Topic, string> = {
  career: 'track-1',
  education: 'track-3',
  projects: 'track-2',
  communities: 'track-3',
}

/** Below this width (or on touch-only devices) the site defaults to classic mode. */
export const CLASSIC_BREAKPOINT = 900
