import { motion } from 'framer-motion'
import NetworkCanvas from '@/components/animations/NetworkCanvas'
import CodeStream from '@/components/animations/CodeStream'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
}

const childVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <NetworkCanvas />
      </div>

      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, #000000 80%)',
        }}
      />

      <div className="relative z-[2] container-max section-padding w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
          >
            <motion.div variants={childVariants}>
              <span className="inline-block text-xs font-bold text-brand-neon tracking-widest uppercase
                               border border-brand-neon/30 px-3 py-1.5 rounded-full mb-6">
                Automação com Inteligência Artificial
              </span>
            </motion.div>

            <motion.h1
              variants={childVariants}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.1] tracking-tight"
            >
              Automação que transforma{' '}
              <span className="text-brand-neon">processos</span> em resultados.
            </motion.h1>

            <motion.p
              variants={childVariants}
              className="text-lg text-white/60 mt-6 max-w-xl leading-relaxed"
            >
              Integramos IA para eliminar operações manuais, reduzir falhas e escalar
              o seu negócio com previsibilidade.
            </motion.p>

            <motion.div
              variants={childVariants}
              className="flex flex-wrap gap-4 mt-10"
            >
              <a
                href="#produtos"
                className="px-9 py-4 bg-brand-neon text-black font-bold rounded-full
                           hover:shadow-neon-lg transition-all duration-300 text-base"
              >
                Ver nossos produtos
              </a>
              <a
                href="#contato"
                className="px-9 py-4 border border-white/30 text-white font-bold rounded-full
                           hover:border-white hover:bg-white/5 transition-all duration-300 text-base"
              >
                Falar com a equipe
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
            className="hidden lg:flex justify-end items-center"
          >
            <CodeStream />
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2]"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center pt-2">
          <div className="w-1 h-2 bg-brand-neon rounded-full" />
        </div>
      </motion.div>
    </section>
  )
}
