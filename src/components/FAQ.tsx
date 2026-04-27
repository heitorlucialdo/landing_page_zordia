import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const ITEMS = [
  {
    question: 'O que a Zordia faz exatamente?',
    answer:
      'A Zordia é uma startup de tecnologia especializada em Inteligência Artificial. Desenvolvemos soluções de IA sob medida para automatizar processos, aumentar a eficiência operacional e gerar resultados reais para empresas que querem escalar com tecnologia.',
  },
  {
    question: 'Para quais tipos de empresa vocês atendem?',
    answer:
      'Atendemos desde startups em crescimento até empresas consolidadas que querem adotar IA de forma estratégica. Se você tem um processo manual, repetitivo ou complexo, provavelmente temos uma solução para isso.',
  },
  {
    question: 'Quanto custa contratar a Zordia?',
    answer:
      'Nossos projetos são personalizados, então o investimento varia conforme escopo e complexidade. Para saber o valor exato para o seu caso, basta agendar uma reunião gratuita de 20 minutos com nosso time — sem compromisso.',
  },
  {
    question: 'Quanto tempo leva para implementar uma solução de IA?',
    answer:
      'Depende da complexidade do projeto. Soluções mais simples podem ser entregues em semanas, enquanto projetos maiores seguem um roadmap definido em conjunto. Na reunião inicial, já conseguimos te dar uma estimativa real.',
  },
  {
    question: 'Como eu começo?',
    answer:
      'Simples: agende uma reunião gratuita de 20 minutos com a gente. Vamos entender o seu negócio, identificar onde a IA pode gerar mais resultado e te apresentar as possibilidades — sem enrolação.',
  },
]

function AccordionItem({
  item,
  isOpen,
  onToggle,
  delay,
}: {
  item: (typeof ITEMS)[0]
  isOpen: boolean
  onToggle: () => void
  delay: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut', delay }}
      style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left group"
        style={{ padding: '24px 0', cursor: 'pointer', background: 'transparent', border: 'none' }}
      >
        <span
          className="font-bold text-white transition-colors duration-200 group-hover:text-white/90 pr-6"
          style={{ fontSize: 18, fontFamily: 'Raleway, sans-serif', lineHeight: 1.4 }}
        >
          {item.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="flex-shrink-0"
          style={{ color: '#CC00FF' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <motion.p
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              style={{
                paddingBottom: 24,
                fontSize: 16,
                lineHeight: 1.7,
                color: 'rgba(255,255,255,0.7)',
                fontFamily: 'Raleway, sans-serif',
              }}
            >
              {item.answer}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  const toggle = (i: number) => setOpenIndex(prev => (prev === i ? null : i))

  return (
    <section
      id="faq"
      className="relative"
      style={{ paddingTop: '5rem', paddingBottom: '5rem' }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(39,0,54,0.45) 0%, #000000 65%)',
        }}
      />

      <div className="container-max relative" style={{ maxWidth: 760, margin: '0 auto', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <span
            className="inline-block text-xs font-bold text-brand-neon tracking-widest uppercase
                       border border-brand-neon/30 px-3 py-1.5 rounded-full mb-4"
          >
            FAQ
          </span>
          <h2
            className="text-3xl md:text-5xl font-black leading-tight text-white"
            style={{ fontFamily: 'Raleway, sans-serif' }}
          >
            Perguntas frequentes
          </h2>
          <p className="text-white/50 mt-4" style={{ fontSize: 16, fontFamily: 'Raleway, sans-serif' }}>
            Tire suas dúvidas antes de falar com a gente
          </p>
        </motion.div>

        {/* Accordion */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {ITEMS.map((item, i) => (
            <AccordionItem
              key={i}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
