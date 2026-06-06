import Image from "next/image"

export function TrustBanner() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-10 lg:px-10">
      <div className="overflow-hidden rounded-xl">
        <Image
          src="/images/trust-banner.png"
          alt="ENOVA CORP — Despacho Nacional · Cotización Rápida · Garantía Oficial"
          width={1702}
          height={630}
          className="w-full object-cover"
          priority={false}
        />
      </div>
    </section>
  )
}
