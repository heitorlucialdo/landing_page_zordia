import { useInView } from '@/lib/useInView'

/* "Como trabalhamos": o foco é o projeto sob medida (consultoria +
   tecnologia). Embaixo, os dois produtos prontos, de forma breve. */

const STEPS = [
  {
    n: '01',
    title: 'Imersão na sua clínica',
    text: 'A gente entra na sua operação e acompanha a rotina de perto: atendimento, agenda, vendas, processos internos e pós.',
  },
  {
    n: '02',
    title: 'Diagnóstico',
    text: 'Mapeamos os gargalos e as perdas do dia a dia, inclusive os que nem você enxerga mais.',
  },
  {
    n: '03',
    title: 'Solução sob medida',
    text: 'Montamos as automações e a IA do jeito que a sua empresa funciona. Não é você que se adapta à ferramenta.',
  },
  {
    n: '04',
    title: 'Implantação',
    text: 'Colocamos tudo pra rodar junto com a sua equipe, sem parar o atendimento.',
  },
  {
    n: '05',
    title: 'Treinamento e mentoria',
    text: 'Treinamos a equipe e seguimos junto, pra vocês tirarem o máximo da tecnologia.',
  },
]

const PRODUCTS = [
  {
    code: 'Pronto 01',
    title: 'IA de atendimento e agendamento',
    points: ['Responde o paciente 24h no WhatsApp', 'Agenda e confirma consultas', 'Passa a conversa pra equipe quando precisa'],
    badge: '7 dias grátis',
  },
  {
    code: 'Pronto 02',
    title: 'IA de atendimento, agendamento, pré e pós-procedimento',
    points: ['Tudo do atendimento e agendamento', 'Orientações de preparo antes do procedimento', 'Acompanhamento e lembrete de retorno depois'],
  },
]

export default function Solutions() {
  const { ref, inView } = useInView<HTMLElement>()

  return (
    <section id="como-trabalhamos" ref={ref} className="relative bg-black px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        {/* ── Sob medida ── */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className={`zr-reveal lg:sticky lg:top-28 lg:self-start ${inView ? 'is-in' : ''}`}>
            <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.18em] text-zr-dim">
              <span className="text-zr-lilac">06</span> — Como trabalhamos
            </p>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-white">
              Sob medida pra sua clínica.{' '}
              <span className="text-zr-dim">Ou pra sua empresa.</span>
            </h2>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-zr-muted">
              É o nosso foco. Funciona como uma consultoria com tecnologia: a gente entende a sua operação por
              dentro e constrói a automação certa pra ela. Clínicas são a nossa especialidade, mas o método
              funciona em qualquer empresa.
            </p>
            <a
              href="#contato"
              className="zr-cta group mt-9 inline-flex h-[52px] items-center gap-2.5 rounded-full px-7 text-[15px] font-semibold text-white"
            >
              Quero uma solução sob medida
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>

          <ol className="relative">
            <span className="absolute bottom-8 left-[23px] top-8 w-px bg-gradient-to-b from-zr-violet/60 via-zr-violet/25 to-transparent" aria-hidden="true" />
            {STEPS.map((s, i) => (
              <Step key={s.n} {...s} delay={i * 80} />
            ))}
          </ol>
        </div>

        {/* ── Produtos prontos ── */}
        <div className="mt-24 md:mt-32">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <h3 className="text-[clamp(1.5rem,3.2vw,2.25rem)] font-semibold leading-tight tracking-[-0.025em] text-white">
              Pra clínicas, temos dois prontos.{' '}
              <span className="text-zr-dim">Pra começar mais simples.</span>
            </h3>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
            {PRODUCTS.map((p) => (
              <article key={p.code} className="relative flex flex-col rounded-3xl border border-white/[0.07] bg-zr-surface p-7 transition-colors duration-300 hover:border-zr-violet/30">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/40">{p.code}</span>
                  {p.badge && (
                    <span className="rounded-full bg-zr-violet/20 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-zr-lilac">{p.badge}</span>
                  )}
                </div>
                <h4 className="mt-5 text-[21px] font-semibold leading-snug tracking-[-0.02em] text-white">{p.title}</h4>
                <ul className="mt-5 flex flex-1 flex-col gap-2.5">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex gap-2.5 text-[15px] leading-snug text-white/65">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0" aria-hidden="true">
                        <path d="M5 12.5l4.5 4.5L19 7.5" />
                      </svg>
                      {pt}
                    </li>
                  ))}
                </ul>
                <a href="#contato" className="mt-7 inline-flex items-center gap-2 text-[14px] font-medium text-zr-lilac transition-colors hover:text-white">
                  {p.badge ? 'Testar grátis' : 'Quero esse'}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Step({ n, title, text, delay }: { n: string; title: string; text: string; delay: number }) {
  const { ref, inView } = useInView<HTMLLIElement>('-10% 0px')
  return (
    <li ref={ref} className={`zr-reveal relative flex gap-6 pb-10 last:pb-0 ${inView ? 'is-in' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
      <span
        className={`relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full border font-mono text-[13px] transition-all duration-700 ${
          inView ? 'border-zr-lilac/60 bg-[#120C1E] text-zr-lilac shadow-[0_0_0_6px_rgba(124,58,237,0.12)]' : 'border-white/10 bg-black text-white/40'
        }`}
      >
        {n}
      </span>
      <div className="pt-2.5">
        <h3 className="text-[21px] font-semibold tracking-[-0.02em] text-white">{title}</h3>
        <p className="mt-2 max-w-lg text-[16px] leading-relaxed text-white/55">{text}</p>
      </div>
    </li>
  )
}
