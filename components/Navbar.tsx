"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import "./Navbar.css"

export default function Navbar() {
  const toggleRef = useRef<HTMLButtonElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
      return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (!isMobileMenuOpen) return
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setIsMobileMenuOpen(false); toggleRef.current?.focus() }
    }
    const handleResize = () => { if (window.innerWidth > 768) setIsMobileMenuOpen(false) }
    document.addEventListener("keydown", handleKey)
    window.addEventListener("resize", handleResize)
    return () => { document.removeEventListener("keydown", handleKey); window.removeEventListener("resize", handleResize) }
  }, [isMobileMenuOpen])

  return (
    <nav aria-label="Navegação principal" className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      {isMobileMenuOpen && <button type="button" className="menu-backdrop" aria-label="Fechar menu de navegação" onClick={() => setIsMobileMenuOpen(false)} />}
      <div className="navbar-container">
        <Link href="/" className="navbar-logo">
          <span className="logo-text">Code</span>
          <span className="logo-text-accent">Bros</span>
        </Link>

        <button
          ref={toggleRef}
          aria-expanded={isMobileMenuOpen}
          aria-controls="menu-principal"
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul id="menu-principal" onKeyDown={(event) => { if (event.key === "Escape") { setIsMobileMenuOpen(false); toggleRef.current?.focus() } }} className={`navbar-menu ${isMobileMenuOpen ? "open" : ""}`}>
          <li>
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
              Início
            </Link>
          </li>
          <li>
            <Link href="/#services" onClick={() => setIsMobileMenuOpen(false)}>
              Serviços
            </Link>
          </li>
          <li>
            <Link href="/#projects" onClick={() => setIsMobileMenuOpen(false)}>
              Projetos
            </Link>
          </li>
          <li>
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
              Solicitar orçamento
            </Link>
          </li>

        </ul>
      </div>
    </nav>
  )
}
