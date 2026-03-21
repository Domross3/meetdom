import { Link } from 'react-router-dom'
import { posts } from '@/data/posts'

function formatDate(dateStr) {
  const [year, month, day] = dateStr.split('-')
  const date = new Date(Number(year), Number(month) - 1, Number(day))
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date))

export default function BlogPage() {
  return (
    <main id="main-content" className="pt-36 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">
          Miscellaneous
        </p>
        <h1 className="font-display text-4xl lg:text-5xl font-semibold tracking-tight text-foreground mb-4">
          Blog
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mb-16">
          A miscellaneous tab for whatever thoughts or resources I want to be made public.
          I am just starting this so it may take a while to populate.
        </p>

        {sorted.length === 0 ? (
          <p className="text-muted-foreground text-sm">Nothing here yet — check back soon.</p>
        ) : (
          <div className="space-y-6">
            {sorted.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="block group"
              >
                <article className="border border-border rounded-2xl p-6 hover:border-foreground/20 hover:shadow-sm transition-all duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                    <div>
                      <h2 className="text-xl font-semibold text-foreground group-hover:text-foreground/80 transition-colors">
                        {post.title}
                        <span className="inline-block ml-2 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity text-sm">→</span>
                      </h2>
                      {post.subtitle && (
                        <p className="text-sm text-muted-foreground">{post.subtitle}</p>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground flex-shrink-0">
                      {formatDate(post.date)}
                    </span>
                  </div>

                  {post.body && (
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {post.body}
                    </p>
                  )}

                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-medium bg-secondary text-secondary-foreground px-2.5 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {post.videoUrl && (
                    <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1.5">
                      <span className="inline-block w-2 h-2 rounded-full bg-red-500" />
                      Video
                    </p>
                  )}
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
