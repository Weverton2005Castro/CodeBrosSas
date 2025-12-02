"use client"
import { useState, type FormEvent } from "react"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../FirebaseConfig"
import "./ContactForm.css"

interface FormData {
  name: string
  email: string
  projectType: string
  message: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    projectType: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  // const handleSubmit = async (e: FormEvent) => {
  //   e.preventDefault()
  //   setIsSubmitting(true)

  //   // Simulate API call
  //   setTimeout(() => {
  //     // Save to localStorage
  //     const messages = JSON.parse(localStorage.getItem("codebros_messages") || "[]")
  //     messages.push({
  //       ...formData,
  //       id: Date.now(),
  //       date: new Date().toISOString(),
  //     })
  //     localStorage.setItem("codebros_messages", JSON.stringify(messages))

  //     setIsSubmitting(false)
  //     setSubmitStatus("success")

  //     // Reset form
  //     setTimeout(() => {
  //       setFormData({
  //         name: "",
  //         email: "",
  //         projectType: "",
  //         message: "",
  //       })
  //       setSubmitStatus("idle")
  //     }, 3000)
  //   }, 1500)
  // }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // isso aqui vai fazer saporra salvar no firestore
      await addDoc(collection(db, "contact_messages"), {
        ...formData,
        createdAt: serverTimestamp()
      })

      setIsSubmitting(false)
      setSubmitStatus("success")

      //Resetar formulário
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          projectType: "",
          message: ""
        })
        setSubmitStatus("idle")
      }, 3000)
    } catch (error) {
      console.error("Erro ao salvar:", error )
      setIsSubmitting(false)
      setSubmitStatus("error")
    }
  }

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Olá! Gostaria de solicitar um orçamento para: ${formData.projectType || "um projeto"}`,
    )
    window.open(`https://wa.me/5592985353980?text=${message}`, "_blank")
  }

  return (
    <section className="contact-section section">
      <div className="container">
        <div className="contact-content">
          <div className="contact-info">
            <h1 className="contact-title">
              Entre em <span className="text-gradient">Contato</span>
            </h1>
            <p className="contact-description">
              Pronto para transformar sua ideia em realidade? Preencha o formulário ou entre em contato pelo WhatsApp.
            </p>

            <div className="contact-details">
              <div className="contact-detail-item">
                <div className="detail-icon">📧</div>
                <div>
                  <h3>Email</h3>
                  <p>codebroscontato@gmail.com</p>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="detail-icon">📱</div>
                <div>
                  <h3>WhatsApp</h3>
                  <p>+55 92 8535-3980</p>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="detail-icon">⏰</div>
                <div>
                  <h3>Horário</h3>
                  <p>Seg - Sex: 9h às 18h</p>
                </div>
              </div>
            </div>

            <button className="whatsapp-button" onClick={handleWhatsApp}>
              <span className="whatsapp-icon">💬</span>
              Falar pelo WhatsApp
            </button>
          </div>

          <div className="contact-form-container">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Nome completo</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="Seu nome"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  placeholder="seu@email.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="projectType">Tipo de Projeto</label>
                <select
                  id="projectType"
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  required
                >
                  <option value="">Selecione uma opção</option>
                  <option value="site">Site / Landing Page</option>
                  <option value="sistema">Sistema Web</option>
                  <option value="app">Aplicativo Mobile</option>
                  <option value="integracao">Integração / Automação</option>
                  <option value="consultoria">Consultoria</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Mensagem</label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  placeholder="Conte-nos sobre seu projeto..."
                  rows={5}
                />
              </div>

              <button
                type="submit"
                className={`submit-button ${isSubmitting ? "submitting" : ""}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Enviando...
                  </>
                ) : submitStatus === "success" ? (
                  <>
                    <span className="checkmark">✓</span>
                    Enviado com sucesso!
                  </>
                ) : (
                  "Enviar Mensagem"
                )}
              </button>

              {submitStatus === "success" && (
                <div className="success-message">Mensagem enviada! Entraremos em contato em breve.</div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
