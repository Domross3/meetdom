import { useParams, Link } from 'react-router-dom'
import { posts } from '@/data/posts'

function formatDate(dateStr) {
  const [year, month, day] = dateStr.split('-')
  const date = new Date(Number(year), Number(month) - 1, Number(day))
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export default function BlogPostPage() {
  const { id } = useParams()
  const post = posts.find((p) => p.id === id)

  if (!post) {
    return (
      <main className="pt-36 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-muted-foreground">Post not found.</p>
          <Link to="/blog" className="text-sm text-foreground hover:underline mt-4 inline-block">
            ← Back to blog
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main id="main-content" className="pt-36 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back link */}
        <Link
          to="/blog"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 inline-flex items-center gap-1"
        >
          ← All posts
        </Link>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mt-6 mb-6">
          <div>
            <h1 className="font-display text-4xl lg:text-5xl font-semibold tracking-tight text-foreground mb-2">
              {post.title}
            </h1>
            {post.subtitle && (
              <p className="text-lg text-muted-foreground">{post.subtitle}</p>
            )}
          </div>
          <span className="text-sm text-muted-foreground flex-shrink-0">{formatDate(post.date)}</span>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
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

        <hr className="border-border mb-10" />

        {/* Body text */}
        {post.body && (
          <p className="text-base text-foreground leading-relaxed mb-8">{post.body}</p>
        )}

        {/* Video embed */}
        {post.videoUrl && (
          <div className="mb-10 rounded-2xl overflow-hidden border border-border shadow-sm bg-black">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src={post.videoUrl}
                title={post.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        )}

        {/* Resources */}
        {post.resources && post.resources.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg font-semibold text-foreground mb-4">Resources</h2>
            <div className="flex flex-wrap gap-3">
              {post.resources.map((r, i) => (
                <a
                  key={i}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium border border-border rounded-full px-5 py-2.5 hover:border-foreground/30 hover:bg-secondary transition-all duration-200"
                >
                  {r.label} ↗
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Image gallery */}
        {post.images && post.images.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-6">Gallery</h2>
            <figure className="mb-6">
              <div className="rounded-2xl overflow-hidden border border-border bg-muted shadow-sm">
                <img
                  src={post.images[0].src}
                  alt={post.images[0].caption || `${post.title} photo 1`}
                  className="w-full h-auto object-cover"
                />
              </div>
              {post.images[0].caption && (
                <figcaption className="text-sm text-muted-foreground mt-3 text-center italic">
                  {post.images[0].caption}
                </figcaption>
              )}
            </figure>
            {post.images.length > 1 && (
              <div className={`grid gap-5 ${post.images.length - 1 === 1 ? 'grid-cols-1 max-w-2xl mx-auto' : 'grid-cols-1 sm:grid-cols-2'}`}>
                {post.images.slice(1).map((img, i) => (
                  <figure key={i + 1} className="group">
                    <div className="rounded-2xl overflow-hidden border border-border bg-muted shadow-sm transition-shadow duration-300 group-hover:shadow-md">
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={img.src}
                          alt={img.caption || `${post.title} photo ${i + 2}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                      </div>
                    </div>
                    {img.caption && (
                      <figcaption className="text-sm text-muted-foreground mt-3 px-1 text-center italic">
                        {img.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}
