// Sesión de admin basada en token firmado (HMAC-SHA256) en lugar de guardar la
// contraseña en texto plano en la cookie. Usa Web Crypto (crypto.subtle), disponible
// tanto en Edge (middleware) como en Node (route handlers / server components).

export const ADMIN_COOKIE = "enova_admin_session"

const DEFAULT_TTL_SECONDS = 60 * 60 * 24 * 7 // 7 días
const encoder = new TextEncoder()

function getSecret(): string | null {
  return process.env.ADMIN_PASSWORD ?? null
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = ""
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

function base64UrlToString(value: string): string {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/")
  return atob(base64)
}

async function sign(data: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  )
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(data))
  return bytesToBase64Url(new Uint8Array(signature))
}

// Comparación de tiempo constante para evitar fugas por timing al verificar la firma.
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

/** Crea un token firmado `<payload>.<firma>`. Devuelve null si no hay secreto configurado. */
export async function createSessionToken(ttlSeconds = DEFAULT_TTL_SECONDS): Promise<string | null> {
  const secret = getSecret()
  if (!secret) return null
  const payload = bytesToBase64Url(
    encoder.encode(JSON.stringify({ exp: Date.now() + ttlSeconds * 1000 }))
  )
  const signature = await sign(payload, secret)
  return `${payload}.${signature}`
}

/** Valida la firma y la expiración del token. Devuelve false ante cualquier anomalía. */
export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false
  const secret = getSecret()
  if (!secret) return false

  const parts = token.split(".")
  if (parts.length !== 2) return false
  const [payload, signature] = parts

  const expected = await sign(payload, secret)
  if (!timingSafeEqual(signature, expected)) return false

  try {
    const decoded = JSON.parse(base64UrlToString(payload)) as { exp?: number }
    return typeof decoded.exp === "number" && decoded.exp > Date.now()
  } catch {
    return false
  }
}
