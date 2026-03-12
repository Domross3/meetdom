export type Discipline =
  | 'CS'
  | 'CogSci'
  | 'Business'
  | 'Philosophy'
  | 'Entrepreneurship'
  | 'Extracurricular'

export type Semester = 'Fall' | 'Winter' | 'Spring/Summer'

export interface Course {
  id: string
  code: string
  name: string
  disciplines: Discipline[]
  semester: Semester
  year: number
  transferCredit: boolean
  shortAnnotation: string
  longAnnotation: string
  imageUrl?: string
  /**
   * Only set on CogSci courses that belong distinctly to one track.
   * Foundational/shared courses leave this undefined — no tag is shown.
   */
  cogSciTrack?: 'Computation' | 'Decision'
  credits: number
}

export interface SemesterGroup {
  label: string
  semester: Semester
  year: number
  sortKey: number
  courses: Course[]
}

export interface DisciplineMeta {
  slug: string
  label: string
  key: Discipline
  description: string
  colorClass: string  // Tailwind classes for badge
  barColor: string    // hex for progress bar (inline style — safe from Tailwind purge)
  requiredCredits: number  // graduation requirement; 0 = no requirement (Extracurricular)
}

export interface DisciplineProgress extends DisciplineMeta {
  progress: number  // 0–1
  count: number
  total: number
}
