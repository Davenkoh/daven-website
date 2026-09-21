import { useEffect, useState } from 'react'
import { SITE } from '@/config/site.config'

/** Video intro right under the About title: YouTube embed, or a local MP4, or a placeholder until one exists. */
export function VideoIntro() {
  const { youtubeId, src, poster } = SITE.videoIntro
  const [broken, setBroken] = useState(false)

  // A missing file comes back as the HTML app shell (SPA rewrite), so check the content type first.
  useEffect(() => {
    if (youtubeId) return
    let cancelled = false
    fetch(src, { method: 'HEAD' })
      .then((r) => {
        const type = r.headers.get('content-type') ?? ''
        if (!cancelled && (!r.ok || !type.startsWith('video/'))) setBroken(true)
      })
      .catch(() => {
        if (!cancelled) setBroken(true)
      })
    return () => {
      cancelled = true
    }
  }, [youtubeId, src])
  return (
    <div
      className="relative mx-auto mt-6 aspect-video w-auto max-w-full overflow-hidden rounded-card border border-line bg-card"
      style={{ height: 'min(56.25vw, calc(100dvh - 240px))' }}
    >
      {youtubeId ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0`}
          title={`${SITE.name} video introduction`}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : broken ? (
        <div
          className="grid h-full w-full place-items-center"
          style={{ background: 'radial-gradient(60% 80% at 30% 20%, oklch(0.82 0.16 75 / 0.25), transparent), linear-gradient(160deg, #1d1a17, #0f0e0d)' }}
        >
          <p className="max-w-md px-6 text-center font-mono text-xs uppercase leading-relaxed tracking-[0.2em] text-muted">
            Add your intro video: set videoIntro.youtubeId in src/config/site.config.ts, or drop public/videos/intro.mp4
          </p>
        </div>
      ) : (
        <video src={src} poster={poster} controls playsInline preload="metadata" className="h-full w-full object-cover" onError={() => setBroken(true)} />
      )}
    </div>
  )
}
