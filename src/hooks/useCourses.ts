import { useMemo } from 'react'
import type { Discipline, SemesterGroup } from '@/types'
import courses from '@/data/courses'
import { filterByDiscipline, groupBySemester } from '@/utils/courseHelpers'

export function useCourses() {
  return courses
}

export function useCoursesByDiscipline(disciplineKey: Discipline | '') {
  return useMemo(
    () => (disciplineKey ? filterByDiscipline(courses, disciplineKey) : []),
    [disciplineKey]
  )
}

export function useCoursesByTimeline(): SemesterGroup[] {
  return useMemo(() => groupBySemester(courses), [])
}
