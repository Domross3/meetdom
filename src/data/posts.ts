export interface Post {
  id: string
  title: string
  subtitle?: string
  date: string // YYYY-MM-DD
  tags?: string[]
  body?: string          // plain text / short blurb shown on the card
  videoUrl?: string      // YouTube embed URL
  resources?: { label: string; url: string }[]
  images?: { src: string; caption?: string }[]
}

export const posts: Post[] = [
  {
    id: 'umich-company-presentation',
    title: 'Company Presentation — University of Michigan',
    subtitle: 'A presentation I gave at UMich.',
    date: '2025-04-01',
    tags: ['Entrepreneurship', 'UMich'],
    videoUrl: 'https://www.youtube.com/embed/jP5Iwq4oaD8?vq=hd2160&rel=0',
  },
]
