import { useState } from 'react'
import { useInView } from '@/lib/useInView'

const ITEMS = [
  {
    q: 'O teste tem algum custo?',
    a: 'Não. São 7 dias grátis. Se gostar, você assina o plano. Se não gostar, é só parar de usar.',
  },
  {
    q: 'Qual a diferença entre o teste e o sob medida?',
    a: 'O teste é uma IA de atendimento simples para clínicas, pronta pra usar. O sob medida é um projeto de automação: a gente entra na sua empresa, faz o diagnóstico, monta a solução do jeito que vocês trabalham e treina a equipe.',
  },
  {
    q: 'Meu paciente vai perceber que é uma IA?',
    a: 'Ela conversa de forma natural, no tom da sua clínica. E quando o assunto pede uma pessoa, passa a conversa pra sua equipe.',
  },
  {
    q: 'E se a IA não souber responder?',
    a: 'Ela não inventa. Passa a conversa pra alguém da sua equipe continuar o atendimento.',
  },
  {
    q: 'Vocês só atendem clínicas?',
    a: 'Não. Clínicas são a nossa especialidade e é pra elas que temos os produtos prontos. Mas fazemos automação sob medida para empresas de qualquer segmento.',
  },
  {
    q: 'Quanto custa depois do teste?',
    a: 'O valor do plano depende do tamanho da clínica. A gente te passa tudo antes de acabarem os 7 dias, sem surpresa.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  const { ref, inView } = useInView<HTMLElement>()

  return (
    <section id="duvidas" ref={ref} className="relative bg-black px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className={`zr-reveal ${inView ? 'is-in' : ''}`}>
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.18em] text-zr-dim">
            <span className="text-zr-lilac">08</span> — Dúvidas
          </p>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-white">
            O que perguntam antes de testar.
          </h2>
        </div>

        <ul className={`zr-reveal border-t border-white/[0.08] ${inView ? 'is-in' : ''}`} style={{ transitionDelay: '120ms' }}>
          {ITEMS.map((item, i) => {
            const isOpen = open === i
            return (
              <li key={item.q} className="border-b border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className={`text-[18px] font-medium leading-snug transition-colors ${isOpen ? 'text-white' : 'text-white/75 group-hover:text-white'}`}>
                    {item.q}
                  </span>
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                    isOpen ? 'rotate-45 border-zr-lilac/60 bg-zr-violet/20 text-zr-lilac' : 'border-white/10 text-white/50'
                  }`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                <div className={`grid transition-all duration-500 ease-[cubic-bezier(.2,.8,.2,1)] ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <p className="overflow-hidden pr-12 text-[16px] leading-relaxed text-zr-muted">
                    <span className="block pb-6">{item.a}</span>
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
