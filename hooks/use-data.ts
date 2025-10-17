"use client"

import { useState, useEffect } from "react"
import type { Project, Message } from "@/lib/storage"
import { getProjects, getMessages, initializeDefaultData } from "@/lib/storage"

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    initializeDefaultData()
    setProjects(getProjects())
    setIsLoading(false)
  }, [])

  const refresh = () => {
    setProjects(getProjects())
  }

  return { projects, isLoading, refresh }
}

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setMessages(getMessages())
    setIsLoading(false)
  }, [])

  const refresh = () => {
    setMessages(getMessages())
  }

  return { messages, isLoading, refresh }
}
