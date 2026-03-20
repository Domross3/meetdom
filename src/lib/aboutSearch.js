import courses from '@/data/courses'
import { projects } from '@/data/projects'
import { DISCIPLINES } from '@/utils/courseHelpers'

const STOP_WORDS = new Set([
  'a',
  'an',
  'and',
  'any',
  'are',
  'about',
  'at',
  'be',
  'been',
  'by',
  'can',
  'could',
  'did',
  'do',
  'does',
  'dom',
  'ever',
  'for',
  'from',
  'has',
  'have',
  'he',
  'her',
  'him',
  'his',
  'how',
  'i',
  'in',
  'is',
  'it',
  'me',
  'my',
  'of',
  'on',
  'or',
  'should',
  'show',
  'some',
  'tell',
  'that',
  'the',
  'to',
  'was',
  'what',
  'which',
  'who',
  'with',
  'would',
  'you',
  'your',
])

const QUERY_EXPANSIONS = {
  ai: ['artificial', 'intelligence', 'machine', 'learning', 'nlp'],
  ml: ['machine', 'learning', 'ai'],
  startup: ['venture', 'entrepreneurship', 'founder', 'business'],
  startups: ['venture', 'entrepreneurship', 'founder', 'business'],
  entrepreneur: ['startup', 'venture', 'entrepreneurship', 'business'],
  entrepreneurship: ['startup', 'venture', 'founder', 'business'],
  business: ['finance', 'strategy', 'market', 'venture'],
  cs: ['computer', 'science', 'software', 'coding', 'algorithms'],
  coding: ['software', 'programming', 'computer', 'science'],
  cognitive: ['cognition', 'mind', 'behavior', 'decision', 'psychology'],
  cogsci: ['cognitive', 'science', 'mind', 'behavior', 'psychology'],
  psychology: ['behavior', 'mind', 'decision', 'cognitive'],
  mind: ['cognitive', 'science', 'behavior', 'psychology'],
  philosophy: ['ethics', 'mind', 'reasoning'],
  projects: ['project', 'building'],
  classes: ['courses', 'course', 'timeline'],
  course: ['courses', 'class', 'timeline'],
  courses: ['course', 'class', 'timeline'],
  resume: ['cv', 'background', 'experience'],
  // tech skills
  react: ['javascript', 'frontend', 'web', 'jsx', 'ui', 'component'],
  javascript: ['react', 'frontend', 'web', 'js', 'typescript'],
  typescript: ['javascript', 'react', 'frontend', 'web'],
  frontend: ['react', 'javascript', 'web', 'ui', 'component'],
  python: ['programming', 'machine', 'learning', 'data', 'software'],
  web: ['react', 'javascript', 'frontend', 'ui'],
  software: ['programming', 'coding', 'computer', 'engineering'],
  // experience / background queries
  experience: ['projects', 'background', 'skills', 'work', 'built'],
  skill: ['projects', 'background', 'experience', 'work'],
  skills: ['projects', 'background', 'experience', 'work'],
  background: ['experience', 'projects', 'courses', 'resume'],
  built: ['projects', 'building', 'experience'],
  work: ['projects', 'experience', 'building'],
}

const DISCIPLINE_ALIASES = {
  CS: ['computer science', 'software', 'engineering', 'coding', 'algorithms'],
  CogSci: ['cognitive science', 'mind', 'behavior', 'psychology', 'decision-making'],
  Business: ['business', 'finance', 'strategy', 'markets'],
  Philosophy: ['philosophy', 'ethics', 'reasoning', 'mind'],
  Entrepreneurship: ['entrepreneurship', 'venture', 'startup', 'founder'],
  Extracurricular: ['extracurricular', 'elective', 'interest'],
}

const intentBoosts = {
  project: ['project', 'projects', 'build', 'building', 'startup', 'startups', 'experience', 'skill', 'skills', 'work', 'built'],
  course: ['course', 'courses', 'class', 'classes', 'study', 'studied', 'learn', 'learning'],
  discipline: ['discipline', 'major', 'minor', 'focus', 'focused'],
  page: ['resume', 'contact', 'email', 'linkedin', 'background'],
}

function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s/-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function tokenize(text) {
  return normalize(text)
    .split(' ')
    .filter(Boolean)
}

function unique(values) {
  return [...new Set(values.filter(Boolean))]
}

function expandQueryTokens(tokens) {
  const expanded = new Set(tokens)

  for (const token of tokens) {
    const related = QUERY_EXPANSIONS[token]
    if (!related) continue

    for (const synonym of related) {
      expanded.add(synonym)
    }
  }

  return [...expanded]
}

