import { cookies } from "next/headers"
import { AdminSidebar } from "@/components/admin/AdminSidebar"
import { AdminHeader } from "@/components/admin/AdminHeader"
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/admin-session"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_COOKIE)?.value
  const isAuthenticated = await verifySessionToken(token)

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
