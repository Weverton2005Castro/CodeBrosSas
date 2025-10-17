"use client"

import { useState, useEffect } from "react"
import AdminLogin from "@/components/AdminLogin"
import AdminDashboard from "@/components/AdminDashboard"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const auth = localStorage.getItem("codebros_admin_auth")
    if (auth === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem("codebros_admin_auth")
    setIsAuthenticated(false)
  }

  return <>{isAuthenticated ? <AdminDashboard onLogout={handleLogout} /> : <AdminLogin onLogin={handleLogin} />}</>
}
