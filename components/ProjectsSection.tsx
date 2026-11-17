"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { projectPath } from "@/lib/seo"
import { useProjects } from "@/hooks/use-data"
import type { Project } from "@/lib/catalog"
import "./ProjectsSection.css"

export default function ProjectsSection({ initialProjects }: { initialProjects?: Project[] }) {
  const { records: projects, isLoading, error } = useProjects(initialProjects)
  const [activeTag, setActiveTag] = useState("Todos")
  const tags = [...new Set(projects.flatMap((project) => project.tags).filter(Boolean))].sort()
  const effectiveTag = tags.includes(activeTag) ? activeTag : "Todos"
  const visibleProjects = effectiveTag === "Todos" ? projects : projects.filter((project) => project.tags.includes(effectiveTag))
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const dialog = dialogRef.current
    if (selectedId && dialog && !dialog.open) dialog.showModal()
  }, [selectedId])
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
          {tags.length > 0 && <div className="project-filters" role="group" aria-label="Filtrar projetos por tecnologia ou categoria">{["Todos", ...tags].map((tag) => <button type="button" key={tag} aria-pressed={effectiveTag === tag} onClick={() => setActiveTag(tag)}>{tag}</button>)}</div>}
          {!isLoading && projects.length > 0 && <p className="filter-count" role="status">{visibleProjects.length} {visibleProjects.length === 1 ? "projeto encontrado" : "projetos encontrados"}</p>}
          <div className="projects-grid">
            {visibleProjects.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-image-container">
                  <img src={project.image || "/placeholder.svg"} alt={project.title} className="project-image" width={800} height={500} loading="lazy" decoding="async" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = "/placeholder.svg" }} />
                  <div className="project-overlay">
                    <button type="button" className="view-details" onClick={() => setSelectedId(project.id)}>Prévia do projeto</button>
                  </div>
                </div>
                <div className="project-content">
                  <p className="project-kind">{project.kind === "real" ? "Projeto real" : project.kind === "demo" ? "Projeto demonstrativo" : "Portfólio · natureza não informada"}</p>
                  <h3 className="project-title"><Link href={projectPath(project.id)} onClick={(event) => event.stopPropagation()}>{project.title}</Link></h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((tag, index) => (
                      <span key={index} className="project-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button type="button" className="project-preview-button" onClick={() => setSelectedId(project.id)}>Explorar projeto <span aria-hidden="true">↗</span></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedProject && (
        <dialog ref={dialogRef} className="project-dialog" aria-labelledby="project-dialog-title" onClose={() => setSelectedId(null)} onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current?.close() }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" aria-label="Fechar prévia" onClick={() => dialogRef.current?.close()}>
              ×
            </button>
            <img
              src={selectedProject.image || "/placeholder.svg"}
              alt={selectedProject.title}
              className="modal-image"
            />
            <div className="modal-body">
              <h2 id="project-dialog-title" className="modal-title">{selectedProject.title}</h2>
              <p className="modal-description">{selectedProject.description}</p>
              <div className="modal-tags">
                {selectedProject.tags.map((tag, index) => (
                  <span key={index} className="modal-tag">
                    {tag}
                  </span>
                ))}
              </div>
              <Link href={projectPath(selectedProject.id)} className="modal-demo-button">Página completa do projeto</Link>
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
        </dialog>
      )}
    </>
  )
}
