import { useEffect, useState } from 'react'
import ZMark from '@/components/hero/ZMark'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-white/[0.06] bg-zr-bg/70 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 md:px-8">
        <a href="#inicio" className="flex items-center gap-2.5" aria-label="ZordIA, voltar ao início">
          <ZMark size={22} />
          <span className="text-[17px] font-semibold tracking-[-0.02em] text-white">
            Zord<span className="text-zr-lilac">IA</span>
          </span>
        </a>

        <div className="flex items-center gap-2 md:gap-6">
          {[
            ['#como-trabalhamos', 'Como trabalhamos'],
          ].map(([href, label]) => (
            <a key={href} href={href} className="hidden text-sm text-white/60 transition-colors duration-200 hover:text-white md:block">
              {label}
            </a>
          ))}
          <a
            href="#contato"
            className="inline-flex h-9 items-center rounded-full border border-white/10 bg-white/[0.06] px-4 text-[13px] font-medium text-white
                       transition-all duration-300 hover:border-zr-lilac/50 hover:bg-zr-violet/20"
          >
            Falar com a gente
          </a>
        </div>
      </nav>
    </header>
  )
}
