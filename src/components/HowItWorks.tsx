import { useRef, useState, useLayoutEffect, type RefObject } from 'react'
import { motion, useInView } from 'framer-motion'

const STEPS = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#CC00FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="3"/>
        <path d="M8 12h.01M12 12h.01M16 12h.01"/>
        <path d="M7 8h10"/>
      </svg>
    ),
    title: 'Você entra em contato',
    description: 'Preencha o formulário com seus dados e o que precisa. Sem ligação fria, sem reunião antes da hora. Em menos de 1 minuto você já está no nosso fluxo de IA.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#CC00FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4"/>
        <path d="M6 20v-2a4 4 0 014-4h4a4 4 0 014 4v2"/>
        <path d="M18 8l2 2 4-4" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'Nossa IA entra em contato',
    description: 'Um agente de IA da ZordIA fala com você pelo WhatsApp, conversa, te qualifica, faz um diagnóstico do seu processo atual e agenda automaticamente uma reunião de 20 min com nossa equipe via Google Meet.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#CC00FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
        <circle cx="12" cy="10" r="3" fill="#CC00FF" fillOpacity="0.2"/>
      </svg>
    ),
    title: 'Reunião rápida com a equipe',
    description: 'Uma call de 20 minutos com um colaborador da ZordIA. Você tira suas dúvidas, entende as soluções indicadas para o seu negócio e alinha os detalhes. Direto ao ponto.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#CC00FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
      </svg>
    ),
    title: 'Proposta personalizada no WhatsApp',
    description: 'Você recebe uma proposta completa direto no WhatsApp — escopo, prazo e investimento detalhados. Lê, aprova e confirma sem burocracia, sem ir e vir de e-mails.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#CC00FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
        <line x1="19" y1="12" x2="5" y2="12" strokeDasharray="2 2"/>
      </svg>
    ),
    title: 'Início do projeto e implementação',
    description: 'Com tudo aprovado, nossa equipe inicia a implementação da solução no seu negócio. Você acompanha cada etapa do progresso com transparência total.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#CC00FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    title: 'Entrega e suporte 24h',
    description: 'Sua automação vai ao ar. Nossa equipe oferece suporte contínuo por 24 horas após a entrega para garantir que tudo opere perfeitamente desde o primeiro momento.',
  },
]

/* Y positions with step=260: [100, 360, 620, 880, 1140, 1400] */
const Y_POSITIONS = [100, 360, 620, 880, 1140, 1400]

const PATH_D =
  'M 600 100 C 600 230 200 230 200 360 C 200 490 600 490 600 620 C 600 750 200 750 200 880 C 200 1010 600 1010 600 1140 C 600 1270 200 1270 200 1400'

