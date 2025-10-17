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
  title: "CodeBros - Transformando ideias em código que vende",
  description:
    "Desenvolvimento de sites, sistemas web, aplicativos mobile e soluções personalizadas. Fundada por Weverton, desenvolvedor freelancer especializado em projetos sob medida.",
  keywords: "desenvolvimento web, sites personalizados, sistemas web, aplicativos mobile, freelancer, CodeBros",
  authors: [{ name: "Weverton - CodeBros" }],
  openGraph: {
    title: "CodeBros - Transformando ideias em código que vende",
    description: "Desenvolvimento de projetos, sites e sistemas personalizados",
    type: "website",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.variable}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
