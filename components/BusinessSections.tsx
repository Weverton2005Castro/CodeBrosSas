import Link from "next/link"
import { whatsappUrl } from "@/lib/contact"

const steps = [
  ["Entender", "Conversamos sobre seu negócio, seu público e o problema que o projeto precisa resolver."],
  ["Planejar", "Definimos funcionalidades, prioridades, investimento e cronograma na proposta."],
  ["Desenvolver", "Construímos a solução com etapas de revisão para validar o caminho com você."],
  ["Entregar", "Validamos os fluxos e alinhamos publicação, orientação de uso e manutenção conforme o escopo."],
]
const questions = [
  ["Quanto custa criar um site ou sistema?", "O investimento depende das páginas, funcionalidades, integrações e materiais disponíveis. Conte sua necessidade para receber uma proposta com escopo e etapas definidos."],
  ["A CodeBros atende empresas em Manaus?", "Sim. Atuamos em Manaus, AM, com criação de sites, desenvolvimento de sistemas, aplicativos e automação para empresas. Também podemos conversar sobre projetos de outras regiões por atendimento remoto."],
  ["Qual é o prazo de desenvolvimento?", "O prazo é definido após avaliarmos a complexidade, as integrações e a disponibilidade de conteúdo. O cronograma faz parte da proposta, sem estimativas genéricas antes de entender o projeto."],
  ["É possível integrar as ferramentas que minha empresa já usa?", "Avaliamos os sistemas existentes, as APIs e as permissões disponíveis para propor integrações e reduzir tarefas manuais. A viabilidade é confirmada durante o levantamento."],
  ["O site será preparado para o Google e para celulares?", "Os projetos de sites consideram responsividade, organização do conteúdo e SEO técnico no escopo. Indexação e posições de busca dependem também do Google, da concorrência e da continuidade do trabalho."],
]
export default function BusinessSections() {
  return <>
    <section id="processo" className="section business-section"><div className="container"><p className="eyebrow">Do problema à solução</p><h2>Clareza em cada etapa.</h2><ol className="process-grid">{steps.map(([title, text], i) => <li key={title}><span className="step-number">0{i + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol></div></section>
    <section id="sobre" className="section about-section"><div className="container about-grid"><div><p className="eyebrow">CodeBros · Manaus, Amazonas</p><h2>Tecnologia próxima de quem empreende.</h2></div><div><p>A CodeBros desenvolve soluções digitais sob medida para empresas que precisam apresentar seus serviços, organizar informações e conectar processos.</p><p>Nosso ponto de partida é entender sua operação. A partir daí, alinhamos design, desenvolvimento e integrações ao que seu negócio precisa construir.</p><Link href="/contact">Vamos conversar sobre sua ideia ↗</Link></div></div></section>
    <section id="faq" className="section business-section"><div className="container faq-container"><p className="eyebrow">Antes de começar</p><h2>Perguntas frequentes</h2>{questions.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>
    <section className="section"><div className="container"><div className="contact-banner"><p className="eyebrow">Seu próximo projeto começa com uma conversa</p><h2>O que sua empresa precisa resolver?</h2><p>Conte sua ideia, as ferramentas que usa e o que deseja melhorar. Vamos avaliar os próximos passos.</p><div className="hero-cta"><Link href="/contact" className="cta-button primary">Solicitar orçamento</Link><a href={whatsappUrl} className="cta-button secondary" target="_blank" rel="noopener noreferrer">Conversar no WhatsApp</a></div></div></div></section>
  </>
}
