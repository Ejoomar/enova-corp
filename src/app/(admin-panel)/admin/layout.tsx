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
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "enova2024"
  const cookie = cookieStore.get(ADMIN_COOKIE)
  const isAuthenticated = cookie?.value === ADMIN_PASSWORD

  // Sin sesión: solo renderiza el contenido sin chrome (login page)
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
