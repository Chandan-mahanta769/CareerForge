import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import CareerPreview from '../components/CareerPreview'
import HowItWorks from '../components/HowItWorks'
import WhyCareerForge from '../components/WhyCareerForge'
import Footer from '../components/Footer'
import { Link } from "react-router-dom"

export default function LandingPage() {
  return (
    <main className="bg-[#0F0F1A] min-h-screen font-['Inter']">
      <Navbar />
      <Hero />
      <CareerPreview />
      <HowItWorks />
      <WhyCareerForge />
      <Footer />
    </main>
  )
};
