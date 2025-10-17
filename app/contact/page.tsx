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
