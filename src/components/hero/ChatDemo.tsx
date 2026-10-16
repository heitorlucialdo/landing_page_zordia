import { useEffect, useState, type ReactNode } from 'react'

/* Conversa encenada: paciente escreve fora do horário, a ZordIA responde,
   oferece horários e confirma o agendamento. Roda em loop. */

// Tempo (ms) que cada etapa fica na tela antes de avançar
const STEP_MS = [600, 700, 1400, 800, 700, 500, 700, 1400, 5200]
const LAST_STEP = STEP_MS.length - 1

interface ChatDemoProps {
  startDelay?: number
  onBooked?: (booked: boolean) => void
}

export default function ChatDemo({ startDelay = 0, onBooked }: ChatDemoProps) {
  const [step, setStep] = useState(0)
  const [running, setRunning] = useState(startDelay === 0)

  useEffect(() => {
    if (running) return
    const t = window.setTimeout(() => setRunning(true), startDelay)
    return () => window.clearTimeout(t)
  }, [running, startDelay])

  useEffect(() => {
    if (!running) return
    const t = window.setTimeout(
      () => setStep((s) => (s >= LAST_STEP ? 0 : s + 1)),
      STEP_MS[step],
    )
    return () => window.clearTimeout(t)
  }, [step, running])

  useEffect(() => {
    onBooked?.(step >= 8)
  }, [step, onBooked])

  return (
    <div className="relative flex h-full flex-col">
      {/* Cabeçalho do WhatsApp */}
      <div className="flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.02] px-4 pb-3 pt-11">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A1A1AA" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        <div className="relative grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-zr-lilac to-zr-violet text-[13px] font-semibold text-white">
          A
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#0B0B0E] bg-emerald-400" />
        </div>
        <div className="min-w-0 leading-tight">
          <p className="truncate text-[14px] font-semibold text-white">Clínica Aurora</p>
          <p className="text-[11px] text-zr-lilac">online · atendimento ZordIA</p>
        </div>
      </div>

      {/* Mensagens, presas ao fundo como num chat de verdade */}
      <div
        className="flex flex-1 flex-col justify-end gap-2 overflow-hidden px-3 pb-3"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)',
          backgroundSize: '14px 14px',
        }}
      >
        <DayChip />

        {step >= 1 && (
          <Bubble side="left" time="21:14">
            Oi! Vocês têm horário pra limpeza amanhã?
          </Bubble>
        )}

        {step === 2 && <Typing />}

        {step >= 3 && (
          <Bubble side="right" time="21:14">
            Oi, Marina! Tenho amanhã às <b className="font-semibold">9h</b> ou às{' '}
            <b className="font-semibold">14h30</b>. Qual fica melhor pra você?
          </Bubble>
        )}

        {(step === 4 || step === 5) && (
          <div className="zr-msg flex gap-2 self-start pl-1">
            <Chip active={step === 5}>9h</Chip>
            <Chip>14h30</Chip>
          </div>
        )}

        {step >= 6 && (
          <Bubble side="left" time="21:15">
            9h, por favor 🙌
          </Bubble>
        )}

        {step === 7 && <Typing />}

        {step >= 8 && (
          <Bubble side="right" time="21:15">
            Pronto, agendado! ✅
            <span className="mt-1.5 flex items-center gap-2 rounded-lg bg-black/25 px-2.5 py-2 text-[12px] text-violet-100">
              <CalendarIcon />
              Amanhã · 09:00 · Dra. Paula
            </span>
            <span className="mt-1.5 block text-violet-100/80">Te mando um lembrete às 8h.</span>
          </Bubble>
        )}
      </div>

      {/* Campo de digitação */}
      <div className="flex items-center gap-2 px-3 pb-5 pt-1">
        <div className="flex h-9 flex-1 items-center rounded-full bg-white/[0.05] px-4 text-[12px] text-white/30">
          Mensagem
        </div>
        <div className="grid h-9 w-9 place-items-center rounded-full bg-zr-violet">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <rect x="9" y="3" width="6" height="11" rx="3" />
            <path d="M5 11a7 7 0 0014 0M12 18v3" />
          </svg>
        </div>
      </div>
    </div>
  )
}

function DayChip() {
  return (
    <span className="mb-1 self-center rounded-md bg-white/[0.05] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white/40">
      Hoje · fora do horário
    </span>
  )
}

function Bubble({ side, time, children }: { side: 'left' | 'right'; time: string; children: ReactNode }) {
  const isAI = side === 'right'
  return (
    <div
      className={`zr-msg max-w-[84%] rounded-2xl px-3 py-2 text-[13px] leading-snug ${
        isAI
          ? 'self-end rounded-br-md bg-gradient-to-b from-[#6D28D9] to-[#5B21B6] text-white shadow-[0_6px_24px_-8px_rgba(124,58,237,0.8)]'
          : 'self-start rounded-bl-md bg-[#1C1C21] text-white/90'
      }`}
    >
      {children}
      <span className={`mt-1 flex items-center justify-end gap-1 text-[10px] ${isAI ? 'text-violet-200/70' : 'text-white/35'}`}>
        {time}
        {isAI && (
          <svg width="14" height="9" viewBox="0 0 16 10" fill="none" stroke="#C4B5FD" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
            <path d="M1 5.5l3 3L10 1.5M6.5 8.5L13 1.5" />
          </svg>
        )}
      </span>
    </div>
  )
}

function Typing() {
  return (
    <div className="zr-msg flex items-center gap-1 self-end rounded-2xl rounded-br-md bg-[#2E1065] px-3.5 py-3">
      <span className="zr-dot h-1.5 w-1.5 rounded-full bg-violet-200" />
      <span className="zr-dot h-1.5 w-1.5 rounded-full bg-violet-200" />
      <span className="zr-dot h-1.5 w-1.5 rounded-full bg-violet-200" />
    </div>
  )
}

function Chip({ active, children }: { active?: boolean; children: ReactNode }) {
  return (
    <span
      className={`rounded-full border px-3.5 py-1.5 text-[12px] font-medium transition-all duration-300 ${
        active
          ? 'scale-95 border-zr-lilac bg-zr-violet text-white'
          : 'border-zr-lilac/40 bg-zr-violet/10 text-zr-lilac'
      }`}
    >
      {children}
    </span>
  )
}

export function CalendarIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className} aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  )
}
