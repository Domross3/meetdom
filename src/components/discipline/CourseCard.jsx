import { Link } from 'react-router-dom'
import { DISCIPLINE_COLORS, DISCIPLINES } from '@/utils/courseHelpers'
import { cn } from '@/lib/utils'

function disciplineSlug(key) {
  return DISCIPLINES.find((d) => d.key === key)?.slug
}

/**
 * @param {object}  props
 * @param {object}  props.course
 * @param {boolean} [props.showSemester=false]
 * @param {number}  [props.staggerIndex=0]  — sets --stagger-delay for CSS animation
 */
export default function CourseCard({ course, showSemester = false, staggerIndex = 0 }) {
  return (
    <article
      className="card-item group p-5 border border-border rounded-xl hover:shadow-sm transition-shadow duration-200 flex flex-col gap-3 bg-background"
      style={{ '--stagger-delay': `${staggerIndex * 55}ms` }}
    >
      {/* Top row: code · semester · transfer badge · credits (upper right) */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-mono font-medium tracking-wide text-muted-foreground">
          {course.code}
        </span>
        {showSemester && (
          <span className="text-xs text-muted-foreground/60">
            {course.semester} {course.year}
          </span>
        )}
        {course.transferCredit && (
          <span className="text-xs font-medium bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
            Transfer
          </span>
        )}
        <span className="ml-auto text-xs font-medium bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
          {course.credits} {course.credits === 1 ? 'credit' : 'credits'}
        </span>
      </div>

      {/* Course name */}
      <h3 className="font-display text-base font-semibold text-foreground leading-snug">
        {course.name}
      </h3>

      {/* Short annotation */}
      {course.shortAnnotation ? (
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
          {course.shortAnnotation}
        </p>
      ) : (
        <p className="text-sm text-muted-foreground/35 leading-relaxed flex-1 italic select-none">
          Annotation coming soon.
        </p>
      )}

      {/* Discipline tag pills — each navigates to that discipline page */}
      <div className="flex flex-wrap gap-1.5 pt-1" role="list" aria-label="Disciplines">
        {course.disciplines.map((d) => {
          const colors = DISCIPLINE_COLORS[d] ?? { bg: 'bg-slate-100', text: 'text-slate-600' }
          const slug = disciplineSlug(d)
          return (
            <Link
              key={d}
              to={slug ? `/discipline/${slug}` : '/'}
              role="listitem"
              aria-label={`View all ${d} courses`}
              className={cn(
                'text-xs font-medium px-2 py-0.5 rounded-full transition-opacity duration-150 hover:opacity-70',
                colors.bg,
                colors.text
              )}
            >
              {d}
            </Link>
          )
        })}
      </div>
    </article>
  )
}
