import { useCoursesByTimeline } from '@/hooks/useCourses'
import { useTimelineScroll } from '@/hooks/useTimelineScroll'
import SemesterBlock from './SemesterBlock'
import TimelineSidebar from './TimelineSidebar'

export default function TimelineView() {
  const semesters = useCoursesByTimeline()
  const { activeSemesterLabel, disciplineProgress, scrollToDiscipline, totalAccumulatedCredits } =
    useTimelineScroll(semesters)

  return (
    <div className="flex min-h-screen pt-16">
      {/* ── Desktop sidebar (hidden on mobile via TimelineSidebar itself) ─── */}
      <TimelineSidebar
        disciplineProgress={disciplineProgress}
        scrollToDiscipline={scrollToDiscipline}
        activeSemesterLabel={activeSemesterLabel}
        totalAccumulatedCredits={totalAccumulatedCredits}
      />

      {/* ── Content column ──────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/*
         * Mobile progress strip — replaces the sidebar on small screens.
         * Shows the current semester label on the left and a row of mini
         * progress bars (tapable to jump to that discipline) on the right.
         * Hidden on md+ where the sidebar takes over.
         */}
        <div
          aria-label="Discipline progress"
          className="md:hidden sticky top-16 z-40 bg-background/95 backdrop-blur-sm border-b border-border px-5 py-3"
        >
          <div className="flex items-center gap-4">
            <p
              aria-live="polite"
              aria-atomic="true"
              className="text-xs font-medium text-foreground tabular-nums shrink-0 min-w-0 truncate"
            >
              {activeSemesterLabel || '—'}
            </p>

            {/* Mini progress bars */}
            <div className="flex items-center gap-2 ml-auto">
              {disciplineProgress.map((d) => {
                const pct = Math.round(d.progress * 100)
                return (
                  <button
                    key={d.slug}
                    onClick={() => scrollToDiscipline(d.key)}
                    aria-label={`${d.label}: ${d.count} of ${d.total} courses — tap to jump`}
                    title={d.label}
                    className="w-7 h-1.5 rounded-full bg-muted overflow-hidden flex-shrink-0"
                  >
                    <div
                      role="progressbar"
                      aria-valuenow={pct}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      className="h-full rounded-full transition-[width] duration-500 ease-out"
                      style={{ width: `${pct}%`, backgroundColor: d.barColor }}
                    />
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── Scrollable timeline content ──────────────────────────────── */}
        <main id="main-content" className="py-14 px-6 md:px-10 lg:px-14 max-w-4xl w-full">
          {/* Page header */}
          <div className="mb-16">
            <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
              Chronological view
            </p>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground">
              The Timeline
            </h1>
          </div>

          {semesters.map((semester, i) => (
            <SemesterBlock key={semester.label} semesterGroup={semester} index={i} />
          ))}
        </main>
      </div>
    </div>
  )
}
