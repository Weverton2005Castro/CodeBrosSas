import { pageMetadata, siteUrl } from "@/lib/seo"

export const metadata = pageMetadata("Criação de sites e desenvolvimento de sistemas em Manaus", "Sites, sistemas, aplicativos e automação para empresas em Manaus, AM. Soluções sob medida da CodeBros para sua operação. Solicite um orçamento.", "/")
import { Suspense } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Hero from "@/components/Hero"
import BusinessSections from "@/components/BusinessSections"
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
      {siteUrl && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "ProfessionalService", "@id": `${siteUrl}/#business`, name: "CodeBros", url: siteUrl, email: "codebroscontato@gmail.com", telephone: "+5592985353980", description: "Criação de sites, desenvolvimento de sistemas, aplicativos e automação para empresas em Manaus.", address: { "@type": "PostalAddress", addressLocality: "Manaus", addressRegion: "AM", addressCountry: "BR" }, areaServed: { "@type": "City", name: "Manaus" } }).replace(/</g, "\\u003c") }} />}
      <Navbar />
      <main id="conteudo">
        <Hero />
        <Suspense fallback={<p role="status">Carregando serviços…</p>}>
          <PublicServices />
        </Suspense>
        <Suspense fallback={<p role="status">Carregando projetos…</p>}>
          <PublicProjects />
        </Suspense>
        <BusinessSections />
      </main>
      <Footer />
    </>
  )
}
