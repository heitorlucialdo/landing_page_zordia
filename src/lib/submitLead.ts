import type { ContactSchema } from '@/components/ContactForm'

// Funil da ZordIA (tabela `leads`). A chave anon pode ficar no site: a regra
// de segurança do banco só deixa CRIAR lead com source='landing_page'.
// Ninguém de fora lê, edita ou apaga. NUNCA use a service_role aqui.
const SUPABASE_URL = 'https://nnfulmqqefyylsrkyqsa.supabase.co'
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5uZnVsbXFxZWZ5eWxzcmt5cXNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk4Njg1ODEsImV4cCI6MjEwNTQ0NDU4MX0.Wp4FDlzTetZ3txdyixxscQNmSG8lHqIn_Kpg8tQ5cl8'

export const INTENT_LABEL: Record<ContactSchema['intent'], string> = {
  'teste-7-dias': 'Teste grátis',
  'sob-medida': 'Solução sob medida',
}

export async function submitLead(data: ContactSchema): Promise<void> {
  const notes = [
    'Origem: Landing Page',
    `Interesse: ${INTENT_LABEL[data.intent]}`,
    `Produto: ${data.product}`,
  ].join('\n')

  // company_name é obrigatório no banco: usa a empresa, ou o nome se vier vazio
  const company = data.clinic.trim() || data.name.trim() || 'Lead da LP'

  const res = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    // organization_id e status o banco preenche sozinho
    body: JSON.stringify({
      company_name: company,
      contact_name: data.name,
      whatsapp: data.whatsapp,
      phone: data.whatsapp, // mesmo número, pra ficar "ligável" e deduplicável
      email: data.email,
      segment: data.specialty,
      source: 'landing_page', // obrigatório: é o que a regra de segurança exige
      notes_md: notes,
    }),
  })

  if (!res.ok) {
    console.error('[submitLead]', res.status, await res.text())
    throw new Error(`Falha ao enviar lead: ${res.status}`)
  }
}
