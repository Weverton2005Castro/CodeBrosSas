import ContentPage from "@/components/ContentPage"
import { servicePages } from "@/lib/service-pages"
import { pageMetadata } from "@/lib/seo"
const service = servicePages.find((item) => item.slug === "desenvolvimento-de-sistemas")!
export const metadata = pageMetadata(service.title, service.description, "/desenvolvimento-de-sistemas")
export default function ServicePage() {
  return <ContentPage title={service.title} description={service.description}><section><h2>Para quem é este serviço?</h2><p>{service.audience}</p></section><section><h2>O que podemos desenvolver</h2><ul>{service.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></section><section><h2>Como preparar seu projeto</h2><p>{service.planning}</p></section><section><h2>Prazo e investimento</h2><p>O orçamento depende das funcionalidades, integrações, materiais disponíveis e etapas de entrega. Após entender sua necessidade, definimos a proposta e o cronograma.</p></section></ContentPage>
}
