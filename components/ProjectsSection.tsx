"use client"

import { useState } from "react"
import { useProjects } from "@/hooks/use-data"
import type { Project } from "@/lib/catalog"
import "./ProjectsSection.css"

export default function ProjectsSection({ initialProjects }: { initialProjects?: Project[] }) {
  const { records: projects, isLoading, error } = useProjects(initialProjects)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selectedProject = projects.find((project) => project.id === selectedId)

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

          {isLoading && <p role="status">Carregando projetos…</p>}
          {error && <p role="alert">Não foi possível carregar os projetos.</p>}
          {!isLoading && !error && projects.length === 0 && <p>Nenhum projeto publicado ainda.</p>}
          <div className="projects-grid">
            {projects.map((project) => (
              <div key={project.id} className="project-card" onClick={() => setSelectedId(project.id)}>
                <div className="project-image-container">
                  <img src={project.image || "/placeholder.svg"} alt={project.title} className="project-image" loading="lazy" decoding="async" />
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
        <div className="modal-overlay" onClick={() => setSelectedId(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedId(null)}>
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
              {selectedProject.demoUrl && selectedProject.demoUrl !== "#" && (
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
