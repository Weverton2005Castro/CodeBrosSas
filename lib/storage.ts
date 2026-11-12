import {
  addDoc, collection, deleteDoc, doc, getDocsFromServer, onSnapshot,
  serverTimestamp, Timestamp, updateDoc, writeBatch,
  type DocumentData, type QueryDocumentSnapshot,
} from "firebase/firestore"
import { z } from "zod"
import { db } from "@/FirebaseConfig"

import {
  projectFields, serviceFields, storedProjectFields,
  type Project, type ProjectInput, type Service, type ServiceInput,
} from "./catalog"

const messageFields = z.object({
  name: z.string().trim().min(1).max(150),
  email: z.string().trim().email().max(254),
  projectType: z.string().min(1).max(100),
  message: z.string().trim().min(1).max(5000),
})
const backupId = z.union([z.string(), z.number().int().positive().transform(String)])
  .pipe(z.string().min(1).max(1500).refine((id) => !id.includes("/") && !/^(__.*__|\.{1,2})$/.test(id)))
const dateField = z.string().datetime({ offset: true }).optional()
const backupSchema = z.object({
  projects: z.array(projectFields.extend({ id: backupId })).optional(),
  services: z.array(serviceFields.extend({ id: backupId })).optional(),
  messages: z.array(messageFields.extend({ id: backupId, date: dateField })).optional(),
}).refine((data) => data.projects || data.services || data.messages, "Nenhuma coleção no backup.")

export type { Project, ProjectInput, Service, ServiceInput } from "./catalog"

export type MessageInput = z.infer<typeof messageFields>
export type Message = MessageInput & { id: string; date?: string }

const projects = collection(db, "projects")
const services = collection(db, "services")
const messages = collection(db, "contact_messages")

function readProject(snapshot: QueryDocumentSnapshot): Project {
  return { ...storedProjectFields.parse(snapshot.data()), id: snapshot.id }
}

function readService(snapshot: QueryDocumentSnapshot): Service {
  return { ...serviceFields.parse(snapshot.data()), id: snapshot.id }
}

function readMessage(snapshot: QueryDocumentSnapshot): Message {
  const data = snapshot.data()
  const date = data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : dateField.safeParse(data.date)
  return {
    ...messageFields.parse(data),
    id: snapshot.id,
    date: typeof date === "string" ? date : date.success ? date.data : undefined,
  }
}

function subscribe<T>(
  source: typeof projects,
  read: (snapshot: QueryDocumentSnapshot) => T,
  receive: (records: T[]) => void,
  fail: (error: Error) => void,
) {
  function reportError(error: Error) {
    // Validation errors and Firebase errors carry different diagnostics.
    const detail = error instanceof z.ZodError
      ? error.issues.map(({ path, code }) => ({ path, code }))
      : "code" in error ? error.code : error.name
    console.warn(`[Firestore] Falha ao carregar ${source.path}.`, detail)
    fail(error)
  }

  return onSnapshot(source, { includeMetadataChanges: true }, (snapshot) => {
    if (snapshot.empty && snapshot.metadata.fromCache) return
    try {
      receive(snapshot.docs.map(read))
    } catch (error) {
      reportError(error instanceof Error ? error : new Error("Dados inválidos no Firestore."))
    }
  }, reportError)
}

export const watchProjects = (receive: (records: Project[]) => void, fail: (error: Error) => void) =>
  subscribe(projects, readProject, receive, fail)
export const watchServices = (receive: (records: Service[]) => void, fail: (error: Error) => void) =>
  subscribe(services, readService, receive, fail)
export const watchMessages = (receive: (records: Message[]) => void, fail: (error: Error) => void) =>
  subscribe(messages, readMessage, (records) => {
    receive(records.sort((a, b) => (b.date ?? "").localeCompare(a.date ?? "")))
  }, fail)

export async function saveProject(id: string | undefined, values: ProjectInput) {
  const { demoUrl = "", ...fields } = projectFields.parse(values)
  const project = { ...fields, demoUrl: demoUrl === "#" ? "" : demoUrl, tags: fields.tags.filter(Boolean) }
  if (id) await updateDoc(doc(projects, id), project)
  else await addDoc(projects, project)
}

export async function saveService(id: string | undefined, values: ServiceInput) {
  const service = serviceFields.parse(values)
  if (id) await updateDoc(doc(services, id), service)
  else await addDoc(services, service)
}

export const deleteProject = (id: string) => deleteDoc(doc(projects, id))
export const deleteService = (id: string) => deleteDoc(doc(services, id))
export const deleteMessage = (id: string) => deleteDoc(doc(messages, id))
export const addMessage = (values: MessageInput) =>
  addDoc(messages, { ...messageFields.parse(values), createdAt: serverTimestamp() })

export async function exportAllData() {
  const [projectDocs, serviceDocs, messageDocs] = await Promise.all([
    getDocsFromServer(projects), getDocsFromServer(services), getDocsFromServer(messages),
  ])
  return {
    projects: projectDocs.docs.map(readProject),
    services: serviceDocs.docs.map(readService),
    messages: messageDocs.docs.map(readMessage),
    exportDate: new Date().toISOString(),
  }
}

async function replaceCollection(
  batch: ReturnType<typeof writeBatch>,
  source: typeof projects,
  records: Array<{ id: string } & DocumentData>,
) {
  const incoming = new Map(records.map(({ id, ...fields }) => [id, fields]))
  if (incoming.size !== records.length) throw new Error("O backup contém IDs duplicados.")

  const existing = await getDocsFromServer(source)
  const removed = existing.docs.filter((snapshot) => !incoming.has(snapshot.id))
  for (const snapshot of removed) batch.delete(snapshot.ref)
  for (const [id, fields] of incoming) batch.set(doc(source, id), fields)
  return removed.length + incoming.size
}

export async function importAllData(input: unknown) {
  const data = backupSchema.parse(input)
  const batch = writeBatch(db)
  const counts = await Promise.all([
    data.projects && replaceCollection(batch, projects, data.projects),
    data.services && replaceCollection(batch, services, data.services),
    data.messages && replaceCollection(batch, messages, data.messages.map(({ date, ...fields }) => ({
      ...fields,
      ...(date ? { createdAt: Timestamp.fromDate(new Date(date)) } : {}),
    }))),
  ])
  const operations = counts.reduce<number>((sum, count) => sum + (count ?? 0), 0)
  if (operations > 500) throw new Error("Esta operação excede o limite de 500 alterações por lote.")
  if (operations) await batch.commit()
}

export const clearAllData = () => importAllData({ projects: [], services: [], messages: [] })
