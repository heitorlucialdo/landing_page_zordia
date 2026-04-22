import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import type { Product } from '@/types'

const PRODUCTS: Product[] = [
  {
    id: 'whatsapp-agent',
    title: 'Agente IA WhatsApp',
    description: 'Agente de inteligência artificial integrado ao WhatsApp que atende clientes automaticamente 24/7. Responde dúvidas, qualifica leads e agenda reuniões sem intervenção humana.',
    price: 'R$ 1.989,00',
    icon: 'whatsapp',
  },
  {
    id: 'sdr-complete',
    title: 'Agente SDR WhatsApp + LP + CRM',
    description: 'Solução completa de prospecção: agente SDR no WhatsApp integrado a uma Landing Page de captura e um CRM para gestão do pipeline. Do lead ao contato qualificado, automatizado.',
    price: 'R$ 4.890,00',
    badge: 'Popular',
    icon: 'sdr',
  },
  {
    id: 'sdr-calls',
    title: 'Agente SDR Ligações',
    description: 'Agente de voz que realiza ligações ativas de prospecção, qualifica prospects em tempo real por voz e encaminha os leads quentes para o seu time de vendas. Escala humana, custo de sistema.',
    price: 'R$ 8.597,00',
    icon: 'calls',
  },
  {
    id: 'automation-enterprise',
    title: 'Automação para Empresa',
    description: 'Mapeamos seus processos operacionais e construímos uma stack de automação personalizada. Integrações entre sistemas até fluxos complexos com IA. Entre em contato para diagnóstico gratuito.',
    price: 'Sob consulta',
    badge: 'Personalizado',
    cta: 'Entrar em contato',
    icon: 'enterprise',
  },
  {
    id: 'landing-page',
    title: 'Landing Page',
    description: 'Landing page de alta conversão com React + TypeScript, otimizada para SEO e performance. Design alinhado à identidade da marca, pronta para capturar e converter visitantes em leads.',
    price: 'R$ 1.249,00',
    icon: 'landing',
  },
  {
    id: 'institutional-site',
    title: 'Site Institucional',
    description: 'Site institucional completo, responsivo e veloz. Apresenta sua empresa com credibilidade, otimizado para mecanismos de busca e integrado às ferramentas de marketing digital.',
    price: 'R$ 1.689,00',
    icon: 'site',
  },
]

function ProductIcon({ type }: { type: string }) {
  const props = { width: 24, height: 24, fill: 'none', stroke: '#CC00FF', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  if (type === 'whatsapp') return (
    <svg {...props} viewBox="0 0 24 24">
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
    </svg>
  )
  if (type === 'sdr') return (
    <svg {...props} viewBox="0 0 24 24">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 00-3-3.87"/>
      <path d="M16 3.13a4 4 0 010 7.75"/>
    </svg>
  )
  if (type === 'calls') return (
    <svg {...props} viewBox="0 0 24 24">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 12 19.79 19.79 0 01.022 3.39 2 2 0 012 1h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
    </svg>
  )
  if (type === 'enterprise') return (
    <svg {...props} viewBox="0 0 24 24">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
      <line x1="8" y1="21" x2="16" y2="21"/>
      <line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  )
  if (type === 'landing') return (
    <svg {...props} viewBox="0 0 24 24">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  )
  return (
    <svg {...props} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
    </svg>
  )
}

export default function Products() {
  return (
    <section id="produtos" className="section-padding relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(39,0,54,0.2) 0%, transparent 60%)' }}
      />

      <div className="container-max relative">
        <ScrollReveal>
          <span className="inline-block text-xs font-bold text-brand-neon tracking-widest uppercase
                           border border-brand-neon/30 px-3 py-1.5 rounded-full mb-4">
            Nossos Produtos
          </span>
          <h2 className="text-3xl md:text-5xl font-black leading-tight">
            Soluções para cada{' '}
            <span className="text-brand-neon">estágio</span> do seu negócio
          </h2>
          <p className="text-white/50 mt-4 max-w-xl">
            Do primeiro contato ao cliente fidelizado — automatizamos cada etapa.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group relative rounded-2xl border border-white/10 p-8 cursor-default
                         transition-colors duration-300 overflow-hidden
                         hover:border-[rgba(204,0,255,0.4)] hover:shadow-neon"
              style={{ background: 'rgba(255,255,255,0.02)' }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                style={{ background: 'linear-gradient(135deg, rgba(39,0,54,0.3) 0%, transparent 60%)' }}
              />

              {product.badge && (
                <span className="absolute top-4 right-4 text-xs font-bold text-brand-neon
                                 bg-[rgba(204,0,255,0.1)] px-2.5 py-1 rounded-full border border-brand-neon/30">
                  {product.badge}
                </span>
              )}

              <div
                className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-6
                           border border-[rgba(204,0,255,0.2)] transition-all duration-300
                           group-hover:shadow-neon-sm group-hover:border-[rgba(204,0,255,0.4)]"
                style={{ background: 'rgba(39,0,54,0.4)' }}
              >
                <ProductIcon type={product.icon} />
              </div>

              <h3 className="relative text-lg font-bold mb-2 pr-16">{product.title}</h3>
              <p className="relative text-white/50 text-sm leading-relaxed mb-6">{product.description}</p>

              <div className="relative flex items-center justify-between">
                <span className="font-black text-white text-lg">{product.price}</span>
                {product.cta && (
                  <a
                    href="#contato"
                    className="text-sm font-bold text-brand-neon border border-brand-neon/40 px-4 py-1.5 rounded-full
                               hover:bg-brand-neon hover:text-black transition-all duration-300"
                  >
                    {product.cta}
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
