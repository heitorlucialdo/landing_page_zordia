import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { NavLink } from '@/types'

const NAV_LINKS: NavLink[] = [
  { label: 'Início',         href: '#inicio'   },
  { label: 'Sobre Nós',      href: '#sobre'    },
  { label: 'Nossos Produtos', href: '#produtos' },
  { label: 'Contato',        href: '#contato'  },
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
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-black/80 backdrop-blur-md border-b border-white/10'
            : 'bg-transparent'
        }`}
      >
        <div className="container-max section-padding !py-0 flex items-center justify-between h-16 md:h-20">
          <a href="#inicio" className="flex items-center">
            <span className="font-black text-2xl tracking-tight">
              Zord<span className="text-brand-neon">IA</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-white/70 hover:text-white transition-colors duration-200 font-normal"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            <a
              href="#contato"
              className="text-sm font-bold px-5 py-2 rounded-full border border-brand-neon text-brand-neon
                         hover:bg-brand-neon hover:text-black transition-all duration-300 hover:shadow-neon"
            >
              Falar com a equipe
            </a>
          </div>

          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Menu"
          >
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
            />
          </button>
        </div>
      </nav>

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
                    className="text-lg text-white/80 hover:text-white hover:text-brand-neon
                               transition-colors duration-200"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <a
                href="#contato"
                className="mt-8 text-center font-bold px-5 py-3 rounded-full border border-brand-neon
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
