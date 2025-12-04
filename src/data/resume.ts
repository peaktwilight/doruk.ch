export interface TimelineItem {
  title: string
  organization: string
  period: string
  type?: string
  description?: string
  items?: string[]
}

export interface Language {
  name: string
  level: string
  proficiency: number // 1-3
}

export const education: TimelineItem[] = [
  {
    title: 'BSc Computer Science - Design & Management',
    organization: 'FHNW',
    period: '2024 — Present',
    type: 'Part-time',
    description: 'Continuing BSc in Computer Science with a focus on Design & Management'
  },
  {
    title: 'Trinational KTUR Summer School Entrepreneurship',
    organization: 'FHNW / Uni Freiburg / Uni Strasbourg',
    period: '2025',
    type: '2 ECTS',
    description: 'Cross-border entrepreneurship program across Switzerland, Germany, and France. Business model development, pitching, and market analysis.'
  },
  {
    title: 'BSc Computer Science',
    organization: 'ETH Zürich',
    period: '2021 — 2024',
    type: 'Full-time',
    description: 'Pursuing a BSc in Computer Science at Switzerland\'s leading technical university'
  },
  {
    title: 'Applied Mathematics & Physics',
    organization: 'MNG Rämibühl',
    period: '2017 — 2021',
    description: 'High-school education (Matura) with a focus on applied mathematics and physics'
  },
  {
    title: 'Euler Mathematics Certification Programme',
    organization: 'EPFL',
    period: '2014 — 2017',
    description: 'Completed the Euler Mathematics Certification Programme, deepening knowledge of mathematics and physics in parallel to secondary education'
  }
]

export const experience: TimelineItem[] = [
  {
    title: 'Cyber Defense Engineer',
    organization: 'Migros-Genossenschaft-Bund',
    period: '2024 — Present',
    type: 'Part-time',
    items: [
      'Working in the Security Operations Center at MGB Security & Risk',
      'Developing security monitoring and incident response tools for analysts',
      'Centralised log management and automation of security processes',
      'Integrating SIEM, SOAR, and EDR systems across partner companies'
    ]
  },
  {
    title: 'Web Developer & Software Engineer',
    organization: 'MrBrunch',
    period: '2024 — 2025',
    type: 'Part-time',
    items: [
      'Complete front-end redesign of the MrBrunch online store',
      'Optimized webshop loading times by 5 seconds (8.3s → 3.3s)',
      'Implemented AI-based chatbot for customer support',
      'Created interactive cost-calculator for B2B customers'
    ]
  },
  {
    title: 'Co-Founder / Web Developer / Mix & Master Engineer',
    organization: 'Soothe Studios',
    period: '2022 — 2025',
    type: 'Part-time',
    items: [
      'Co-founded the first in-house mix & mastering studio for a lofi record label',
      'Designed and built the Soothe Studios website (English & French)',
      'Mixed and mastered 150+ tracks for Soothe Records and independent artists'
    ]
  },
  {
    title: 'Freelance Consultant / Head Community Moderator',
    organization: 'Sleep Tales',
    period: '2022 — 2024',
    type: 'Freelance',
    items: [
      'Consultancy services from idea to foundation of the company',
      'Advised on strategic label-wide decisions and PR implications',
      'Built the Discord server and helped organize live digital events'
    ]
  },
  {
    title: 'Art Director / Community Manager / Bot Developer',
    organization: 'Sleep Tales',
    period: '2021 — 2022',
    type: 'Part-time',
    items: [
      'Conceptualized and optimized the community ecosystem through Discord and Instagram',
      'Implemented Discord bots (Python with Discord API) for community activities',
      'Created branded/promotional assets, animated videos and digital art'
    ]
  },
  {
    title: 'Web Designer / Community Manager',
    organization: 'Dreamhop Music & Studio',
    period: '2021 — 2022',
    type: 'Part-time',
    items: [
      'Designed and built the e-commerce website for an international record label',
      'Integrated vinyl sales with Belgium\'s national postal service API',
      'Optimized WordPress installation for non-technical maintenance'
    ]
  },
  {
    title: 'Co-Founder / Web Developer',
    organization: 'Soothe Records',
    period: '2020 — Present',
    type: 'Part-time',
    items: [
      'Curated, coordinated and promoted a music label with 100M+ streams',
      'Designed and built the Soothe Records website, one of the first lofi label sites',
      'Executed dozens of music ad campaigns using A/B testing across platforms',
      'Managing international staff and artist roster featuring over 100 artists'
    ]
  }
]

export const languages: Language[] = [
  { name: 'English', level: 'Native', proficiency: 3 },
  { name: 'French', level: 'Native', proficiency: 3 },
  { name: 'Turkish', level: 'Native', proficiency: 3 },
  { name: 'German', level: 'C1', proficiency: 2 },
  { name: 'Swiss German', level: 'B2', proficiency: 1 }
]

export const achievements = [
  { icon: 'trophy-outline', text: 'FHNW Startup Challenge - 2nd Place (TTStats)' },
  { icon: 'shield-checkmark-outline', text: 'Swimlane SOAR Certified' },
  { icon: 'logo-github', text: 'Open Source Contributor' },
  { icon: 'trophy-outline', text: 'Math Olympiad Semi-Finalist' },
  { icon: 'musical-notes-outline', text: 'Piano "Mention Excellence"' }
]
