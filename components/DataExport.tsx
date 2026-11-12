"use client"

import { useEffect, useState } from "react"
import { clearAllData, exportAllData, importAllData } from "@/lib/storage"
import "./DataExport.css"

const legacyKeys = {
  projects: "codebros_projects",
  services: "codebros_services",
  messages: "codebros_messages",
} as const

function downloadBackup(data: unknown, name: string) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `${name}-${new Date().toISOString().slice(0, 10)}.json`
  link.click()
  URL.revokeObjectURL(url)
}

export default function DataExport() {
  const [busy, setBusy] = useState(false)
  const [hasLegacyData, setHasLegacyData] = useState(false)

  useEffect(() => {
    try {
      setHasLegacyData(Object.values(legacyKeys).some((key) => localStorage.getItem(key) !== null))
    } catch {
      setHasLegacyData(false)
    }
  }, [])

  async function run(action: () => Promise<void>, failure: string) {
    setBusy(true)
    try {
      await action()
    } catch (error) {
      alert(error instanceof Error && error.message.startsWith("Esta operação excede")
        ? error.message
        : failure)
    } finally {
      setBusy(false)
    }
  }

  function handleImport() {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".json,application/json"
    input.onchange = () => {
      const file = input.files?.[0]
      if (!file || !confirm("Substituir no Firestore as coleções presentes neste backup?")) return

      void run(async () => {
        await importAllData(JSON.parse(await file.text()))
        alert("Dados importados com sucesso.")
      }, "Não foi possível importar os dados. Verifique o arquivo e as permissões.")
    }
    input.click()
  }

  function handleClear() {
    if (!confirm("Excluir todos os projetos, serviços e mensagens do Firestore? Esta ação não pode ser desfeita.")) return

    void run(async () => {
      await clearAllData()
      alert("Dados limpos com sucesso.")
    }, "Não foi possível limpar os dados do Firestore.")
  }

  function handleLegacyExport() {
    void run(async () => {
      const entries = Object.entries(legacyKeys).flatMap(([collection, key]) => {
        const stored = localStorage.getItem(key)
        return stored === null ? [] : [[collection, JSON.parse(stored)]]
      })
      downloadBackup(Object.fromEntries(entries), "codebros-backup-local")
    }, "Não foi possível exportar os dados deste navegador.")
  }

  return (
    <div className="data-export-section">
      <h3>Gerenciar Dados</h3>
      <div className="data-export-buttons">
        <button disabled={busy} onClick={() => run(async () => {
          downloadBackup(await exportAllData(), "codebros-backup")
        }, "Não foi possível exportar os dados do Firestore.")} className="export-btn">
          Exportar Dados
        </button>
        <button disabled={busy} onClick={handleImport} className="import-btn">
          Importar Dados
        </button>
        <button disabled={busy} onClick={handleClear} className="clear-btn">
          Limpar Dados
        </button>
        {hasLegacyData && (
          <button disabled={busy} onClick={handleLegacyExport} className="export-btn">
            Baixar backup deste navegador
          </button>
        )}
      </div>
    </div>
  )
}
