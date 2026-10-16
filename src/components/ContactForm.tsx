import { useState, type ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useInView } from '@/lib/useInView'
import { submitLead } from '@/lib/submitLead'
import { whatsappLink } from '@/lib/contact'

const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/

export const PRODUCTS = [
  'Ainda não sei',
  'IA de atendimento e agendamento',
  'IA de atendimento, agendamento, pré e pós-procedimento',
  'Solução sob medida',
] as const

const SPECIALTIES = ['Odontologia', 'Estética', 'Clínica médica', 'Fisioterapia', 'Psicologia', 'Outra área da saúde', 'Outro tipo de empresa'] as const

const contactSchema = z.object({
  intent:    z.enum(['teste-7-dias', 'sob-medida']),
  name:      z.string().trim().min(3, 'Escreva seu nome'),
  whatsapp:  z.string().regex(phoneRegex, 'Use o formato (65) 99999-9999'),
  email:     z.string().trim().email('Escreva um e-mail válido'),
  clinic:    z.string().trim().min(2, 'Escreva o nome da clínica ou empresa'),
  specialty: z.enum(SPECIALTIES, { errorMap: () => ({ message: 'Escolha o segmento' }) }),
  product:   z.enum(PRODUCTS),
})

export type ContactSchema = z.infer<typeof contactSchema>

