"use client"

import { useBannerStore } from "@/stores/banner-store"
import { BannerForm } from "@/components/admin/BannerForm"

interface Props {
  id: string
}

export function BannerEditClient({ id }: Props) {
  const slide = useBannerStore((s) => s.slides.find((sl) => sl.id === id))

  if (!slide) {
    return (
      <div className="rounded-xl border border-dashed p-12 text-center text-muted-foreground">
        Banner no encontrado.
      </div>
    )
  }

  return <BannerForm slide={slide} />
}
