import { useState } from 'react'
import { songs } from '@/data/songs'

export default function SongRec() {
  const [song, setSong] = useState(null)

  function handleClick() {
    const pick = songs[Math.floor(Math.random() * songs.length)]
    setSong(pick)
  }

  return (
    <section className="pb-24 px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {!song ? (
          <button
            onClick={handleClick}
            className="text-sm font-medium text-muted-foreground border border-border rounded-full px-5 py-2.5 hover:border-foreground/30 hover:text-foreground transition-all duration-200"
          >
            Song rec?
          </button>
        ) : (
          <div className="flex flex-col items-center gap-3 animate-in">
            <p className="text-xs text-muted-foreground">You should listen to</p>
            <a
              href={song.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium bg-[#1DB954] text-white rounded-full px-5 py-2.5 hover:bg-[#1ed760] transition-colors"
            >
              {song.title} — {song.artist}
              <span aria-hidden>♫</span>
            </a>
            <button
              onClick={handleClick}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors mt-1"
            >
              Another one?
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
