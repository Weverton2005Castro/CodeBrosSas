import Link from "next/link"
import ContentPage from "@/components/ContentPage"
import { pageMetadata } from "@/lib/seo"
export const metadata = pageMetadata("Como planejar seu site ou sistema", "Entenda o que influencia o custo de um site e quando desenvolver um sistema personalizado para sua empresa.", "/guias")
export default function GuidesPage() {
  return <ContentPage title="Como planejar seu site ou sistema" description="Perguntas para ajudar você a definir sua próxima solução digital.">
    <section><h2>Quanto custa um site para uma pequena empresa?</h2><p>O custo depende do que precisa ser entregue. Um site de apresentação com poucas páginas tem um escopo diferente de uma loja com pagamentos, estoque e integrações. Design personalizado, produção de textos, cadastro de conteúdo e manutenção também precisam entrar na conversa.</p><p>Para comparar propostas, liste as páginas, os recursos obrigatórios e os materiais que você já possui. Pergunte se domínio, hospedagem, atualizações e suporte estão incluídos ou são cobrados separadamente.</p><Link href="/criacao-de-sites">Conheça o serviço de criação de sites</Link></section>
    <section><h2>Quando vale a pena desenvolver um sistema personalizado?</h2><p>Comece identificando o problema: dados repetidos, retrabalho, informações dispersas ou falta de controle das etapas. Avalie primeiro se uma ferramenta existente atende ao processo e compare custos de assinatura, adaptação e operação.</p><p>Um sistema sob medida pode fazer sentido quando existem regras específicas que as ferramentas disponíveis não atendem. Defina uma primeira versão com as funções essenciais e critérios claros para avaliar se o processo melhorou, como tempo gasto por tarefa e quantidade de erros.</p><Link href="/desenvolvimento-de-sistemas">Saiba mais sobre sistemas web</Link></section>
    <section><h2>O que enviar para solicitar um orçamento?</h2><ul><li>O problema que você quer resolver e quem usará a solução.</li><li>As funcionalidades essenciais e as que podem ficar para depois.</li><li>Ferramentas que precisam ser integradas.</li><li>Referências, materiais disponíveis e prazo desejado.</li></ul></section>
  </ContentPage>
}
