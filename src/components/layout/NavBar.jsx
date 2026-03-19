import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'

export default function NavBar() {
  const { pathname } = useLocation()

  return (
    <>
      {/*
       * Skip-to-content link — invisible until focused via keyboard (Tab).
       * Allows screen reader / keyboard users to jump past nav directly.
       */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-foreground focus:text-background focus:rounded-lg focus:text-sm focus:font-medium focus:shadow-lg"
      >
        Skip to content
      </a>

      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo / wordmark */}
          <Link
            to="/"
            aria-label="Dom Ross — home"
            className="font-display font-semibold text-base tracking-tight text-foreground"
          >
            Dom Ross
          </Link>

          {/* Primary navigation */}
          <nav aria-label="Main navigation" className="flex items-center gap-8">
            <Link
              to="/"
              aria-current={pathname === '/' ? 'page' : undefined}
              className={cn(
                'text-sm font-medium transition-colors duration-150',
                pathname === '/'
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              Home
            </Link>

            <Link
              to="/timeline"
              aria-current={pathname === '/timeline' ? 'page' : undefined}
              className={cn(
                'text-sm font-medium transition-colors duration-150',
                pathname === '/timeline'
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              Timeline
            </Link>

            <Link
              to="/projects"
              aria-current={pathname === '/projects' ? 'page' : undefined}
              className={cn(
                'text-sm font-medium transition-colors duration-150',
                pathname === '/projects'
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              Projects
            </Link>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View resume (PDF)"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-150"
            >
              Resume ↗
            </a>
          </nav>
        </div>
      </header>
    </>
  )
}
