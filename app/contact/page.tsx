import { pageMetadata } from "@/lib/seo"
export const metadata = pageMetadata("Contato e orçamento", "Conte sua ideia para a CodeBros e solicite um orçamento para sites, sistemas web, aplicativos ou integrações.", "/contact")
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ContactForm from "@/components/ContactForm"

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="contact-page">
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}