function buildProjectDoc(project) {
  const statusLabel = project.status.replace('-', ' ')
  const resourceLabels = project.resources
    ? project.resources.map((resource) => resource.label).join(' ')
    : ''

  return {
    id: `project:${project.id}`,
    type: 'project',
    status: project.status,
    title: project.title,
    href: `/projects/${project.id}`,
    summary: project.tagline,
    description: `${project.description} Status: ${statusLabel}.`,
    body: [
      project.title,
      project.tagline,
      project.description,
      project.details,
      statusLabel,
      project.tags.join(' '),
      project.disciplines.join(' '),
      resourceLabels,
    ]
      .filter(Boolean)
      .join(' '),
    chips: unique([statusLabel, ...project.tags, ...project.disciplines]),
  }
}

function buildDisciplineDoc(discipline) {
  const relatedProjects = projects
    .filter((project) => project.disciplines.includes(discipline.key))
    .map((project) => project.title)

  const relatedCourses = courses
    .filter((course) => course.disciplines.includes(discipline.key))
    .slice(0, 10)
    .map((course) => course.name)

  return {
    id: `discipline:${discipline.slug}`,
    type: 'discipline',
    title: discipline.label,
    href: `/discipline/${discipline.slug}`,
    summary: discipline.description,
    description: `${relatedProjects.length} related projects and ${relatedCourses.length} sampled courses.`,
    body: [
      discipline.label,
      discipline.description,
      DISCIPLINE_ALIASES[discipline.key]?.join(' '),
      relatedProjects.join(' '),
      relatedCourses.join(' '),
    ]
      .filter(Boolean)
      .join(' '),
    chips: unique([discipline.key, discipline.label, ...DISCIPLINE_ALIASES[discipline.key]]),
  }
}

function buildCourseDoc(course) {
  const primaryDiscipline = course.disciplines[0]
  const discipline = primaryDiscipline
    ? DISCIPLINES.find((item) => item.key === primaryDiscipline)
    : undefined

  return {
    id: `course:${course.id}`,
    type: 'course',
    title: `${course.code} · ${course.name}`,
    href: discipline ? `/discipline/${discipline.slug}` : '/timeline',
    summary: course.shortAnnotation,
    description: course.longAnnotation || `${course.semester} ${course.year}`,
    body: [
      course.code,
      course.name,
      course.shortAnnotation,
      course.longAnnotation,
      course.semester,
      String(course.year),
      course.disciplines.join(' '),
    ]
      .filter(Boolean)
      .join(' '),
    chips: unique([course.semester, String(course.year), ...course.disciplines]),
  }
}

function buildPageDocs() {
  return [
    {
      id: 'page:timeline',
      type: 'page',
      title: 'Timeline',
      href: '/timeline',
      summary: 'A semester-by-semester view of classes, progression, and academic context.',
      description: 'Best when someone wants the broad story of your education.',
      body: 'timeline coursework classes education semesters progression',
      chips: ['Education', 'Timeline'],
    },
    {
      id: 'page:projects',
      type: 'page',
      title: 'Projects',
      href: '/projects',
      summary: 'A hub for what you are building across AI, product, and entrepreneurship.',
      description: 'Useful when a visitor wants a quick scan of active work.',
      body: 'projects startups building ventures software ai',
      chips: ['Projects', 'Work'],
    },
    {
      id: 'page:resume',
      type: 'page',
      title: 'Resume',
      href: '/resume.pdf',
      summary: 'A concise snapshot of background, experience, and credentials.',
      description: 'Helpful for recruiters or anyone wanting the short version.',
      body: 'resume cv background experience credentials',
      chips: ['Resume', 'Experience'],
    },
  ]
}

const documents = [
  ...projects.map(buildProjectDoc),
  ...DISCIPLINES.map(buildDisciplineDoc),
  ...courses.map(buildCourseDoc),
  ...buildPageDocs(),
].map((doc) => ({
  ...doc,
  normalizedTitle: normalize(doc.title),
  normalizedSummary: normalize(doc.summary),
  normalizedBody: normalize(`${doc.summary} ${doc.description} ${doc.body}`),
  titleTokenSet: new Set(tokenize(doc.title)),
  summaryTokenSet: new Set(tokenize(doc.summary)),
  tokenSet: new Set(tokenize(`${doc.title} ${doc.summary} ${doc.description} ${doc.body}`)),
  chipsTokenSet: new Set(doc.chips.flatMap((chip) => tokenize(normalize(chip)))),
}))

function scoreIntent(type, tokens) {
  const matchingIntent = intentBoosts[type]
  if (!matchingIntent) return 0

  return matchingIntent.some((token) => tokens.includes(token)) ? 4 : 0
}

