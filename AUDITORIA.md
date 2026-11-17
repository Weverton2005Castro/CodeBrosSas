# Auditoria e melhorias CodeBros

## Problemas identificados

- Destaque inicial genérico, sem atuação em Manaus no heading principal.
- Canvas com animação contínua e comparação entre partículas; conteúdo principal com animações que atrasavam sua exibição.
- Ausência de processo, sobre, FAQ e chamada de encerramento na home.
- Contatos do rodapé e formulário sem links diretos; formulário sem autocomplete e feedback de sucesso anunciado.
- Menu móvel sem estado expandido e itens ocultos ainda acessíveis por teclado.
- Prévia de projetos acionada por div clicável, sem diálogo semântico, Escape ou gerenciamento nativo de foco.
- Catálogo sem campo para diferenciar projetos reais e demonstrativos.
- Fonte carregada por next/font, mas variável não usada no CSS.
- Build configurado para ignorar erros TypeScript; imagens com otimização global desativada.
- Script `lint` aponta para `next lint`, removido na versão instalada do Next. Não há configuração de ESLint no projeto; não foi adicionada uma dependência apenas para isso.

## Implementado

- Hero renderizado no servidor, sem canvas/JavaScript de animação, mantendo preto, roxo e ciano.
- Proposta de valor local, links de orçamento e WhatsApp, processo, sobre e FAQ com details nativo.
- Metadados da home, contato e páginas de serviços com foco natural em Manaus; Open Graph localizado.
- Canonical, sitemap e verificação Google existentes preservados. JSON-LD ProfessionalService com cidade, região e contatos existentes; sem endereço de rua, avaliações ou resultados inventados.
- Área administrativa excluída do robots, mantendo noindex existente e autenticação.
- Menu com aria-expanded, aria-controls, Escape e ocultação de itens inativos; link para pular ao conteúdo público; foco e redução de movimento.
- Prévia de portfólio em dialog nativo; páginas de projeto e demonstrações preservadas. Dimensões de imagens, fallback em erro e carregamento lazy nos cards.
- Campo opcional de natureza do projeto no schema e editor administrativo. Dados legados continuam válidos e aparecem como natureza não informada; nenhuma coleção foi alterada.
- Links reais de contato e endereço local sem rua inventada; autocomplete, prevenção de submissão duplicada e feedback acessível no formulário. Firebase carregado sob demanda ao enviar o contato.
- Fonte aplicada via variável next/font; grades adaptáveis; contraste dos CTAs; checagem TypeScript no build reativada.

## Verificações e limites

- `npx tsc --noEmit`: passou.
- `npm run build`: passou com Next 15.5.29 instalado, incluindo checagem de tipos e geração de páginas.
- `git diff --check`: passou.
- Nenhum envio de formulário, alteração de Firebase, commit, push ou deploy realizado.
- Prévia visual indisponível: host do navegador não acessível nesta sessão. Não foram medidos Lighthouse, LCP, CLS ou INP; mudanças de performance não representam métricas comprovadas.
- Otimização global de imagens permanece desativada para preservar URLs externas arbitrárias cadastradas no Firebase. Evolução recomendada: identificar os hosts reais, definir allowlist e migrar para next/image. Não foi introduzido proxy aberto de imagens.
- Catálogo e sitemap dependem da disponibilidade/permissões do Firestore. A home mantém o fallback existente de leitura pelo cliente; projetos que não vierem no HTML inicial precisam ser verificados no Search Console.
- Não foi executada auditoria online de vulnerabilidades nem atualização ampla de dependências. Sem dependências novas.

## Pendências externas

1. Revisar a apresentação em celular e desktop, foco de teclado, menu, diálogo e envio real do contato em ambiente autorizado.
2. Conferir a natureza de cada projeto no painel: real ou demonstrativo. Completar contexto e resultados apenas com evidências.
3. Seguir `SEO.md` para configurar GOOGLE_SITE_VERIFICATION, verificar propriedade, enviar sitemap e inspecionar URLs. Não há garantia de indexação ou ranking.
4. Após publicação autorizada, medir PageSpeed Insights e dados de campo; verificar previews Open Graph e Rich Results Test.
5. Avaliar Perfil da Empresa no Google com dados comerciais reais e elegibilidade de atendimento; não cadastrar endereço fictício.

## Complemento: responsividade e interatividade

- Grades, títulos, rodapé, formulário e janelas adaptados a telas estreitas; conteúdo com quebra de texto e colunas com largura mínima zero.
- Ajustes também no painel administrativo: cabeçalho e abas flexíveis, ações por toque, mensagens e editor adaptados ao celular.
- Seletor de objetivos nos serviços com recomendação e link de orçamento que preenche o tipo de projeto.
- Filtros por tecnologias/categorias reais do catálogo, com estado selecionado e contagem anunciada.
- Botão de explorar projeto sempre visível, inclusive em dispositivos sem hover.
- Formulário com dicas conforme o serviço e contador de caracteres. Dados pessoais não são enviados na URL do WhatsApp.
- Menu móvel com fechamento por fundo/Escape e limpeza do estado ao voltar para desktop.
- Build com checagem de tipos validado. A validação visual em navegador permanece pendente pela indisponibilidade do host de navegador nesta sessão; os breakpoints não representam testes visuais executados.
