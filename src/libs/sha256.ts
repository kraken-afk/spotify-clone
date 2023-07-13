export default async function sha256(plain: string) {
  const encoder = new TextEncoder()
  const data = encoder.encode(plain)

  return window.crypto.subtle.digest('SHA-256', data)
}
