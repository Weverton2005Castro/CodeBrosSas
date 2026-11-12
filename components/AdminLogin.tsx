"use client"
import { useState, type FormEvent } from "react"
import { sendEmailVerification, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { FirebaseError } from "firebase/app"
import { auth } from "@/FirebaseConfig"
import { isAdminEmail } from "@/lib/admin-auth"
import "./AdminLogin.css"


export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const { user } = await signInWithEmailAndPassword(auth, email.trim(), password)

      if (!isAdminEmail(user.email)) {
        await signOut(auth)
        setError("Esta conta não tem acesso administrativo.")
      } else if (!user.emailVerified) {
        try {
          await sendEmailVerification(user)
          setError("Enviamos um link de verificação. Confirme o e-mail e entre novamente.")
        } finally {
          await signOut(auth)
        }
      }
    } catch (error) {
      setError(error instanceof FirebaseError && error.code === "auth/invalid-credential"
        ? "Email ou senha incorretos."
        : "Não foi possível concluir o login. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
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
              placeholder="Seu e-mail administrativo"
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

        </form>
      </div>
    </div>
  )
}
