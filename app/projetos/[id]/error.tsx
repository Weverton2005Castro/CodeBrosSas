"use client"
export default function ProjectError({ reset }: { reset: () => void }) {
  return <main className="content-page container"><h1>Não foi possível carregar o projeto</h1><p>Tente novamente em instantes.</p><button onClick={reset}>Tentar novamente</button></main>
}
