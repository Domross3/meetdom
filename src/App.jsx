import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from '@/components/layout/NavBar'
import Landing from '@/pages/Landing'
import DisciplinePage from '@/pages/DisciplinePage'

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
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/discipline/:slug" element={<DisciplinePage />} />
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
