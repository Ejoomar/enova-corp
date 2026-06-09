import { cookies } from "next/headers"
import { AdminSidebar } from "@/components/admin/AdminSidebar"
import { AdminHeader } from "@/components/admin/AdminHeader"

const ADMIN_COOKIE = "enova_admin_session"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const session = cookieStore.get(ADMIN_COOKIE)
  const expected = process.env.ADMIN_SESSION_TOKEN ?? "enova_admin_default"
  const isAuthenticated = session?.value === expected

  // Sin sesión: solo renderiza el contenido (login page sin chrome)
  if (!isAuthenticated) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <AdminSidebar />
      <div className="lg:pl-64">
        <AdminHeader />
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
