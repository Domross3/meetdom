import { useParams, Link } from 'react-router-dom'
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

export default function ProjectDetailPage() {
  const { id } = useParams()
  const project = projects.find((p) => p.id === id)

  if (!project) {
    return (
      <main className="pt-36 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-muted-foreground">Project not found.</p>
          <Link to="/projects" className="text-sm text-foreground hover:underline mt-4 inline-block">
            ← Back to projects
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-36 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back link */}
        <Link
          to="/projects"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 inline-flex items-center gap-1"
        >
          ← All projects
        </Link>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mt-6 mb-6">
          <div>
            <h1 className="font-display text-4xl lg:text-5xl font-semibold tracking-tight text-foreground mb-2">
              {project.title}
            </h1>
            <p className="text-lg text-muted-foreground">{project.tagline}</p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="text-sm text-muted-foreground">{formatDate(project.startDate)}</span>
            <span className={`text-sm font-medium px-3 py-1.5 rounded-full ${statusColor[project.status]}`}>
              {statusLabel[project.status]}
            </span>
          </div>
        </div>

        {/* Discipline tags */}
        <div className="flex flex-wrap gap-2 mb-4">
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

        {/* Skill tags */}
        <div className="flex flex-wrap gap-2 mb-10">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium bg-secondary text-secondary-foreground px-2.5 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Divider */}
        <hr className="border-border mb-10" />

        {/* Description */}
        <div className="prose prose-sm max-w-none">
          <p className="text-base text-foreground leading-relaxed mb-6">
            {project.description}
          </p>
          {project.details && (
            <p className="text-base text-muted-foreground leading-relaxed mb-8">
              {project.details}
            </p>
          )}
        </div>

        {/* Links */}
        {(project.link || project.repo) && (
          <div className="flex gap-4 mb-10">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium bg-foreground text-background rounded-full px-5 py-2.5 hover:bg-foreground/90 transition-colors"
              >
                Visit project →
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium border border-border rounded-full px-5 py-2.5 hover:border-foreground/30 transition-colors"
              >
                GitHub →
              </a>
            )}
          </div>
        )}

        {/* Resources */}
        {project.resources && project.resources.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg font-semibold text-foreground mb-4">Resources</h2>
            <div className="flex flex-wrap gap-3">
              {project.resources.map((r, i) => (
                <a
                  key={i}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium border border-border rounded-full px-5 py-2.5 hover:border-foreground/30 hover:bg-secondary transition-all duration-200"
                >
                  {r.label} ↗
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Image gallery */}
        {project.images && project.images.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-foreground">Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.images.map((img, i) => (
                <figure key={i}>
                  <div className="rounded-xl overflow-hidden border border-border bg-muted">
                    <img
                      src={img.src}
                      alt={img.caption || `${project.title} screenshot ${i + 1}`}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  {img.caption && (
                    <figcaption className="text-xs text-muted-foreground mt-2 px-1">
                      {img.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
