import { Link } from 'react-router-dom'
import { projects } from '@/data/projects'
import { DISCIPLINE_COLORS } from '@/utils/courseHelpers'

const statusLabel = {
  'in-progress': 'In Progress',
  completed: 'Completed',
  paused: 'Paused',
}

const statusColor = {
  'in-progress': 'bg-blue-100 text-blue-700',
  completed: 'bg-green-100 text-green-700',
  paused: 'bg-amber-100 text-amber-700',
}

const disciplineLabel = {
  CS: 'Computer Science',
  CogSci: 'Cognitive Science',
  Business: 'Business',
  Philosophy: 'Philosophy',
  Entrepreneurship: 'Entrepreneurship',
  Extracurricular: 'Extracurricular',
}

function formatDate(dateStr) {
  const [year, month] = dateStr.split('-')
  const date = new Date(Number(year), Number(month) - 1)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

// Sort newest first
const sorted = [...projects].sort((a, b) => b.startDate.localeCompare(a.startDate))

export default function ProjectsPage() {
  return (
    <main className="pt-36 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">
          What I'm building
        </p>
        <h1 className="font-display text-4xl lg:text-5xl font-semibold tracking-tight text-foreground mb-4">
          Projects
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mb-16">
          A chronological look at what I've built or been building.
        </p>

        <div className="space-y-6">
          {sorted.map((project) => (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className="block group"
            >
              <article className="border border-border rounded-2xl p-6 hover:border-foreground/20 hover:shadow-sm transition-all duration-200">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground group-hover:text-foreground/80 transition-colors">
                      {project.title}
                      <span className="inline-block ml-2 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity text-sm">→</span>
                    </h2>
                    <p className="text-sm text-muted-foreground">{project.tagline}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-xs text-muted-foreground">{formatDate(project.startDate)}</span>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColor[project.status]}`}>
                      {statusLabel[project.status]}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Discipline tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.disciplines.map((d) => {
                    const colors = DISCIPLINE_COLORS[d]
                    return (
                      <span
                        key={d}
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${colors.bg} ${colors.text}`}
                      >
                        {disciplineLabel[d]}
                      </span>
                    )
                  })}
                </div>

                {/* Skill / keyword tags */}
                <div className="flex flex-wrap items-center gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium bg-secondary text-secondary-foreground px-2.5 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
