// ============================================================
//  PREMISSAS DO SIMULADOR — conservadoras de propósito.
//  Troque pelos números reais das clínicas atendidas quando tiver;
//  a conta se ajusta sozinha.
// ============================================================

/** % das mensagens que a recepção consegue responder a tempo, sem IA */
export const ANSWERED_WITHOUT = 0.85

/** % das conversas respondidas que viram agendamento (igual com e sem IA:
 *  não contamos ganho de conversão, só o que deixa de ser perdido) */
export const BOOKING_RATE = 0.25

/** % dos agendados que comparecem. No-show de ~20% sem confirmação;
 *  lembretes digitais levam a ~15% (BMJ Open, 2016). */
export const SHOW_UP_WITHOUT = 0.8
export const SHOW_UP_WITH = 0.85

/** % da base parada que volta a agendar em 12 meses */
export const REACTIVATION_PER_YEAR = 0.03

export const INPUTS = {
  messages: { min: 30, max: 1500, step: 10, initial: 300, label: 'Mensagens novas por mês no WhatsApp' },
  ticket:   { min: 80, max: 2000, step: 10, initial: 250, label: 'Valor médio da consulta' },
  inactive: { min: 0, max: 3000, step: 50, initial: 500, label: 'Pacientes sem voltar há mais de 6 meses' },
}

export interface Estimate {
  lost: number
  recovered: number
  noShowAvoided: number
  reactivatedPerMonth: number
  extraPerMonth: number
  revenuePerMonth: number
  revenuePerYear: number
}

export function estimate(messages: number, ticket: number, inactive: number): Estimate {
  // Mensagens que hoje ficam sem resposta a tempo
  const lost = messages * (1 - ANSWERED_WITHOUT)
  // Dessas, as que viram consulta quando a IA responde
  const recovered = lost * BOOKING_RATE * SHOW_UP_WITH
  // Faltas evitadas entre quem já agendava
  const noShowAvoided = messages * ANSWERED_WITHOUT * BOOKING_RATE * (SHOW_UP_WITH - SHOW_UP_WITHOUT)
  const reactivatedPerMonth = (inactive * REACTIVATION_PER_YEAR) / 12

  const extraPerMonth = recovered + noShowAvoided + reactivatedPerMonth
  const revenuePerMonth = extraPerMonth * ticket
  return {
    lost,
    recovered,
    noShowAvoided,
    reactivatedPerMonth,
    extraPerMonth,
    revenuePerMonth,
    revenuePerYear: revenuePerMonth * 12,
  }
}

export const SOURCES =
  'Estimativa conservadora: considera que 15% das mensagens hoje ficam sem resposta a tempo, que 1 em cada 4 conversas vira agendamento (com ou sem IA), ' +
  'que as faltas caem de 20% para 15% com confirmação automática (meta-análise de 21 estudos, BMJ Open, 2016) e que só 3% dos pacientes parados voltam em um ano. ' +
  'Não é promessa de resultado.'
