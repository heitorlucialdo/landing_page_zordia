import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { CountUp } from '@/components/animations/CountUp'
import { METRICS, MARKET_METRICS, CLOSING_CTA, MARQUEE_MESSAGES, TESTIMONIALS } from '@/data/socialProof'

export default function SocialProof() {
  return (
    <section className="section-padding relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(39,0,54,0.25) 0%, transparent 60%)' }}
      />

      <div className="container-max relative">
        <ScrollReveal>
          <span className="inline-block text-xs font-bold text-brand-neon tracking-widest uppercase
                           border border-brand-neon/30 px-3 py-1.5 rounded-full mb-4">
            Números que importam
          </span>
          <h2 className="text-3xl md:text-5xl font-black leading-tight max-w-2xl">
            Resultados{' '}
            <span className="text-brand-neon">mensuráveis</span>
          </h2>
        </ScrollReveal>

        {/* Métricas ZordIA */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          {METRICS.map((metric, i) => (
            <ScrollReveal key={metric.label} delay={i * 0.1} className="h-full">
              <div className="relative rounded-2xl overflow-hidden h-full group/card border border-[rgba(204,0,255,0.3)]">
                <div
                  className="absolute inset-[-100%] animate-border-spin transition-opacity duration-500
                             opacity-100 md:opacity-0 md:group-hover/card:opacity-100"
                  style={{ background: 'conic-gradient(from 0deg, transparent 0%, transparent 65%, #CC00FF 82%, #CC00FF 88%, transparent 100%)' }}
                />
                <div
                  className="relative m-[1.5px] rounded-[14px] p-6 text-center h-full"
                  style={{ background: 'linear-gradient(135deg, rgba(39,0,54,0.35) 0%, rgba(0,0,0,0.92) 100%)' }}
                >
                  <CountUp value={metric.value} className="text-4xl md:text-5xl font-black text-brand-neon mb-2 block" />
                  <p className="font-bold text-white text-sm mb-1">{metric.label}</p>
                  <p className="text-white/50 text-xs leading-relaxed">{metric.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* ─── BLOCO UNIFICADO: Timeline + CTA ─── */}
      <div style={{ maxWidth: '1200px', margin: '6rem auto 0', padding: '0 24px' }}>
        <div
          className="relative"
          style={{
            borderRadius: '24px',
            borderBottom: '1px solid rgba(204, 0, 255, 0.5)',
            boxShadow: '0 0 0 1px rgba(204, 0, 255, 0.15), 0 0 40px rgba(204, 0, 255, 0.2), inset 0 0 60px rgba(39, 0, 54, 0.4)',
            background: 'radial-gradient(ellipse at center, rgba(39, 0, 54, 0.95) 0%, rgba(10, 0, 20, 0.98) 100%)',
            overflow: 'hidden',
          }}
        >
          {/* Timeline */}
          <div className="p-8 md:p-14">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-px opacity-60" style={{ background: '#CC00FF' }} />
                <span className="text-xs font-bold text-brand-neon tracking-widest uppercase">
                  O mercado não para
                </span>
              </div>
              <h3 className="text-2xl md:text-4xl font-black mb-3">
                O mercado de IA não espera
              </h3>
              <p className="text-white/50 text-base max-w-xl mb-14">
                Empresas que automatizam hoje lideram amanhã. Dados que provam.
              </p>
            </ScrollReveal>

            {/* Desktop — horizontal */}
            <div className="relative hidden md:block">
              <div className="absolute top-8 left-[calc(100%/6)] right-[calc(100%/6)] h-px overflow-hidden">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 1.2, ease: 'easeInOut' }}
                  className="h-full origin-left"
                  style={{ background: 'rgba(204,0,255,0.4)' }}
                />
              </div>
              <div className="grid grid-cols-3 gap-8">
                {MARKET_METRICS.map((m, i) => (
                  <motion.div
                    key={m.label}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 + i * 0.2 }}
                    className="flex flex-col items-center text-center"
                  >
                    <div
                      className="w-16 h-16 rounded-full border-2 border-brand-neon flex items-center justify-center mb-6 relative z-10"
                      style={{ background: 'rgba(39,0,54,0.9)' }}
                    >
                      <span className="text-brand-neon font-black text-sm">0{i + 1}</span>
                    </div>
                    <CountUp value={m.value} className="font-black text-brand-neon mb-2 block" style={{ fontSize: '48px', lineHeight: 1 }} />
                    <p className="font-bold text-white text-lg mb-2 leading-snug">{m.label}</p>
                    <p className="font-light leading-relaxed" style={{ color: '#999', fontSize: '13px' }}>{m.source}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mobile — vertical */}
            <div className="relative md:hidden">
              <div className="absolute left-8 top-8 bottom-8 w-px overflow-hidden">
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 1.2, ease: 'easeInOut' }}
                  className="w-full h-full origin-top"
                  style={{ background: 'rgba(204,0,255,0.4)' }}
                />
              </div>
              <div className="flex flex-col gap-10">
                {MARKET_METRICS.map((m, i) => (
                  <motion.div
                    key={m.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 + i * 0.2 }}
                    className="flex items-start gap-6"
                  >
                    <div
                      className="flex-shrink-0 w-16 h-16 rounded-full border-2 border-brand-neon flex items-center justify-center relative z-10"
                      style={{ background: 'rgba(39,0,54,0.9)' }}
                    >
                      <span className="text-brand-neon font-black text-sm">0{i + 1}</span>
                    </div>
                    <div className="pt-2">
                      <CountUp value={m.value} className="font-black text-brand-neon mb-1 block" style={{ fontSize: '40px', lineHeight: 1 }} />
                      <p className="font-bold text-white text-base mb-1 leading-snug">{m.label}</p>
                      <p className="font-light leading-relaxed" style={{ color: '#999', fontSize: '13px' }}>{m.source}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Marquee — dentro do box, clipped pelas bordas arredondadas */}
          <div
            style={{
              overflow: 'hidden',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
            }}
          >
            <div className="flex w-max animate-marquee whitespace-nowrap py-4">
              {[...MARQUEE_MESSAGES, ...MARQUEE_MESSAGES].map((msg, i) => (
                <span key={i} className="inline-flex items-center">
                  <span style={{ color: '#CC00FF', fontSize: '16px', margin: '0 16px' }}>•</span>
                  <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px', letterSpacing: '0.05em', fontWeight: 400 }}>
                    {msg}
                  </span>
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="p-8 md:p-14 text-center">
            <ScrollReveal>
              <h3 className="text-2xl md:text-4xl font-black mb-3">
                {CLOSING_CTA.headline}
              </h3>
              <p className="text-white/60 text-lg mb-10">{CLOSING_CTA.sub}</p>
              <a
                href={CLOSING_CTA.href}
                className="inline-block px-10 py-5 bg-brand-neon text-black font-black rounded-xl
                           hover:shadow-neon-lg transition-all duration-300 text-base tracking-wide"
              >
                {CLOSING_CTA.button} →
              </a>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Depoimentos — só aparece quando há itens em TESTIMONIALS */}
      {TESTIMONIALS.length > 0 && (
        <div className="container-max px-4 md:px-8 lg:px-16 xl:px-24 mt-20">
          <ScrollReveal>
            <h3 className="text-2xl md:text-3xl font-black mb-10">
              O que nossos{' '}
              <span className="text-brand-neon">clientes dizem</span>
            </h3>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 0.1}>
                <div
                  className="neon-border rounded-2xl p-6 flex flex-col gap-4 h-full"
                  style={{ background: 'linear-gradient(135deg, rgba(39,0,54,0.3) 0%, transparent 100%)' }}
                >
                  <span className="text-brand-neon text-4xl font-black leading-none select-none">"</span>
                  <p className="text-white/80 leading-relaxed flex-1 text-sm">{t.text}</p>
                  <div className="border-t border-white/10 pt-4">
                    <p className="font-bold text-white text-sm">{t.name}</p>
                    <p className="text-white/50 text-xs">{t.role} · {t.company}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
