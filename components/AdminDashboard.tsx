"use client"
import { useState, type FormEvent } from "react"
import { useMessages, type useProjects, type useServices } from "@/hooks/use-data"
import { deleteMessage, deleteProject, deleteService, saveProject, saveService } from "@/lib/storage"
import DataExport from "./DataExport"
import "./AdminDashboard.css"

type Editor = {
  kind: "project" | "service"
  id?: string
  title: string
  description: string
  image?: string
  tags?: string
  demoUrl?: string
  icon?: string
}

interface AdminDashboardProps {
  onLogout: () => void
  sessionError: string
  projectData: ReturnType<typeof useProjects>
  serviceData: ReturnType<typeof useServices>
}

export default function AdminDashboard({ onLogout, sessionError, projectData, serviceData }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<"projects" | "services" | "messages">("projects")
  const messageData = useMessages()
  const { records: projects } = projectData
  const { records: services } = serviceData
  const { records: messages } = messageData
  const activeData = { projects: projectData, services: serviceData, messages: messageData }[activeTab]
  const [editor, setEditor] = useState<Editor | null>(null)
  const [busy, setBusy] = useState(false)
  const [actionError, setActionError] = useState("")

  function openEditor(values: Editor) {
    setActionError("")
    setEditor(values)
  }

  function closeEditor() {
    if (busy) return
    setEditor(null)
    setActionError("")
  }

  async function handleSave(event: FormEvent) {
    event.preventDefault()
    if (!editor || busy) return
    setBusy(true)
    setActionError("")

    try {
      if (editor.kind === "project") {
        await saveProject(editor.id, {
          title: editor.title,
          description: editor.description,
          image: editor.image?.trim() ?? "",
          tags: editor.tags?.split(",").map((tag) => tag.trim()) ?? [],
          demoUrl: editor.demoUrl?.trim() ?? "",
        })
      } else {
        await saveService(editor.id, { title: editor.title, description: editor.description, icon: editor.icon ?? "" })
      }
      setEditor(null)
    } catch {
      setActionError("Não foi possível salvar. Confira os campos, os links e as permissões.")
    } finally {
      setBusy(false)
    }
  }

  async function handleDelete(label: string, remove: () => Promise<void>) {
    if (busy || !confirm(`Excluir ${label}?`)) return
    setBusy(true)
    setActionError("")
    try {
      await remove()
    } catch {
      setActionError(`Não foi possível excluir ${label}.`)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="admin-dashboard">
      <nav className="admin-nav">
        <div className="admin-nav-content">
          <h1 className="admin-logo">
            <span>Code</span>
            <span className="accent">Bros</span>
            <span className="admin-badge">Admin</span>
          </h1>
          <button onClick={onLogout} className="logout-button">
            Sair
          </button>
        </div>
      </nav>

      <div className="admin-content">
        {sessionError && <p role="alert">{sessionError}</p>}
        {actionError && !editor && <p role="alert">{actionError}</p>}
        <div className="admin-tabs">
          <button
            className={`tab-button ${activeTab === "projects" ? "active" : ""}`}
            onClick={() => setActiveTab("projects")}
          >
            Projetos ({projects.length})
          </button>
          <button
            className={`tab-button ${activeTab === "services" ? "active" : ""}`}
            onClick={() => setActiveTab("services")}
          >
            Serviços ({services.length})
          </button>
          <button
            className={`tab-button ${activeTab === "messages" ? "active" : ""}`}
            onClick={() => setActiveTab("messages")}
          >
            Mensagens ({messages.length})
          </button>
        </div>

        {activeData.isLoading && <p role="status">Carregando dados…</p>}
        {activeData.error && <p role="alert">Não foi possível carregar os dados do Firestore.</p>}
        {!activeData.isLoading && !activeData.error && activeData.records.length === 0 && (
          <p>Nenhum registro encontrado.</p>
        )}

        {activeTab === "projects" && (
          <div className="tab-content">
            <div className="content-header">
              <h2>Gerenciar Projetos</h2>
              <button disabled={busy} onClick={() => openEditor({ kind: "project", title: "", description: "" })} className="add-button">
                + Adicionar Projeto
              </button>
            </div>

            <div className="projects-list">
              {projects.map((project) => (
                <div key={project.id} className="project-item">
                  <img src={project.image || "/placeholder.svg"} alt={project.title} className="project-thumb" loading="lazy" decoding="async" />
                  <div className="project-info">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-tags-small">
                      {project.tags.map((tag, i) => (
                        <span key={i}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="project-actions">
                    <button disabled={busy} onClick={() => openEditor({ ...project, kind: "project", tags: project.tags.join(", ") })} className="edit-btn">
                      Editar
                    </button>
                    <button disabled={busy} onClick={() => handleDelete("este projeto", () => deleteProject(project.id))} className="delete-btn">
                      Excluir
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <DataExport />
          </div>
        )}

        {activeTab === "services" && (
          <div className="tab-content">
            <div className="content-header">
              <h2>Gerenciar Serviços</h2>
              <button disabled={busy} onClick={() => openEditor({ kind: "service", title: "", description: "" })} className="add-button">
                + Adicionar Serviço
              </button>
            </div>

            <div className="projects-list">
              {services.map((service) => (
                <div key={service.id} className="project-item">
                  <span aria-hidden="true">{service.icon}</span>
                  <div className="project-info">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                  <div className="project-actions">
                    <button disabled={busy} onClick={() => openEditor({ ...service, kind: "service" })} className="edit-btn">
                      Editar
                    </button>
                    <button disabled={busy} onClick={() => handleDelete("este serviço", () => deleteService(service.id))} className="delete-btn">
                      Excluir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "messages" && (
          <div className="tab-content">
            <div className="content-header">
              <h2>Mensagens Recebidas</h2>
            </div>

            <div className="messages-list">
              {messages.map((message) => (
                <div key={message.id} className="message-item">
                  <div className="message-header">
                    <div>
                      <h3>{message.name}</h3>
                      <p className="message-email">{message.email}</p>
                    </div>
                    <button disabled={busy} onClick={() => handleDelete("esta mensagem", () => deleteMessage(message.id))} className="delete-btn">
                      Excluir
                    </button>
                  </div>

                  <div className="message-body">
                    <p>
                      <strong>Tipo:</strong> {message.projectType}
                    </p>
                    <p>
                      <strong>Mensagem:</strong> {message.message}
                    </p>
                    <p className="message-date">
                      <strong>Data:</strong>{" "}
                      {message.date
                        ? new Date(message.date).toLocaleString("pt-BR")
                        : "—"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {editor && (
        <div className="modal-overlay" onClick={closeEditor}>
          <div className="modal-content" onClick={(event) => event.stopPropagation()}>
            <div className="modal-header">
              <h2>{editor.id ? "Editar" : "Adicionar"} {editor.kind === "project" ? "projeto" : "serviço"}</h2>
              <button type="button" aria-label="Fechar" className="modal-close" disabled={busy} onClick={closeEditor}>
                ×
              </button>
            </div>

            <form className="modal-body" onSubmit={handleSave}>
              <div className="form-group">
                <label htmlFor="entry-title">Título</label>
                <input id="entry-title" required disabled={busy} value={editor.title}
                  onChange={(event) => setEditor({ ...editor, title: event.target.value })} />
              </div>
              <div className="form-group">
                <label htmlFor="entry-description">Descrição</label>
                <textarea id="entry-description" required disabled={busy} value={editor.description} rows={4}
                  onChange={(event) => setEditor({ ...editor, description: event.target.value })} />
              </div>

              {editor.kind === "project" ? (
                <>
                  <div className="form-group">
                    <label htmlFor="entry-image">URL da imagem</label>
                    <input id="entry-image" disabled={busy} value={editor.image ?? ""}
                      onChange={(event) => setEditor({ ...editor, image: event.target.value })} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="entry-tags">Tags separadas por vírgula</label>
                    <input id="entry-tags" disabled={busy} value={editor.tags ?? ""}
                      onChange={(event) => setEditor({ ...editor, tags: event.target.value })} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="entry-demo">URL da demonstração (opcional)</label>
                    <input id="entry-demo" type="url" disabled={busy} value={editor.demoUrl === "#" ? "" : editor.demoUrl ?? ""}
                      onChange={(event) => setEditor({ ...editor, demoUrl: event.target.value })} />
                  </div>
                </>
              ) : (
                <div className="form-group">
                  <label htmlFor="entry-icon">Ícone (emoji ou texto)</label>
                  <input id="entry-icon" required disabled={busy} value={editor.icon ?? ""}
                    onChange={(event) => setEditor({ ...editor, icon: event.target.value })} />
                </div>
              )}

              {actionError && <p role="alert">{actionError}</p>}
              <button type="submit" disabled={busy} className="save-button">
                {busy ? "Salvando…" : "Salvar"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
