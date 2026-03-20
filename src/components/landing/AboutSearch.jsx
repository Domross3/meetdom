import { useState } from 'react'
import { Link } from 'react-router-dom'
import { searchSiteContent } from '@/lib/aboutSearch'

const examplePrompts = [
  'What AI projects is Dom working on?',
  'How does business connect to his work?',
  'What has he studied about the mind and behavior?',
]

function ResultLink({ href, children, className }) {
  const isPdf = href.endsWith('.pdf')
  const isInternalRoute = href.startsWith('/') && !isPdf

  if (isInternalRoute) {
    return (
      <Link to={href} className={className}>
        {children}
      </Link>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  )
}

export default function AboutSearch() {
  const [query, setQuery] = useState('')
  const [searchState, setSearchState] = useState({
    query: '',
    answer: '',
    results: [],
    confidence: null,
  })

  function runSearch(nextQuery) {
    const trimmed = nextQuery.trim()

    if (!trimmed) {
      setSearchState({
        query: '',
        answer: '',
        results: [],
        confidence: null,
      })
      return
    }

    setSearchState({
      query: trimmed,
      ...searchSiteContent(trimmed),
    })
  }

  function handleSubmit(event) {
    event.preventDefault()
    runSearch(query)
  }

  return (
    <section className="px-6 pb-20">
      <div className="max-w-6xl mx-auto">
        <div className="rounded-[2rem] border border-border bg-[linear-gradient(135deg,rgba(15,23,42,0.03),rgba(15,23,42,0.01))] p-6 sm:p-8 lg:p-10">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">
              Ask the site
            </p>
            <h2 className="font-display text-3xl lg:text-4xl font-semibold tracking-tight text-foreground mb-4">
              Find something about Dom quickly
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-8">
              Ask a natural question about what Dom studies, builds, or cares about. The answer is generated from content already on this site, then linked back to the most relevant pages.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row gap-3">
              <label className="sr-only" htmlFor="about-search">
                Search the site
              </label>
              <input
                id="about-search"
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Try: What AI work is he doing right now?"
                className="flex-1 rounded-2xl border border-border bg-white px-5 py-4 text-sm text-foreground placeholder:text-muted-foreground shadow-sm focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-2xl bg-foreground px-6 py-4 text-sm font-medium text-background hover:bg-foreground/90 transition-colors"
              >
                Search
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {examplePrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => {
                    setQuery(prompt)
                    runSearch(prompt)
                  }}
                  className="rounded-full border border-border bg-white px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </form>

          {searchState.query && (() => {
            const { answer, results, confidence, query: searchedQuery } = searchState
            const showContact = confidence === 'low' || confidence === 'medium' || results.length === 0
            const emailSubject = encodeURIComponent(`Question from your site`)
            const emailBody = encodeURIComponent(
              `Hi Dom,\n\nI searched for "${searchedQuery}" on your site but wanted to ask you directly — could you tell me more about this?\n\nThanks`
            )
            const confidenceMeta = {
              high: { label: 'Strong match', color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' },
              medium: { label: 'Partial match — may not be complete', color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200' },
              low: { label: 'Low confidence — not sure this is relevant', color: 'text-rose-500', bg: 'bg-rose-50 border-rose-200' },
            }
            const meta = confidenceMeta[confidence] ?? confidenceMeta.low

            return (
              <div className="mt-8 flex flex-col gap-4">
                <div className="grid gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
                  <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                        Answer
                      </p>
                      <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${meta.bg} ${meta.color}`}>
                        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-current" />
                        {meta.label}
                      </span>
                    </div>
                    <p className="text-lg leading-relaxed text-foreground mb-4">
                      {answer}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Question: "{searchedQuery}"
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                    <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">
                      Best Links
                    </p>

                    {results.length === 0 ? (
                      <p className="text-sm text-muted-foreground">
                        No relevant links found yet.
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {results.map((result) => (
                          <ResultLink
                            key={result.id}
                            href={result.href}
                            className="block rounded-2xl border border-border p-4 hover:border-foreground/20 hover:shadow-sm transition-all duration-200"
                          >
                            <div className="flex items-start justify-between gap-3 mb-2">
                              <div>
                                <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-1">
                                  {result.typeLabel}
                                </p>
                                <h3 className="text-sm font-semibold text-foreground">
                                  {result.title}
                                </h3>
                              </div>
                              <span aria-hidden className="text-muted-foreground">
                                →
                              </span>
                            </div>

                            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                              {result.summary}
                            </p>

                            <div className="flex flex-wrap gap-2">
                              {result.matchedTerms.length > 0
                                ? result.matchedTerms.map((term) => (
                                  <span
                                    key={term}
                                    className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-secondary-foreground"
                                  >
                                    {term}
                                  </span>
                                ))
                                : result.chips.map((chip) => (
                                  <span
                                    key={chip}
                                    className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-secondary-foreground"
                                  >
                                    {chip}
                                  </span>
                                ))}
                            </div>
                          </ResultLink>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {showContact && (
                  <div className="rounded-2xl border border-border bg-white p-6 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground mb-1">
                        Not finding what you need?
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Reach out directly — Dom is happy to answer questions about his work, courses, or background.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 shrink-0">
                      <a
                        href={`mailto:michros@umich.edu?subject=${emailSubject}&body=${emailBody}`}
                        className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background hover:bg-foreground/90 transition-colors"
                      >
                        Email Dom ↗
                      </a>
                      <a
                        href="https://www.linkedin.com/in/dom-ross"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-medium text-foreground hover:border-foreground/30 hover:bg-secondary transition-colors"
                      >
                        Message on LinkedIn ↗
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )
          })()}
        </div>
      </div>
    </section>
  )
}
