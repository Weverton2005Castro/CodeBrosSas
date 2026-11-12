const adminEmails = ["admin@codebros.dev", "codebroscontato@gmail.com"]

export function isAdminEmail(email: string | null | undefined) {
  return typeof email === "string" && adminEmails.includes(email)
}
