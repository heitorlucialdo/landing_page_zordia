import { useEffect, useRef } from 'react'
import type { Particle } from '@/types'

const MAX_DISTANCE     = 150
const REPEL_RADIUS     = 80
const REPEL_STRENGTH   = 0.5
const ATTRACT_START    = 200
const ATTRACT_RADIUS   = 280
const ATTRACT_STRENGTH = 0.08
const GLOW_RADIUS      = 200

function initParticles(w: number, h: number, count: number): Particle[] {
  return Array.from({ length: count }, () => ({
    x:       Math.random() * w,
    y:       Math.random() * h,
    vx:      (Math.random() - 0.5) * 0.5,
    vy:      (Math.random() - 0.5) * 0.5,
    radius:  1.5 + Math.random() * 1.5,
    opacity: 0.3 + Math.random() * 0.4,
  }))
}

export default function NetworkCanvas() {
  const canvasRef      = useRef<HTMLCanvasElement>(null)
  const particlesRef   = useRef<Particle[]>([])
  const mouseRef       = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 })
  const animationIdRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const isMobile = window.innerWidth < 768
    const count = isMobile ? 40 : 100
    const dpr = window.devicePixelRatio || 1

    function setSize() {
      if (!canvas || !ctx) return
      const rect = canvas.getBoundingClientRect()
      canvas.width  = rect.width  * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
      particlesRef.current = initParticles(rect.width, rect.height, count)
    }

    function draw() {
      if (!canvas || !ctx) return
      const rect = canvas.getBoundingClientRect()
      const w = rect.width
      const h = rect.height
      const mouse = mouseRef.current

      ctx.clearRect(0, 0, w, h)

      const particles = particlesRef.current

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        if (!p) continue

        const dx   = p.x - mouse.x
        const dy   = p.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist > 0) {
          if (dist < REPEL_RADIUS) {
            const force = ((REPEL_RADIUS - dist) / REPEL_RADIUS) * REPEL_STRENGTH
            p.vx += (dx / dist) * force
            p.vy += (dy / dist) * force
          } else if (dist > ATTRACT_START && dist < ATTRACT_RADIUS) {
            const t     = (dist - ATTRACT_START) / (ATTRACT_RADIUS - ATTRACT_START)
            const force = (1 - t) * ATTRACT_STRENGTH
            p.vx -= (dx / dist) * force
            p.vy -= (dy / dist) * force
          }
        }

        p.vx *= 0.99
        p.vy *= 0.99
        p.x  += p.vx
        p.y  += p.vy

        if (p.x < 0)  p.x = w
        if (p.x > w)  p.x = 0
        if (p.y < 0)  p.y = h
        if (p.y > h)  p.y = 0

        let drawRadius  = p.radius
        let drawOpacity = p.opacity

        if (dist < GLOW_RADIUS && dist > 0) {
          const glow  = 1 - dist / GLOW_RADIUS
          drawRadius  = p.radius * (1 + glow * 1.5)
          drawOpacity = p.opacity + glow * (1 - p.opacity)
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, drawRadius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${drawOpacity})`
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          if (!q) continue
          const ldx   = p.x - q.x
          const ldy   = p.y - q.y
          const ldist = Math.sqrt(ldx * ldx + ldy * ldy)
          if (ldist < MAX_DISTANCE) {
            const alpha = (1 - ldist / MAX_DISTANCE) * 0.6
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = `rgba(204,0,255,${alpha})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }

      animationIdRef.current = requestAnimationFrame(draw)
    }

    function handleMouseMove(e: MouseEvent) {
      const rect = canvas?.getBoundingClientRect()
      if (!rect) return
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    function handleMouseLeave() {
      mouseRef.current = { x: -9999, y: -9999 }
    }

    const resizeObserver = new ResizeObserver(() => setSize())
    resizeObserver.observe(canvas)

    setSize()
    draw()

    if (!isMobile) {
      canvas.addEventListener('mousemove', handleMouseMove)
      canvas.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      cancelAnimationFrame(animationIdRef.current)
      resizeObserver.disconnect()
      if (!isMobile) {
        canvas.removeEventListener('mousemove', handleMouseMove)
        canvas.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: 'block' }}
    />
  )
}
