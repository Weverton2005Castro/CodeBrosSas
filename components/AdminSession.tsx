"use client"

import { useEffect, useState } from "react"
import { onIdTokenChanged, signOut, type User } from "firebase/auth"
import { auth } from "@/FirebaseConfig"
import { useProjects, useServices } from "@/hooks/use-data"
import type { Project, Service } from "@/lib/catalog"
import { isAdminEmail } from "@/lib/admin-auth"
import AdminLogin from "@/components/AdminLogin"
import AdminDashboard from "@/components/AdminDashboard"

interface AdminSessionProps {
  initialProjects?: Project[]
  initialServices?: Service[]
}

export default function AdminSession({ initialProjects, initialServices }: AdminSessionProps) {
  const [user, setUser] = useState<User | null | undefined>(undefined)
  const [error, setError] = useState("")

  useEffect(() => onIdTokenChanged(auth, setUser), [])

  const isAdmin = user?.emailVerified && isAdminEmail(user.email)
  const loadCatalog = user === undefined || Boolean(isAdmin)
  const projectData = useProjects(initialProjects, loadCatalog)
  const serviceData = useServices(initialServices, loadCatalog)

  async function handleLogout() {
    try {
      await signOut(auth)
      setError("")
    } catch {
      setError("Não foi possível encerrar a sessão. Tente novamente.")
    }
  }

  if (user === undefined) return <p role="status">Verificando sessão…</p>
  if (isAdmin) {
    return (
      <AdminDashboard
        onLogout={handleLogout}
        sessionError={error}
        projectData={projectData}
        serviceData={serviceData}
      />
    )
  }
  return <AdminLogin />
}
