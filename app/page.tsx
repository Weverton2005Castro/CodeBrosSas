import { Suspense } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Hero from "@/components/Hero"
import ServicesSection from "@/components/ServicesSection"
import ProjectsSection from "@/components/ProjectsSection"

import { loadInitialCatalog, readPublicProjects, readPublicServices } from "@/lib/public-catalog"

async function PublicProjects() {
  return <ProjectsSection initialProjects={await loadInitialCatalog(readPublicProjects)} />
}

async function PublicServices() {
  return <ServicesSection initialServices={await loadInitialCatalog(readPublicServices)} />
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<p role="status">Carregando serviços…</p>}>
          <PublicServices />
        </Suspense>
        <Suspense fallback={<p role="status">Carregando projetos…</p>}>
          <PublicProjects />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
