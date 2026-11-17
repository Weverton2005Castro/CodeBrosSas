"use client"
import { useState, useEffect, type FormEvent } from "react"
import type { MessageInput } from "@/lib/storage"
import "./ContactForm.css"
import { contactEmail, whatsappUrl } from "@/lib/contact"

export default function ContactForm() {
  const [formData, setFormData] = useState<MessageInput>({
    name: "",
    email: "",
    projectType: "",
    message: "",
  })

  useEffect(() => {
    const type = new URLSearchParams(window.location.search).get("tipo")
    if (type && ["site", "sistema", "app", "integracao", "consultoria", "outro"].includes(type)) {
      setFormData((current) => ({ ...current, projectType: type }))
    }
  }, [])
  const projectNames: Record<string, string> = { site: "Site / Landing Page", sistema: "Sistema Web", app: "Aplicativo Mobile", integracao: "Integração / Automação", consultoria: "Consultoria", outro: "Outro projeto" }
  const projectHints: Record<string, string> = { site: "Quais serviços você oferece e quais páginas gostaria de incluir?", sistema: "Qual processo precisa organizar? Quantas pessoas vão usar o sistema?", app: "Quem vai usar o aplicativo e qual tarefa ele deve facilitar?", integracao: "Quais ferramentas usa hoje e qual tarefa gostaria de automatizar?" }
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const { addMessage } = await import("@/lib/storage")
      await addMessage(formData)
      setFormData({ name: "", email: "", projectType: "", message: "" })
      setSubmitStatus("success")
    } catch {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Olá! Gostaria de solicitar um orçamento para: ${projectNames[formData.projectType] || "um projeto"}`,
    )
    window.open(`https://wa.me/5592985353980?text=${message}`, "_blank", "noopener,noreferrer")
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
                  <p><a href={`mailto:${contactEmail}`}>{contactEmail}</a></p>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="detail-icon">📱</div>
                <div>
                  <h3>WhatsApp</h3>
                  <p><a href={whatsappUrl}>+55 92 8535-3980</a></p>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="detail-icon">⏰</div>
                <div>
                  <h3>Horário</h3>
                  <p>Seg - Sex: 9h às 18h · Manaus, AM</p>
                </div>
              </div>
            </div>

            <button className="whatsapp-button" onClick={handleWhatsApp}>
              <span className="whatsapp-icon">💬</span>
              Falar pelo WhatsApp
            </button>
          </div>

          <div className="contact-form-container">
            <form onChange={() => { if (submitStatus !== "idle") setSubmitStatus("idle") }} onSubmit={handleSubmit} className="contact-form" aria-busy={isSubmitting}>
              <p>Campos obrigatórios. Usaremos os dados informados para responder à sua solicitação.</p>
              <div className="form-group">
                <label htmlFor="name">Nome completo</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="name"
                  maxLength={150}
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
                  name="email"
                  autoComplete="email"
                  maxLength={254}
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
                  name="projectType"
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
                  name="message"
                  aria-describedby="message-hint message-count"
                  maxLength={5000}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  placeholder={projectHints[formData.projectType] || "Conte-nos sobre seu projeto..."}
                  rows={5}
                />
                <p id="message-hint" className="field-hint">{projectHints[formData.projectType] || "Descreva sua ideia, objetivo e funcionalidades desejadas."}</p>
                <span id="message-count" className="character-count">{formData.message.length}/5000 caracteres</span>
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

              {submitStatus === "error" && (
                <p role="alert">Não foi possível enviar a mensagem. Tente novamente ou <a href={whatsappUrl}>fale pelo WhatsApp</a>.</p>
              )}
              {submitStatus === "success" && (
                <div className="success-message" role="status">Mensagem enviada! Entraremos em contato em breve.</div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
