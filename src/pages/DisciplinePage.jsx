import { useParams, Link } from 'react-router-dom'
import { getDisciplineBySlug } from '@/utils/courseHelpers'
import { useCoursesByDiscipline } from '@/hooks/useCourses'
import DisciplineHeader from '@/components/discipline/DisciplineHeader'
import CourseCard from '@/components/discipline/CourseCard'
import { projects } from '@/data/projects'

export default function DisciplinePage() {
  const { slug } = useParams()
  const discipline = getDisciplineBySlug(slug ?? '')
  const courses = useCoursesByDiscipline(discipline?.key ?? '')
  const relatedProjects = discipline
    ? projects.filter((p) => p.disciplines.includes(discipline.key))
    : []

  // Graceful 404 for unknown slugs
  if (!discipline) {
    return (
      <main className="pt-36 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-muted-foreground">Discipline not found.</p>
        </div>
      </main>
    )
  }

  return (
    <main>
      <DisciplineHeader discipline={discipline} courseCount={courses.length} />

      <div className="max-w-4xl mx-auto px-6 py-12">
        {courses.length === 0 ? (
          <p className="text-muted-foreground text-sm">No courses found for this discipline.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} showSemester />
            ))}
          </div>
        )}

        {relatedProjects.length > 0 && (
          <div className="mt-16">
            <h2 className="text-lg font-semibold text-foreground mb-6">Related Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedProjects.map((project) => (
                <Link
                  key={project.id}
                  to={`/projects/${project.id}`}
                  className="group border border-border rounded-xl p-5 hover:border-foreground/20 hover:shadow-sm transition-all duration-200"
                >
                  <h3 className="text-sm font-semibold text-foreground group-hover:text-foreground/80 transition-colors">
                    {project.title}
                    <span className="inline-block ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">{project.tagline}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
