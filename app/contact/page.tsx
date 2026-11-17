import { pageMetadata } from "@/lib/seo"
export const metadata = pageMetadata("Solicitar orçamento em Manaus", "Fale com a CodeBros em Manaus, AM. Solicite orçamento para criação de sites, sistemas, aplicativos e automações pelo formulário ou WhatsApp.", "/contact")
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ContactForm from "@/components/ContactForm"

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main id="conteudo" className="contact-page">
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}
