import { useCallback, useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import AgendaFloor from '@/components/hero/AgendaFloor'
import ChatDemo, { CalendarIcon } from '@/components/hero/ChatDemo'

const INTRO_KEY = 'zr-intro-seen'

const HEADLINE: { text: string; muted?: boolean }[] = [
  { text: 'Seu paciente mandou' },
  { text: 'mensagem às 21h.' },
  { text: 'Quem respondeu?', muted: true },
]

// Atraso (s) de cada elemento quando a entrada toca
const delay = (s: number): CSSProperties => ({ animationDelay: `${s}s` })

export default function Hero() {
  // A entrada toca só na primeira visita da sessão
  const [isStatic] = useState(() => {
    try {
      return sessionStorage.getItem(INTRO_KEY) === '1'
    } catch {
      return false
    }
  })
  const [booked, setBooked] = useState(false)
  const handleBooked = useCallback((b: boolean) => setBooked(b), [])

  useEffect(() => {
    try {
      sessionStorage.setItem(INTRO_KEY, '1')
    } catch {
      /* navegação privada: só não lembra */
    }
  }, [])

  return (
    <section
      id="inicio"
      className={`relative isolate overflow-hidden bg-zr-bg ${isStatic ? 'zr-static' : ''}`}
    >
      {/* ── Fundo ── */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div
          className="zr-fade absolute inset-0"
          style={{
            ...delay(0.2),
            background:
              'radial-gradient(900px 520px at 78% 38%, rgba(124,58,237,0.20), transparent 62%),' +
              'radial-gradient(700px 400px at 12% 0%, rgba(167,139,250,0.08), transparent 60%)',
          }}
        />
        <div className="zr-fade absolute inset-0" style={delay(0.35)}>
          <AgendaFloor />
        </div>
        {/* Horizonte roxo */}
        <div
          className="absolute inset-x-0 bottom-0 h-[38%]"
          style={{ background: 'radial-gradient(60% 100% at 50% 100%, rgba(124,58,237,0.16), transparent 70%)' }}
        />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-zr-bg to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent" />
        <div className="zr-grain absolute inset-0" />
      </div>

      <div className="mx-auto grid min-h-[100svh] w-full max-w-7xl grid-cols-1 items-center gap-14 px-5 pb-20 pt-28 md:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 lg:pb-16 lg:pt-24">
        {/* ── Texto ── */}
        <div className="max-w-[46rem]">
          <p className="zr-rise mb-7 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.14em] sm:gap-3 sm:tracking-[0.18em]" style={delay(0.15)}>
            <span className="zr-pulse h-1.5 w-1.5 rounded-full bg-zr-lilac" />
            <span className="text-zr-lilac">ZRD·01</span>
            <span className="hidden h-px w-6 bg-white/15 sm:block" />
            <span className="text-zr-muted">Automação com IA<span className="hidden sm:inline lg:hidden xl:inline"> · Especialistas em clínicas</span></span>
          </p>

          <h1
            className="text-[clamp(2.3rem,8.4vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-white lg:text-[clamp(2.9rem,4.7vw,4.6rem)]"
            style={{ fontStretch: '92%' }}
          >
            {/* Cada linha é revelada por uma varredura roxa */}
            {HEADLINE.map((line, li) => (
              <span key={li} className="block">
                <span className={`zr-scan ${line.muted ? 'text-zr-dim' : ''}`} style={delay(0.25 + li * 0.32)}>
                  {line.text}
                </span>
              </span>
            ))}
          </h1>

          <p className="zr-rise mt-7 max-w-[34rem] text-[17px] leading-relaxed text-zr-muted md:text-lg" style={delay(1.05)}>
            A ZordIA atende, agenda, confirma e chama de volta os pacientes da sua
            clínica pelo WhatsApp. Em segundos, a qualquer hora, sem ocupar sua recepção.
          </p>

          <div className="zr-rise mt-10 flex flex-col gap-4 sm:flex-row sm:items-center lg:flex-col lg:items-start xl:flex-row xl:items-center" style={delay(1.25)}>
            <a
              href="#simulador"
              className="zr-cta group inline-flex h-[54px] items-center justify-center gap-2.5 whitespace-nowrap rounded-full px-7 text-[15px] font-semibold text-white"
            >
              Calcular quanto minha clínica perde
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a
              href="#contato"
              className="inline-flex h-[54px] items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 text-[15px] font-medium text-white/80 transition-colors duration-200 hover:text-white"
            >
              Quero testar na minha clínica
            </a>
          </div>

          <ul className="zr-rise mt-10 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-white/40" style={delay(1.45)}>
            <li className="flex items-center gap-2"><Tick /> No WhatsApp da clínica</li>
            <li className="flex items-center gap-2"><Tick /> Atende 24h</li>
            <li className="flex items-center gap-2"><Tick /> Confirma e lembra</li>
          </ul>
        </div>

        {/* ── Celular com a conversa ── */}
        <div className="zr-rise relative mx-auto w-full max-w-[340px] lg:mr-4 lg:max-w-[360px]" style={delay(0.7)}>
          {/* Brilho atrás do aparelho */}
          <div
            className="absolute -inset-10 -z-10 rounded-full opacity-80 blur-3xl"
            style={{ background: 'radial-gradient(closest-side, rgba(124,58,237,0.45), transparent)' }}
            aria-hidden="true"
          />

          <div className="zr-float relative">
            <div className="relative rounded-[46px] bg-gradient-to-b from-white/20 via-white/[0.06] to-white/10 p-[1.5px] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]">
              <div className="relative h-[600px] overflow-hidden rounded-[44.5px] bg-[#0B0B0E] sm:h-[640px]">
                {/* Ilha + barra de status */}
                <div className="absolute left-1/2 top-3 z-10 h-[26px] w-[96px] -translate-x-1/2 rounded-full bg-black" />
                <div className="absolute inset-x-0 top-0 z-[5] flex justify-between px-7 pt-[15px] text-[11px] font-semibold text-white/80">
                  <span>21:14</span>
                  <span className="flex items-center gap-1">
                    <svg width="15" height="10" viewBox="0 0 18 12" fill="currentColor" aria-hidden="true"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5" width="3" height="7" rx="1"/><rect x="10" y="2.5" width="3" height="9.5" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg>
                    <svg width="22" height="11" viewBox="0 0 26 12" fill="none" aria-hidden="true"><rect x="0.5" y="0.5" width="22" height="11" rx="3" stroke="currentColor" opacity=".5"/><rect x="2" y="2" width="15" height="8" rx="1.8" fill="currentColor"/><rect x="24" y="4" width="1.6" height="4" rx=".8" fill="currentColor" opacity=".5"/></svg>
                  </span>
                </div>
                <ChatDemo startDelay={isStatic ? 0 : 1500} onBooked={handleBooked} />
              </div>
            </div>

            {/* Cartões flutuantes */}
            <div className="absolute -left-16 top-24 hidden sm:block xl:-left-24">
              <FloatCard>
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-zr-violet/20 text-zr-lilac">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" /></svg>
                </span>
                <span>
                  <span className="block text-[12px] font-semibold text-white">Respondido em 3s</span>
                  <span className="block font-mono text-[10px] text-white/45">21:14:03 · domingo</span>
                </span>
              </FloatCard>
            </div>

            <div
              className={`absolute bottom-20 hidden transition-all duration-500 sm:-left-16 sm:block lg:hidden xl:-left-24 xl:block ${
                booked ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-3 opacity-0 blur-sm'
              }`}
            >
              <FloatCard>
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-400/15 text-emerald-300">
                  <CalendarIcon />
                </span>
                <span>
                  <span className="block text-[12px] font-semibold text-white">+1 consulta na agenda</span>
                  <span className="block font-mono text-[10px] text-white/45">Amanhã · 09:00 · Limpeza</span>
                </span>
              </FloatCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FloatCard({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#121216]/80 py-2.5 pl-2.5 pr-4 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl">
      {children}
    </div>
  )
}

function Tick() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  )
}
