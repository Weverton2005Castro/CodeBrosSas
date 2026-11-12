"use client"

import { useEffect, useState } from "react"
import { watchMessages, watchProjects, watchServices, type Project, type Service } from "@/lib/storage"

function useRecords<T>(
  watch: (receive: (records: T[]) => void, fail: (error: Error) => void) => () => void,
  initialRecords?: T[],
  enabled = true,
) {
  const [records, setRecords] = useState<T[]>(initialRecords ?? [])
  const [isLoading, setIsLoading] = useState(initialRecords === undefined)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!enabled) return

    return watch((items) => {
      setRecords(items)
      setError(null)
      setIsLoading(false)
    }, (error) => {
      setError(error)
      setIsLoading(false)
    })
  }, [watch, enabled])

  return { records, isLoading, error }
}

export const useProjects = (initialRecords?: Project[], enabled?: boolean) =>
  useRecords(watchProjects, initialRecords, enabled)

export const useServices = (initialRecords?: Service[], enabled?: boolean) =>
  useRecords(watchServices, initialRecords, enabled)

export const useMessages = () => useRecords(watchMessages)
