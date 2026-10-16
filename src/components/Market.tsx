import { useInView } from '@/lib/useInView'

/* O mercado de IA, com números de fonte séria. A mensagem: na saúde
   quase ninguém começou, então quem começar agora sai na frente. */

const BARS = [
  {
    value: 88,
    label: 'das empresas no mundo já usam IA em pelo menos uma área',
    source: 'McKinsey, The State of AI 2025',
    tone: 'muted' as const,
  },
  {
    value: 41.9,
    from: 16.9,
    label: 'das indústrias brasileiras com 100+ funcionários usavam IA em 2024. Em 2022 eram 16,9%',
    source: 'IBGE, Pintec Semestral 2024',
    tone: 'muted' as const,
  },
  {
    value: 18,
    label: 'dos estabelecimentos de saúde no Brasil usam IA. Na rede privada, 25%',
    source: 'Cetic.br, TIC Saúde 2025',
    tone: 'accent' as const,
  },
]

const pct = (n: number) => `${n.toLocaleString('pt-BR')}%`

export default function Market() {
  const { ref, inView } = useInView<HTMLElement>()

  return (
    <section id="mercado" ref={ref} className="relative overflow-hidden bg-black px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className={`zr-reveal ${inView ? 'is-in' : ''}`}>
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.18em] text-zr-dim">
            <span className="text-zr-lilac">05</span> — O mercado
          </p>
          <h2 className="max-w-4xl text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-white">
            A IA já entrou nas empresas.{' '}
            <span className="text-zr-dim">Na saúde, quase ninguém começou.</span>
          </h2>
        </div>

        <ul className="mt-14 flex flex-col gap-4">
          {BARS.map((b, i) => (
            <li
              key={b.source}
              className={`zr-reveal rounded-3xl border p-6 sm:p-8 ${
                b.tone === 'accent' ? 'border-zr-violet/35 bg-[#0D0A15]' : 'border-white/[0.07] bg-zr-surface'
              } ${inView ? 'is-in' : ''}`}
              style={{ transitionDelay: `${120 + i * 110}ms` }}
            >
              <div className="grid grid-cols-1 items-end gap-5 md:grid-cols-[200px_1fr] md:gap-10">
                <p className={`text-[clamp(3rem,7vw,4.5rem)] font-semibold leading-none tracking-[-0.045em] ${b.tone === 'accent' ? 'text-zr-lilac' : 'text-white'}`}>
                  {pct(b.value)}
                </p>
                <div>
                  <p className="text-[16px] leading-snug text-white/75 md:text-[17px]">{b.label}</p>
                  <div className="relative mt-4 h-2 overflow-hidden rounded-full bg-white/[0.06]">
                    <span
                      className={`absolute inset-y-0 left-0 rounded-full transition-[width] duration-[1400ms] ease-[cubic-bezier(.2,.8,.2,1)] ${
                        b.tone === 'accent'
                          ? 'bg-gradient-to-r from-[#6D28D9] to-[#C4B5FD] shadow-[0_0_16px_rgba(139,92,246,0.8)]'
                          : 'bg-white/60'
                      }`}
                      style={{
                        width: inView ? `${b.value}%` : '0%',
                        transitionDelay: `${300 + i * 150}ms`,
                      }}
                    />
                    {b.from !== undefined && (
                      <span
                        className="absolute inset-y-0 left-0 rounded-full bg-[#52525B] transition-[width] duration-[1400ms] ease-[cubic-bezier(.2,.8,.2,1)]"
                        style={{ width: inView ? `${b.from}%` : '0%', transitionDelay: `${300 + i * 150}ms` }}
                      />
                    )}
                  </div>
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-white/30">{b.source}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div
          className={`zr-reveal mt-10 grid grid-cols-1 gap-8 rounded-3xl border border-white/[0.07] p-7 sm:p-10 md:grid-cols-[1fr_auto] md:items-center ${inView ? 'is-in' : ''}`}
          style={{ transitionDelay: '480ms' }}
        >
          <div className="max-w-2xl">
            <p className="text-[clamp(1.35rem,2.6vw,1.75rem)] font-medium leading-snug tracking-[-0.015em] text-white">
              Quem começar agora sai na frente. Mas ter IA não basta: só 39% das empresas já veem a IA
              aparecer no lucro.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-zr-muted">
              A diferença está em implantar do jeito certo, dentro da rotina da clínica. É isso que a ZordIA faz.
            </p>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-white/30">McKinsey, The State of AI 2025</p>
          </div>
          <a
            href="#contato"
            className="zr-cta group inline-flex h-[52px] items-center justify-center gap-2.5 whitespace-nowrap rounded-full px-7 text-[15px] font-semibold text-white"
          >
            Começar agora
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
