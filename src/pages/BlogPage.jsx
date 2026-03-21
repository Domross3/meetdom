const VIDEO_URL = 'https://www.youtube.com/embed/jP5Iwq4oaD8?vq=hd2160&rel=0'
const VIDEO_TITLE = 'Company Presentation — University of Michigan'
const VIDEO_DESCRIPTION = ''

export default function BlogPage() {
  return (
    <main id="main-content" className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">
            Blog
          </p>
          <h1 className="font-display text-4xl lg:text-5xl font-semibold tracking-tight text-foreground leading-[1.08] mb-4">
            {VIDEO_TITLE}
          </h1>
          {VIDEO_DESCRIPTION && (
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              {VIDEO_DESCRIPTION}
            </p>
          )}
        </div>

        {/* Video embed */}
        {VIDEO_URL ? (
          <div className="rounded-2xl overflow-hidden border border-border shadow-sm bg-black">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src={VIDEO_URL}
                title={VIDEO_TITLE}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-muted flex items-center justify-center" style={{ aspectRatio: '16/9' }}>
            <p className="text-sm text-muted-foreground">Video coming soon.</p>
          </div>
        )}

      </div>
    </main>
  )
}
