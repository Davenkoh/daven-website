import type { Entry } from './types'

const H = '/photos/highlights'
const P = '/photos/career'
const C = '/photos/covers'

export const career: Entry[] = [
  {
    slug: 'holicay',
    title: 'Growth & AI Systems Intern',
    subtitle: 'Holicay | Travel planning app startup',
    org: 'Holicay',
    location: 'Ho Chi Minh City',
    period: 'May – Jul 2026',
    tags: ['GTM', 'Software & AI'],
    icon: 'H',
    logo: '/logos/holicay.png',
    cover: `${C}/holicay.webp`,
    photos: [`${P}/holicay-team.webp`, `${H}/holicay-tiktok-1.webp`, `${H}/holicay-tiktok-2.webp`],
    body: 'Built the AI systems that gave a small startup a steady stream of content, creators and reporting.',
    summary: '1M TikTok views from 4 posts at under US$1 each; daily creator outreach down from ~4 hours to under 1; monthly reporting from 3 days to 5 minutes.',
    bullets: [
      'Built an end-to-end AI content engine spanning topic research, scripting, production and publishing; generated 1M TikTok views from 4 posts at under US$1 each, replacing ~US$100 to commission an influencer.',
      'Set up an AI system for influencer selection, outreach and CRM tracking, handling ~200 cold outreach a week. About 4 hours of manual work a day fell to under 1 hour.',
      'Cut monthly partnership reporting from 3 days of manual data entry to 5 minutes with an AI agent that tracks ~50 influencers and 4,500 videos a month across 3 platforms in the CRM.',
    ],
    figures: [{ label: 'AI content engine architecture', src: `${H}/holicay-architecture.webp` }],
  },
  {
    slug: 'acai-den',
    title: 'Co-founder',
    subtitle: 'Acai Den LLP | Acai bowl food store',
    org: 'Acai Den',
    location: 'Singapore',
    period: 'Nov 2022 – Nov 2024',
    tags: ['GTM', 'Operations'],
    icon: '🫐',
    cover: `${C}/acai-den.webp`,
    photos: [`${H}/acai-film-crew.webp`, `${H}/acai-queue.webp`, `${H}/acai-food.webp`, `${H}/acai-newspaper.webp`, `${H}/acai-start.webp`, `${H}/acai-pitch.webp`],
    body: 'Co-founded and ran an acai bowl store at Ngee Ann Polytechnic for two years.',
    summary: '~S$200k revenue at ~30% net margin; ~20 student staff and a manager hired and trained.',
    bullets: [
      'Grew the business from concept to ~S$200k revenue at ~30% net margin in two years, through two strategic business-model revamps, while leading operations, finance, sales and marketing.',
      'Hired and trained about 20 student staff and a manager over two years, and wrote the SOPs, training, payroll, inventory and cost-control systems.',
      'Pitched and won a S$5,000 start-up grant against 30 teams.',
    ],
  },
  {
    slug: 'redprop',
    title: 'Account & Sales Assistant',
    subtitle: 'RedProp | Real estate team @ PropNex',
    org: 'RedProp',
    location: 'Singapore',
    period: 'Sep 2023 – Jun 2024',
    tags: ['GTM', 'Operations', 'Software & AI'],
    icon: 'R',
    logo: '/logos/propnex.png',
    cover: `${C}/redprop.webp`,
    photos: [`${P}/redprop-office.webp`],
    body: "Turned a real estate team's WhatsApp chats into a working CRM pipeline.",
    summary: '~500 clients sorted by stage in one CRM pipeline, with automated lead capture and follow-up on GoHighLevel and WhatsApp.',
    bullets: [
      'Built automated lead capture and follow-up on GoHighLevel and WhatsApp, converting unstructured chats for ~500 clients into a stage-sorted CRM pipeline.',
    ],
  },
  {
    slug: 'sphere-8',
    title: 'Marketing & PR Intern',
    subtitle: 'Sphere 8 | Technology consultancy startup',
    org: 'Sphere 8',
    location: 'Bangkok',
    period: 'Mar – Aug 2023',
    tags: ['GTM'],
    icon: 'S8',
    body: 'Ran social media and PR for a tech consultancy startup in Bangkok.',
    summary: '+120% social media views in six months, on a six-month Global Entrepreneurial Internship Programme placement.',
    bullets: ['Grew social media views 120% in six months, writing and publishing 60+ posts across 3 social media platforms.'],
  },
]
