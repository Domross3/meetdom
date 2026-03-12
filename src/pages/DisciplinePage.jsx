import { useParams } from 'react-router-dom'
import { getDisciplineBySlug } from '@/utils/courseHelpers'
import { useCoursesByDiscipline } from '@/hooks/useCourses'
import DisciplineHeader from '@/components/discipline/DisciplineHeader'
import CourseCard from '@/components/discipline/CourseCard'

export default function DisciplinePage() {
  const { slug } = useParams()
  const discipline = getDisciplineBySlug(slug ?? '')
  const courses = useCoursesByDiscipline(discipline?.key ?? '')

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
      </div>
    </main>
  )
}
