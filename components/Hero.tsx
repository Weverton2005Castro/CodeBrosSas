import Link from "next/link"
import { whatsappUrl } from "@/lib/contact"
import "./Hero.css"

export default function Hero() {
  return <section className="hero" aria-labelledby="hero-title">
    <div className="hero-content">
      <p className="eyebrow">CodeBros · Tecnologia sob medida · Manaus, AM</p>
      <h1 id="hero-title">Sites e sistemas em Manaus para o <span className="text-gradient">próximo passo da sua empresa.</span></h1>
      <p className="hero-tagline">Transformando ideias em código que vende.</p>
      <p className="hero-description">Da presença digital à automação da operação: desenvolvemos sites, sistemas e aplicativos a partir das necessidades do seu negócio.</p>
      <div className="hero-cta">
        <Link href="/contact" className="cta-button primary">Solicitar orçamento <span aria-hidden="true">↗</span></Link>
        <a href={whatsappUrl} className="cta-button secondary" target="_blank" rel="noopener noreferrer">Falar no WhatsApp</a>
      </div>
      <Link className="hero-project-link" href="#projects">Explore nossos projetos <span aria-hidden="true">↓</span></Link>
      <ul className="hero-capabilities" aria-label="Áreas de atuação"><li>Sites e landing pages</li><li>Sistemas e aplicativos</li><li>Integrações e automações</li></ul>
    </div>
  </section>
}
