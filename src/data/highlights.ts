/**
 * "How I got here": the one-page journey shown after Start (interactive) and on the classic home page.
 * `*emphasis*` or `**emphasis**` inside text is rendered bold in the section colour.
 */
export interface HighlightPhoto {
  src: string
  alt?: string
  /** show the whole image inside the tile instead of cropping it (screenshots, whiteboards) */
  fit?: 'contain'
  /** CSS object-position for cropped tiles, e.g. 'center 25%' keeps the top of a portrait */
  focus?: string
}

export interface HighlightFigure {
  /** one photo (a grid tile), or two sharing this caption (side by side, or stacked) */
  photos: HighlightPhoto[]
  caption: string
  /** 'full' = one image on its own row at natural shape; 'stack' = full-width images stacked */
  layout?: 'full' | 'stack'
}

export type HighlightBlock =
  | { type: 'p'; text: string }
  | { type: 'results'; items: string[] }
  | { type: 'subhead'; text: string; sub?: string }
  | { type: 'photos'; figures: HighlightFigure[] }

export interface HighlightSection {
  id: string
  /** label in the left column: a year, or NOW */
  year: string
  title: string
  colour: string
  blocks: HighlightBlock[]
}

export const highlightsHeader = {
  greeting: "Aloha! I'm Daven",
  role: 'Business × Tech',
  photo: { src: '/portraits/daven.webp', alt: 'Daven, sitting on an office chair' },
  cue: 'Follow my journey',
}

export const highlightsClosing = {
  thanks: '*Thanks for following my journey. Have fun exploring my workspace.*',
}

const P = '/photos/highlights'

