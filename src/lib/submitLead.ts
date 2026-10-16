import { supabase } from '@/lib/supabase'
import type { ContactSchema } from '@/components/ContactForm'

export const INTENT_LABEL: Record<ContactSchema['intent'], string> = {
  'teste-7-dias': 'Teste grátis de 7 dias',
  'sob-medida': 'Solução sob medida',
}

export async function submitLead(data: ContactSchema): Promise<void> {
  // A tabela leadslp continua com as mesmas colunas: o que é novo
  // (clínica, especialidade e intenção) vai em `needs` e `products`.
  const needs = [
    `Interesse: ${INTENT_LABEL[data.intent]}`,
    `Clínica: ${data.clinic}`,
    `Segmento: ${data.specialty}`,
    `Produto: ${data.product}`,
  ].join(' · ')

  const { error } = await supabase.from('leadslp').insert({
    name:     data.name,
    email:    data.email,
    whatsapp: data.whatsapp,
    needs,
    products: [data.intent, data.product],
    message:  null,
  })

  if (error) {
    console.error('[submitLead] Supabase error:', error)
    throw new Error(`Supabase: ${error.message}`)
  }

  const webhookUrl = import.meta.env['VITE_N8N_WEBHOOK_URL'] as string | undefined
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:      data.name,
          whatsapp:  data.whatsapp,
          email:     data.email,
          intent:    data.intent,
          product:   data.product,
          clinic:    data.clinic,
          specialty: data.specialty,
          needs,
          products:  [data.intent, data.product],
          timestamp: new Date().toISOString(),
        }),
      })
    } catch {
      // Webhook falhou — lead já salvo, não bloqueia o usuário
    }
  }
}
