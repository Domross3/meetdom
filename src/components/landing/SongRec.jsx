import { useState } from 'react'
import { songs } from '@/data/songs'

const MAX_RECS = 3

export default function SongRec() {
  const [history, setHistory] = useState([])
  const used = history.length
  const exhausted = used >= MAX_RECS
  const current = history.length > 0 ? history[history.length - 1] : null

  function handleClick() {
    if (exhausted) return
    const available = songs.filter((s) => !history.includes(s))
    const pool = available.length > 0 ? available : songs
    const pick = pool[Math.floor(Math.random() * pool.length)]
    setHistory((prev) => [...prev, pick])
  }

  return (
    <section className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="border border-border rounded-3xl p-10 sm:p-14 text-center">
          {/* Header */}
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
            Before you go
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-foreground mb-3">
            Want a song rec?
          </h2>
          <p className="text-sm text-muted-foreground mb-8">
            You get three. Choose wisely.
          </p>

          {/* Strike indicators */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {Array.from({ length: MAX_RECS }).map((_, i) => (
              <div
                key={i}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i < used
                    ? 'bg-[#1DB954] scale-110'
                    : 'bg-border'
                }`}
              />
            ))}
          </div>

          {/* Song display area */}
          <div className="min-h-[120px] flex flex-col items-center justify-center">
            {!current && !exhausted && (
              <button
                onClick={handleClick}
                className="text-base font-medium text-foreground border-2 border-border rounded-full px-8 py-3.5 hover:border-foreground/30 hover:bg-secondary transition-all duration-200"
              >
                Hit me
              </button>
            )}

            {current && !exhausted && (
              <div className="flex flex-col items-center gap-4">
                <p className="text-xs text-muted-foreground tracking-wide uppercase">
                  Rec {used} of {MAX_RECS}
                </p>
                <a
                  href={current.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-base font-semibold bg-[#1DB954] text-white rounded-full px-7 py-3.5 hover:bg-[#1ed760] shadow-lg shadow-[#1DB954]/20 transition-all duration-200 hover:scale-[1.02]"
                >
                  <span>♫</span>
                  {current.title} — {current.artist}
                </a>
                <button
                  onClick={handleClick}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors mt-2"
                >
                  {used === MAX_RECS - 1 ? 'Last one...' : 'Another one?'}
                </button>
              </div>
            )}

            {current && exhausted && (
              <div className="flex flex-col items-center gap-4">
                <p className="text-xs text-muted-foreground tracking-wide uppercase">
                  Final rec
                </p>
                <a
                  href={current.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-base font-semibold bg-[#1DB954] text-white rounded-full px-7 py-3.5 hover:bg-[#1ed760] shadow-lg shadow-[#1DB954]/20 transition-all duration-200 hover:scale-[1.02]"
                >
                  <span>♫</span>
                  {current.title} — {current.artist}
                </a>
                <p className="text-sm text-muted-foreground mt-2">
                  That's all you get. Make it count.
                </p>
              </div>
            )}
          </div>

          {/* Previous recs */}
          {history.length > 1 && (
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-xs text-muted-foreground mb-3">Previous recs</p>
              <div className="flex flex-col items-center gap-2">
                {history.slice(0, -1).map((s, i) => (
                  <a
                    key={i}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {s.title} — {s.artist}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
