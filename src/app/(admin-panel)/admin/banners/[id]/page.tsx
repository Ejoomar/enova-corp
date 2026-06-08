import { BannerEditClient } from "@/components/admin/BannerEditClient"

export const metadata = {
  title: "Editar Banner — Admin ENOVA CORP",
}

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditBannerPage({ params }: Props) {
  const { id } = await params
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Editar Banner</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Modifica el contenido e imagen de este slide.
        </p>
      </div>
      <BannerEditClient id={id} />
    </div>
  )
}
