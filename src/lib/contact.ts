// Contatos oficiais da ZordIA — um lugar só, pra nunca mais ter número diferente na página
export const ZORDIA_WHATSAPP = '5565993383474'
export const ZORDIA_WHATSAPP_LABEL = '(65) 99338-3474'
export const ZORDIA_INSTAGRAM = 'ia.zord'
export const ZORDIA_EMAIL = 'zord.ia20@gmail.com'

export const whatsappLink = (text: string) =>
  `https://wa.me/${ZORDIA_WHATSAPP}?text=${encodeURIComponent(text)}`
