import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Hero from "@/components/Hero"
import ServicesSection from "@/components/ServicesSection"
import ProjectsSection from "@/components/ProjectsSection"

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ServicesSection />
        <ProjectsSection />
      </main>
      <Footer />
    </>
  )
}
