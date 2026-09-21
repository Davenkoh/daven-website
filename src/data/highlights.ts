/**
 * "Business × Tech: how I got here" — the one-page journey shown after Start (interactive) and
 * on the classic home page. `**bold**` inside text is rendered in the section colour.
 */
export interface HighlightPhoto {
  src: string
  caption: string
  alt?: string
  /** very wide screenshots: shown full-width at their natural height */
  wide?: boolean
}

export type HighlightBlock =
  | { type: 'headline'; text: string }
  | { type: 'p'; text: string }
  | { type: 'quote'; text: string }
  | { type: 'stats'; items: string[] }
  | { type: 'list'; items: string[] }
  | { type: 'photos'; photos: HighlightPhoto[] }

export interface HighlightSection {
  id: string
  index: string
  years: string
  /** big label in the left column */
  yearBig: string
  kicker: string
  colour: string
  blocks: HighlightBlock[]
}

export const highlightsHeader = {
  eyebrow: 'GTM · Operations · Software · AI',
  title: 'Business × Tech: how I got here',
  intro: "Here's how I learned each one, starting from zero.",
  cue: 'Follow my journey ↓',
}

export const highlightsClosing = {
  name: 'Daven',
  role: 'Business × Tech',
  tagline: 'GTM · Operations · Software · AI',
  thanks: 'Thanks for following my journey. Have fun exploring my workspace.',
}

const P = '/photos/highlights'

