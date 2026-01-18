import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { BikeShowcase } from "@/components/bike-showcase"
import { StatsSection } from "@/components/stats-section"
import { TechGrid } from "@/components/tech-grid"
import { FeaturesSection } from "@/components/features-section"
import { StillRidingSection } from "@/components/still-riding-section"
import { CTASection } from "@/components/cta-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { CompleteSystemSection } from "@/components/complete-system-section"

export function HomeContent() {
  return (
    <main className="bg-black min-h-screen">
      <Header />
      <HeroSection />
      <BikeShowcase />
      <CompleteSystemSection />
      <StatsSection />
      <TechGrid />
      <FeaturesSection />
      <StillRidingSection />
      <CTASection />
      <ContactSection />
      <Footer />
    </main>
  )
}
