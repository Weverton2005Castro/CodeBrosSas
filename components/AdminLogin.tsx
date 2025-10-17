"use client"

import { useState, type FormEvent } from "react"
import "./AdminLogin.css"

interface AdminLoginProps {
  onLogin: () => void
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simple authentication (in production, use proper backend auth)
    setTimeout(() => {
      if (email === "admin@codebros.dev" && password === "codebros2024") {
        localStorage.setItem("codebros_admin_auth", "true")
        onLogin()
      } else {
        setError("Email ou senha incorretos")
        setIsLoading(false)
      }
    }, 1000)
  }

  return (
    <div className="admin-login-page">
      <div className="login-container">
        <div className="login-header">
          <h1 className="login-logo">
            <span>Code</span>
            <span className="accent">Bros</span>
          </h1>
          <p className="login-subtitle">Painel Administrativo</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@codebros.dev"
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Entrando...
              </>
            ) : (
              "Entrar"
            )}
          </button>

          <div className="login-hint">
            <p>Credenciais padrão:</p>
            <p>
              <strong>Email:</strong> admin@codebros.dev
            </p>
            <p>
              <strong>Senha:</strong> codebros2024
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
