import { useEffect, useRef, useState } from 'react'
import ZMark from '@/components/hero/ZMark'
import { useInView } from '@/lib/useInView'

/* "Um dia na sua clínica": linha do tempo do dia, com o que acontece
   hoje à esquerda e o que acontece com a ZordIA à direita. A linha
   do meio vai enchendo de roxo conforme a pessoa rola. */

const MOMENTS = [
  {
    time: '21:14',
    title: 'Mensagem fora do horário',
    without: 'Fica sem resposta até de manhã. O paciente marca em outra clínica.',
    withTag: 'respondido em 3s',
    with: 'A IA responde na hora, com os horários livres, e marca a consulta.',
  },
  {
    time: '07:30',
    title: 'Confirmação do dia',
    without: 'A recepção liga para 30 pacientes. Metade não atende.',
    withTag: 'confirmado no WhatsApp',
    with: 'Cada paciente recebe a confirmação. Quem cancela libera o horário.',
  },
  {
    time: '09:00',
    title: 'Agenda',
    without: '1 em cada 5 não aparece. Horário perdido.',
    withTag: 'lista de espera',
    with: 'O horário vago é oferecido para quem estava esperando.',
  },
  {
    time: '14:00',
    title: 'Recepção',
    without: 'Responde preço, endereço e convênio o dia inteiro.',
    withTag: 'dúvidas resolvidas',
    with: 'A IA responde o básico e passa para a equipe só o que precisa de gente.',
  },
  {
    time: '18:00',
    title: 'Pacientes antigos',
    without: 'Quem não volta desde 2023 fica esquecido no sistema.',
    withTag: 'reativação',
    with: 'A IA chama de volta quem não aparece há meses.',
  },
  {
    time: '+30 dias',
    title: 'Retorno',
    without: 'O paciente faz o procedimento e some.',
    withTag: 'lembrete de retorno',
    with: 'Lembrete de retorno e manutenção na hora certa.',
  },
]

