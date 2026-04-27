import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { useInView } from 'framer-motion'

function parseValue(val: string): { num: number; suffix: string } {
  const match = val.match(/^(\d+(?:\.\d+)?)(.*)$/)
  if (!match) return { num: 0, suffix: val }
  return { num: parseFloat(match[1]!), suffix: match[2] ?? '' }
}

interface CountUpProps {
  value: string
  className?: string
  style?: CSSProperties
  duration?: number
}

export function CountUp({ value, className, style, duration = 1800 }: CountUpProps) {
  const { num, suffix } = parseValue(value)
  const [display, setDisplay] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!isInView) return
    const startTime = performance.now()

    function tick(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic
      setDisplay(Math.round(eased * num))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [isInView, num, duration])

  return (
    <span ref={ref} className={className} style={style}>
      {display}{suffix}
    </span>
  )
}
