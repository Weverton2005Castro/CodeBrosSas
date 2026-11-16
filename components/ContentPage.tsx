import type { ReactNode } from "react"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function ContentPage({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return <><Navbar /><main className="content-page container"><nav aria-label="Navegação estrutural"><Link href="/">Início</Link></nav><header><h1>{title}</h1><p>{description}</p></header>{children}<section><h2>Vamos conversar sobre seu projeto?</h2><p>Conte o que você precisa para avaliarmos o escopo e os próximos passos.</p><Link href="/contact" className="cta-button primary">Solicitar orçamento</Link></section></main><Footer /></>
}
