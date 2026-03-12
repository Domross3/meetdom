import type { Course, Discipline, DisciplineMeta, SemesterGroup } from '@/types'

const SEMESTER_ORDER: Record<string, number> = {
  Winter: 1,
  'Spring/Summer': 2,
  Fall: 3,
}

// ─── Discipline metadata ───────────────────────────────────────────────────
export const DISCIPLINES: DisciplineMeta[] = [
  {
    slug: 'cs',
    label: 'Computer Science',
    key: 'CS',
    description: 'Systems, algorithms, AI, and the craft of building software.',
    colorClass: 'bg-blue-50 text-blue-700',
    barColor: '#3b82f6',
    requiredCredits: 55,
  },
  {
    slug: 'cogsci',
    label: 'Cognitive Science',
    key: 'CogSci',
    description: 'How the mind works — spanning computational cognition, decision-making, and behavior.',
    colorClass: 'bg-violet-50 text-violet-700',
    barColor: '#7c3aed',
    requiredCredits: 27,
  },
  {
    slug: 'business',
    label: 'Business',
    key: 'Business',
    description: 'Finance, strategy, organizational leadership, and markets.',
    colorClass: 'bg-amber-50 text-amber-700',
    barColor: '#d97706',
    requiredCredits: 19,
  },
  {
    slug: 'philosophy',
    label: 'Philosophy',
    key: 'Philosophy',
    description: 'Ethics, mind, and the philosophy of emerging technology.',
    colorClass: 'bg-rose-50 text-rose-700',
    barColor: '#e11d48',
    requiredCredits: 15,
  },
  {
    slug: 'entrepreneurship',
    label: 'Entrepreneurship',
    key: 'Entrepreneurship',
    description: 'Venture creation, leadership, and finding the right problem.',
    colorClass: 'bg-orange-50 text-orange-700',
    barColor: '#ea580c',
    requiredCredits: 15,
  },
  {
    slug: 'extracurricular',
    label: 'Extracurricular',
    key: 'Extracurricular',
    description: "The courses that don't fit a box — and are better for it.",
    colorClass: 'bg-slate-100 text-slate-600',
    barColor: '#64748b',
    requiredCredits: 0,
  },
]

// Keyed lookup for O(1) access in components
export const DISCIPLINE_COLORS: Record<Discipline, { bg: string; text: string }> = {
  CS: { bg: 'bg-blue-50', text: 'text-blue-700' },
  CogSci: { bg: 'bg-violet-50', text: 'text-violet-700' },
  Business: { bg: 'bg-amber-50', text: 'text-amber-700' },
  Philosophy: { bg: 'bg-rose-50', text: 'text-rose-700' },
  Entrepreneurship: { bg: 'bg-orange-50', text: 'text-orange-700' },
  Extracurricular: { bg: 'bg-slate-100', text: 'text-slate-600' },
}

// ─── Filter helpers ────────────────────────────────────────────────────────

export function filterByDiscipline(courses: Course[], discipline: Discipline): Course[] {
  return courses.filter((c) => c.disciplines.includes(discipline))
}

export function groupBySemester(courses: Course[]): SemesterGroup[] {
  const map: Record<string, SemesterGroup> = {}

  for (const course of courses) {
    const key = `${course.year}-${SEMESTER_ORDER[course.semester] ?? 0}`
    if (!map[key]) {
      map[key] = {
        label: `${course.semester} ${course.year}`,
        semester: course.semester,
        year: course.year,
        sortKey: course.year * 10 + (SEMESTER_ORDER[course.semester] ?? 0),
        courses: [],
      }
    }
    map[key].courses.push(course)
  }

  return Object.values(map).sort((a, b) => a.sortKey - b.sortKey)
}

export function getDisciplineBySlug(slug: string): DisciplineMeta | undefined {
  return DISCIPLINES.find((d) => d.slug === slug)
}
