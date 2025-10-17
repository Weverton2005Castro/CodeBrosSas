import Link from "next/link"
import "./Footer.css"

export default function Footer() {
  const currentYear = new Date().getFullYear()

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
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Serviços</h4>
            <ul>
              <li>Sites e Landing Pages</li>
              <li>Sistemas Web</li>
              <li>Aplicativos Mobile</li>
              <li>Integrações</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contato</h4>
            <ul>
              <li>codebroscontato@gmail.com</li>
              <li>WhatsApp: +55 92 8535-3980</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} CodeBros. Desenvolvido por Weverton  Blanco.</p>
        </div>
      </div>
    </footer>
  )
}