/* ── Mobile row ── */
function MobileStepRow({
  step,
  index,
  isLast,
  circleRef,
}: {
  step: typeof STEPS[0]
  index: number
  isLast: boolean
  circleRef?: RefObject<HTMLDivElement>
}) {
  const rowRef = useRef<HTMLDivElement>(null)
  const inView = useInView(rowRef, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 }}
      className="flex gap-4 items-start"
    >
      {/* Left: circle + connector line */}
      <div className="flex flex-col items-center flex-shrink-0" style={{ width: 48 }}>
        <div
          ref={circleRef}
          className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 relative z-10"
          style={{ border: '2px solid #CC00FF', background: '#0a0010' }}
        >
          <span
            className="font-black text-sm"
            style={{ color: '#CC00FF', fontFamily: 'Raleway, sans-serif' }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        {/* Line segment: from bottom of this circle to top of the next */}
        {!isLast && (
          <div
            style={{
              width: 2,
              flexGrow: 1,
              minHeight: 32,
              background: 'rgba(204,0,255,0.25)',
            }}
          />
        )}
      </div>

      {/* Right: icon + card */}
      <div className={`flex gap-3 items-start flex-1 ${!isLast ? 'pb-8' : 'pb-2'}`}>
        <div className="text-brand-neon flex-shrink-0 mt-1">{step.icon}</div>
        <div
          className="flex-1 rounded-2xl p-4"
          style={{
            background: 'rgba(39,0,54,0.6)',
            border: '1px solid rgba(204,0,255,0.2)',
          }}
        >
          <p
            className="font-bold text-white mb-1 leading-snug"
            style={{ fontSize: 20, fontFamily: 'Raleway, sans-serif' }}
          >
            {step.title}
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: 'rgba(255,255,255,0.7)', fontFamily: 'Raleway, sans-serif' }}>
            {step.description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function HowItWorks() {
  const svgRef = useRef<SVGSVGElement>(null)
  const svgInView = useInView(svgRef, { once: true, margin: '-100px' })

  /* Mobile ball: measure exact circle positions after layout */
  const mobileContainerRef = useRef<HTMLDivElement>(null)
  const firstCircleRef = useRef<HTMLDivElement>(null)
  const lastCircleRef = useRef<HTMLDivElement>(null)
  const [ballBounds, setBallBounds] = useState<{ h: number; start: number; end: number } | null>(null)

  useLayoutEffect(() => {
    const measure = () => {
      if (!mobileContainerRef.current || !firstCircleRef.current || !lastCircleRef.current) return
      const contRect = mobileContainerRef.current.getBoundingClientRect()
      const firstRect = firstCircleRef.current.getBoundingClientRect()
      const lastRect = lastCircleRef.current.getBoundingClientRect()
      setBallBounds({
        h: mobileContainerRef.current.offsetHeight,
        start: firstRect.top - contRect.top + firstRect.height / 2,
        end: lastRect.top - contRect.top + lastRect.height / 2,
      })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  return (
    <section
      id="como-funciona"
      className="section-padding relative"
      style={{ paddingTop: '4rem', paddingBottom: '4rem' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(39,0,54,0.3) 0%, transparent 60%)',
        }}
      />

      <div className="container-max relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span
            className="inline-block text-xs font-bold text-brand-neon tracking-widest uppercase
                       border border-brand-neon/30 px-3 py-1.5 rounded-full mb-4"
          >
            Como Funciona
          </span>
          <h2 className="text-3xl md:text-5xl font-black leading-tight">
            Do primeiro contato à{' '}
            <span className="text-brand-neon">automação no ar</span>
          </h2>
          <p className="text-white/50 mt-4 max-w-xl">
            Um processo direto, sem burocracia. Nossa IA cuida do início, nossa equipe
            garante o resultado.
          </p>
        </motion.div>

        {/* ── DESKTOP (md+) ── */}
        <div className="hidden md:block mt-16 relative" style={{ minHeight: 1500 }}>
          {/* SVG S-curve */}
          <svg
            ref={svgRef}
            viewBox="0 0 800 1500"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ top: 0, left: 0 }}
          >
            <path
              d={PATH_D}
              fill="none"
              stroke="rgba(204,0,255,0.2)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <motion.path
              d={PATH_D}
              fill="none"
              stroke="rgba(204,0,255,0.55)"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={svgInView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 2.4, ease: 'easeInOut', delay: 0.2 }}
            />
            {svgInView && (
              <circle r="7" fill="#CC00FF" style={{ filter: 'drop-shadow(0 0 8px rgba(204,0,255,0.8))' }}>
                <animateMotion
                  dur="6s"
                  repeatCount="indefinite"
                  path={PATH_D}
                  rotate="auto"
                />
              </circle>
            )}
          </svg>

          {/* Steps */}
          {STEPS.map((step, i) => {
            const isRight = i % 2 === 0

            return (
              <div
                key={i}
                className="absolute flex items-center"
                style={{
                  top: (Y_POSITIONS[i] ?? 0) - 36,
                  left: isRight ? 'calc(75% - 72px)' : 'calc(25% - 36px)',
                }}
              >
                {isRight && (
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.55, ease: 'easeOut' }}
                    className="rounded-2xl p-6"
                    style={{
                      background: 'rgba(39,0,54,0.6)',
                      border: '1px solid rgba(204,0,255,0.2)',
                      width: 480,
                      position: 'absolute',
                      right: '100%',
                      marginRight: 48,
                    }}
                  >
                    <p className="font-bold text-white text-xl mb-2 leading-snug">{step.title}</p>
                    <p style={{ fontSize: 16, lineHeight: 1.7, color: 'rgba(255,255,255,0.7)', fontFamily: 'Raleway, sans-serif' }}>
                      {step.description}
                    </p>
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="flex flex-row items-center gap-3 flex-shrink-0 z-10"
                  style={{ flexDirection: isRight ? 'row' : 'row-reverse' }}
                >
                  <div className="text-brand-neon flex-shrink-0">{step.icon}</div>
                  <div
                    className="w-[72px] h-[72px] rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ border: '2px solid #CC00FF', background: '#0a0010' }}
                  >
                    <span
                      className="font-black text-xl leading-none"
                      style={{ color: '#CC00FF', fontFamily: 'Raleway, sans-serif' }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                </motion.div>

                {!isRight && (
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.55, ease: 'easeOut' }}
                    className="rounded-2xl p-6"
                    style={{
                      background: 'rgba(39,0,54,0.6)',
                      border: '1px solid rgba(204,0,255,0.2)',
                      width: 480,
                      marginLeft: 48,
                    }}
                  >
                    <p className="font-bold text-white text-xl mb-2 leading-snug">{step.title}</p>
                    <p style={{ fontSize: 16, lineHeight: 1.7, color: 'rgba(255,255,255,0.7)', fontFamily: 'Raleway, sans-serif' }}>
                      {step.description}
                    </p>
                  </motion.div>
                )}
              </div>
            )
          })}
        </div>

        {/* ── MOBILE ── */}
        <div className="md:hidden mt-12 relative" ref={mobileContainerRef}>
          {/* Animated ball: travels exactly from center of circle 1 to center of circle 6 */}
          {ballBounds && (
            <svg
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: 48,
                height: ballBounds.h,
                pointerEvents: 'none',
                zIndex: 10,
                overflow: 'visible',
              }}
              viewBox={`0 0 48 ${ballBounds.h}`}
            >
              <circle
                r="6"
                fill="#CC00FF"
                style={{ filter: 'drop-shadow(0 0 6px #CC00FF)' }}
              >
                <animateMotion
                  dur="5s"
                  repeatCount="indefinite"
                  path={`M 24 ${ballBounds.start} L 24 ${ballBounds.end}`}
                />
              </circle>
            </svg>
          )}

          <div className="flex flex-col">
            {STEPS.map((step, i) => (
              <MobileStepRow
                key={i}
                step={step}
                index={i}
                isLast={i === STEPS.length - 1}
                circleRef={
                  i === 0
                    ? firstCircleRef
                    : i === STEPS.length - 1
                    ? lastCircleRef
                    : undefined
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