function applyPhoneMask(value: string): string {
  const d = value.replace(/\D/g, '').slice(0, 11)
  if (d.length === 0) return ''
  if (d.length <= 2) return `(${d}`
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

const TRIAL_POINTS = [
  'Uma IA de atendimento simples no WhatsApp da sua clínica',
  'Ela responde o paciente e passa a conversa pra sua equipe',
  '7 dias grátis. Gostou, assina o plano. Não gostou, é só parar de usar',
]

export default function ContactForm() {
  const [submitted, setSubmitted] = useState<ContactSchema['intent'] | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const { ref, inView } = useInView<HTMLElement>()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues: { intent: 'teste-7-dias', name: '', whatsapp: '', email: '', clinic: '', specialty: undefined, product: 'Ainda não sei' },
  })

  const intent = watch('intent')
  const isTrial = intent === 'teste-7-dias'

  async function onSubmit(data: ContactSchema) {
    try {
      setSubmitError(null)
      await submitLead(data)
      setSubmitted(data.intent)
    } catch {
      setSubmitError('Não conseguimos enviar agora. Tente de novo ou fale com a gente no WhatsApp.')
    }
  }

  return (
    <section id="contato" ref={ref} className="relative overflow-hidden bg-black px-5 py-24 md:px-8 md:py-32">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%]"
        style={{ background: 'radial-gradient(60% 70% at 50% 100%, rgba(124,58,237,0.16), transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* ── Oferta ── */}
        <div className={`zr-reveal ${inView ? 'is-in' : ''}`}>
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.18em] text-zr-dim">
            <span className="text-zr-lilac">09</span> — Comece agora
          </p>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-white">
            Teste 7 dias na sua clínica.{' '}
            <span className="text-zr-dim">De graça.</span>
          </h2>

          <ul className="mt-9 flex flex-col gap-4">
            {TRIAL_POINTS.map((t, i) => (
              <li key={t} className="flex gap-4">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-zr-violet/40 bg-zr-violet/10 font-mono text-[11px] text-zr-lilac">
                  {i + 1}
                </span>
                <span className="pt-0.5 text-[16px] leading-snug text-white/80">{t}</span>
              </li>
            ))}
          </ul>

          <p className="mt-9 text-[14px] text-white/40">
            Prefere conversar antes?{' '}
            <a
              href={whatsappLink('Oi! Vim pelo site da ZordIA e quero falar com a equipe.')}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zr-lilac underline decoration-zr-lilac/30 underline-offset-4 transition-colors hover:decoration-zr-lilac"
            >
              Chame a gente no WhatsApp
            </a>
            .
          </p>
        </div>

        {/* ── Formulário ── */}
        <div className={`zr-reveal ${inView ? 'is-in' : ''}`} style={{ transitionDelay: '120ms' }}>
          <div className="rounded-[28px] border border-white/[0.08] bg-zr-surface p-6 sm:p-9">
            {submitted ? (
              <Success intent={submitted} />
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
                <fieldset>
                  <legend className="mb-3 text-[13px] text-white/50">O que você quer?</legend>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <IntentCard
                      active={isTrial}
                      onClick={() => setValue('intent', 'teste-7-dias')}
                      title="Quero o teste grátis"
                      desc="7 dias com a IA no meu WhatsApp"
                      badge="Recomendado"
                    />
                    <IntentCard
                      active={!isTrial}
                      onClick={() => setValue('intent', 'sob-medida')}
                      title="Quero uma solução sob medida"
                      desc="Diagnóstico e projeto pra minha clínica ou empresa"
                    />
                  </div>
                  <input type="hidden" {...register('intent')} />
                </fieldset>

                <Field label="Seu nome" error={errors.name?.message}>
                  <input {...register('name')} autoComplete="name" placeholder="Maria Oliveira" className="input-zr" />
                </Field>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="WhatsApp" error={errors.whatsapp?.message}>
                    <input
                      {...register('whatsapp', {
                        onChange: (e) => {
                          e.target.value = applyPhoneMask(e.target.value)
                        },
                      })}
                      inputMode="tel"
                      autoComplete="tel-national"
                      placeholder="(65) 99999-9999"
                      className="input-zr"
                    />
                  </Field>
                  <Field label="E-mail" error={errors.email?.message}>
                    <input {...register('email')} type="email" inputMode="email" autoComplete="email" placeholder="maria@clinica.com.br" className="input-zr" />
                  </Field>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="Clínica ou empresa" error={errors.clinic?.message}>
                    <input {...register('clinic')} autoComplete="organization" placeholder="Clínica Sorriso" className="input-zr" />
                  </Field>
                  <Field label="Segmento" error={errors.specialty?.message}>
                    <select {...register('specialty')} defaultValue="" className="input-zr appearance-none bg-[length:16px] bg-[right_14px_center] bg-no-repeat pr-10"
                      style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23A1A1AA' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")" }}>
                      <option value="" disabled>Escolha</option>
                      {SPECIALTIES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field label="Tem preferência por algum produto?" error={errors.product?.message}>
                  <select {...register('product')} className="input-zr appearance-none bg-[length:16px] bg-[right_14px_center] bg-no-repeat pr-10"
                      style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23A1A1AA' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")" }}>
                    {PRODUCTS.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </Field>

                {submitError && (
                  <p className="rounded-xl border border-red-400/30 bg-red-400/5 px-4 py-3 text-[13px] text-red-300">{submitError}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="zr-cta mt-1 flex h-14 w-full items-center justify-center gap-2.5 rounded-full text-[15px] font-semibold text-white disabled:cursor-wait disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Enviando…
                    </>
                  ) : isTrial ? (
                    'Quero meu teste grátis'
                  ) : (
                    'Quero meu diagnóstico'
                  )}
                </button>
                <p className="text-center text-[12px] text-white/35">
                  {isTrial ? 'A ZordIA te chama no WhatsApp pra liberar o teste.' : 'A gente te chama no WhatsApp pra marcar o diagnóstico.'}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function IntentCard({ active, onClick, title, desc, badge }: { active: boolean; onClick: () => void; title: string; desc: string; badge?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`relative flex flex-col items-start gap-1 rounded-2xl border p-4 text-left transition-all duration-300 ${
        active
          ? 'border-zr-lilac/60 bg-zr-violet/[0.12] shadow-[0_10px_40px_-20px_rgba(124,58,237,0.9)]'
          : 'border-white/[0.08] bg-white/[0.02] hover:border-white/20'
      }`}
    >
      <span className="flex w-full items-center justify-between gap-2">
        <span className={`grid h-[18px] w-[18px] place-items-center rounded-full border-2 transition-colors ${active ? 'border-zr-lilac' : 'border-white/25'}`}>
          <span className={`h-2 w-2 rounded-full bg-zr-lilac transition-transform ${active ? 'scale-100' : 'scale-0'}`} />
        </span>
        {badge && <span className="rounded-full bg-zr-violet/25 px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-wider text-zr-lilac">{badge}</span>}
      </span>
      <span className="mt-2 text-[15px] font-semibold text-white">{title}</span>
      <span className="text-[13px] text-white/50">{desc}</span>
    </button>
  )
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[13px] text-white/50">{label}</span>
      {children}
      {error && <span className="text-[12px] text-red-300">{error}</span>}
    </label>
  )
}

function Success({ intent }: { intent: ContactSchema['intent'] }) {
  return (
    <div className="flex flex-col items-center py-10 text-center">
      <span className="grid h-16 w-16 place-items-center rounded-full border border-zr-lilac/40 bg-zr-violet/15">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C4B5FD" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
      </span>
      <h3 className="mt-6 text-[26px] font-semibold tracking-[-0.02em] text-white">Recebemos!</h3>
      <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-zr-muted">
        {intent === 'teste-7-dias'
          ? 'Fique de olho no WhatsApp: a ZordIA vai te chamar pra liberar seus 7 dias grátis.'
          : 'Fique de olho no WhatsApp: a nossa equipe vai te chamar pra marcar o diagnóstico.'}
      </p>
    </div>
  )
}