export const highlights: HighlightSection[] = [
  {
    id: 'spark',
    index: '00',
    years: '2021–2022',
    yearBig: '2021',
    kicker: 'The spark: discovering entrepreneurship',
    colour: '#e0a63c',
    blocks: [
      { type: 'headline', text: 'Business gave me the tools. Entrepreneurship gave me a direction.' },
      {
        type: 'p',
        text: "At Ngee Ann Polytechnic, I studied business and specialised in marketing, learning how to understand customers and bring ideas to market. But what inspired me was hearing founders at the Entrepreneurship Office talk about choosing the uncertain path and making something from nothing. I didn't just want to work inside a business. I wanted to build one before I felt ready.",
      },
      {
        type: 'photos',
        photos: [
          { src: `${P}/spark-design-thinking.webp`, caption: 'Learning design thinking for the first time at Ngee Ann Polytechnic.' },
          { src: `${P}/spark-marketing-deck.webp`, caption: 'A brand strategy deck from my marketing classes.' },
        ],
      },
    ],
  },
  {
    id: 'business',
    index: '01',
    years: '2022–2024',
    yearBig: '2022',
    kicker: 'My business era',
    colour: '#e5705a',
    blocks: [
      { type: 'headline', text: 'So I built the closest thing to home.' },
      {
        type: 'p',
        text: "I grew up watching my father run canteen stalls, so food felt like the natural place to start. At 18, I co-founded **Acai Den**, an açaí café at Ngee Ann, with no idea how to price a menu, hire a team or keep a shop alive. I learned by doing (suppliers, student staff, SOPs, payroll, promotions) to serve açaí that students could afford to come back for. I didn't fall in love with F&B. I fell in love with **building, learning and trying**.",
      },
      { type: 'stats', items: ['~S$200K revenue', '~30% net margin', '~20 people hired and trained'] },
      {
        type: 'photos',
        photos: [
          { src: `${P}/acai-start.webp`, caption: 'The first whiteboard: working out how to start a business from scratch.' },
          { src: `${P}/acai-queue.webp`, caption: 'The queue outside Acai Den on a good day.' },
          { src: `${P}/acai-food.webp`, caption: 'The bowls that kept students coming back.' },
          { src: `${P}/acai-newspaper.webp`, caption: 'Acai Den featured in Lianhe Zaobao.' },
        ],
      },
    ],
  },
  {
    id: 'gap',
    index: '02',
    years: '2023–2024',
    yearBig: '2023',
    kicker: 'The gap between business and tech',
    colour: '#5fa8d8',
    blocks: [
      { type: 'headline', text: "I could see the systems I wanted. I couldn't build them yet." },
      {
        type: 'p',
        text: 'Six months with **Sphere 8**, a tech consultancy startup in Bangkok, showed me how small teams use technology to move fast. Back at Acai Den, I kept running into work that should have been easier: scheduling, payroll, inventory, reporting.',
      },
      { type: 'quote', text: 'Business taught me what needed fixing. Technology would let me fix it.' },
      {
        type: 'photos',
        photos: [{ src: `${P}/acai-film-crew.webp`, caption: 'Running the shop while a film crew shot at Acai Den.' }],
      },
    ],
  },
  {
    id: 'tech',
    index: '03',
    years: '2025',
    yearBig: '2025',
    kicker: 'My tech era',
    colour: '#6dbf8a',
    blocks: [
      { type: 'headline', text: 'So I went back to school to learn the other half.' },
      {
        type: 'p',
        text: "I chose **Business Artificial Intelligence Systems at NUS** because it sat right inside that gap. The first real test came at the **IDEATE 2025 hackathon**. I engineered OrcaVision end to end on hardware I'd never touched: smart glasses that use computer vision to help visually impaired users avoid obstacles. It broke completely the day before our demo. We rebuilt it and still reached the semi-finals.",
      },
      { type: 'stats', items: ['Semi-finalist out of 82 teams', 'Working prototype in one month', 'Team of four'] },
      { type: 'stats', items: ['NUS School of Computing', 'GPA 4.88 / 5.00', "Dean's List"] },
      {
        type: 'photos',
        photos: [
          { src: `${P}/ideate-product.webp`, caption: 'OrcaVision on my face: camera, Raspberry Pi and all.' },
          { src: `${P}/ideate-building.webp`, caption: 'Building it on hardware I had never touched.' },
          { src: `${P}/ideate-pitch.webp`, caption: 'Demo day at IDEATE 2025.' },
          { src: `${P}/ideate-team.webp`, caption: 'The team of four with our poster.' },
        ],
      },
    ],
  },
  {
    id: 'vietnam',
    index: '04',
    years: 'May–July 2026',
    yearBig: '2026',
    kicker: 'Business × Tech in Vietnam',
    colour: '#e0a63c',
    blocks: [
      { type: 'headline', text: 'Then both halves met in the real world.' },
      {
        type: 'p',
        text: "Through **NOC Vietnam**, I joined Holicay, a startup in Ho Chi Minh City that helps people plan trips. Holicay grew by working with content creators. But the team did it all by hand: finding creators, sending hundreds of messages and tracking thousands of videos in spreadsheets. For the first time, I understood the business problem and could build the solution myself. I built AI tools to find creators, message them, track results and make short videos. My first version tried to automate everything. The founders told me to keep it simple. So I rebuilt it and let people make the decisions AI wasn't good at.",
      },
      { type: 'quote', text: "The best system isn't the most impressive one. It's the one people actually use." },
      { type: 'stats', items: ['1M+ TikTok views', 'Daily outreach: 4 hours → under 1', 'Monthly reporting: 3 days → 5 minutes'] },
      {
        type: 'photos',
        photos: [
          { src: `${P}/holicay-tiktok-1.webp`, caption: 'The AI-produced TikToks on the Holicay channel.', wide: true },
          { src: `${P}/holicay-tiktok-2.webp`, caption: 'Four posts, over a million views, under US$1 each.', wide: true },
        ],
      },
      { type: 'headline', text: 'The same instinct, compressed into 24 hours.' },
      {
        type: 'p',
        text: "During NOC, four teammates and I joined the **Agentic AI Build Week Hackathon** and walked into an industry new to us. We built a real-time airport-operations dashboard with an AI agent that flags understaffed zones and recommends where to redeploy staff. I led our pitch to the Chairman of Sovico Holdings and Vietjet's Head of Operations. We were first runner-up in the Aviation Track at an event with 400 teams from 55 countries.",
      },
      { type: 'stats', items: ['24 hours', '5 builders', 'Aviation Track first runner-up'] },
      {
        type: 'photos',
        photos: [
          { src: `${P}/buildweek-pitch.webp`, caption: "Pitching to the Chairman of Sovico Holdings and Vietjet's Head of Operations." },
          { src: `${P}/buildweek-product.webp`, caption: 'The airport-operations dashboard and staffing agent.' },
          { src: `${P}/buildweek-winner.webp`, caption: 'First runner-up, Aviation Track.' },
          { src: `${P}/buildweek-group.webp`, caption: 'The team after 24 hours.' },
        ],
      },
    ],
  },
  {
    id: 'community',
    index: '05',
    years: '2025–now',
    yearBig: 'Now',
    kicker: 'Full circle: building community',
    colour: '#e5705a',
    blocks: [
      { type: 'headline', text: 'Someone once opened the door for me. Now I try to hold it open for others.' },
      {
        type: 'p',
        text: 'My path began because founders and mentors made an unfamiliar road feel possible. Through the **NUS Entrepreneurship Society**, **The Collective** and **RC4 Entrepreneurship**, I help create those moments for other students. Some events started with little or no budget, so we had to find partners and earn trust before anyone would show up. Community-building turned out to be its own kind of entrepreneurship.',
      },
      {
        type: 'list',
        items: [
          'Founders Across Campus · 80 founders from NUS, NTU, SMU and SUTD, with StartupX',
          'KU × NUS Founder Mixer, Seoul · ~20 KU founders meet ~20 NUS students',
          'The Collective Pitch Night · 8 student startups, S$1,000 prize from Hacktron',
          'NOC × iDP Sharing · 90 sign-ups, 11 speakers, alumni from 9 NOC locations',
        ],
      },
      {
        type: 'photos',
        photos: [
          { src: `${P}/fac-emcee.webp`, caption: 'Emceeing Founders Across Campus.' },
          { src: `${P}/fac-crowd.webp`, caption: '80 founders from four universities in one room.' },
          { src: `${P}/ku-nus.webp`, caption: 'KU × NUS Student Founders Exchange in Seoul.' },
          { src: `${P}/ku-nus-emcee.webp`, caption: 'On the mic at Korea University.' },
          { src: `${P}/pitch-night.webp`, caption: 'The Collective Pitch Night.' },
          { src: `${P}/noc-idp-group.webp`, caption: 'NOC × iDP Sharing at RC4.' },
        ],
      },
    ],
  },
  {
    id: 'now',
    index: 'NOW',
    years: '',
    yearBig: '→',
    kicker: "What I'm building",
    colour: '#5fa8d8',
    blocks: [
      { type: 'headline', text: 'Business shows me which problems matter. Technology gives me the leverage to solve them.' },
      {
        type: 'p',
        text: "I feel most alive between disciplines: talking to customers, untangling messy operations, building the system and getting it to the people who need it. This is the work I want to keep doing. Right now, I'm building two things: an **automated options trading strategy**, and a **no-slop AI content pipeline** that helps businesses get more views and customers.",
      },
      { type: 'photos', photos: [{ src: `${P}/me.webp`, caption: 'Winter exchange at Korea University, Seoul.' }] },
    ],
  },
]
