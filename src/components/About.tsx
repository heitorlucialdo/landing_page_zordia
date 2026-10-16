import { useInView } from '@/lib/useInView'

const PILLARS = [
  {
    label: 'Missão',
    text: 'Tirar o trabalho repetitivo das empresas com automação e IA, pra equipe focar no que gera resultado.',
  },
  {
    label: 'Visão',
    text: 'Ser referência em automação no Brasil, a começar pelas clínicas.',
  },
  {
    label: 'Valores',
    text: 'Resultado medido, não promessa. Transparência em cada etapa. Tecnologia a serviço das pessoas.',
  },
]

export default function About() {
  const { ref, inView } = useInView<HTMLElement>()

  return (
    <section id="sobre" ref={ref} className="relative bg-black px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div className={`zr-reveal ${inView ? 'is-in' : ''}`}>
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.18em] text-zr-dim">
            <span className="text-zr-lilac">02</span> — Quem somos
          </p>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-white">
            Automação que trabalha{' '}
            <span className="text-zr-dim">dentro da sua operação.</span>
          </h2>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-zr-muted">
            A ZordIA é uma empresa de automação com inteligência artificial. Nossa especialidade são as clínicas,
            mas atendemos empresas de qualquer segmento. A gente não entrega uma ferramenta e some: entra na sua
            operação, entende como tudo funciona e fica junto até dar resultado.
          </p>
        </div>

        <dl className="flex flex-col border-t border-white/[0.08]">
          {PILLARS.map((p, i) => (
            <div
              key={p.label}
              className={`zr-reveal grid grid-cols-[96px_1fr] gap-6 border-b border-white/[0.08] py-7 ${inView ? 'is-in' : ''}`}
              style={{ transitionDelay: `${120 + i * 90}ms` }}
            >
              <dt className="pt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-zr-lilac">{p.label}</dt>
              <dd className="text-[17px] leading-snug text-white/85">{p.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
