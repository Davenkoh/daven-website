import type { CommunityItem, Hobby, Language, SkillGroup, TimelineItem } from './types'

export const timeline: TimelineItem[] = [
  { org: 'Holicay', role: 'Growth & AI Systems Intern', period: '2026', icon: 'H' },
  { org: 'Acai Den', role: 'Co-founder', period: '2022 — 2024', icon: '🫐' },
  { org: 'RedProp @ PropNex', role: 'Account & Sales Assistant', period: '2023 — 2024', icon: 'R' },
  { org: 'Sphere 8', role: 'Marketing & PR Intern', period: '2023', icon: 'S8' },
  { org: 'National University of Singapore', role: 'BComp, Business AI Systems', period: '2025 — 2029', icon: '🎓' },
  { org: 'Ngee Ann Polytechnic', role: 'Diploma in Business (Marketing)', period: '2021 — 2024', icon: 'NP' },
]

/** TODO(Daven): replace with real hobbies and drop photos into public/photos/ */
export const hobbies: Hobby[] = [
  { name: 'Hobby one', caption: 'Replace me in src/data/about.ts', photos: ['/photos/hobby-1-a.jpg', '/photos/hobby-1-b.jpg', '/photos/hobby-1-c.jpg'] },
  { name: 'Hobby two', caption: 'Replace me in src/data/about.ts', photos: ['/photos/hobby-2-a.jpg', '/photos/hobby-2-b.jpg', '/photos/hobby-2-c.jpg'] },
]

/** TODO(Daven): your favourite quote */
export const quote = {
  text: 'The best way to predict the future is to build it.',
  author: 'Replace with your favourite quote',
}

export const languages: Language[] = [
  { code: 'en', flag: '🇸🇬', name: 'English', greeting: 'Hello, welcome in!', level: 'English — native' },
  { code: 'zh', flag: '🇨🇳', name: 'Mandarin', greeting: '你好，欢迎！', level: 'Mandarin — fluent spoken' },
]

export const community: CommunityItem[] = [
  { org: 'The Collective', role: 'Community Builder · student founder network', period: 'Oct 2025 — present' },
  { org: 'NUS Entrepreneurship Society', role: 'External Liaisons Executive, Partnerships', period: 'Aug 2025 — Jan 2026' },
  { org: 'RC4 Entrepreneurship', role: 'Finance Director', period: 'May 2026 — present' },
  { org: 'RC4 Volunteers', role: 'Programmes IC', period: 'May 2026 — present' },
]

export const skills: SkillGroup[] = [
  { label: 'Software & AI', items: ['Python', 'Java', 'R', 'SQL', 'HTML/CSS', 'Django', 'Git', 'Docker', 'AI agent design', 'MCP', 'REST APIs', 'Web scraping', 'Basic computer vision', 'Deployment'] },
  { label: 'Operations', items: ['SOPs & staff training', 'Budgeting & cost control', 'QuickBooks', 'Payroll', 'Inventory systems'] },
  { label: 'Growth & Marketing', items: ['Content & short-form video strategy', 'Copywriting', 'Lead generation', 'GoHighLevel', 'HubSpot', 'TikTok Ads Manager', 'Meta Business Suite', 'Event planning'] },
  { label: 'Design & Media', items: ['Canva', 'CapCut', 'Basic Photoshop', 'Basic Illustrator'] },
  { label: 'Languages', items: ['English', 'Mandarin (fluent spoken)'] },
]

export const aboutIntro =
  'Business & technology builder working across GTM, operations, software and AI. Hands-on business experience from co-founding and operating an F&B business, with growth, sales and customer acquisition. On the technical side, I have built AI systems, automations and software across travel, real estate and F&B.'
