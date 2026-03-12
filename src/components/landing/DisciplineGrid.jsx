import { Link } from 'react-router-dom'
import { DISCIPLINES } from '@/utils/courseHelpers'
import { useCourses } from '@/hooks/useCourses'
import { useReveal } from '@/hooks/useReveal'
import { cn } from '@/lib/utils'

export default function DisciplineGrid() {
  const courses = useCourses()
  const { ref, isVisible } = useReveal({ rootMargin: '0px 0px -4% 0px' })

  return (
    <section
      id="disciplines"
      aria-label="Explore by discipline"
      className="py-20 px-6 border-t border-border"
    >
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-10 reveal-header">
          Disciplines
        </p>

        {/*
         * The `reveal` class hides children initially.
         * `is-visible` is added when the grid scrolls into view,
         * triggering CSS animations on `.card-item` children.
         */}
        <div
          ref={ref}
          className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 reveal', isVisible && 'is-visible')}
        >
          {DISCIPLINES.map((d, i) => {
            const count = courses.filter((c) => c.disciplines.includes(d.key)).length

            return (
              <Link
                key={d.slug}
                to={`/discipline/${d.slug}`}
                aria-label={`${d.label} — ${count} courses`}
                className="card-item group relative p-6 border border-border rounded-2xl hover:border-foreground/20 hover:shadow-md transition-all duration-200 flex flex-col gap-4"
                style={{ '--stagger-delay': `${i * 75}ms` }}
              >
                {/* Top row: badge + arrow */}
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${d.colorClass}`}>
                    {count} courses
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all duration-200"
                  >
                    →
                  </span>
                </div>

                {/* Discipline name + description */}
                <div>
                  <h2 className="font-display text-lg font-semibold text-foreground mb-1.5 leading-snug">
                    {d.label}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {d.description}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
