import { useEffect, useRef, useState } from 'react'

/** Vira true uma vez quando o elemento entra na tela. */
export function useInView<T extends HTMLElement>(margin = '-15% 0px') {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || inView) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { rootMargin: margin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [inView, margin])

  return { ref, inView }
}
