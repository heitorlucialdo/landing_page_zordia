import { useEffect, useRef, useState } from 'react'

/* Grade de horários em perspectiva. Os horários acendem aos poucos,
   como consultas sendo marcadas sozinhas. */
export default function AgendaFloor() {
  const ref = useRef<HTMLDivElement>(null)
  const [cols, setCols] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth < 768 ? 10 : 22,
  )
  const rows = 9

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const update = () => setCols(mq.matches ? 10 : 22)
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const cells = Array.from(el.children) as HTMLElement[]
    // Começa com alguns horários já ocupados
    cells.forEach((c) => c.classList.toggle('on', Math.random() < 0.12))

    let timer: number | undefined
    const tick = () => {
      const cell = cells[Math.floor(Math.random() * cells.length)]
      cell?.classList.toggle('on')
    }

    const io = new IntersectionObserver(([entry]) => {
      window.clearInterval(timer)
      if (entry?.isIntersecting) timer = window.setInterval(tick, 260)
    })
    io.observe(el)

    return () => {
      io.disconnect()
      window.clearInterval(timer)
    }
  }, [cols])

  return (
    <div
      ref={ref}
      className="zr-floor"
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
      }}
      aria-hidden="true"
    >
      {Array.from({ length: cols * rows }, (_, i) => (
        <i key={`${cols}-${i}`} />
      ))}
    </div>
  )
}
