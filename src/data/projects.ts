import type { Discipline } from '@/types'

export interface Project {
  id: string
  title: string
  tagline: string
  description: string
  details?: string
  tags: string[]
  disciplines: Discipline[]
  status: 'in-progress' | 'completed' | 'paused'
  startDate: string // YYYY-MM format for sorting
  images?: { src: string; caption?: string }[]
  link?: string
  repo?: string
  resources?: { label: string; url: string }[]
}

export const projects: Project[] = [
  {
    id: 'modus-ai',
    title: 'Modus AI',
    tagline: 'Socratic tutor that guides without giving answers',
    description:
      'An AI-powered Socratic tutor that leverages lecture transcripts to provide personalized guidance. Modus refuses to give direct answers, instead asking targeted questions to help students work through confusion. It also surfaces confusion patterns to professors so they can see where students struggle most.',
    details:
      'Born out of an AI hackathon, Modus AI is now in its pilot phase. It integrates directly with Canvas and automatically syncs with new lecture uploads. When a student asks about a topic, Modus pinpoints exactly where in the lecture that topic was discussed, linking them back to the source material. The system tracks patterns in student confusion across a class, giving professors a real-time dashboard of where their teaching might need reinforcement.',
    tags: ['AI', 'NLP', 'Canvas API', 'React'],
    disciplines: ['CS', 'CogSci', 'Entrepreneurship'],
    status: 'in-progress',
    startDate: '2026-03',
    resources: [
      { label: 'Pitch Deck', url: 'https://docs.google.com/presentation/d/11lgXRZc30GgV8F2prJc1EvT_9jU7GWyydpai0XFF-uY/edit?usp=sharing' },
    ],
    images: [{ src: '/projects/modus-1.png', caption: 'The Modus team (left to right): Me, James, Antonio, and Hermann' }],
  },
  {
    id: 'cartwise',
    title: 'Cartwise',
    tagline: 'Recipe-driven shopping lists that match your dietary goals',
    description:
      'A platform that lets you build shopping lists by selecting recipes aligned with your dietary goals. Currently working on integrating store APIs to make the jump from list to checkout seamless — pick your recipes, and Cartwise handles the rest.',
    tags: ['Full-Stack', 'APIs', 'React'],
    disciplines: ['CS', 'CogSci', 'Entrepreneurship'],
    status: 'in-progress',
    startDate: '2026-02',
    link: 'https://trycartwise.com',
    images: [],

  },
  {
    id: 'education-portfolio',
    title: 'This Website',
    tagline: 'Interactive education portfolio and project showcase',
    description:
      'A personal portfolio built with React and Vite, featuring an interactive timeline of coursework, discipline deep-dives, and a project showcase. Deployed on Vercel with serverless backend capabilities for future complexity.',
    tags: ['React', 'Vite', 'Tailwind', 'Vercel'],
    disciplines: ['CS'],
    status: 'in-progress',
    startDate: '2026-03',
    images: [],

  },
  {
    id: 'solstove',
    title: 'SolStove',
    tagline: 'Clean cooking solutions for underprivileged communities',
    description:
      'A startup providing clean cooking alternatives to communities that typically cook over open wood fires, which lead to adverse respiratory and health outcomes. Served as finance lead, helping the team secure $5,500 in grant funding from the University of Michigan.',
    details:
      'Currently on pause — I\'m a finite being focused on other projects and a rigorous academic schedule. I love this team and am excited for what\'s next.',
    tags: ['Finance', 'Grant Writing', 'Impact'],
    disciplines: ['Business', 'Entrepreneurship'],
    status: 'paused',
    startDate: '2025-01',
    resources: [
      { label: 'LinkedIn post from Impact Studio', url: 'https://www.linkedin.com/posts/1-in-3-people-globally-cook-over-open-fires-share-7402428748479791105-mSht' },
      { label: 'Entrepreneurial Leadership Program', url: 'https://cfe.umich.edu/launch/entrepreneurial-leadership-program/' },
      { label: 'Professor Grace Hsia Haberl', url: 'https://www.linkedin.com/in/gracehsiahaberl/' },
    ],
    images: [
      { src: '/projects/solstove-1.png', caption: 'Last day of the Entrepreneurial Leadership Program with our professor, Grace Hsia Haberl' },
      { src: '/projects/solstove-2.png', caption: 'BCG visit — this one looks like it belongs in a commercial somewhere' },
      { src: '/projects/solstove-3.png', caption: 'Pitching to BCG consultants who were generous enough to give us feedback on our venture' },
      { src: '/projects/solstove-4.png', caption: 'A truly beautiful moment captured by Lecture Capture where we all hit the pose from that one Weezer album' },
    ],

  },
]
