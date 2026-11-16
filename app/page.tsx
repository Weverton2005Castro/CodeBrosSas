import { pageMetadata, siteUrl } from "@/lib/seo"

export const metadata = pageMetadata("Criação de sites, sistemas web e aplicativos", "Desenvolvimento de sites, sistemas web, aplicativos e integrações sob medida. Conheça o portfólio da CodeBros e solicite um orçamento.", "/")
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
      {siteUrl && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Organization", name: "CodeBros", url: siteUrl, email: "codebroscontato@gmail.com" }).replace(/</g, "\\u003c") }} />}
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
