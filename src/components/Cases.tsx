import { useInView } from '@/lib/useInView'
import { CASES, isDraft, type ClientCase } from '@/data/cases'

/** Texto de rascunho (entre colchetes) aparece tracejado, pra ninguém publicar sem ver */
function T({ children, className = '' }: { children: string; className?: string }) {
  if (!isDraft(children)) return <span className={className}>{children}</span>
  return (
    <span className={`${className} rounded-md border border-dashed border-amber-300/40 bg-amber-300/[0.06] px-1.5 text-amber-200/80`}>
      {children}
    </span>
  )
}

export default function Cases() {
  const { ref, inView } = useInView<HTMLElement>()

  return (
    <section id="cases" ref={ref} className="relative overflow-hidden bg-black px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className={`zr-reveal ${inView ? 'is-in' : ''}`}>
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.18em] text-zr-dim">
            <span className="text-zr-lilac">06</span> — Cases
          </p>
          <h2 className="max-w-3xl text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-white">
            Quem já trabalha com a ZordIA.
          </h2>
        </div>

        <div className="mt-12 flex flex-col gap-5">
          {CASES.map((c, i) => (
            <CaseCard key={c.name} data={c} inView={inView} delay={120 + i * 100} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CaseCard({ data, inView, delay }: { data: ClientCase; inView: boolean; delay: number }) {
  const initials = data.name.replace(/^(Dr|Dra)\.?\s*/i, '').split(' ').map((w) => w[0]).join('').slice(0, 2)

  return (
    <article
      className={`zr-reveal relative overflow-hidden rounded-[28px] border border-zr-violet/25 bg-[#0C0A12] ${inView ? 'is-in' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(70% 90% at 0% 0%, rgba(124,58,237,0.18), transparent 60%)' }}
        aria-hidden="true"
      />

      <div className="relative grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr]">
        {/* Quem */}
        <div className="flex flex-col justify-between gap-10 border-b border-white/[0.06] p-7 sm:p-10 lg:border-b-0 lg:border-r">
          <div className="flex items-center gap-4">
            {data.photo ? (
              <img src={data.photo} alt={data.name} className="h-16 w-16 rounded-2xl object-cover" />
            ) : (
              <span className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-zr-lilac to-zr-violet text-[20px] font-semibold text-white">
                {initials}
              </span>
            )}
            <div>
              <p className="text-[20px] font-semibold tracking-[-0.02em] text-white">{data.name}</p>
              <p className="mt-0.5 text-[14px] text-white/50">
                <T>{data.role}</T> · <T>{data.clinic}</T>
              </p>
            </div>
          </div>

          <blockquote className="text-[clamp(1.25rem,2.4vw,1.6rem)] font-medium leading-snug tracking-[-0.015em] text-white">
            <span className="text-zr-lilac">“</span>
            <T>{data.quote}</T>
            <span className="text-zr-lilac">”</span>
          </blockquote>
        </div>

        {/* O que aconteceu */}
        <div className="p-7 sm:p-10">
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">Antes</p>
              <p className="mt-2.5 text-[15px] leading-relaxed text-white/65"><T>{data.before}</T></p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-zr-lilac">O que fizemos</p>
              <p className="mt-2.5 text-[15px] leading-relaxed text-white/80"><T>{data.whatWeDid}</T></p>
            </div>
          </div>

          <div className="mt-9 grid grid-cols-1 gap-3 border-t border-white/[0.06] pt-8 sm:grid-cols-3">
            {data.results.map((r, i) => (
              <div key={i} className="rounded-2xl bg-white/[0.03] p-5">
                <p className="text-[clamp(1.75rem,3.6vw,2.5rem)] font-semibold leading-none tracking-[-0.035em] text-white">
                  <T>{r.value}</T>
                </p>
                <p className="mt-2 text-[13px] leading-snug text-white/50"><T>{r.label}</T></p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}
