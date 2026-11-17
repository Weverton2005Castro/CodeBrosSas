"use client"

import { useState } from "react"
import Link from "next/link"
import { servicePages } from "@/lib/service-pages"
import { useServices } from "@/hooks/use-data"
import type { Service } from "@/lib/catalog"
import "./ServicesSection.css"

export default function ServicesSection({ initialServices }: { initialServices?: Service[] }) {
  const [goal, setGoal] = useState(0)
  const goals = [
    { label: "Atrair novos clientes", type: "site", service: servicePages[0] },
    { label: "Organizar minha operação", type: "sistema", service: servicePages[1] },
    { label: "Criar um aplicativo", type: "app", service: servicePages[2] },
    { label: "Automatizar tarefas", type: "integracao", service: servicePages[3] },
  ]
  const selected = goals[goal]
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

        <div className="service-advisor">
          <h3>O que você quer melhorar na sua empresa?</h3>
          <p>Escolha um objetivo para conhecer uma solução possível.</p>
          <div className="goal-options" role="group" aria-label="Objetivo do projeto">{goals.map((item, index) => <button key={item.type} type="button" aria-pressed={goal === index} onClick={() => setGoal(index)}>{item.label}</button>)}</div>
          <div className="goal-result" aria-live="polite" aria-atomic="true"><h4>{selected.service.title}</h4><p>{selected.service.description}</p><div className="advisor-actions"><Link href={`/${selected.service.slug}`}>Conhecer o serviço ↗</Link><Link href={`/contact?tipo=${selected.type}`}>Solicitar orçamento para esta solução ↗</Link></div></div>
        </div>
        <nav className="service-page-links" aria-label="Conheça nossos serviços">
          {servicePages.map((service) => <Link key={service.slug} href={`/${service.slug}`}>{service.title}</Link>)}
        </nav>
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
