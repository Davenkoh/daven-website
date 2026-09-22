import type { Hobby, Language, SkillGroup, TimelineItem } from './types'

export const timeline: TimelineItem[] = [
  { org: 'Holicay', role: 'Growth & AI Systems Intern', period: '2026', icon: 'H', logo: '/logos/holicay.png' },
  { org: 'Acai Den', role: 'Co-founder', period: '2022 – 2024', icon: '🫐' },
  { org: 'RedProp @ PropNex', role: 'Account & Sales Assistant', period: '2023 – 2024', icon: 'R', logo: '/logos/propnex.png' },
  { org: 'Sphere 8', role: 'Marketing & PR Intern', period: '2023', icon: 'S8' },
  { org: 'National University of Singapore', role: 'BComp, Business AI Systems', period: '2025 – 2029', icon: '🎓', logo: '/logos/nus.png' },
  { org: 'Ngee Ann Polytechnic', role: 'Diploma in Business (Marketing)', period: '2021 – 2024', icon: 'NP', logo: '/logos/ngee-ann.png' },
]

/** TODO(Daven): replace with real hobbies and drop photos into public/photos/ */
export const hobbies: Hobby[] = [
  { name: 'Hobby one', caption: 'Replace me in src/data/about.ts', photos: ['/photos/hobby-1-a.jpg', '/photos/hobby-1-b.jpg', '/photos/hobby-1-c.jpg'] },
  { name: 'Hobby two', caption: 'Replace me in src/data/about.ts', photos: ['/photos/hobby-2-a.jpg', '/photos/hobby-2-b.jpg', '/photos/hobby-2-c.jpg'] },
]

/** TODO(Daven): your favourite quote */
export const quote = {
  text: 'I will either find a way or make one.',
  author: 'Hannibal Barca',
}

export const languages: Language[] = [
  { code: 'en', flag: '🇸🇬', name: 'English', greeting: 'Hello, welcome in!', level: 'English · native' },
  { code: 'zh', flag: '🇨🇳', name: 'Mandarin', greeting: '你好，欢迎！', level: 'Mandarin · fluent spoken' },
]

export const skills: SkillGroup[] = [
  {
    label: 'Software & AI',
    items: [
      { name: 'Python', icon: '/logos/tools/python.svg' },
      { name: 'Java', icon: '/logos/tools/java.svg' },
      { name: 'R', icon: '/logos/tools/r.svg' },
      { name: 'SQL', icon: '/logos/tools/postgresql.svg' },
      { name: 'HTML/CSS', icon: '/logos/tools/html5.svg' },
      { name: 'Django', icon: '/logos/tools/django.svg' },
      { name: 'Git', icon: '/logos/tools/git.svg' },
      { name: 'Docker', icon: '/logos/tools/docker.svg' },
      { name: 'AI agent design', mark: 'AI', colour: '#6dbf8a' },
      { name: 'MCP', icon: '/logos/tools/modelcontextprotocol.svg' },
      { name: 'REST APIs', mark: 'API', colour: '#5fa8d8' },
      { name: 'Web scraping', mark: '{ }', colour: '#e0a63c' },
      { name: 'OpenCV', icon: '/logos/tools/opencv.svg' },
      { name: 'Computer vision', mark: 'CV', colour: '#5fa8d8' },
      { name: 'Deployment', mark: '▲', colour: '#f2f2f2' },
    ],
  },
  {
    label: 'Operations',
    items: [
      { name: 'SOPs & staff training', mark: 'SOP', colour: '#e5705a' },
      { name: 'Budgeting & cost control', mark: '$', colour: '#6dbf8a' },
      { name: 'QuickBooks', icon: '/logos/tools/quickbooks.svg' },
      { name: 'Payroll', mark: 'PAY', colour: '#e0a63c' },
      { name: 'Inventory systems', mark: 'INV', colour: '#5fa8d8' },
    ],
  },
  {
    label: 'Growth & Marketing',
    items: [
      { name: 'Short-form video strategy', mark: '▶', colour: '#e5705a' },
      { name: 'Copywriting', mark: '✎', colour: '#e0a63c' },
      { name: 'Lead generation', mark: '⇢', colour: '#6dbf8a' },
      { name: 'GoHighLevel', icon: '/logos/tools/gohighlevel.png' },
      { name: 'HubSpot', icon: '/logos/tools/hubspot.svg' },
      { name: 'TikTok Ads Manager', icon: '/logos/tools/tiktok.svg' },
      { name: 'Meta Business Suite', icon: '/logos/tools/meta.svg' },
      { name: 'Event planning', mark: 'EV', colour: '#e5705a' },
    ],
  },
  {
    label: 'Design & Media',
    items: [
      { name: 'Canva', icon: '/logos/tools/canva.svg' },
      { name: 'CapCut', icon: '/logos/tools/capcut.svg' },
      { name: 'Photoshop', icon: '/logos/tools/photoshop.svg' },
      { name: 'Illustrator', icon: '/logos/tools/illustrator.svg' },
    ],
  },
  {
    label: 'Languages',
    items: [
      { name: 'English', mark: 'EN', colour: '#f2f2f2' },
      { name: 'Mandarin (fluent spoken)', mark: '中', colour: '#e5705a' },
    ],
  },
]

export const aboutIntro =
  'Business & technology builder working across GTM, operations, software and AI. Hands-on business experience from co-founding and operating an F&B business, with growth, sales and customer acquisition. On the technical side, I have built AI systems, automations and software across travel, real estate and F&B.'
