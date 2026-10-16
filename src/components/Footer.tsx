import ZMark from '@/components/hero/ZMark'
import { ZORDIA_EMAIL, ZORDIA_INSTAGRAM, ZORDIA_WHATSAPP_LABEL, whatsappLink } from '@/lib/contact'

export default function Footer() {
  return (
    <footer className="relative bg-black px-5 pb-10 pt-16 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-zr-violet/50 to-transparent" />

        <div className="mt-12 flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <a href="#inicio" className="flex items-center gap-2.5">
              <ZMark size={22} />
              <span className="text-[19px] font-semibold tracking-[-0.02em] text-white">
                Zord<span className="text-zr-lilac">IA</span>
              </span>
            </a>
            <p className="mt-3 max-w-xs text-[14px] leading-relaxed text-white/45">
              Automação com IA para empresas. Especialistas em clínicas.
            </p>
          </div>

          <ul className="flex flex-col gap-3 text-[14px] text-white/60">
            <li>
              <a href={whatsappLink('Oi! Vim pelo site da ZordIA.')} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                WhatsApp · {ZORDIA_WHATSAPP_LABEL}
              </a>
            </li>
            <li>
              <a href={`https://instagram.com/${ZORDIA_INSTAGRAM}`} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                Instagram · @{ZORDIA_INSTAGRAM}
              </a>
            </li>
            <li>
              <a href={`mailto:${ZORDIA_EMAIL}`} className="transition-colors hover:text-white">
                {ZORDIA_EMAIL}
              </a>
            </li>
          </ul>
        </div>

        <p className="mt-14 font-mono text-[11px] uppercase tracking-[0.14em] text-white/25">
          © {new Date().getFullYear()} ZordIA
        </p>
      </div>
    </footer>
  )
}
