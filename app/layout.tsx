import { siteUrl } from "@/lib/seo"
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: { default: "CodeBros | Sites e sistemas em Manaus", template: "%s | CodeBros" },
  description: "Criação de sites, sistemas, aplicativos e automação para empresas em Manaus, AM. Conheça a CodeBros e solicite um orçamento.",
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
        <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
