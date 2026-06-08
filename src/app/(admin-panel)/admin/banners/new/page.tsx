import { BannerForm } from "@/components/admin/BannerForm"

export const metadata = {
  title: "Nuevo Banner — Admin ENOVA CORP",
}

export default function NewBannerPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Nuevo Banner</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Crea un nuevo slide para el banner principal del home.
        </p>
      </div>
      <BannerForm />
    </div>
  )
}
