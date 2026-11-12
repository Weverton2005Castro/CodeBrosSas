import { z } from "zod"

const webUrl = z.string().regex(/^https?:\/\/[^\s]+$/i)
const projectImage = z.union([webUrl, z.string().regex(/^\/(?![\\/])[^\s]*$/), z.literal("")])
const projectDemoUrl = z.union([webUrl, z.literal(""), z.literal("#")]).optional()
export const projectFields = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
  image: projectImage,
  tags: z.array(z.string()),
  demoUrl: projectDemoUrl,
})
export const storedProjectFields = projectFields.extend({
  image: z.string().trim().pipe(projectImage).catch(""),
  demoUrl: z.string().trim().optional().pipe(projectDemoUrl).catch(""),
})
export const serviceFields = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
  icon: z.string().trim().min(1),
})

export type ProjectInput = z.infer<typeof projectFields>
export type ServiceInput = z.infer<typeof serviceFields>
export type Project = ProjectInput & { id: string }
export type Service = ServiceInput & { id: string }
