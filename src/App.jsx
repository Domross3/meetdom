import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from '@/components/layout/NavBar'
import ScrollToTop from '@/components/layout/ScrollToTop'
import Landing from '@/pages/Landing'
import DisciplinePage from '@/pages/DisciplinePage'
import ProjectsPage from '@/pages/ProjectsPage'
import ProjectDetailPage from '@/pages/ProjectDetailPage'
import BlogPage from '@/pages/BlogPage'
import BlogPostPage from '@/pages/BlogPostPage'

/*
 * TimelinePage is the heaviest view (IntersectionObserver logic, full course
 * dataset rendered at once). Lazy-loading it means users who only skim the
 * landing page never pay that bundle cost.
 */
const TimelinePage = lazy(() => import('@/pages/TimelinePage'))

function TimelineLoader() {
  return (
    <div className="flex min-h-screen pt-16 items-center justify-center">
      <p className="text-sm text-muted-foreground">Loading timeline…</p>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/discipline/:slug" element={<DisciplinePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectDetailPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogPostPage />} />
        <Route
          path="/timeline"
          element={
            <Suspense fallback={<TimelineLoader />}>
              <TimelinePage />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
