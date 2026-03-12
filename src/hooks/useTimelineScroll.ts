import { useState, useEffect } from 'react'
import type { Discipline, SemesterGroup, DisciplineProgress } from '@/types'
import { DISCIPLINES } from '@/utils/courseHelpers'

/**
 * Tracks which semester is currently in view and computes cumulative discipline
 * progress bars for the Timeline sidebar.
 *
 * Logic:
 *  1. Each SemesterBlock renders with `data-semester-index={i}` on its root element.
 *  2. An IntersectionObserver watches all `[data-semester-index]` elements using a
 *     central band rootMargin, so only elements occupying the main viewport area fire.
 *  3. We track a Set of all currently-intersecting indices. The active semester is
 *     Math.max(...intersecting) — the furthest-down visible semester always "wins",
 *     so progress strictly increases while scrolling down and decreases while scrolling up.
 *  4. For each discipline, progress = courses seen so far / total courses in discipline.
 */
export function useTimelineScroll(semesters: SemesterGroup[]) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!semesters.length) return

    const intersecting = new Set<number>()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = parseInt(
            (entry.target as HTMLElement).dataset.semesterIndex ?? '0',
            10
          )
          if (entry.isIntersecting) {
            intersecting.add(idx)
          } else {
            intersecting.delete(idx)
          }
        })
        // Only update state when something is intersecting — this prevents
        // the progress bars from resetting if the user scrolls between sections.
        if (intersecting.size > 0) {
          setActiveIndex(Math.max(...intersecting))
        }
      },
      {
        // Detection band: fires when an element crosses into the middle 80% of the viewport.
        // Avoids triggering on barely-visible elements at the very top/bottom edges.
        rootMargin: '-10% 0px -10% 0px',
        threshold: 0,
      }
    )

    // Small delay ensures the DOM has painted all SemesterBlocks before we query them.
    const timer = setTimeout(() => {
      document.querySelectorAll('[data-semester-index]').forEach((el) =>
        observer.observe(el)
      )
    }, 100)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [semesters.length])

  // ── Compute cumulative discipline progress (credit-weighted) ──────────────
  const allCourses = semesters.flatMap((s) => s.courses)

  const disciplineProgress: DisciplineProgress[] = DISCIPLINES.map((d) => {
    const total = allCourses
      .filter((c) => c.disciplines.includes(d.key))
      .reduce((sum, c) => sum + c.credits, 0)

    const count = semesters
      .slice(0, activeIndex + 1)
      .flatMap((s) => s.courses)
      .filter((c) => c.disciplines.includes(d.key))
      .reduce((sum, c) => sum + c.credits, 0)

    // progress: capped 0–1 against requiredCredits (used for mobile mini-bars).
    // Extracurricular has no requirement, so treat total accumulated as the target.
    const required = d.requiredCredits > 0 ? d.requiredCredits : total
    return {
      ...d,
      progress: required > 0 ? Math.min(count / required, 1) : 0,
      count,   // raw accumulated credits
      total,   // total all-time credits for this discipline
    }
  })

  // ── Cumulative credits across all courses up to the active semester ──────────
  const totalAccumulatedCredits = semesters
    .slice(0, activeIndex + 1)
    .flatMap((s) => s.courses)
    .reduce((sum, c) => sum + c.credits, 0)

  // ── Scroll to first occurrence of a discipline ─────────────────────────────
  function scrollToDiscipline(disciplineKey: Discipline) {
    const firstIndex = semesters.findIndex((s) =>
      s.courses.some((c) => c.disciplines.includes(disciplineKey))
    )
    if (firstIndex < 0) return
    const el = document.querySelector(`[data-semester-index="${firstIndex}"]`)
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return {
    activeIndex,
    activeSemesterLabel: semesters[activeIndex]?.label ?? '',
    disciplineProgress,
    scrollToDiscipline,
    totalAccumulatedCredits,
  }
}
