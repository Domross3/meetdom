import { useParams, Link } from 'react-router-dom'
import { posts } from '@/data/posts'

function formatDate(dateStr) {
  const [year, month, day] = dateStr.split('-')
  const date = new Date(Number(year), Number(month) - 1, Number(day))
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

function ContentBlock({ block }) {
  if (block.type === 'paragraph') {
    return (
      <p className="text-base text-foreground/90 leading-[1.8] mb-6">
        {block.text}
      </p>
    )
  }

  if (block.type === 'blockquote') {
    return (
      <blockquote className="my-8 pl-5 border-l-2 border-foreground/20">
        <p className="text-base text-muted-foreground leading-[1.8] font-mono">
          {block.text}
        </p>
      </blockquote>
    )
  }

  if (block.type === 'pullquote') {
    return (
      <div className="my-10 rounded-2xl border border-border bg-muted/50 px-7 py-6">
        <p className="text-sm text-muted-foreground leading-[1.85] italic">
          {block.text}
        </p>
      </div>
    )
  }

  return null
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
      <div className="max-w-2xl mx-auto">
        {/* Back link */}
        <Link
          to="/blog"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-10 inline-flex items-center gap-1.5"
        >
          ← All posts
        </Link>

        {/* Header */}
        <div className="mt-8 mb-10">
          {post.pinned && (
            <div className="flex items-center gap-1.5 mb-4">
              <svg
                width="11" height="11" viewBox="0 0 24 24" fill="currentColor"
                className="text-foreground/40"
              >
                <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" />
              </svg>
              <span className="text-xs font-semibold tracking-widest uppercase text-foreground/40">
                Pinned
              </span>
            </div>
          )}
          <h1 className="font-display text-4xl lg:text-5xl font-semibold tracking-tight text-foreground mb-4 leading-[1.1]">
            {post.title}
          </h1>
          {post.subtitle && (
            <p className="text-lg text-muted-foreground mb-4">{post.subtitle}</p>
          )}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm text-muted-foreground">{formatDate(post.date)}</span>
            {post.tags && post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium bg-secondary text-secondary-foreground px-2.5 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <hr className="border-border mb-10" />

        {/* Rich content */}
        {post.content && post.content.length > 0 && (
          <div className="mb-10">
            {post.content.map((block, i) => (
              <ContentBlock key={i} block={block} />
            ))}
          </div>
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
