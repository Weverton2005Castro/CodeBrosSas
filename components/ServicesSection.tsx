"use client"

import { useServices } from "@/hooks/use-data"
import type { Service } from "@/lib/catalog"
import "./ServicesSection.css"

export default function ServicesSection({ initialServices }: { initialServices?: Service[] }) {
  const { records: services, isLoading, error } = useServices(initialServices)

  return (
    <section id="services" className="services-section section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Nossos <span className="text-gradient">Serviços</span>
          </h2>
          <p className="section-subtitle">Soluções completas para transformar seu negócio digital</p>
        </div>

        {isLoading && <p role="status">Carregando serviços…</p>}
        {error && <p role="alert">Não foi possível carregar os serviços.</p>}
        {!isLoading && !error && services.length === 0 && <p>Nenhum serviço publicado ainda.</p>}
        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
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