function scoreDocument(doc, rawQuery, filteredTokens, expandedTokens) {
  let score = scoreIntent(doc.type, filteredTokens)
  const matchedTerms = new Set()

  if (doc.normalizedTitle.includes(rawQuery)) score += 12
  if (doc.normalizedSummary.includes(rawQuery)) score += 8
  if (doc.normalizedBody.includes(rawQuery)) score += 4

  for (const token of expandedTokens) {
    if (doc.titleTokenSet.has(token)) {
      score += 4
      matchedTerms.add(token)
      continue
    }

    if (doc.chipsTokenSet.has(token)) {
      score += 4
      matchedTerms.add(token)
      continue
    }

    if (doc.summaryTokenSet.has(token)) {
      score += 3
      matchedTerms.add(token)
      continue
    }

    if (doc.tokenSet.has(token)) {
      score += 2
      matchedTerms.add(token)
      continue
    }

    if (doc.normalizedBody.includes(token)) {
      score += 1
      matchedTerms.add(token)
    }
  }

  if (doc.type === 'project' && filteredTokens.some((token) => ['current', 'now', 'working', 'active'].includes(token))) {
    if (doc.status === 'in-progress') score += 6
    if (doc.status === 'completed') score += 2
    if (doc.status === 'paused') score -= 2
  }

  if (doc.type === 'discipline' && filteredTokens.some((token) => ['major', 'minor', 'study', 'focus'].includes(token))) {
    score += 3
  }

  if (doc.type === 'page' && filteredTokens.some((token) => ['overview', 'summary', 'background'].includes(token))) {
    score += 2
  }

  return {
    score,
    matchedTerms: [...matchedTerms],
  }
}

function typeLabel(type) {
  switch (type) {
    case 'project':
      return 'Project'
    case 'course':
      return 'Course'
    case 'discipline':
      return 'Discipline'
    default:
      return 'Page'
  }
}

function buildAnswer(query, results) {
  if (!results.length) {
    return "I couldn't find a strong match in the current site content. Try asking about projects, coursework, majors, AI work, or entrepreneurship."
  }

  const topProjects = results.filter((result) => result.type === 'project').slice(0, 2)
  const topCourses = results.filter((result) => result.type === 'course').slice(0, 2)
  const topDiscipline = results.find((result) => result.type === 'discipline')

  if (topProjects.length >= 1 && /project|build|startup|ai|work/.test(query)) {
    if (/ai/.test(query)) {
      return `${topProjects[0].title} is the clearest match for this question. The linked results also surface the surrounding project and discipline pages that add context around that work.`
    }

    return `The strongest project match is ${topProjects[0].title}. The links below also include nearby pages that help explain the broader story around it.`
  }

  if (topCourses.length >= 1 && /course|class|study|learn|education|timeline/.test(query)) {
    return `The best match here is coursework. ${topCourses[0].title} is especially relevant, and the timeline plus related discipline pages give the broader academic context around it.`
  }

  if (topDiscipline) {
    return `This question maps most strongly to ${topDiscipline.title}. The results below pull together the most relevant discipline, project, and coursework links from across the site.`
  }

  return `The best matches span ${results
    .slice(0, 3)
    .map((result) => result.title)
    .join(', ')}. Those links should give the clearest path through the site for this topic.`
}

export function searchSiteContent(query) {
  const normalizedQuery = normalize(query)

  if (!normalizedQuery) {
    return {
      answer: '',
      results: [],
    }
  }

  const queryTokens = tokenize(normalizedQuery)
  const filteredTokens = queryTokens.filter((token) => !STOP_WORDS.has(token))
  const expandedTokens = expandQueryTokens(filteredTokens)

  const scoredAndSorted = documents
    .map((doc) => {
      const { score, matchedTerms } = scoreDocument(doc, normalizedQuery, filteredTokens, expandedTokens)

      return {
        ...doc,
        score,
        matchedTerms,
      }
    })
    .filter((doc) => doc.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)

  const topScore = scoredAndSorted.length > 0 ? scoredAndSorted[0].score : 0
  const confidence = topScore >= 10 ? 'high' : topScore >= 5 ? 'medium' : 'low'

  const ranked = scoredAndSorted.map((doc) => ({
    id: doc.id,
    type: doc.type,
    typeLabel: typeLabel(doc.type),
    title: doc.title,
    href: doc.href,
    summary: doc.summary,
    description: doc.description,
    chips: doc.chips.slice(0, 4),
    matchedTerms: doc.matchedTerms.slice(0, 3),
  }))

  return {
    answer: buildAnswer(normalizedQuery, ranked),
    results: ranked,
    confidence,
  }
}
