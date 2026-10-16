import { useInView } from '@/lib/useInView'

// ⚠️ Compromissos de segurança: confirme que todos valem pra operação da ZordIA antes de publicar
const ITEMS = [
  {
    title: 'De acordo com a LGPD',
    text: 'Tratamos os dados seguindo a Lei Geral de Proteção de Dados, do primeiro contato ao fim do contrato.',
    icon: <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z M9 12l2 2 4-4" />,
  },
  {
    title: 'Dados só pro atendimento',
    text: 'As informações dos seus pacientes e clientes são usadas só pra atender a sua empresa. Nada de venda ou repasse.',
    icon: <path d="M4 7h16v12H4z M4 7l8 6 8-6" />,
  },
  {
    title: 'Acesso controlado',
    text: 'Só quem você autorizar acessa as conversas e os dados. Saiu alguém da equipe, o acesso sai junto.',
    icon: <path d="M7 11V8a5 5 0 0110 0v3 M5 11h14v10H5z M12 15v2" />,
  },
  {
    title: 'Os dados são seus',
    text: 'Se um dia você parar de usar, pode pedir a exclusão dos dados. A informação é da sua empresa, não nossa.',
    icon: <path d="M4 7h16 M9 7V4h6v3 M6 7l1 13h10l1-13" />,
  },
]

export default function Security() {
  const { ref, inView } = useInView<HTMLElement>()

  return (
    <section id="seguranca" ref={ref} className="relative bg-black px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className={`zr-reveal ${inView ? 'is-in' : ''}`}>
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.18em] text-zr-dim">
            <span className="text-zr-lilac">07</span> — Segurança
          </p>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-white">
            Seus dados protegidos.{' '}
            <span className="text-zr-dim">Os dos seus pacientes também.</span>
          </h2>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-zr-muted">
            Em clínica, informação de paciente é coisa séria. A segurança faz parte do projeto desde o primeiro dia.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {ITEMS.map((item, i) => (
            <li
              key={item.title}
              className={`zr-reveal rounded-3xl border border-white/[0.07] bg-zr-surface p-6 sm:p-7 ${inView ? 'is-in' : ''}`}
              style={{ transitionDelay: `${120 + i * 90}ms` }}
            >
              <span className="grid h-11 w-11 place-items-center rounded-2xl border border-zr-violet/30 bg-zr-violet/10">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {item.icon}
                </svg>
              </span>
              <h3 className="mt-5 text-[18px] font-semibold tracking-[-0.015em] text-white">{item.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-white/55">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
