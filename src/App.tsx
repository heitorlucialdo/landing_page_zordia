import { lazy, Suspense } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'

const About = lazy(() => import('@/components/About'))
const Products = lazy(() => import('@/components/Products'))
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
          <Products />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <ContactForm />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
