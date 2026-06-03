"use client"

// UI-only mode: SessionProvider is a no-op until auth + DB are configured.
interface SessionProviderProps {
  children: React.ReactNode
}

export function SessionProvider({ children }: SessionProviderProps) {
  return <>{children}</>
}
