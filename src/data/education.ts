import type { Entry } from './types'

const P = '/photos/education'
const C = '/photos/covers'

export const education: Entry[] = [
  {
    slug: 'nus',
    title: 'Bachelor of Computing, Business AI Systems',
    subtitle: 'National University of Singapore | School of Computing',
    org: 'NUS',
    location: 'Singapore',
    period: 'Aug 2025 – May 2029 (expected)',
    tags: ['Software & AI'],
    icon: '🎓',
    logo: '/logos/nus.png',
    cover: `${C}/nus.webp`,
    photos: [`${P}/nus-sign.webp`],
    body: 'A technical degree at the intersection of business and AI, chosen after a business diploma.',
    summary: "GPA 4.88 / 5.00, Dean's List.",
    bullets: [
      'Residential College 4, a systems-thinking residential programme.',
      'NUS Overseas Colleges (NOC) Vietnam in 2026 and a winter exchange at Korea University in Seoul.',
    ],
  },
  {
    slug: 'ngee-ann',
    title: 'Diploma in Business Studies (Marketing)',
    subtitle: 'Ngee Ann Polytechnic | Minor in Entrepreneurship',
    org: 'Ngee Ann Polytechnic',
    location: 'Singapore',
    period: 'Apr 2021 – Feb 2024',
    tags: ['GTM'],
    icon: 'NP',
    logo: '/logos/ngee-ann.png',
    cover: `${C}/ngee-ann.webp`,
    photos: [`${P}/ngee-ann-graduation.webp`],
    body: 'Business studies with a marketing specialisation and a minor in entrepreneurship.',
    summary: "GPA 3.88 / 4.00, Director's List, and Top in Marketing Communications.",
    bullets: ['Where I first heard founders talk about building something from nothing, and co-founded Acai Den on campus.'],
  },
]
