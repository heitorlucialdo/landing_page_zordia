import { useState, type ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { submitLead } from '@/lib/submitLead'

const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/

const contactSchema = z.object({
  name:     z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email:    z.string().email('E-mail inválido'),
  whatsapp: z.string().regex(phoneRegex, 'Formato: (99) 99999-9999'),
  needs:    z.string().min(20, 'Descreva com pelo menos 20 caracteres'),
  products: z.array(z.string()).min(1, 'Selecione pelo menos um produto'),
  message:  z.string().optional(),
})

export type ContactSchema = z.infer<typeof contactSchema>

function applyPhoneMask(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 2)  return `(${digits}`
  if (digits.length <= 7)  return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 11) return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
  return value
}

interface FormFieldProps {
  label: string
  error?: string
  children: ReactNode
  required?: boolean
}

function FormField({ label, error, children, required }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm text-white/60 font-light tracking-wide">
        {label}{required && <span className="text-brand-neon ml-1">*</span>}
      </label>
      {children}
      {error && <p className="text-red-400 text-xs mt-0.5">{error}</p>}
    </div>
  )
}

const PRODUCT_OPTIONS = [
  { value: 'whatsapp-agent',       label: 'Agente IA WhatsApp'           },
  { value: 'sdr-complete',         label: 'Agente SDR + LP + CRM'        },
  { value: 'sdr-calls',            label: 'Agente SDR Ligações'           },
  { value: 'automation-enterprise', label: 'Automação para Empresa'       },
  { value: 'landing-page',         label: 'Landing Page'                  },
  { value: 'institutional-site',   label: 'Site Institucional'            },
]

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  )
}

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '', email: '', whatsapp: '', needs: '', products: [], message: '',
    },
  })

  const selectedProducts = watch('products')

  async function onSubmit(data: ContactSchema) {
    try {
      setSubmitError(null)
      await submitLead(data)
      setSubmitted(true)
    } catch {
      setSubmitError('Erro ao enviar. Tente novamente ou entre em contato pelo WhatsApp.')
    }
  }

  return (
    <section id="contato" className="section-padding bg-concentric relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(39,0,54,0.4) 0%, transparent 60%)' }}
      />

      <div className="container-max relative">
        <ScrollReveal>
          <span className="inline-block text-xs font-bold text-brand-neon tracking-widest uppercase
                           border border-brand-neon/30 px-3 py-1.5 rounded-full mb-4">
            Contato
          </span>
          <h2 className="text-3xl md:text-5xl font-black leading-tight">
            Vamos <span className="text-brand-neon">conversar</span>
          </h2>
          <p className="text-white/50 mt-4 max-w-xl">
            Preencha os dados abaixo e nossa equipe entrará em contato em breve.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-16">
          <ScrollReveal delay={0.1}>
            {submitted ? (
              <div className="neon-border rounded-2xl p-12 flex flex-col items-center justify-center text-center h-full"
                   style={{ background: 'linear-gradient(135deg, rgba(39,0,54,0.3) 0%, transparent 100%)' }}>
                <div className="w-16 h-16 rounded-full bg-brand-neon/10 border border-brand-neon/40 flex items-center justify-center mb-6">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#CC00FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-black mb-3">Mensagem enviada!</h3>
                <p className="text-white/60">Entraremos em contato em breve.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <FormField label="Nome completo" error={errors.name?.message} required>
                  <input
                    {...register('name')}
                    placeholder="Seu nome"
                    className="input-base"
                  />
                </FormField>

                <FormField label="E-mail" error={errors.email?.message} required>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="seu@email.com"
                    className="input-base"
                  />
                </FormField>

                <FormField label="WhatsApp / Telefone" error={errors.whatsapp?.message} required>
                  <input
                    {...register('whatsapp')}
                    placeholder="(99) 99999-9999"
                    className="input-base"
                    onChange={(e) => {
                      const masked = applyPhoneMask(e.target.value)
                      e.target.value = masked
                      setValue('whatsapp', masked, { shouldValidate: false })
                    }}
                  />
                </FormField>

                <FormField label="O que precisa?" error={errors.needs?.message} required>
                  <textarea
                    {...register('needs')}
                    rows={4}
                    placeholder="Descreva brevemente o que sua empresa precisa automatizar..."
                    className="input-base resize-none"
                  />
                </FormField>

                {submitError && (
                  <p className="text-red-400 text-sm border border-red-400/30 bg-red-400/5 rounded-xl px-4 py-3">
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-brand-neon text-black font-black rounded-xl
                             hover:shadow-neon-lg transition-all duration-300 text-sm tracking-wide
                             disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    'Enviar mensagem →'
                  )}
                </button>
              </form>
            )}
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="flex flex-col gap-8">
              <FormField label="Produtos de interesse" error={errors.products?.message} required>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                  {PRODUCT_OPTIONS.map((opt) => {
                    const checked = selectedProducts.includes(opt.value)
                    return (
                      <label
                        key={opt.value}
                        className={`flex items-center gap-3 cursor-pointer p-3 rounded-xl border transition-all duration-200
                          ${checked
                            ? 'border-brand-neon/60 bg-brand-neon/5'
                            : 'border-white/10 hover:border-white/20'
                          }`}
                      >
                        <input
                          type="checkbox"
                          value={opt.value}
                          {...register('products')}
                          className="sr-only"
                        />
                        <span
                          className={`flex-shrink-0 w-4 h-4 rounded border transition-all duration-200 flex items-center justify-center
                            ${checked ? 'bg-brand-neon border-brand-neon' : 'border-white/30'}`}
                        >
                          {checked && (
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                              <polyline points="1.5 5 4 7.5 8.5 2.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </span>
                        <span className="text-sm text-white/80">{opt.label}</span>
                      </label>
                    )
                  })}
                </div>
              </FormField>

              <FormField label="Mensagem adicional (opcional)" error={errors.message?.message}>
                <textarea
                  {...register('message')}
                  rows={4}
                  placeholder="Informações adicionais, prazo, orçamento..."
                  className="input-base resize-none"
                />
              </FormField>

              <div
                className="rounded-2xl p-6 border border-white/10 flex flex-col gap-4"
                style={{ background: 'rgba(255,255,255,0.02)' }}
              >
                <p className="text-xs text-white/30 uppercase tracking-widest font-bold">Fale conosco</p>
                <a
                  href="https://instagram.com/ia.zord"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/70 hover:text-brand-neon transition-colors duration-200 w-fit"
                >
                  <InstagramIcon />
                  <span className="text-sm">@ia.zord</span>
                </a>
                <a
                  href="https://wa.me/5565996490705"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/70 hover:text-brand-neon transition-colors duration-200 w-fit"
                >
                  <WhatsAppIcon />
                  <span className="text-sm">(65) 99649-0705</span>
                </a>
                <a
                  href="mailto:zord.ia20@gmail.com"
                  className="flex items-center gap-3 text-white/70 hover:text-brand-neon transition-colors duration-200 w-fit"
                >
                  <EmailIcon />
                  <span className="text-sm">zord.ia20@gmail.com</span>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