export const highlights: HighlightSection[] = [
  {
    id: 'acai',
    year: '2022',
    title: 'Co-founding my first business: Acai Den',
    colour: '#e0a63c',
    blocks: [
      {
        type: 'p',
        text: 'At 18, I co-founded Acai Den, an açaí café at Ngee Ann, with no idea where to start or how to keep a business thriving. *I learned by asking people who knew more than me, getting my hands dirty, failing, and trying again.* I fell in love with the process of figuring things out.',
      },
      { type: 'results', items: ['~S$200K revenue', '~30% net margin', '~20 people hired and trained'] },
      {
        type: 'photos',
        figures: [
          { photos: [{ src: `${P}/acai-queue.webp` }], caption: 'The average queue outside Acai Den' },
          { photos: [{ src: `${P}/acai-food.webp` }], caption: 'Our product' },
          { photos: [{ src: `${P}/acai-film-crew.webp`, focus: 'center 55%' }], caption: 'Acai Den gaining media attention' },
          { photos: [{ src: `${P}/acai-newspaper.webp` }], caption: 'Acai Den featured in a local newspaper' },
          {
            photos: [{ src: `${P}/acai-start.webp`, fit: 'contain' }],
            caption: 'Where it all started: the first whiteboard working out how to start a business from scratch',
          },
          { photos: [{ src: `${P}/acai-pitch.webp` }], caption: 'The pitch that won our kickstarter grant' },
        ],
      },
    ],
  },
  {
    id: 'noc',
    year: '2026',
    title: "My NOC Vietnam May '26 key experiences",
    colour: '#e5705a',
    blocks: [
      { type: 'subhead', text: 'Holicay Internship, a trip planning app startup in Ho Chi Minh (under NOC)' },
      {
        type: 'p',
        text: "Holicay's biggest business problem was getting a constant stream of customers. I created an *AI content production system*, with a human steering the copywriting, it outputs a TikTok post in 10 minutes, from research to design to posting. *Combining AI systems with GTM strategy.*",
      },
      { type: 'results', items: ['1M+ views across the first few videos'] },
      {
        type: 'photos',
        figures: [
          {
            photos: [{ src: `${P}/holicay-tiktok-1.webp` }, { src: `${P}/holicay-tiktok-2.webp` }],
            caption: 'TikTok results produced by the AI system',
            layout: 'stack',
          },
          { photos: [{ src: `${P}/holicay-architecture.webp` }], caption: 'AI content engine architecture', layout: 'full' },
        ],
      },
      { type: 'subhead', text: 'Agentic AI Build Week, largest Agentic AI hackathon in ASEAN (First runner-up)' },
      {
        type: 'p',
        text: "During NOC in Ho Chi Minh, four teammates and I joined the Agentic AI Build Week Hackathon and walked into an industry new to us. We built a real-time airport-operations dashboard with an AI agent that identifies understaffed zones and recommends where to redeploy staff. *I identified the user needs, designed the user experience, and led our pitch to the Chairman of Sovico Holdings and Vietjet's Head of Operations.*",
      },
      { type: 'results', items: ['First runner-up in the Aviation Track at an event with 400 teams from 55 countries'] },
      {
        type: 'photos',
        figures: [
          { photos: [{ src: `${P}/buildweek-pitch.webp` }], caption: "Pitching to the Chairman of Sovico Holdings and Vietjet's Head of Operations" },
          { photos: [{ src: `${P}/buildweek-product.webp`, fit: 'contain' }], caption: 'The airport-operations dashboard' },
          { photos: [{ src: `${P}/buildweek-winner.webp` }], caption: 'Winner photo with Sovico Holdings & Vietjet' },
          { photos: [{ src: `${P}/buildweek-group.webp`, focus: 'center 78%' }], caption: 'Team photo' },
          { photos: [{ src: `${P}/buildweek-architecture.webp` }], caption: 'Sentinel architecture', layout: 'full' },
        ],
      },
    ],
  },
  {
    id: 'ideate',
    year: '2025',
    title: 'NUS Ideate 2025: Engineering Hackathon (Semi-Finalist)',
    colour: '#5fa8d8',
    blocks: [
      {
        type: 'p',
        text: 'I engineered OrcaVision, a smart-glasses prototype that uses computer vision to help visually impaired users avoid obstacles. I had one month to build it, despite having never touched engineering or the software and hardware involved. I learned by finding mentors, experimenting, failing, and trying again. The experience reinforced my love for tech and taught me my favourite quote: *“I will either find a way or make one.”*',
      },
      {
        type: 'photos',
        figures: [
          {
            photos: [{ src: `${P}/ideate-product.webp`, focus: 'center 25%' }, { src: `${P}/ideate-building.webp` }],
            caption: 'Prototyping hardware and software I never touched',
          },
          { photos: [{ src: `${P}/ideate-pitch.webp` }], caption: 'Demo day' },
          { photos: [{ src: `${P}/ideate-team.webp`, focus: 'center 45%' }], caption: 'Meet the team' },
          { photos: [{ src: `${P}/ideate-poster.webp` }], caption: 'OrcaVision product specs', layout: 'full' },
        ],
      },
    ],
  },
  {
    id: 'community',
    year: 'NOW',
    title: 'My community: NUS Entrepreneurship Society, The Collective and RC4 Entrepreneurship',
    colour: '#6dbf8a',
    blocks: [
      {
        type: 'p',
        text: '*I love staying connected with the entrepreneurship community, connecting people, and helping where I can.* Entrepreneurship communities once gave me opportunities, connections, and experiences that shaped me. Today, I help create those moments for other students through events. Here are some notable events I helped co-organise:',
      },
      {
        type: 'subhead',
        text: 'Korea University (KU) × NUS Founder Mixer @ Seoul (w/ The Collective)',
        sub: 'Brought together 20 Crimson KU startup founders and 20 NUS students.',
      },
      {
        type: 'photos',
        figures: [
          { photos: [{ src: `${P}/ku-nus.webp` }], caption: 'KU × NUS Student Founders Exchange in Seoul' },
          { photos: [{ src: `${P}/ku-nus-emcee.webp` }], caption: 'Emceeing at Korea University' },
        ],
      },
      {
        type: 'subhead',
        text: 'Founders Across Campus (w/ NUS Entre Society)',
        sub: 'Brought together 80 founders from NUS, NTU, SMU and SUTD in collaboration with StartupX.',
      },
      {
        type: 'photos',
        figures: [
          { photos: [{ src: `${P}/fac-emcee.webp` }], caption: 'Emceeing Founders Across Campus' },
          { photos: [{ src: `${P}/fac-crowd.webp` }], caption: '80 founders from four universities in one room' },
        ],
      },
      {
        type: 'subhead',
        text: 'The Collective Pitch Night',
        sub: '8 student startups, a S$1,000 prize from Hacktron, and judges from Antler and alumni from YC Startup School.',
      },
      {
        type: 'photos',
        figures: [{ photos: [{ src: `${P}/pitch-night.webp` }, { src: `${P}/pitch-night-2.webp` }], caption: 'The Collective Pitch Night' }],
      },
      {
        type: 'subhead',
        text: 'NOC × iDP Sharing @ RC4',
        sub: 'Brought together 11 speakers including NOC staff (Jeene New), 9 NOC alumni and an iDP professor, with 90 sign ups.',
      },
      {
        type: 'photos',
        figures: [{ photos: [{ src: `${P}/noc-idp-group.webp` }, { src: `${P}/noc-idp.webp`, focus: 'center 50%' }], caption: 'NOC × iDP Sharing at RC4' }],
      },
    ],
  },
  {
    id: 'why',
    year: 'NOW',
    title: 'Why I chose to study Business AI Systems, a technical degree, after a Business Marketing Diploma',
    colour: '#e0a63c',
    blocks: [
      {
        type: 'p',
        text: 'To solve bigger problems and build businesses with greater impact, I needed technical skills. So I chose to study at the intersection of technology and business, my two passions.',
      },
      {
        type: 'p',
        text: 'Building at the intersection of Business × Tech is work I enjoy. Today, I am continuing to advance my AI content pipeline, helping businesses turn content into more views and customers.',
      },
    ],
  },
]
