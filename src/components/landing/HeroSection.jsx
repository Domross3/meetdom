import { Link } from 'react-router-dom'

export default function HeroSection() {
  return (
    <section className="pt-36 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">

          {/* Text column */}
          <div className="flex-1 max-w-2xl">
            {/* Eyebrow */}
            <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-8">
              University of Michigan · B.S. Computer Science & Cognitive Science
            </p>

            {/* Headline */}
            <h1 className="font-display text-5xl lg:text-6xl font-semibold tracking-tight text-foreground leading-[1.08] mb-8">
              Welcome to my
              <br />
              education.
            </h1>

            {/* Pitch */}
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mb-12">
              I am majoring in computer science and cognitive science at the University of Michigan,
              with minors in business, philosophy, and entrepreneurship. Michigan ranks top 10 in all five, which is probably less of a flex
              and more an explanation for why I haven't graduated yet. I developed this website to make my education more interactive and engaging.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <a
                href="#disciplines"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground border border-border rounded-full px-5 py-2.5 hover:border-foreground/30 hover:bg-secondary transition-all duration-200"
              >
                Explore by discipline
                <span aria-hidden>↓</span>
              </a>
              <Link
                to="/timeline"
                className="inline-flex items-center gap-2 text-sm font-medium bg-foreground text-background rounded-full px-5 py-2.5 hover:bg-foreground/90 transition-all duration-200"
              >
                View full timeline
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>

          {/* Headshot */}
          <div className="mt-12 lg:mt-0 flex-shrink-0">
            <div className="w-64 h-72 lg:w-72 lg:h-80 rounded-2xl overflow-hidden bg-muted border border-border">
              <img
                src="/headshot.jpg"
                alt="Dom Ross"
                className="w-full h-full object-cover object-top"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
            </div>
            <div className="mt-3 flex items-center justify-center gap-3">
              <a
                href="mailto:michros@umich.edu"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                michros@umich.edu
              </a>
              <span className="text-border">·</span>
              <a
                href="https://www.linkedin.com/in/dom-ross"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
