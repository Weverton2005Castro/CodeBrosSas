import Link from "next/link"
import { contactEmail, whatsappUrl } from "@/lib/contact"
import "./Footer.css"

export default function Footer() {
  const atualizaAno = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-logo">
              <span>Code</span>
              <span className="accent">Bros</span>
            </h3>
            <p className="footer-tagline">Transformando ideias em código que vende</p>
          </div>

          <div className="footer-section">
            <h4>Links Rápidos</h4>
            <ul>
              <li>
                <Link href="/">Início</Link>
              </li>
              <li>
                <Link href="/#services">Serviços</Link>
              </li>
              <li>
                <Link href="/#projects">Projetos</Link>
              </li>
              <li>
                <Link href="/contact">Contato</Link>
              </li><li><Link href="/guias">Guias para seu projeto</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Serviços</h4>
            <ul>
              <li><Link href="/criacao-de-sites">Sites e Landing Pages</Link></li>
              <li><Link href="/desenvolvimento-de-sistemas">Sistemas Web</Link></li>
              <li><Link href="/aplicativos">Aplicativos Mobile</Link></li>
              <li><Link href="/integracoes">Integrações</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contato</h4>
            <ul>
              <li><a href={`mailto:${contactEmail}`}>{contactEmail}</a></li>
              <li><a href={whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp: +55 92 8535-3980</a></li>
              <li>Manaus – AM, Brasil</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {atualizaAno} CodeBros. Desenvolvido por Weverton  Blanco.</p>
        </div>
      </div>
    </footer>
  )
}
