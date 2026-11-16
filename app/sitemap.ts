import type { MetadataRoute } from "next"
import { readPublicProjects } from "@/lib/public-catalog"
import { servicePages } from "@/lib/service-pages"
import { projectPath, siteUrl } from "@/lib/seo"
export const dynamic = "force-dynamic"
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!siteUrl) return []
  // Let upstream failures return an error so crawlers retry instead of caching an incomplete sitemap.
  const projects = await readPublicProjects()
  return ["/", "/contact", "/guias", ...servicePages.map((service) => `/${service.slug}`), ...projects.map((project) => projectPath(project.id))].map((path) => ({ url: `${siteUrl}${path}` }))
}
