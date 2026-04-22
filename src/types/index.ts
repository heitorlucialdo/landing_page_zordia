export interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
}

export type TokenType = 'keyword' | 'string' | 'function' | 'operator' | 'plain' | 'comment'

export interface CodeToken {
  text: string
  type: TokenType
}

export interface CodeSnippet {
  title: string
  language: string
  tokens: CodeToken[]
}

export type ProductId =
  | 'whatsapp-agent'
  | 'sdr-complete'
  | 'sdr-calls'
  | 'automation-enterprise'
  | 'landing-page'
  | 'institutional-site'

export interface Product {
  id: ProductId
  title: string
  description: string
  price: string
  badge?: string
  cta?: string
  icon: string
}

export interface NavLink {
  label: string
  href: string
}
