import { auth } from "@/auth"
import { AdminSidebar } from "@/components/admin/AdminSidebar"
import { AdminHeader } from "@/components/admin/AdminHeader"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  // Login page: render without sidebar/header (middleware handles auth redirect)
  if (!session) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <AdminSidebar />
      <div className="lg:pl-64">
        <AdminHeader user={session.user} />
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
