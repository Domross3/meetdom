import { Link } from 'react-router-dom'

const BLURBS = {
  cogsci:
    'Your reflection on Cognitive Science — how you pursued both the Computation and Decision tracks, what connected them, and how studying the mind shaped your thinking across CS, philosophy, and entrepreneurship.',
}

export default function DisciplineHeader({ discipline, courseCount }) {
  if (!discipline) return null

  const blurb =
    BLURBS[discipline.slug] ??
    `Your personal reflection on ${discipline.label} — what drew you here, what threads you followed, and how it connects to the rest of your education.`

  return (
    <div className="pt-28 pb-12 px-6 border-b border-border">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-150 mb-8"
        >
          ← All disciplines
        </Link>

        <div className="flex flex-wrap items-baseline gap-4 mb-4">
          <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground">
            {discipline.label}
          </h1>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${discipline.colorClass}`}>
            {courseCount} courses
          </span>
        </div>

        {/* TODO: Replace with your own words */}
        <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
          {blurb}
        </p>
      </div>
    </div>
  )
}
