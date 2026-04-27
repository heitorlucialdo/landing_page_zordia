import { ScrollReveal } from '@/components/animations/ScrollReveal'

function AutomationIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#CC00FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
      <path d="M2 17l10 5 10-5"/>
      <path d="M2 12l10 5 10-5"/>
    </svg>
  )
}

function DataIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#CC00FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3"/>
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
    </svg>
  )
}

function ResultsIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#CC00FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/>
      <line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6"  y1="20" x2="6"  y2="14"/>
    </svg>
  )
}

const ICONS = [
  {
    icon: <AutomationIcon />,
    label: 'Automação Inteligente',
    description: 'Sistemas que aprendem e evoluem com seu negócio, eliminando tarefas repetitivas.',
  },
  {
    icon: <DataIcon />,
    label: 'Orientado por Dados',
    description: 'Decisões baseadas em evidências, não em intuição. Inteligência em cada etapa.',
  },
  {
    icon: <ResultsIcon />,
    label: 'Resultados Mensuráveis',
    description: 'KPIs claros, relatórios transparentes e crescimento verificável.',
  },
]

export default function About() {
  return (
    <section id="sobre" className="section-padding bg-concentric relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 80% 50%, rgba(39,0,54,0.3) 0%, transparent 60%)' }}
      />

      <div className="container-max relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Coluna esquerda: badge + título + parágrafo */}
          <ScrollReveal>
            <span className="inline-block text-xs font-bold text-brand-neon tracking-widest uppercase
                             border border-brand-neon/30 px-3 py-1.5 rounded-full mb-4">
              Quem somos
            </span>
            <h2 className="text-3xl md:text-5xl font-black leading-tight">
              Tecnologia que trabalha{' '}
              <span className="text-brand-neon">enquanto você descansa</span>
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mt-8">
              A ZordIA é uma empresa de tecnologia especializada em automação inteligente
              de processos. Transformamos operações manuais em sistemas eficientes,
              escaláveis e previsíveis. Ao integrar automação, dados e inteligência
              artificial, desenvolvemos soluções que reduzem falhas operacionais,
              aumentam produtividade e permitem que negócios cresçam com mais controle
              e menos dependência humana.
            </p>
          </ScrollReveal>

          {/* Coluna direita: Missão + Visão alinhados com o título */}
          <div className="flex flex-col gap-6">
            <ScrollReveal delay={0.15}>
              <div className="neon-border rounded-2xl p-8"
                   style={{ background: 'linear-gradient(135deg, rgba(39,0,54,0.3) 0%, transparent 100%)' }}>
                <h3 className="text-brand-neon text-xs font-bold tracking-widest uppercase mb-3">
                  Nossa Missão
                </h3>
                <p className="text-white/80 leading-relaxed">
                  Desenvolver e implementar sistemas de automação que simplifiquem operações,
                  aumentem a eficiência e gerem resultados mensuráveis para empresas que
                  buscam escala e previsibilidade.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <div className="neon-border rounded-2xl p-8"
                   style={{ background: 'linear-gradient(135deg, rgba(39,0,54,0.3) 0%, transparent 100%)' }}>
                <h3 className="text-brand-neon text-xs font-bold tracking-widest uppercase mb-3">
                  Nossa Visão
                </h3>
                <p className="text-white/80 leading-relaxed">
                  Ser referência em automação inteligente, construindo sistemas que substituem
                  processos manuais e se tornam a base operacional de empresas modernas,
                  orientadas por dados e resultados.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          {ICONS.map((item, i) => (
            <ScrollReveal key={item.label} delay={i * 0.1}>
              <div className="text-center group">
                <div
                  className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4
                             border border-[rgba(204,0,255,0.3)] transition-all duration-300
                             group-hover:shadow-neon"
                  style={{ background: 'rgba(39,0,54,0.3)' }}
                >
                  {item.icon}
                </div>
                <h4 className="font-bold text-white mb-2">{item.label}</h4>
                <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
