/**
 * @module useMinLoading — Wraps any loading boolean and keeps it true for at
 * least `minMs` milliseconds so loaders are always visible long enough to see.
 *
 * Usage:
 *   const loading = useMinLoading(realLoading)   // default 800 ms
 *   const loading = useMinLoading(realLoading, 1200)
 */
import { useEffect, useRef, useState } from 'react'

const useMinLoading = (realLoading, minMs = 800) => {
  const [loading, setLoading] = useState(realLoading)
  const startRef  = useRef(null)
  const timerRef  = useRef(null)

  useEffect(() => {
    if (realLoading) {
      // Loading just started — record the timestamp and ensure visible
      startRef.current = Date.now()
      setLoading(true)
      if (timerRef.current) clearTimeout(timerRef.current)
    } else {
      // Loading finished — wait out whatever time remains before minMs
      const elapsed   = startRef.current ? Date.now() - startRef.current : minMs
      const remaining = Math.max(0, minMs - elapsed)
      timerRef.current = setTimeout(() => setLoading(false), remaining)
    }

    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [realLoading, minMs])

  return loading
}

export default useMinLoading
