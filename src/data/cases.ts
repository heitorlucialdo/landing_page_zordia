// ============================================================
//  CASES — edite aqui. Tudo que estiver entre [colchetes] é
//  rascunho e aparece destacado na página até ser preenchido.
//  NÃO publique com colchetes: troque pelos dados reais.
// ============================================================

export interface CaseResult {
  value: string
  label: string
}

export interface ClientCase {
  name: string
  role: string
  clinic: string
  /** caminho da foto em /public, ex: '/assets/dr-carlos.jpg' */
  photo?: string
  before: string
  whatWeDid: string
  results: CaseResult[]
  quote: string
}

export const CASES: ClientCase[] = [
  {
    name: 'Dr. Carlos',
    role: '[especialidade]',
    clinic: '[nome da clínica · cidade]',
    before: '[Como era o atendimento antes: o que travava, o que se perdia]',
    whatWeDid: '[O que a ZordIA fez: diagnóstico, solução montada, treinamento]',
    results: [
      { value: '[nº]', label: '[o que melhorou]' },
      { value: '[nº]', label: '[o que melhorou]' },
      { value: '[nº]', label: '[o que melhorou]' },
    ],
    quote: '[Frase do Dr. Carlos sobre o resultado]',
  },
]

export const isDraft = (text: string) => /\[.*\]/.test(text)
