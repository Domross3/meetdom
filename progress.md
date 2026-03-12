# Build Progress

## Phase 1 — Data Foundation ✓
- [x] TypeScript configured (`tsconfig.json`, `typescript` devDep, `allowJs: true` for mixed codebase)
- [x] `src/types/index.ts` — `Course`, `SemesterGroup`, `DisciplineMeta`, `DisciplineProgress` interfaces
- [x] `src/data/courses.ts` — 45 typed courses; CogSci split into **Computation** and **Decision** tracks; PSYCH 223 multi-tagged `['CogSci - Decision', 'Entrepreneurship']`
- [x] `src/utils/courseHelpers.ts` — `filterByDiscipline`, `groupBySemester`, `getDisciplineBySlug`, `DISCIPLINES` metadata array, `DISCIPLINE_COLORS` map
- [x] `src/hooks/useCourses.ts` — `useCourses`, `useCoursesByDiscipline`, `useCoursesByTimeline`

**Discipline taxonomy (7 tracks):**
| Slug | Key | Color |
|---|---|---|
| `cs` | CS | Blue |
| `cogsci-computation` | CogSci - Computation | Violet |
| `cogsci-decision` | CogSci - Decision | Teal |
| `business` | Business | Amber |
| `philosophy` | Philosophy | Rose |
| `entrepreneurship` | Entrepreneurship | Orange |
| `wildcard` | Wildcard | Slate |

---

## Phase 2 — Routing, Landing & Explorer Views ✓
- [x] `NavBar.jsx` — fixed header, persists across all pages; active link highlighting; Resume CTA
- [x] `HeroSection.jsx` — headline, pitch paragraph (placeholder), dual CTAs (Explore ↓ / Timeline →)
- [x] `DisciplineGrid.jsx` — 7 discipline cards, live course count from data, links to `/discipline/:slug`
- [x] `DisciplineHeader.jsx` — discipline title, course count badge, personal blurb placeholder
- [x] `CourseCard.jsx` — code badge, name, short annotation (or "coming soon"), clickable discipline tag pills
- [x] `DisciplinePage.jsx` — dynamic route `/discipline/:slug`; filters courses via `useCoursesByDiscipline`; graceful 404 for unknown slugs

---

## Phase 3 — Timeline & Scroll Logic ✓
- [x] `src/hooks/useTimelineScroll.ts` — IntersectionObserver tracks active semester; cumulative per-discipline progress; `scrollToDiscipline` smooth-scroll
- [x] `SemesterBlock.jsx` — semester sections tagged with `data-semester-index`; transfer credit badge
- [x] `TimelineSidebar.jsx` — sticky sidebar; "Now reading" label; 7 animated progress bars; clickable labels jump to first course in that discipline
- [x] `TimelineView.jsx` — composes sidebar + blocks; data from `useCoursesByTimeline` + `useTimelineScroll`
- [x] `TimelinePage.jsx` — thin page wrapper

---

## Phase 4 — Content: Annotations (manual)
- [ ] Write `shortAnnotation` for each course (1–2 sentences; shown in discipline view)
- [ ] Write `longAnnotation` for each course (paragraph; shown in timeline view)
- [ ] Write personal discipline blurbs (replace placeholders in `DisciplineHeader.jsx`)
- [ ] Write hero pitch copy (replace placeholder in `HeroSection.jsx`)
- [ ] Wire up Resume link (`href` in `NavBar.jsx`)

---

## Phase 5 — Polish & Deploy ✓
- [x] **Animations** — `@keyframes fadeUp` in `index.css`; `.reveal`/`.is-visible`/`.card-item` cascade system; `prefers-reduced-motion` respected
- [x] **`src/hooks/useReveal.js`** — one-shot IntersectionObserver; immediately reveals elements already in viewport on mount
- [x] **Stagger** — `DisciplineGrid` cards stagger at 75ms intervals; `SemesterBlock` header fades first, then courses at 55ms intervals
- [x] **Progress bar smoothness** — `transition-[width] duration-500 ease-out` on fill div (explicit `width` transition avoids unnecessary repaints)
- [x] **A11y audit:**
  - Skip-to-content link (visible on keyboard focus) in `NavBar`
  - `aria-label="Main navigation"` on `<nav>`
  - `aria-current="page"` on active nav links
  - `role="progressbar"` + `aria-valuenow/min/max` + `aria-label` on all progress bars
  - `aria-live="polite"` on "Now reading" label
  - `aria-label` on all discipline tag links in `CourseCard`
  - `role="list"` on discipline tag container
  - `aria-label` on discipline cards in `DisciplineGrid`
  - `:focus-visible` ring via CSS for keyboard users
- [x] **Responsive / mobile:**
  - Desktop sidebar `hidden md:flex` — invisible on mobile
  - Mobile progress strip (`md:hidden`) — sticky below NavBar, shows current semester + 7 tapable mini progress bars that jump to discipline
  - `CourseCard` grid: `grid-cols-1 md:grid-cols-2`
  - `DisciplineGrid`: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- [x] **Code splitting** — `React.lazy` + `Suspense` for `TimelinePage`; `vite.config.js` `manualChunks` splits `react-vendor`
- [x] **Build output** — 51 modules, 4 chunks, 0 errors
  ```
  dist/assets/react-vendor.js   163 kB (gzip 53 kB)  ← cached long-term
  dist/assets/TimelinePage.js     5 kB (gzip  2 kB)  ← lazy loaded
  dist/assets/index.js           43 kB (gzip 13 kB)
  dist/assets/index.css          17 kB (gzip  4 kB)
  ```

### To deploy on Vercel:
```bash
npm run build        # generates dist/
vercel --prod        # or connect GitHub repo in Vercel dashboard
```
For SPA routing on Vercel, create `public/vercel.json`:
```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```
