# Publicação e acompanhamento de SEO

1. A origem oficial já está configurada como `https://wcodebros.vercel.app` em `lib/seo.ts`. Publique as alterações na Vercel. Se o domínio mudar, configure `NEXT_PUBLIC_SITE_URL` na hospedagem e publique novamente.
2. No Google Search Console, adicione uma propriedade de **prefixo de URL** com `https://wcodebros.vercel.app/`. Para verificar por meta tag HTML, coloque apenas o valor de `content` em `GOOGLE_SITE_VERIFICATION` na Vercel e publique novamente. Depois conclua a verificação no Search Console.
3. Abra `/robots.txt` e `/sitemap.xml` no domínio oficial. O sitemap inclui páginas de serviço, contato, guias e projetos cadastrados no Firestore. O Firestore precisa estar disponível; erros geram falha temporária para permitir nova tentativa pelo robô.
4. Envie `sitemap.xml` no Search Console. Inspecione a página inicial, um serviço e um projeto. Confira a URL canônica e solicite indexação.
5. Acompanhe indexação, impressões, cliques e termos de busca no Search Console. A configuração não garante indexação nem posição.
6. Enriqueça as descrições dos projetos no painel com contexto real: problema, solução e resultados verificáveis. Não publique resultados ou depoimentos inventados.
7. Verifique as páginas no celular e rode PageSpeed Insights no domínio publicado. Compare as métricas antes de decidir novas otimizações.

A área administrativa recebe `noindex`; isso não substitui autenticação. As páginas de projetos usam IDs permanentes, preservando URLs quando o título é alterado. Falhas de leitura não são tratadas como projeto inexistente; IDs ausentes retornam 404 após consulta bem-sucedida.

Referências: https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=pt-br e https://nextjs.org/docs/app/api-reference/functions/generate-metadata

## SEO local

A home e os serviços destacam Manaus, AM. O JSON-LD usa apenas cidade, estado, país e os contatos existentes. Valide-o no Rich Results Test; dados estruturados não garantem exibição especial. Revise a natureza dos projetos no painel antes de identificá-los como reais ou demonstrativos. Consulte `AUDITORIA.md` para alterações, limites de validação e próximos passos.
