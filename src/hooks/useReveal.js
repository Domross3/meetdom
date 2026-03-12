import { useRef, useEffect, useState } from 'react'

/**
 * Fires once when the attached element scrolls into view, then disconnects.
 * Returns { ref, isVisible } — apply `ref` to the container element and
 * conditionally add the `is-visible` class based on `isVisible`.
 *
 * @param {object} options
 * @param {string} [options.rootMargin='0px 0px -6% 0px']  - Shrinks the
 *   detection area so the element is comfortably in view before animating.
 * @param {number} [options.threshold=0.05]
 */
export function useReveal({ rootMargin = '0px 0px -6% 0px', threshold = 0.05 } = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // If already in view on mount (e.g., above the fold), reveal immediately
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect() // one-shot — no need to keep observing
        }
      },
      { rootMargin, threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin, threshold])

  return { ref, isVisible }
}
