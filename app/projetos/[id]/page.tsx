import { cache } from "react"
import { notFound } from "next/navigation"
import ContentPage from "@/components/ContentPage"
import { readPublicProjects } from "@/lib/public-catalog"
import { pageMetadata, projectPath } from "@/lib/seo"

export const dynamic = "force-dynamic"
const getProject = cache(async (id: string) => (await readPublicProjects()).find((project) => project.id === id))
type Props = { params: Promise<{ id: string }> }
export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const project = await getProject(id)
  if (!project) notFound()
  return pageMetadata(project.title, project.description.slice(0, 160), projectPath(project.id))
}
export default async function ProjectPage({ params }: Props) {
  const { id } = await params
  const project = await getProject(id)
  if (!project) notFound()
  return <ContentPage title={project.title} description="Conheça este projeto do portfólio da CodeBros.">
    {project.image && <img src={project.image} alt={`Apresentação do projeto ${project.title}`} className="case-image" decoding="async" />}
    <p>{project.kind === "real" ? "Projeto real" : project.kind === "demo" ? "Projeto demonstrativo" : "Natureza do projeto ainda não informada."}</p>
    <section><h2>Sobre o projeto</h2><p className="preserve-lines">{project.description}</p></section>
    {project.tags.length > 0 && <section><h2>Tecnologias e categorias</h2><ul>{project.tags.map((tag, index) => <li key={index}>{tag}</li>)}</ul></section>}
    {project.demoUrl && project.demoUrl !== "#" && <p><a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="cta-button secondary">Ver demonstração</a></p>}
  </ContentPage>
}
