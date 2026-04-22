import type { NavLink } from '@/types'

const NAV_LINKS: NavLink[] = [
  { label: 'Início',          href: '#inicio'   },
  { label: 'Sobre',           href: '#sobre'    },
  { label: 'Produtos',        href: '#produtos' },
  { label: 'Contato',         href: '#contato'  },
]

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-white/5">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-neon to-transparent" />

      <div className="container-max section-padding !py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          <div className="flex flex-col gap-3">
            <span className="font-black text-2xl tracking-tight">
              Zord<span className="text-brand-neon">IA</span>
            </span>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Automação inteligente que transforma processos em resultados.
            </p>
            <p className="text-white/30 text-xs mt-2">
              © {new Date().getFullYear()} ZordIA. Todos os direitos reservados.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold text-white/30 uppercase tracking-widest">Navegação</h4>
            <nav className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/60 hover:text-white transition-colors duration-200 w-fit"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold text-white/30 uppercase tracking-widest">Contato</h4>
            <a
              href="https://instagram.com/ia.zord"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-white/60 hover:text-brand-neon transition-colors duration-200 w-fit group"
            >
              <span className="group-hover:text-brand-neon transition-colors duration-200">
                <InstagramIcon />
              </span>
              @ia.zord
            </a>
            <a
              href="https://wa.me/5565996490705"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-white/60 hover:text-brand-neon transition-colors duration-200 w-fit group"
            >
              <span className="group-hover:text-brand-neon transition-colors duration-200">
                <WhatsAppIcon />
              </span>
              (65) 99649-0705
            </a>
            <a
              href="mailto:zord.ia20@gmail.com"
              className="flex items-center gap-3 text-sm text-white/60 hover:text-brand-neon transition-colors duration-200 w-fit group"
            >
              <span className="group-hover:text-brand-neon transition-colors duration-200">
                <EmailIcon />
              </span>
              zord.ia20@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
