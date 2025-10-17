"use client"

import { useEffect, useRef, useState } from "react"
import "./ServicesSection.css"

const services = [
  {
    id: 1,
    title: "Sites e Landing Pages",
    description: "Páginas modernas, responsivas e otimizadas para conversão. Design atraente que vende.",
    icon: "🌐",
  },
  {
    id: 2,
    title: "Sistemas Web",
    description: "Plataformas completas e escaláveis. Dashboards, CRMs, ERPs e soluções personalizadas.",
    icon: "💻",
  },
  {
    id: 3,
    title: "Aplicativos Mobile",
    description: "Apps nativos e híbridos para iOS e Android. Experiência mobile de alta qualidade.",
    icon: "📱",
  },
  {
    id: 4,
    title: "Integrações e Automações",
    description: "Conecte seus sistemas, automatize processos e aumente a eficiência do seu negócio.",
    icon: "🔗",
  },
  {
    id: 5,
    title: "Consultoria Técnica",
    description: "Orientação especializada para escolher as melhores tecnologias e arquiteturas.",
    icon: "🎯",
  },
  {
    id: 6,
    title: "Suporte e Manutenção",
    description: "Mantenha seus sistemas sempre atualizados, seguros e funcionando perfeitamente.",
    icon: "🛠️",
  },
]

export default function ServicesSection() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            services.forEach((service, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...prev, service.id])
              }, index * 100)
            })
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" className="services-section section" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Nossos <span className="text-gradient">Serviços</span>
          </h2>
          <p className="section-subtitle">Soluções completas para transformar seu negócio digital</p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className={`service-card ${visibleCards.includes(service.id) ? "visible" : ""}`}>
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <div className="service-hover-effect"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
