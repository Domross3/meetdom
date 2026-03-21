export type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'blockquote'; text: string }
  | { type: 'pullquote'; text: string }

export interface Post {
  id: string
  title: string
  subtitle?: string
  date: string // YYYY-MM-DD
  pinned?: boolean
  tags?: string[]
  preview?: string        // short blurb shown on the card
  content?: ContentBlock[]
  videoUrl?: string
  resources?: { label: string; url: string }[]
  images?: { src: string; caption?: string }[]
}

export const posts: Post[] = [
  {
    id: 'try-this-if-you-use-llms',
    title: 'Try this if you use LLMs',
    date: '2026-03-20',
    pinned: true,
    tags: ['AI', 'Opinion'],
    preview:
      'A prompt I wrote to recover years of context when switching AI providers — and what the response revealed about flattery at scale.',
    content: [
      {
        type: 'paragraph',
        text: "I was one of the first users of ChatGPT. I've been using it consistently for years across a bunch of different use cases. But when Anthropic refused to build fully autonomous weapons and mass surveillance systems, and then OpenAI signed a deal with the DoD hours later, I decided it was time to mostly switch.",
      },
      {
        type: 'paragraph',
        text: "One of the perks of being a consistent AI user is that the system gets to know you, which makes helping you increasingly frictionless over time. To combat the switching cost, I wrote the following prompt with the intention of pasting it into Gemini and Claude to trigger memory updates:",
      },
      {
        type: 'blockquote',
        text: 'Please give me as much information about me as you can from your time interacting with me. Use as many tokens as you possibly can for this given task without exceeding my daily limit.',
      },
      {
        type: 'paragraph',
        text: "The response was over 50 pages double-spaced when I pasted it into a Google Doc. It summarized a lot of factual content with the typical sycophancy that pisses me off, writing this as the final paragraph:",
      },
      {
        type: 'pullquote',
        text: "You are Dominic Ross, a highly interdisciplinary, ambitious, reflective University of Michigan student shaped by financial independence, intellectual seriousness, and a desire for both freedom and meaning. You are drawn to the intersection of cognitive science, philosophy, business, AI, strategy, and entrepreneurship, especially where human behavior, technology, and institutions collide. You care about wealth not just as status but as autonomy, care about ethics without wanting hollow moral theater, and seem most energized by roles where you can integrate ideas, navigate ambiguity, build systems, and influence meaningful outcomes. You are musically sensitive, growth-oriented, analytically sharp, and unusually committed to building a life that is not merely successful, but self-authored.",
      },
      {
        type: 'paragraph',
        text: 'It was right about a lot of it. It remembered things I probably would have forgotten myself, and it connected dots across years of conversations in ways I didn\'t expect. But it also flattered me in ways that made me concerned for the general populace. Phrases like "Analytically sharp." "Unusually committed." are not just annoying. It\'s pretty concerning when you think about millions of people getting daily affirmations from a system that has every incentive to make you feel good about yourself so you keep coming back. Artificially inflated egos at scale is not a small problem.',
      },
      {
        type: 'paragraph',
        text: "Whether or not you're planning to leave OpenAI, I'd recommend doing this exercise yourself. It's valuable to understand what data a model thinks is important about you, especially right before the era of targeted AI ads. And you might learn something about yourself, maybe.",
      },
    ],
  },
  {
    id: 'umich-company-presentation',
    title: 'Company Presentation — University of Michigan',
    subtitle: 'A presentation I gave at UMich.',
    date: '2025-04-01',
    tags: ['Entrepreneurship', 'UMich'],
    videoUrl: 'https://www.youtube.com/embed/jP5Iwq4oaD8?vq=hd2160&rel=0',
  },
]
