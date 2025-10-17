"use client"

import { useState, useEffect } from "react"
import DataExport from "./DataExport"
import "./AdminDashboard.css"

interface AdminDashboardProps {
  onLogout: () => void
}

interface Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  demoUrl?: string
}

interface Message {
  id: number
  name: string
  email: string
  projectType: string
  message: string
  date: string
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<"projects" | "messages">("projects")
  const [projects, setProjects] = useState<Project[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    const storedProjects = localStorage.getItem("codebros_projects")
    const storedMessages = localStorage.getItem("codebros_messages")

    if (storedProjects) {
      setProjects(JSON.parse(storedProjects))
    }

    if (storedMessages) {
      setMessages(JSON.parse(storedMessages))
    }
  }

  const handleAddProject = () => {
    setEditingProject({
      id: Date.now(),
      title: "",
      description: "",
      image: "",
      tags: [],
      demoUrl: "",
    })
    setIsEditing(true)
  }

  const handleEditProject = (project: Project) => {
    setEditingProject(project)
    setIsEditing(true)
  }

  const handleSaveProject = () => {
    if (!editingProject) return

    const updatedProjects = editingProject.id
      ? projects.some((p) => p.id === editingProject.id)
        ? projects.map((p) => (p.id === editingProject.id ? editingProject : p))
        : [...projects, editingProject]
      : [...projects, editingProject]

    setProjects(updatedProjects)
    localStorage.setItem("codebros_projects", JSON.stringify(updatedProjects))
    setIsEditing(false)
    setEditingProject(null)
  }

  const handleDeleteProject = (id: number) => {
    if (confirm("Tem certeza que deseja excluir este projeto?")) {
      const updatedProjects = projects.filter((p) => p.id !== id)
      setProjects(updatedProjects)
      localStorage.setItem("codebros_projects", JSON.stringify(updatedProjects))
    }
  }

  const handleDeleteMessage = (id: number) => {
    if (confirm("Tem certeza que deseja excluir esta mensagem?")) {
      const updatedMessages = messages.filter((m) => m.id !== id)
      setMessages(updatedMessages)
      localStorage.setItem("codebros_messages", JSON.stringify(updatedMessages))
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
        <div className="admin-tabs">
          <button
            className={`tab-button ${activeTab === "projects" ? "active" : ""}`}
            onClick={() => setActiveTab("projects")}
          >
            Projetos ({projects.length})
          </button>
          <button
            className={`tab-button ${activeTab === "messages" ? "active" : ""}`}
            onClick={() => setActiveTab("messages")}
          >
            Mensagens ({messages.length})
          </button>
        </div>

        {activeTab === "projects" && (
          <div className="tab-content">
            <div className="content-header">
              <h2>Gerenciar Projetos</h2>
              <button onClick={handleAddProject} className="add-button">
                + Adicionar Projeto
              </button>
            </div>

            <div className="projects-list">
              {projects.map((project) => (
                <div key={project.id} className="project-item">
                  <img src={project.image || "/placeholder.svg"} alt={project.title} className="project-thumb" />
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
                    <button onClick={() => handleEditProject(project)} className="edit-btn">
                      Editar
                    </button>
                    <button onClick={() => handleDeleteProject(project.id)} className="delete-btn">
                      Excluir
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <DataExport />
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
                    <button onClick={() => handleDeleteMessage(message.id)} className="delete-btn">
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
                      <strong>Data:</strong> {new Date(message.date).toLocaleString("pt-BR")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {isEditing && editingProject && (
        <div className="modal-overlay" onClick={() => setIsEditing(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingProject.id ? "Editar Projeto" : "Novo Projeto"}</h2>
              <button className="modal-close" onClick={() => setIsEditing(false)}>
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Título</label>
                <input
                  type="text"
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  placeholder="Nome do projeto"
                />
              </div>

              <div className="form-group">
                <label>Descrição</label>
                <textarea
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  placeholder="Descrição do projeto"
                  rows={4}
                />
              </div>

              <div className="form-group">
                <label>URL da Imagem</label>
                <input
                  type="text"
                  value={editingProject.image}
                  onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                  placeholder="https://exemplo.com/imagem.jpg"
                />
              </div>

              <div className="form-group">
                <label>Tags (separadas por vírgula)</label>
                <input
                  type="text"
                  value={editingProject.tags.join(", ")}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      tags: e.target.value.split(",").map((t) => t.trim()),
                    })
                  }
                  placeholder="React, Next.js, TypeScript"
                />
              </div>

              <div className="form-group">
                <label>URL de Demonstração (opcional)</label>
                <input
                  type="text"
                  value={editingProject.demoUrl || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, demoUrl: e.target.value })}
                  placeholder="https://demo.exemplo.com"
                />
              </div>

              <button onClick={handleSaveProject} className="save-button">
                Salvar Projeto
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
