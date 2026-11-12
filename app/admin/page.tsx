import AdminSession from "@/components/AdminSession"
import { loadInitialCatalog, readPublicProjects, readPublicServices } from "@/lib/public-catalog"

export default async function AdminPage() {
  const [initialProjects, initialServices] = await Promise.all([
    loadInitialCatalog(readPublicProjects),
    loadInitialCatalog(readPublicServices),
  ])

  return <AdminSession initialProjects={initialProjects} initialServices={initialServices} />
}
