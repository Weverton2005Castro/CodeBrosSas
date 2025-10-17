"use client"

import { exportAllData, importAllData, clearAllData } from "@/lib/storage"
import "./DataExport.css"

export default function DataExport() {
  const handleExport = () => {
    const data = exportAllData()
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `codebros-backup-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleImport = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "application/json"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return

      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string)
          importAllData(data)
          alert("Dados importados com sucesso!")
          window.location.reload()
        } catch (error) {
          alert("Erro ao importar dados. Verifique o arquivo.")
        }
      }
      reader.readAsText(file)
    }
    input.click()
  }

  const handleClear = () => {
    if (confirm("Tem certeza que deseja limpar TODOS os dados? Esta ação não pode ser desfeita.")) {
      clearAllData()
      alert("Dados limpos com sucesso!")
      window.location.reload()
    }
  }

  return (
    <div className="data-export-section">
      <h3>Gerenciar Dados</h3>
      <div className="data-export-buttons">
        <button onClick={handleExport} className="export-btn">
          Exportar Dados
        </button>
        <button onClick={handleImport} className="import-btn">
          Importar Dados
        </button>
        <button onClick={handleClear} className="clear-btn">
          Limpar Dados
        </button>
      </div>
    </div>
  )
}
