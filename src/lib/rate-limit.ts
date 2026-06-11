import type { NextRequest } from "next/server"

// Rate limiting en memoria por IP. Best-effort en serverless (cada instancia
// cuenta aparte), pero añade fricción real contra abuso de endpoints que
// cuestan dinero por llamada (LLM, almacenamiento) o credenciales (login).

interface RateLimitEntry {
  count: number
  resetAt: number
}

export function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for")
  if (forwarded) return forwarded.split(",")[0].trim()
  return request.headers.get("x-real-ip") ?? "unknown"
}

/**
 * Crea un limitador independiente: `maxRequests` por `windowMs` por clave (IP).
 * Uso: const limiter = createRateLimiter(10, 60 * 60 * 1000)
 *      if (limiter.isLimited(ip)) return 429; limiter.register(ip)
 */
export function createRateLimiter(maxRequests: number, windowMs: number) {
  const entries = new Map<string, RateLimitEntry>()

  return {
    isLimited(key: string): boolean {
      const entry = entries.get(key)
      if (!entry || Date.now() > entry.resetAt) return false
      return entry.count >= maxRequests
    },

    register(key: string): void {
      const now = Date.now()
      const entry = entries.get(key)
      if (!entry || now > entry.resetAt) {
        entries.set(key, { count: 1, resetAt: now + windowMs })
      } else {
        entry.count += 1
      }
    },
  }
}
