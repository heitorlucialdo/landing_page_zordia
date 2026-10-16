import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import ZMark from '@/components/hero/ZMark'
import { useInView } from '@/lib/useInView'
import { INPUTS, SOURCES, estimate } from '@/data/simulator'

const brl = (n: number) =>
  n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
const int = (n: number) => Math.round(n).toLocaleString('pt-BR')

/** Número que desliza até o valor novo em vez de pular. */
function useTween(value: number, ms = 600) {
  const [shown, setShown] = useState(value)
  const from = useRef(value)

  useEffect(() => {
    const start = performance.now()
    const a = from.current
    let raf = 0
    const step = (t: number) => {
      const k = ms === 0 ? 1 : Math.min(1, (t - start) / ms)
      const v = a + (value - a) * (1 - Math.pow(1 - k, 3))
      from.current = v
      setShown(v)
      if (k < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [value, ms])

  return shown
}

export default function Simulator() {
  const [messages, setMessages] = useState(INPUTS.messages.initial)
  const [ticket, setTicket] = useState(INPUTS.ticket.initial)
  const [inactive, setInactive] = useState(INPUTS.inactive.initial)
  const { ref, inView } = useInView<HTMLElement>()

  const e = useMemo(() => estimate(messages, ticket, inactive), [messages, ticket, inactive])

  // Arredonda cada linha e soma as linhas arredondadas, pra conta fechar na tela
  const recovered = Math.round(e.recovered)
  const noShow = Math.round(e.noShowAvoided)
  const reactivated = Math.round(e.reactivatedPerMonth)
  const extra = recovered + noShow + reactivated
  const perMonth = extra * ticket

  const shownMonth = useTween(inView ? perMonth : 0, inView ? 800 : 0)

  return (
    <section id="simulador" ref={ref} className="relative overflow-hidden bg-black px-5 py-24 md:px-8 md:py-32">
      <div className="relative mx-auto max-w-6xl">
        <div className={`zr-reveal ${inView ? 'is-in' : ''}`}>
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.18em] text-zr-dim">
            <span className="text-zr-lilac">04</span> — Simulador
          </p>
          <h2 className="max-w-4xl text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-white">
            Quanto sua clínica deixa na mesa.
          </h2>
          <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-zr-muted">
            Coloque os números da sua clínica. A conta é conservadora: só soma o que hoje se perde.
          </p>
        </div>

        <div
          className={`zr-reveal mt-12 grid grid-cols-1 gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:gap-5 ${inView ? 'is-in' : ''}`}
          style={{ transitionDelay: '120ms' }}
        >
          {/* ── Sua clínica ── */}
          <div className="rounded-3xl border border-white/[0.07] bg-zr-surface p-6 sm:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">Sua clínica</p>
            <div className="mt-6 flex flex-col divide-y divide-white/[0.06]">
              <Stepper {...INPUTS.messages} value={messages} onChange={setMessages} bigStep={50} />
              <Stepper {...INPUTS.ticket} value={ticket} onChange={setTicket} bigStep={50} prefix="R$" />
              <Stepper {...INPUTS.inactive} value={inactive} onChange={setInactive} bigStep={100} />
            </div>
          </div>

          {/* ── Extrato ── */}
          <div className="relative overflow-hidden rounded-3xl border border-zr-violet/25 bg-[#0C0A12] p-6 sm:p-8">
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full"
              style={{ background: 'radial-gradient(closest-side, rgba(124,58,237,0.22), transparent)' }}
              aria-hidden="true"
            />
            <div className="relative flex items-center justify-between">
              <span className="flex items-center gap-2.5">
                <ZMark size={16} />
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/55">Extrato estimado · por mês</span>
              </span>
              <span className="hidden rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white/40 sm:inline-block">
                Conservador
              </span>
            </div>

            <dl className="relative mt-7 flex flex-col gap-3.5 text-[14px] sm:text-[15px]">
              <Line label="Mensagens que hoje ficam sem resposta" value={int(e.lost)} muted />
              <Line label="Consultas que a IA recupera" value={`+${recovered}`} />
              <Line label="Faltas evitadas com confirmação" value={`+${noShow}`} />
              <Line label="Pacientes antigos de volta" value={`+${reactivated}`} />
            </dl>

            <div className="relative mt-6 border-t border-dashed border-white/10 pt-5">
              <Line label="Consultas a mais por mês" value={String(extra)} strong />
            </div>

            <div className="relative mt-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-zr-lilac">Faturamento a mais</p>
              <p className="mt-2 flex items-baseline gap-2 font-semibold tracking-[-0.045em] text-white" aria-live="polite">
                <span style={{ fontSize: 'clamp(2.75rem, 8vw, 4.5rem)', lineHeight: 1 }}>{brl(shownMonth)}</span>
                <span className="text-[15px] font-normal tracking-normal text-white/40">/mês</span>
              </p>
              <p className="mt-3 text-[14px] text-white/45">
                Cerca de {brl(perMonth * 12)} em 12 meses.
              </p>
            </div>

            <a
              href="#contato"
              className="zr-cta group relative mt-8 inline-flex h-[52px] w-full items-center justify-center gap-2.5 rounded-full px-7 text-[15px] font-semibold text-white sm:w-auto"
            >
              Testar 7 dias grátis
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </div>

        <p className="mt-6 max-w-4xl text-[12px] leading-relaxed text-white/30">{SOURCES}</p>
      </div>
    </section>
  )
}

function Line({ label, value, muted, strong }: { label: string; value: string; muted?: boolean; strong?: boolean }) {
  return (
    <div className="flex items-baseline gap-3">
      <dt className={`shrink-0 ${strong ? 'font-medium text-white' : muted ? 'text-white/45' : 'text-white/75'}`}>{label}</dt>
      <span className="mb-1 h-px flex-1 border-b border-dotted border-white/15" aria-hidden="true" />
      <dd className={`shrink-0 font-mono tabular-nums ${strong ? 'text-[18px] text-white' : muted ? 'text-white/45' : 'text-zr-lilac'}`}>
        {value}
      </dd>
    </div>
  )
}

interface StepperProps {
  label: string
  value: number
  min: number
  max: number
  bigStep: number
  prefix?: string
  onChange: (v: number) => void
}

function Stepper({ label, value, min, max, bigStep, prefix, onChange }: StepperProps) {
  const clamp = (v: number) => Math.min(max, Math.max(min, Math.round(v)))
  const [draft, setDraft] = useState(String(value))

  useEffect(() => setDraft(String(value)), [value])

  return (
    <div className="py-5 first:pt-0 last:pb-0">
      <span className="block text-[13px] text-white/50">{label}</span>
      <div className="mt-3 flex items-center gap-3">
        <StepButton label={`Diminuir ${label}`} onClick={() => onChange(clamp(value - bigStep))} disabled={value <= min}>
          <path d="M5 12h14" />
        </StepButton>
        <div className="flex min-w-0 flex-1 items-baseline justify-center gap-1.5 rounded-2xl bg-white/[0.03] px-3 py-2.5 focus-within:ring-1 focus-within:ring-zr-lilac/50">
          {prefix && <span className="text-[15px] text-white/40">{prefix}</span>}
          <input
            inputMode="numeric"
            aria-label={label}
            value={draft}
            onChange={(ev) => setDraft(ev.target.value.replace(/\D/g, ''))}
            onBlur={() => onChange(clamp(Number(draft) || min))}
            onKeyDown={(ev) => ev.key === 'Enter' && (ev.target as HTMLInputElement).blur()}
            className="w-full min-w-0 bg-transparent text-center text-[26px] font-semibold tracking-[-0.03em] text-white outline-none"
          />
        </div>
        <StepButton label={`Aumentar ${label}`} onClick={() => onChange(clamp(value + bigStep))} disabled={value >= max}>
          <path d="M12 5v14M5 12h14" />
        </StepButton>
      </div>
    </div>
  )
}

function StepButton({ label, onClick, disabled, children }: { label: string; onClick: () => void; disabled?: boolean; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`grid h-12 w-12 shrink-0 place-items-center rounded-full border transition-all duration-200 ${
        disabled
          ? 'border-white/5 text-white/20'
          : 'border-white/10 text-white/80 hover:border-zr-lilac/50 hover:bg-zr-violet/15 hover:text-white active:scale-95'
      }`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
        {children}
      </svg>
    </button>
  )
}
