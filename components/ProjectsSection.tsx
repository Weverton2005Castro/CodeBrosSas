"use client"

import { useState, useEffect } from "react"
import "./ProjectsSection.css"

interface Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  demoUrl?: string
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  useEffect(() => {
    // Load projects from localStorage
    const storedProjects = localStorage.getItem("codebros_projects")
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects))
    } else {
      // Default projects
      const defaultProjects: Project[] = [
        {
          id: 1,
          title: "E-commerce Moderno",
          description:
            "Plataforma completa de e-commerce com carrinho, pagamentos e painel administrativo. Interface moderna e responsiva.",
          image: "/modern-ecommerce-website.png",
          tags: ["React", "Next.js", "Stripe"],
          demoUrl: "#",
        },
        {
          id: 2,
          title: "Dashboard Analytics",
          description:
            "Sistema de análise de dados com gráficos interativos, relatórios em tempo real e exportação de dados.",
          image: "/analytics-dashboard-dark-theme.png",
          tags: ["TypeScript", "Charts", "API"],
          demoUrl: "#",
        },
        {
          id: 3,
          title: "App de Delivery",
          description:
            "Aplicativo mobile para delivery com rastreamento em tempo real, pagamentos integrados e sistema de avaliações.",
          image: "/food-delivery-app.png",
          tags: ["React Native", "Firebase", "Maps"],
          demoUrl: "#",
        },
      ]
      setProjects(defaultProjects)
      localStorage.setItem("codebros_projects", JSON.stringify(defaultProjects))
    }
  }, [])

  return (
    <>
      <section id="projects" className="projects-section section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Nossos <span className="text-gradient">Projetos</span>
            </h2>
            <p className="section-subtitle">Conheça alguns dos projetos que desenvolvemos</p>
          </div>

          <div className="projects-grid">
            {projects.map((project) => (
              <div key={project.id} className="project-card" onClick={() => setSelectedProject(project)}>
                <div className="project-image-container">
                  <img src={project.image || "/placeholder.svg"} alt={project.title} className="project-image" />
                  <div className="project-overlay">
                    <span className="view-details">Ver detalhes</span>
                  </div>
                </div>
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((tag, index) => (
                      <span key={index} className="project-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProject(null)}>
              ×
            </button>
            <img
              src={selectedProject.image || "/placeholder.svg"}
              alt={selectedProject.title}
              className="modal-image"
            />
            <div className="modal-body">
              <h2 className="modal-title">{selectedProject.title}</h2>
              <p className="modal-description">{selectedProject.description}</p>
              <div className="modal-tags">
                {selectedProject.tags.map((tag, index) => (
                  <span key={index} className="modal-tag">
                    {tag}
                  </span>
                ))}
              </div>
              {selectedProject.demoUrl && (
                <a
                  href={selectedProject.demoUrl}
                  className="modal-demo-button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver demonstração
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
