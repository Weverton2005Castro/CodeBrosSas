import { getFirestore, collection, getDocs } from "firebase/firestore/lite"
import { unstable_cache } from "next/cache"
import { app } from "@/FirebaseConfig"
import { serviceFields, storedProjectFields } from "./catalog"

const db = getFirestore(app)

async function readCatalog<T>(name: "projects" | "services", parse: (value: unknown) => T) {
  const snapshot = await getDocs(collection(db, name))
  return snapshot.docs.map((record) => ({ ...parse(record.data()), id: record.id }))
}

export const readPublicProjects = unstable_cache(
  () => readCatalog("projects", (data) => storedProjectFields.parse(data)),
  ["public-projects"],
  { revalidate: 60 },
)

export const readPublicServices = unstable_cache(
  () => readCatalog("services", (data) => serviceFields.parse(data)),
  ["public-services"],
  { revalidate: 60 },
)

export async function loadInitialCatalog<T>(load: () => Promise<T>): Promise<T | undefined> {
  let cancelTimeout = () => {}
  const timeout = new Promise<undefined>((resolve) => {
    const timer = setTimeout(resolve, 3000)
    cancelTimeout = () => clearTimeout(timer)
  })
  try {
    return await Promise.race([load(), timeout])
  } catch {
    // The live listener still loads the catalog if the server read fails.
    return undefined
  } finally {
    cancelTimeout()
  }
}
