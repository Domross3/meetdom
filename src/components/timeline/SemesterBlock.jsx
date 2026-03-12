import CourseCard from '@/components/discipline/CourseCard'
import { useReveal } from '@/hooks/useReveal'
import { cn } from '@/lib/utils'

export default function SemesterBlock({ semesterGroup, index }) {
  const hasTransfer = semesterGroup.courses.some((c) => c.transferCredit)
  const totalCredits = semesterGroup.courses.reduce((sum, c) => sum + c.credits, 0)

  /*
   * useReveal fires once when this block enters the viewport, then stops.
   * The `reveal` class hides child elements; `is-visible` triggers the CSS
   * fadeUp animation on `.reveal-header` and staggered `.card-item` children.
   */
  const { ref, isVisible } = useReveal({ rootMargin: '0px 0px -4% 0px', threshold: 0.04 })

  return (
    <section
      ref={ref}
      data-semester-index={index}
      aria-label={semesterGroup.label}
      className={cn('mb-20 scroll-mt-24 reveal', isVisible && 'is-visible')}
    >
      {/* Semester header — fades up with no stagger */}
      <div className="reveal-header flex flex-wrap items-baseline gap-3 mb-6">
        <h2 className="font-display text-2xl font-semibold text-foreground">
          {semesterGroup.label}
        </h2>
        <span className="text-sm text-muted-foreground">
          {totalCredits} {totalCredits === 1 ? 'credit' : 'credits'}
        </span>
        {hasTransfer && (
          <span className="text-xs font-medium bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
            Transfer / AP Credit
          </span>
        )}
      </div>

      {/* Course grid — each card staggers in after its predecessor */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {semesterGroup.courses.map((course, i) => (
          <CourseCard key={course.id} course={course} staggerIndex={i} />
        ))}
      </div>
    </section>
  )
}
