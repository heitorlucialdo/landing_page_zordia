import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { NavLink } from '@/types'

const NAV_LINKS: NavLink[] = [
  { label: 'Início',          href: '#inicio'   },
  { label: 'Sobre Nós',       href: '#sobre'    },
  { label: 'Nossos Produtos',  href: '#produtos' },
  { label: 'Contato',         href: '#contato'  },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <nav
        className="fixed z-50 flex items-center justify-between transition-all duration-300"
        style={{
          top: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'calc(100% - 32px)',
          maxWidth: '800px',
          borderRadius: '9999px',
          padding: '10px 24px',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          background: scrolled ? 'rgba(0,0,0,0.85)' : 'rgba(0,0,0,0.5)',
          border: `1px solid rgba(204,0,255,${scrolled ? 0.4 : 0.15})`,
          boxShadow: scrolled
            ? '0 0 40px rgba(204,0,255,0.2), 0 8px 32px rgba(0,0,0,0.4)'
            : '0 0 30px rgba(204,0,255,0.1)',
        }}
      >
        {/* Logo */}
        <a href="#inicio" className="flex items-center flex-shrink-0">
          <span className="font-black text-xl tracking-tight">
            Zord<span className="text-brand-neon">IA</span>
          </span>
        </a>

        {/* Links — desktop */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white/70 hover:text-white transition-colors duration-200 font-normal whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA — desktop */}
        <div className="hidden md:flex items-center flex-shrink-0">
          <a
            href="#contato"
            className="text-sm font-bold px-6 py-2.5 rounded-full border border-brand-neon text-brand-neon
                       hover:bg-brand-neon hover:text-black transition-all duration-300 hover:shadow-neon whitespace-nowrap"
          >
            Falar com a equipe
          </a>
        </div>

        {/* Hamburger — mobile */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 flex-shrink-0"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Menu"
        >
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Drawer mobile */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-black/95 backdrop-blur-xl
                         border-l border-white/10 flex flex-col p-8 pt-24 md:hidden"
            >
              <nav className="flex flex-col gap-6">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-lg text-white/80 hover:text-brand-neon transition-colors duration-200"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <a
                href="#contato"
                className="mt-8 text-center font-bold px-7 py-4 rounded-full border border-brand-neon
                           text-brand-neon hover:bg-brand-neon hover:text-black transition-all duration-300"
                onClick={() => setMenuOpen(false)}
              >
                Falar com a equipe
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