export default function Compare() {
  const { ref: headRef, inView: headIn } = useInView<HTMLDivElement>()
  const trackRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  // Quanto da linha do tempo já passou pelo meio da tela
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const el = trackRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const mid = window.innerHeight * 0.55
      setProgress(Math.min(1, Math.max(0, (mid - r.top) / r.height)))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section id="o-que-muda" className="relative bg-black px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div ref={headRef} className={`zr-reveal ${headIn ? 'is-in' : ''}`}>
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.18em] text-zr-dim">
            <span className="text-zr-lilac">03</span> — O que muda
          </p>
          <h2 className="max-w-3xl text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-white">
            Um dia na sua clínica.
          </h2>
          <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-zr-muted">
            O mesmo dia, duas versões. Role e compare.
          </p>
        </div>

        {/* Legenda das colunas (desktop) */}
        <div className="mt-14 hidden grid-cols-[1fr_120px_1fr] items-center md:grid">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/35">Hoje, sem a ZordIA</span>
          <span />
          <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-zr-lilac">
            <ZMark size={13} /> Com a ZordIA
          </span>
        </div>

        <div ref={trackRef} className="relative mt-10 md:mt-6">
          {/* Linha do meio (desktop) / da esquerda (celular) */}
          <div className="absolute bottom-0 left-[15px] top-0 w-px bg-white/[0.08] md:left-1/2" aria-hidden="true">
            <div
              className="w-full bg-gradient-to-b from-zr-lilac via-zr-violet to-zr-violet shadow-[0_0_12px_rgba(139,92,246,0.8)]"
              style={{ height: `${progress * 100}%` }}
            />
          </div>

          <ol className="flex flex-col gap-10 md:gap-6">
            {MOMENTS.map((m, i) => (
              <Moment key={m.time} {...m} lit={progress * MOMENTS.length > i + 0.35} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

interface MomentProps {
  time: string
  title: string
  without: string
  with: string
  withTag: string
  lit: boolean
}

function Moment({ time, title, without, with: withText, withTag, lit }: MomentProps) {
  const { ref, inView } = useInView<HTMLLIElement>('-10% 0px')

  return (
    <li ref={ref} className={`zr-reveal relative ${inView ? 'is-in' : ''}`}>
      <div className="grid grid-cols-[32px_minmax(0,1fr)] gap-x-3 md:grid-cols-[minmax(0,1fr)_120px_minmax(0,1fr)] md:gap-x-0">
        {/* Marcador no trilho */}
        <div className="relative col-start-1 row-span-3 row-start-1 flex justify-center md:col-start-2 md:row-span-1 md:items-center">
          <span
            className={`relative z-10 mt-[5px] h-[11px] w-[11px] rounded-full border transition-all duration-500 md:mt-0 ${
              lit ? 'border-zr-lilac bg-zr-violet shadow-[0_0_0_5px_rgba(124,58,237,0.18)]' : 'border-white/20 bg-black'
            }`}
          />
          <span
            className={`absolute top-1/2 hidden -translate-y-1/2 rounded-full border bg-black px-2.5 py-1 font-mono text-[11px] transition-colors duration-500 md:block ${
              lit ? 'border-zr-violet/50 text-zr-lilac' : 'border-white/10 text-white/40'
            }`}
          >
            {time}
          </span>
        </div>

        {/* Horário + título (celular) */}
        <div className="col-start-2 row-start-1 md:hidden">
          <p className={`font-mono text-[12px] transition-colors duration-500 ${lit ? 'text-zr-lilac' : 'text-white/40'}`}>{time}</p>
          <p className="mt-0.5 text-[17px] font-medium text-white">{title}</p>
        </div>

        {/* Sem */}
        <div className="col-start-2 row-start-2 mt-3 md:col-start-1 md:row-start-1 md:mt-0 md:pr-3">
          <div className="h-full rounded-2xl border border-white/[0.06] bg-zr-surface p-5 md:p-6">
            <p className="hidden text-[13px] font-medium text-white/40 md:block">{title}</p>
            <p className="flex gap-2.5 text-[15px] leading-snug text-white/55 md:mt-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2.4" strokeLinecap="round" className="mt-0.5 shrink-0" aria-hidden="true">
                <path d="M7 7l10 10M17 7L7 17" />
              </svg>
              {without}
            </p>
          </div>
        </div>

        {/* Com */}
        <div className="col-start-2 row-start-3 mt-2 md:col-start-3 md:row-start-1 md:mt-0 md:pl-3">
          <div
            className={`relative h-full overflow-hidden rounded-2xl border p-5 transition-all duration-700 md:p-6 ${
              lit
                ? 'border-zr-violet/40 bg-[#100C1A] shadow-[0_20px_60px_-30px_rgba(124,58,237,0.9)]'
                : 'border-white/[0.06] bg-zr-surface'
            }`}
          >
            <div
              className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${lit ? 'opacity-100' : 'opacity-0'}`}
              style={{ background: 'radial-gradient(90% 120% at 0% 0%, rgba(124,58,237,0.18), transparent 60%)' }}
              aria-hidden="true"
            />
            <span
              className={`relative inline-block rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider transition-colors duration-700 ${
                lit ? 'bg-zr-violet/20 text-zr-lilac' : 'bg-white/[0.04] text-white/30'
              }`}
            >
              {withTag}
            </span>
            <p className={`relative mt-2.5 flex gap-2.5 text-[15px] font-medium leading-snug transition-colors duration-700 ${lit ? 'text-white' : 'text-white/60'}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={lit ? '#A78BFA' : 'rgba(255,255,255,0.3)'} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0" aria-hidden="true">
                <path d="M5 12.5l4.5 4.5L19 7.5" />
              </svg>
              {withText}
            </p>
          </div>
        </div>
      </div>
    </li>
  )
}
