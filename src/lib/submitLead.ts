import { supabase } from '@/lib/supabase'
import type { ContactSchema } from '@/components/ContactForm'

export async function submitLead(data: ContactSchema): Promise<void> {
  const { error } = await supabase.from('leadslp').insert({
    name:     data.name,
    email:    data.email,
    whatsapp: data.whatsapp,
    needs:    data.needs,
    products: data.products,
    message:  data.message ?? null,
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
          email:     data.email,
          whatsapp:  data.whatsapp,
          needs:     data.needs,
          products:  data.products,
          message:   data.message ?? '',
          timestamp: new Date().toISOString(),
        }),
      })
    } catch {
      // Webhook falhou — lead já salvo, não bloqueia o usuário
    }
  }
}
