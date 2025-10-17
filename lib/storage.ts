// Data management utilities for CodeBros system
// Uses localStorage as a simple database

export interface Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  demoUrl?: string
}

export interface Message {
  id: number
  name: string
  email: string
  projectType: string
  message: string
  date: string
}

export interface Service {
  id: number
  title: string
  description: string
  icon: string
}

// Storage keys
const STORAGE_KEYS = {
  PROJECTS: "codebros_projects",
  MESSAGES: "codebros_messages",
  SERVICES: "codebros_services",
  AUTH: "codebros_admin_auth",
}

// Projects Management
export const getProjects = (): Project[] => {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(STORAGE_KEYS.PROJECTS)
  return data ? JSON.parse(data) : []
}

export const saveProjects = (projects: Project[]): void => {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects))
}

export const addProject = (project: Omit<Project, "id">): Project => {
  const projects = getProjects()
  const newProject = {
    ...project,
    id: Date.now(),
  }
  projects.push(newProject)
  saveProjects(projects)
  return newProject
}

export const updateProject = (id: number, updates: Partial<Project>): Project | null => {
  const projects = getProjects()
  const index = projects.findIndex((p) => p.id === id)
  if (index === -1) return null

  projects[index] = { ...projects[index], ...updates }
  saveProjects(projects)
  return projects[index]
}

export const deleteProject = (id: number): boolean => {
  const projects = getProjects()
  const filtered = projects.filter((p) => p.id !== id)
  if (filtered.length === projects.length) return false

  saveProjects(filtered)
  return true
}

// Messages Management
export const getMessages = (): Message[] => {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(STORAGE_KEYS.MESSAGES)
  return data ? JSON.parse(data) : []
}

export const saveMessages = (messages: Message[]): void => {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages))
}

export const addMessage = (message: Omit<Message, "id" | "date">): Message => {
  const messages = getMessages()
  const newMessage = {
    ...message,
    id: Date.now(),
    date: new Date().toISOString(),
  }
  messages.push(newMessage)
  saveMessages(messages)
  return newMessage
}

export const deleteMessage = (id: number): boolean => {
  const messages = getMessages()
  const filtered = messages.filter((m) => m.id !== id)
  if (filtered.length === messages.length) return false

  saveMessages(filtered)
  return true
}

// Services Management
export const getServices = (): Service[] => {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(STORAGE_KEYS.SERVICES)
  return data ? JSON.parse(data) : []
}

export const saveServices = (services: Service[]): void => {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services))
}

// Authentication
export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false
  return localStorage.getItem(STORAGE_KEYS.AUTH) === "true"
}

export const setAuthenticated = (value: boolean): void => {
  if (typeof window === "undefined") return
  if (value) {
    localStorage.setItem(STORAGE_KEYS.AUTH, "true")
  } else {
    localStorage.removeItem(STORAGE_KEYS.AUTH)
  }
}

// Initialize default data
export const initializeDefaultData = (): void => {
  if (typeof window === "undefined") return

  // Initialize projects if empty
  const projects = getProjects()
  if (projects.length === 0) {
    const defaultProjects: Project[] = [
      {
        id: 1,
        title: "E-commerce Moderno",
        description:
          "Plataforma completa de e-commerce com carrinho, pagamentos e painel administrativo. Interface moderna e responsiva.",
        image: "/modern-ecommerce-website.png",
        tags: ["React", "Next.js", "Stripe"],
        demoUrl: "#",
      },
      {
        id: 2,
        title: "Dashboard Analytics",
        description:
          "Sistema de análise de dados com gráficos interativos, relatórios em tempo real e exportação de dados.",
        image: "/analytics-dashboard-dark-theme.png",
        tags: ["TypeScript", "Charts", "API"],
        demoUrl: "#",
      },
      {
        id: 3,
        title: "App de Delivery",
        description:
          "Aplicativo mobile para delivery com rastreamento em tempo real, pagamentos integrados e sistema de avaliações.",
        image: "/food-delivery-app.png",
        tags: ["React Native", "Firebase", "Maps"],
        demoUrl: "#",
      },
    ]
    saveProjects(defaultProjects)
  }

  // Initialize services if empty
  const services = getServices()
  if (services.length === 0) {
    const defaultServices: Service[] = [
      {
        id: 1,
        title: "Sites e Landing Pages",
        description: "Páginas modernas, responsivas e otimizadas para conversão. Design atraente que vende.",
        icon: "🌐",
      },
      {
        id: 2,
        title: "Sistemas Web",
        description: "Plataformas completas e escaláveis. Dashboards, CRMs, ERPs e soluções personalizadas.",
        icon: "💻",
      },
      {
        id: 3,
        title: "Aplicativos Mobile",
        description: "Apps nativos e híbridos para iOS e Android. Experiência mobile de alta qualidade.",
        icon: "📱",
      },
      {
        id: 4,
        title: "Integrações e Automações",
        description: "Conecte seus sistemas, automatize processos e aumente a eficiência do seu negócio.",
        icon: "🔗",
      },
      {
        id: 5,
        title: "Consultoria Técnica",
        description: "Orientação especializada para escolher as melhores tecnologias e arquiteturas.",
        icon: "🎯",
      },
      {
        id: 6,
        title: "Suporte e Manutenção",
        description: "Mantenha seus sistemas sempre atualizados, seguros e funcionando perfeitamente.",
        icon: "🛠️",
      },
    ]
    saveServices(defaultServices)
  }
}

// Export data (for backup)
export const exportAllData = () => {
  return {
    projects: getProjects(),
    messages: getMessages(),
    services: getServices(),
    exportDate: new Date().toISOString(),
  }
}

// Import data (for restore)
export const importAllData = (data: { projects?: Project[]; messages?: Message[]; services?: Service[] }) => {
  if (data.projects) saveProjects(data.projects)
  if (data.messages) saveMessages(data.messages)
  if (data.services) saveServices(data.services)
}

// Clear all data
export const clearAllData = () => {
  if (typeof window === "undefined") return
  localStorage.removeItem(STORAGE_KEYS.PROJECTS)
  localStorage.removeItem(STORAGE_KEYS.MESSAGES)
  localStorage.removeItem(STORAGE_KEYS.SERVICES)
}
