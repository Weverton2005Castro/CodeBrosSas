"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import "./Navbar.css"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <Link href="/" className="navbar-logo">
          <span className="logo-text">Code</span>
          <span className="logo-text-accent">Bros</span>
        </Link>

        <button
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`navbar-menu ${isMobileMenuOpen ? "open" : ""}`}>
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
              Contato
            </Link>
          </li>
          <li>
            {/* <Link href="/admin" className="admin-link" onClick={() => setIsMobileMenuOpen(false)}>
              Admin
            </Link> */}
          </li>
        </ul>
      </div>
    </nav>
  )
}
