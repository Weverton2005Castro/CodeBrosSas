import type { Metadata } from "next"

// Keep canonicals on the official origin, including in preview deployments.
export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || "https://wcodebros.vercel.app",
).origin

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title, description,
    alternates: siteUrl ? { canonical: `${siteUrl}${path}` } : undefined,
    openGraph: { title, description, siteName: "CodeBros", locale: "pt_BR", type: "website", ...(siteUrl ? { url: `${siteUrl}${path}` } : {}) },
    twitter: { card: "summary_large_image", title, description },
  }
}

export function projectPath(id: string) {
  return `/projetos/${encodeURIComponent(id)}`
}
