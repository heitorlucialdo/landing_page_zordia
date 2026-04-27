// ============================================================
//  ARQUIVO DE PROVA SOCIAL — edite aqui, não no componente
// ============================================================

// MÉTRICAS — números que aparecem em destaque na página
// Atualize os valores conforme seu negócio crescer
export const METRICS = [
  {
    value: '6',
    label: 'Soluções desenvolvidas',
    description: 'Agentes e sistemas prontos para implementar',
  },
  {
    value: '100%',
    label: 'Focado em resultados',
    description: 'Cada projeto entregue com KPIs definidos',
  },
  {
    value: '24h',
    label: 'Suporte pós-entrega',
    description: 'Acompanhamento contínuo após a implementação',
  },
  {
    value: '3x',
    label: 'Mais produtividade',
    description: 'Média de ganho de eficiência nos processos automatizados',
  },
]

// MÉTRICAS DE MERCADO — dados do setor para ancoragem de credibilidade
// Fontes: McKinsey Global Institute, Salesforce State of AI, Gartner 2024
export const MARKET_METRICS = [
  {
    value: '40%',
    label: 'Crescimento anual do mercado de IA',
    source: 'McKinsey Global Institute, 2024',
  },
  {
    value: '60%',
    label: 'Redução em custos operacionais',
    source: 'Média em empresas que automatizaram processos',
  },
  {
    value: '72%',
    label: 'Relatam aumento de produtividade',
    source: 'Empresas que adotaram IA no primeiro ano — Gartner',
  },
]

// MARQUEE — frases que rolam antes do botão CTA
// Separe por " · " para manter o padrão visual
export const MARQUEE_MESSAGES = [
  'Cada minuto parado é dinheiro deixado na mesa',
  'Seus concorrentes não estão esperando',
  'IA que trabalha 24h enquanto você descansa',
  'Automatize hoje — escale amanhã',
  'Leads sem resposta imediata viram clientes do concorrente',
  'Processos inteligentes geram resultados reais',
  'Você foi feito para crescer, não para repetir tarefas',
  'O futuro do seu negócio começa com uma decisão',
]

// FRASE CTA FINAL — edite o texto e o botão conforme quiser
export const CLOSING_CTA = {
  headline: 'Seus concorrentes já estão automatizando.',
  sub: 'Até quando você vai ficar para trás?',
  button: 'Entrar em contato',
  href: '#contato',
}

// DEPOIMENTOS — adicione aqui quando tiver clientes reais
// Para cada depoimento, preencha todos os campos abaixo
// Enquanto estiver vazio, a seção de depoimentos não aparece na página
export const TESTIMONIALS: {
  name: string
  role: string
  company: string
  text: string
}[] = [
  // Exemplo de como adicionar um depoimento:
  // {
  //   name: 'João Silva',
  //   role: 'Diretor Comercial',
  //   company: 'Empresa X',
  //   text: 'A ZordIA transformou nosso processo de vendas. Em 30 dias, triplicamos o volume de leads qualificados sem aumentar a equipe.',
  // },
]
