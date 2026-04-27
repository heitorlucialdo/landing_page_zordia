import { lazy, Suspense } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

const About = lazy(() => import('@/components/About'))
const HowItWorks = lazy(() => import('@/components/HowItWorks'))
const Products = lazy(() => import('@/components/Products'))
const SocialProof = lazy(() => import('@/components/SocialProof'))
const FAQ = lazy(() => import('@/components/FAQ'))
const ContactForm = lazy(() => import('@/components/ContactForm'))

function SectionSkeleton() {
  return (
    <div className="w-full py-32 flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-brand-neon border-t-transparent animate-spin" />
    </div>
  )
}

export default function App() {
  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<SectionSkeleton />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <HowItWorks />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Products />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <SocialProof />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <FAQ />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <ContactForm />
        </Suspense>
      </main>
      <WhatsAppButton />
      <Footer />
    </div>
  )
}
