/**
 * Desktop-only sidebar (hidden md:flex).
 *
 * Bar design — "thin track → burst through the finish line":
 *
 *   1. A slim 4px track fills left→right in the discipline colour as credits accumulate.
 *   2. A hairline notch sits at right-0 of the wrapper — the visible "finish line."
 *      It stands 14px tall, clearly poking above and below the slim track, so the bar
 *      appears to be chasing it. (Skipped for Extracurricular — no finish line to chase.)
 *   3. The instant credits exceed the requirement the notch collapses to 0px height — broken.
 *   4. Simultaneously the track swells 4px → 10px and amber sweeps in from the left.
 *   5. The credit label turns amber to match.
 *
 *   Extracurricular (requiredCredits = 0):
 *   Every credit is "above and beyond" — the bar starts overfilled from the first credit
 *   and fills proportionally against the all-time extracurricular total. No notch.
 */
export default function TimelineSidebar({
  disciplineProgress,
  scrollToDiscipline,
  activeSemesterLabel,
  totalAccumulatedCredits,
}) {
  return (
    <aside
      aria-label="Timeline progress"
      className="hidden md:flex sticky top-16 h-[calc(100vh-4rem)] w-60 flex-shrink-0 flex-col py-10 px-5 border-r border-border overflow-y-auto"
    >
      {/* Cumulative credits bar — 120-credit graduation cap */}
      {(() => {
        const GRAD_CREDITS = 120
        const creditPct = Math.min((totalAccumulatedCredits / GRAD_CREDITS) * 100, 100)
        const creditOverfilled = totalAccumulatedCredits >= GRAD_CREDITS
        return (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Total Credits
              </p>
              <span
                className="text-xs tabular-nums font-medium transition-colors duration-500"
                style={{ color: creditOverfilled ? '#f59e0b' : undefined }}
                aria-hidden="true"
              >
                {totalAccumulatedCredits} / {GRAD_CREDITS} cr
              </span>
            </div>
            <div
              role="progressbar"
              aria-label={`Total credits: ${totalAccumulatedCredits} of ${GRAD_CREDITS}`}
              aria-valuenow={totalAccumulatedCredits}
              aria-valuemin={0}
              aria-valuemax={GRAD_CREDITS}
              className="relative flex items-center"
            >
              {!creditOverfilled && (
                <div
                  className="absolute right-0 w-px rounded-full bg-border/70 transition-[height,opacity] duration-300 ease-out pointer-events-none"
                  style={{ height: '14px', opacity: 1 }}
                />
              )}
              <div
                className="relative w-full bg-muted rounded-full overflow-hidden transition-[height] duration-500 ease-out"
                style={{ height: creditOverfilled ? '10px' : '4px' }}
              >
                <div
                  className="absolute inset-0 h-full rounded-full transition-[width] duration-500 ease-out"
                  style={{
                    width: `${creditPct}%`,
                    backgroundColor: creditOverfilled ? '#f59e0b' : '#6b7280',
                  }}
                />
              </div>
            </div>
          </div>
        )
      })()}

      {/* Current position */}
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
          Now reading
        </p>
        <p
          aria-live="polite"
          aria-atomic="true"
          className="text-sm font-medium text-foreground min-h-[1.25rem]"
        >
          {activeSemesterLabel}
        </p>
      </div>

      {/* Discipline progress bars */}
      <nav aria-label="Jump to discipline" className="space-y-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Progress
        </p>

        {disciplineProgress.map((d) => {
          const { count, total, requiredCredits } = d
          const hasRequirement = requiredCredits > 0

          // For disciplines with a requirement: overfilled once count > required.
          // For Extracurricular: every credit is overfill — triggers from count > 0.
          const isOverfilled = hasRequirement ? count > requiredCredits : count > 0

          // Base fill: primary colour racing toward the requirement.
          // No base layer for Extracurricular (no target to fill toward).
          const basePct = hasRequirement
            ? Math.min((count / requiredCredits) * 100, 100)
            : 0

          // Amber bonus fill:
          //   - With requirement: how far past the finish line (0 → 100% = 1× extra)
          //   - No requirement:   proportional share of all-time extracurricular total
          const bonusPct = !isOverfilled
            ? 0
            : hasRequirement
              ? Math.min(((count - requiredCredits) / requiredCredits) * 100, 100)
              : total > 0
                ? Math.min((count / total) * 100, 100)
                : 0

          return (
            <div key={d.slug}>
              {/* Label row */}
              <div className="flex items-center justify-between mb-2">
                <button
                  onClick={() => scrollToDiscipline(d.key)}
                  aria-label={`Jump to first ${d.label} course`}
                  className="text-xs font-medium text-foreground hover:text-muted-foreground transition-colors duration-150 text-left leading-tight"
                >
                  {d.label}
                </button>

                <span
                  className="text-xs tabular-nums font-medium transition-colors duration-500"
                  style={{ color: isOverfilled ? '#f59e0b' : undefined }}
                  aria-hidden="true"
                >
                  {hasRequirement
                    ? `${count} / ${requiredCredits} cr`
                    : `${count} cr`}
                </span>
              </div>

              {/*
               * Unified bar — same structure for all disciplines.
               * Outer wrapper is NOT overflow-hidden so the finish-line notch
               * can poke above and below the slim track.
               */}
              <div
                role="progressbar"
                aria-label={
                  hasRequirement
                    ? `${d.label}: ${count} of ${requiredCredits} required credits`
                    : `${d.label}: ${count} credits accumulated`
                }
                aria-valuenow={count}
                aria-valuemin={0}
                aria-valuemax={hasRequirement ? requiredCredits : total}
                className="relative flex items-center"
              >
                {/*
                 * Finish-line notch — only shown for disciplines with a requirement.
                 * Collapses to 0px the instant the bar bursts through.
                 */}
                {hasRequirement && (
                  <div
                    className="absolute right-0 w-px rounded-full bg-border/70 transition-[height,opacity] duration-300 ease-out pointer-events-none"
                    style={{
                      height:  isOverfilled ? '0px' : '14px',
                      opacity: isOverfilled ? 0 : 1,
                    }}
                  />
                )}

                {/*
                 * Track — swells from 4px → 10px when overfilled.
                 * overflow-hidden keeps both fill layers layout-safe.
                 */}
                <div
                  className="relative w-full bg-muted rounded-full overflow-hidden transition-[height] duration-500 ease-out"
                  style={{ height: isOverfilled ? '10px' : '4px' }}
                >
                  {/* Layer 1 — discipline colour, fills toward requirement */}
                  <div
                    className="absolute inset-0 h-full rounded-full transition-[width] duration-500 ease-out"
                    style={{
                      width: `${basePct}%`,
                      backgroundColor: d.barColor,
                    }}
                  />

                  {/* Layer 2 — amber gold, sweeps from left once past threshold */}
                  <div
                    className="absolute inset-0 h-full rounded-full transition-[width,opacity] duration-500 ease-out"
                    style={{
                      width:           `${bonusPct}%`,
                      opacity:         isOverfilled ? 1 : 0,
                      backgroundColor: '#f59e0b',
                    }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </nav>
    </aside>
  )
}
