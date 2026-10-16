import { lazy, Suspense } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

const About = lazy(() => import('@/components/About'))
const Compare = lazy(() => import('@/components/Compare'))
const Simulator = lazy(() => import('@/components/Simulator'))
const Market = lazy(() => import('@/components/Market'))
const Solutions = lazy(() => import('@/components/Solutions'))
const Security = lazy(() => import('@/components/Security'))
// Cases fica fora da página até ter os dados reais (src/data/cases.ts)
const FAQ = lazy(() => import('@/components/FAQ'))
const TryZordia = lazy(() => import('@/components/TryZordia'))
const ContactForm = lazy(() => import('@/components/ContactForm'))

function SectionSkeleton() {
  return <div className="min-h-[60vh] w-full bg-black" />
}

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black">
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<SectionSkeleton />}>
          <About />
          <Compare />
          <Simulator />
          <Market />
          <Solutions />
          <Security />
          <FAQ />
          <TryZordia />
          <ContactForm />
        </Suspense>
      </main>
      <WhatsAppButton />
      <Footer />
    </div>
  )
}
