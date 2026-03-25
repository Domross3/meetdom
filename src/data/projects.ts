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
  pinned?: boolean
  preview?: string
  linkCaveats?: string
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
    tagline: 'Interactive education portfolio with AI-style site search',
    description:
      'A personal portfolio built with React and Vite, featuring an interactive timeline of coursework, discipline deep-dives, a project showcase, and a natural-language search experience that points visitors to the most relevant pages about me. Deployed on Vercel with room to grow into more advanced backend or AI features later.',
    details:
      'The search experience is currently powered by a lightweight client-side retrieval layer over the site\'s structured content. It tokenizes and expands user questions, ranks relevant projects, disciplines, courses, and key pages, then returns a short synthesized answer with direct links into the site. The current stack keeps the experience fast and grounded in real site content, while leaving a clean seam for a future LLM-backed upgrade.',
    tags: ['React', 'Vite', 'Tailwind', 'Retrieval Search', 'Vercel'],
    disciplines: ['CS'],
    status: 'in-progress',
    startDate: '2026-03',
    images: [],

  },
  {
    id: 'resume-bot',
    title: 'Resume Tailorer',
    tagline: 'Creating a well-formatted and effective PDF resume when given a master resume and a job description',
    pinned: true,
    preview: 'I hated tailoring resumes so much I decided to spend hours building a bot that could do it for me. If you\'re a recruiter reading this, it\'s likely the resume I used to apply was with this bot.',
    description:
      'I hated tailoring resumes so much I decided to spend hours building a bot that could do it for me. If you\'re a recruiter reading this, it\'s likely the resume I used to apply was with this bot. Given LLM\'s several annoying failures, like formatting issues, going over a page, hallucinating data, word redundancy, etc. I decided to make a multi-agent program while having Codex and Claude compete using their own API keys with a budget of five dollars. Claude took off early on and Codex was never able to quite catch up. When each hit a plateau I decided to let them switch projects and Codex helped Claude but Claude\'s assistance couldn\'t save Codex, so I pivoted to just focus on Claude from then on. What I could\'ve tried, but didn\'t feel like it, was switching APIs on the project (so Codex working with Anthropic\'s API and vice versa) but given the difference in the two outputs at that point I hypothesize it wouldn\'t make a significant difference.',
    details:
      'This project is a Python-based multi-agent resume tailoring system that uses five specialized bots coordinated through a shared Pydantic PipelineState object and a deterministic render pipeline. The Analyzer bot reads the target job description and extracts structured priorities like skills, key phrases, and ranking signals; the Mapper bot rewrites and reorders resume content so it aligns semantically with the role while preserving factual truth; the Pruner bot compresses the mapped draft to fit a one-page constraint by trimming low-value content and tightening bullets; the Critic bot audits the result for factual drift, numerical errors, proper noun mismatches, and keyword coverage; and the Formatter bot is a non-LLM, purely programmatic renderer that converts the final structured draft into a polished single-page PDF using ReportLab. Around those agents, the system adds deterministic Python guardrails for things like project retention, number parity, malformed output cleanup, duplicate project normalization, and test-render page counting so the final output is both tailored and structurally safe.',
    tags: ['Python', 'Multi-Agent', 'Pydantic', 'ReportLab', 'Claude API'],
    disciplines: ['CS', 'CogSci', 'Entrepreneurship'],
    status: 'in-progress',
    startDate: '2026-03',
    repo: 'https://github.com/Domross3/job-bot-claude',
    link: 'https://resumeforge-lmgr.onrender.com/',
    linkCaveats: 'Note: The app was trained around a specific master resume format, takes a while to cold-start on Render\'s free tier, and will only work while I have enough API credits allocated.',
    resources: [
      { label: 'Master Resume (AI-generated)', url: 'https://drive.google.com/file/d/1IR1iDrWcm-cBlvdL-KogVUy9LH43mu0M/view?usp=sharing' },
      { label: 'Sample Tailored Resume', url: 'https://drive.google.com/file/d/1Y92DirU1rd3Fo8O3KG8yghDj9PjJ3_FF/view?usp=sharing' },
      { label: 'Sample Job Description', url: 'https://drive.google.com/file/d/1cttnJhfZgZ96ubZAYfFXZZhgF8XqK4C4/view?usp=sharing' },
    ],
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
