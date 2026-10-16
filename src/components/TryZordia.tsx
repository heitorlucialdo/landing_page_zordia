import ZMark from '@/components/hero/ZMark'
import { useInView } from '@/lib/useInView'
import { ZORDIA_WHATSAPP_LABEL, whatsappLink } from '@/lib/contact'

const DEMO_TEXT = 'Oi! Vim pelo site e quero ver como a IA da ZordIA atende.'

/* Bloco antes do formulário: a pessoa conversa agora com a IA da própria
   ZordIA. Deixa claro que é o número da ZordIA, não um teste na clínica. */
export default function TryZordia() {
  const { ref, inView } = useInView<HTMLElement>()

  return (
    <section ref={ref} className="relative bg-black px-5 py-16 md:px-8 md:py-24">
      <div
        className={`zr-reveal relative mx-auto max-w-6xl overflow-hidden rounded-[28px] border border-zr-violet/25 bg-[#0C0A12] ${inView ? 'is-in' : ''}`}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(60% 90% at 100% 50%, rgba(124,58,237,0.22), transparent 65%),' +
              'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: 'auto, 16px 16px',
          }}
          aria-hidden="true"
        />

        <div className="relative grid grid-cols-1 items-center gap-10 p-7 sm:p-10 md:grid-cols-[1.1fr_0.9fr] md:p-14">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-zr-lilac">Teste agora, sem cadastro</p>
            <h2 className="mt-4 text-[clamp(1.85rem,4.4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-white">
              Converse com a IA da ZordIA.
            </h2>
            <p className="mt-4 max-w-md text-[16px] leading-relaxed text-zr-muted">
              Mande uma mensagem e veja na prática como ela responde, tira dúvidas e marca horário.
            </p>

            <div className="mt-6 flex max-w-md gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 text-[13.5px] leading-snug text-white/65">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" className="mt-0.5 shrink-0" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 11v5M12 8h.01" />
              </svg>
              <span>
                Esse é o <b className="font-semibold text-white">número da própria ZordIA</b>. Pra testar a IA no
                WhatsApp da sua clínica, peça o teste grátis no formulário abaixo.
              </span>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end">
            <a
              href={whatsappLink(DEMO_TEXT)}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur transition-all duration-300 hover:border-zr-lilac/50 hover:bg-black/60 md:max-w-sm"
            >
              <span className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-zr-lilac to-zr-violet">
                  <ZMark size={18} className="[&_path]:stroke-white" />
                </span>
                <span className="leading-tight">
                  <span className="block text-[15px] font-semibold text-white">ZordIA</span>
                  <span className="flex items-center gap-1.5 text-[12px] text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> online agora
                  </span>
                </span>
              </span>
              <span className="mt-5 block font-mono text-[11px] uppercase tracking-[0.16em] text-white/40">WhatsApp oficial da ZordIA</span>
              <span className="mt-1.5 block text-[clamp(1.5rem,3.4vw,2rem)] font-semibold tracking-[-0.02em] text-white">
                {ZORDIA_WHATSAPP_LABEL}
              </span>
              <span className="zr-cta mt-5 flex h-12 items-center justify-center gap-2.5 rounded-full text-[15px] font-semibold text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.28-.2-.57-.35zM12.05 21.78h-.01a9.87 9.87 0 01-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37A9.86 9.86 0 012.16 11.9c0-5.45 4.44-9.88 9.9-9.88 2.64 0 5.12 1.03 6.98 2.9a9.82 9.82 0 012.9 6.99c0 5.45-4.44 9.88-9.89 9.88zm8.41-18.3A11.82 11.82 0 0012.05 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.14 1.59 5.94L.06 24l6.3-1.65a11.88 11.88 0 005.69 1.45c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.24-6.17-3.48-8.42z" />
                </svg>
                Mandar mensagem agora
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
