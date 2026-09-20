import type { Topic } from '@/data/types'

export const SITE = {
  name: 'Daven Koh',
  fullName: 'Daven Koh Shao Jun',
  shortName: 'Daven',
  role: 'Business x Tech',
  title: 'Daven Koh | Business x Tech',
  description:
    'Daven Koh — business and technology builder working across GTM, operations, software and AI.',
  greeting: "Aloha! I'm Daven",
  taglines: ['Business x Tech', 'GTM · Operations · Software · AI'] as const,
  summary: 'I build and grow businesses & the systems behind them.',
  location: 'Singapore',
  timeZone: 'Asia/Singapore',
  timeZoneLabel: 'SGT',
  email: 'Davenkoh3@gmail.com',
  resumeUrl: '/Daven-Koh-Resume.pdf',
  /** TODO(Daven): replace with the real video-intro link */
  videoIntroUrl: 'https://www.youtube.com/',
  socials: [
    { label: 'LinkedIn', href: 'https://linkedin.com/in/daven-koh' },
    { label: 'GitHub', href: 'https://github.com/Davenkoh' },
    { label: 'Email', href: 'mailto:Davenkoh3@gmail.com' },
  ],
  pages: [
    { label: 'Home', to: '/' },
    { label: 'Career', to: '/career' },
    { label: 'Projects', to: '/projects' },
    { label: 'Events', to: '/events' },
    { label: 'About', to: '/about' },
  ],
} as const

export const TOPIC_LABEL: Record<Topic, string> = {
  career: 'Career',
  projects: 'Projects',
  events: 'Events I organised',
}

export const TOPIC_BLURB: Record<Topic, string> = {
  career: 'Where I have worked, built and studied.',
  projects: 'Things I have shipped, hacked together and pitched.',
  events: 'Rooms I have filled with founders, students and friends.',
}

/** Which vinyl track plays when a topic opens (ids from data/tracks.ts). */
export const TOPIC_TRACK: Record<Topic, string> = {
  career: 'track-1',
  projects: 'track-2',
  events: 'track-3',
}

/** Below this width (or on touch-only devices) the site defaults to classic mode. */
export const CLASSIC_BREAKPOINT = 900
