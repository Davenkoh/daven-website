import type { Entry } from './types'

const H = '/photos/highlights'
const P = '/photos/projects'

/** 42 slides rendered from the original deck (assets-src/photos-original) */
const SUSS_DECK = Array.from({ length: 42 }, (_, i) => `/docs/suss-brand-challenge-2023/slide-${String(i + 1).padStart(2, '0')}.webp`)

export const projects: Entry[] = [
  {
    slug: 'agentic-ai-build-week',
    title: 'Agentic AI Build Week 2026 Hackathon (First Runner-up)',
    subtitle: 'Ho Chi Minh City',
    org: 'Agentic AI Build Week 2026',
    period: 'Jul 2026',
    tags: ['Software & AI', 'Operations'],
    icon: '✈️',
    cover: '/photos/covers/agentic-ai-build-week.webp',
    photos: [`${H}/buildweek-product.webp`, `${H}/buildweek-pitch.webp`, `${H}/buildweek-winner.webp`, `${H}/buildweek-group.webp`],
    body: 'A real-time airport-operations dashboard with an AI agent that spots understaffed zones and recommends where to move staff.',
    summary: 'A real-time airport-operations dashboard with an AI agent that spots understaffed zones and recommends where to move staff.',
    bullets: [
      'Competed in the Aviation track at an event of 400 teams, 3,000 builders and 55 countries. Built a real-time airport-operations dashboard with an AI staffing agent that flags understaffed zones and recommends where to move staff.',
      "Built in 24 hours in a team of 5. Led the pitch to the Chairman of Sovico Holdings, which owns Vietjet and HDBank, and to Vietjet's Head of Operations.",
    ],
    stack: ['JavaScript (ES modules)', 'HTML + CSS dashboard', 'Postgres + JSON fixtures', 'TinyFish web data', 'EWMA / LSTM / Transformer / GNN forecasting', 'Simulation engine with immutable state', 'Otto Agent governance'],
    figures: [{ label: 'Architecture', src: `${H}/buildweek-architecture.webp` }],
  },
  {
    slug: 'orcavision',
    title: 'NUS Ideate 2025 Hackathon (Semi-finalist)',
    org: 'NUS Ideate 2025',
    period: 'Sep 2025',
    tags: ['Software & AI'],
    icon: '🔧',
    cover: '/photos/covers/orcavision.webp',
    photos: [`${H}/ideate-product.webp`, `${H}/ideate-building.webp`, `${H}/ideate-pitch.webp`, `${H}/ideate-team.webp`],
    body: 'Smart glasses that run computer vision on a Raspberry Pi to help visually impaired users avoid obstacles. Semi-finalist out of 82 teams and 350 students.',
    summary: [
      'Smart glasses that run computer vision on a Raspberry Pi to help visually impaired users avoid obstacles.',
      'Semi-finalist out of 82 teams and 350 students.',
      'Never engineered before, this taught me "I will either find a way or make one".',
    ],
    stack: ['Raspberry Pi Zero 2 W', 'Camera module', 'YOLOv8 (lightweight, ~300 ms end to end)', 'Python + OpenCV', 'Speaker with voice alerts and tones'],
    figures: [{ label: 'Product Spec', src: `${H}/ideate-poster.webp` }],
  },
  {
    slug: 'rc4-laundry-bot',
    title: 'RC4 Laundry & Announcement Telegram Bot',
    org: 'RC4',
    period: 'May 2026 – present',
    tags: ['Software & AI'],
    logo: '/logos/telegram.webp',
    cover: '/photos/covers/rc4-laundry-bot.webp',
    photos: [`${P}/noctua-laundry-bot.webp`],
    body: 'Telegram bot with live washer and dryer status, completion alerts and announcements. Used by 120 active residents.',
    summary: 'Telegram bot with live washer and dryer status, completion alerts and announcements. Used by 120 active residents.',
    stack: ['Python', 'Telegram Bot API', 'JobQueue scheduling (UTC)', 'SQLite (WAL, transactions)', 'Ubuntu VPS on Oracle Cloud', 'systemd auto-restart + backups'],
    figures: [{ label: 'Architecture', src: `${P}/noctua-laundry-bot-architecture.webp` }],
  },
  {
    slug: 'suss-brand-challenge',
    title: 'SUSS Brand Challenge 2023 (First runner-up)',
    org: 'SUSS Brand Challenge',
    period: 'Sep 2023',
    tags: ['GTM'],
    icon: '🏆',
    cover: '/photos/covers/suss-brand-challenge.webp',
    photos: [`${P}/suss-first-runner-up.webp`, `${P}/suss-pitch.webp`, `${P}/suss-brand-challenge.webp`],
    body: "Designed and pitched a go-to-market campaign for Thatz International's new gig-work app.",
    summary: ["Designed and pitched a go-to-market campaign for Thatz International's new gig-work app.", '1st runner-up amongst 10 polytechnic finalist teams'],
    figures: [{ label: 'Pitch Deck', slides: SUSS_DECK }],
  },
]
