import { Link } from 'react-router-dom'

const BLURBS = {
  cs: (
    <>
      <span className="block font-serif italic font-bold text-foreground text-2xl leading-snug">
        Te occidere possunt sed te edere non possunt nefas est.
      </span>
      <span className="block mt-3">
        “They can kill you, but the legalities of eating you are quite a bit dicier.”
      </span>
    </>
  ),
  cogsci:
    'The processes of the mind, with focuses on its computational machinery and the nature of how it decides.',
  business:
    'With my last name, I had to get into Ross. Learned the fundamentals of business and a little more.',
  philosophy:
    "The most transformative classes I've taken at Michigan. They gave me a compass, and forced me to think critically about how to live.",
  entrepreneurship: 'I like to build stuff.',
  extracurricular:
    'A wide array of classes taken purely out of curiosity — largely responsible for my credit overload.',
}

export default function DisciplineHeader({ discipline, courseCount }) {
  if (!discipline) return null

  const blurb =
    BLURBS[discipline.slug] ??
    `A personal reflection on ${discipline.label} — what drew me here, what threads I followed, and how it connects to the rest of my education.`

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

        <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
          {blurb}
        </p>
      </div>
    </div>
  )
}
