import { siteUrl } from "@/lib/seo"
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: { default: "CodeBros | Criação de sites, sistemas web e aplicativos", template: "%s | CodeBros" },
  description: "Desenvolvimento de sites, sistemas web, aplicativos e integrações sob medida. Conheça o portfólio da CodeBros e solicite um orçamento.",
  authors: [{ name: "Weverton - CodeBros" }],
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.variable}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
