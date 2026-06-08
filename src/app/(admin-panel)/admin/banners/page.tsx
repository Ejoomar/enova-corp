import { BannerManagerClient } from "@/components/admin/BannerManagerClient"

export const metadata = {
  title: "Gestión de Banners — Admin ENOVA CORP",
}

export default function AdminBannersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Banners del Home</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Gestiona los slides del banner principal. Los cambios se reflejan de inmediato en la tienda.
        </p>
      </div>
      <BannerManagerClient />
    </div>
  )
}
