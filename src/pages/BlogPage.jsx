import { Link } from 'react-router-dom'
import { posts } from '@/data/posts'

function formatDate(dateStr) {
  const [year, month, day] = dateStr.split('-')
  const date = new Date(Number(year), Number(month) - 1, Number(day))
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

// Pinned first, then newest
const sorted = [...posts].sort((a, b) => {
  if (a.pinned && !b.pinned) return -1
  if (!a.pinned && b.pinned) return 1
  return b.date.localeCompare(a.date)
})

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
          <div className="space-y-5">
            {sorted.map((post) => (
              <Link key={post.id} to={`/blog/${post.id}`} className="block group">
                <article className={`relative border rounded-2xl p-6 transition-all duration-200 hover:shadow-sm ${
                  post.pinned
                    ? 'border-foreground/20 bg-muted/40 hover:border-foreground/30'
                    : 'border-border hover:border-foreground/20'
                }`}>

                  {/* Pinned badge */}
                  {post.pinned && (
                    <div className="flex items-center gap-1.5 mb-3">
                      <svg
                        width="11" height="11" viewBox="0 0 24 24" fill="currentColor"
                        className="text-foreground/50"
                      >
                        <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" />
                      </svg>
                      <span className="text-xs font-semibold tracking-widest uppercase text-foreground/50">
                        Pinned
                      </span>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                    <div>
                      <h2 className="text-xl font-semibold text-foreground group-hover:text-foreground/80 transition-colors">
                        {post.title}
                        <span className="inline-block ml-2 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity text-sm">
                          →
                        </span>
                      </h2>
                      {post.subtitle && (
                        <p className="text-sm text-muted-foreground mt-0.5">{post.subtitle}</p>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground flex-shrink-0 mt-0.5">
                      {formatDate(post.date)}
                    </span>
                  </div>

                  {post.preview && (
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {post.preview}
                    </p>
                  )}

                  <div className="flex items-center gap-3 flex-wrap">
                    {post.tags && post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium bg-secondary text-secondary-foreground px-2.5 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {post.videoUrl && (
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500" />
                        Video
                      </span>
                    )}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
