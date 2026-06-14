
import { HeroBanner } from "@/components/home/HeroBanner"
import { CategoryGrid } from "@/components/home/CategoryGrid"
import { PromoBanners } from "@/components/home/PromoBanners"
import { ComoComprar } from "@/components/home/ComoComprar"
import { FeaturedProducts } from "@/components/home/FeaturedProducts"
import { Testimonios } from "@/components/home/Testimonios"
import { BrandSection } from "@/components/home/BrandSection"
import { TrustBanner } from "@/components/home/TrustBanner"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { EMPRESA, SITE_URL } from "@/config/empresa"

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: EMPRESA.nombre,
  description:
    "Distribuidor de computación, laptops, equipos fiscales, redes y cámaras en Venezuela. Garantía oficial y envíos a todo el país.",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  image: `${SITE_URL}/images/logo.png`,
  telephone: `+${EMPRESA.whatsapp}`,
  email: EMPRESA.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Andrés Bello, C.C. Alto Chama, Local 105-A",
    addressLocality: "Mérida",
    addressRegion: "Mérida",
    addressCountry: "VE",
  },
  sameAs: [EMPRESA.instagramUrl],
  priceRange: "$$",
  currenciesAccepted: "USD, VES",
  paymentAccepted: "Pago Móvil, Efectivo USD, Cashea",
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      {/* h1 de la página (sr-only): los títulos del hero son h2 por ser un carrusel
          de N slides — un h1 visible rotando duplicaría h1 o cambiaría de texto. */}
      <h1 className="sr-only">
        ENOVA CORP — Computación, equipos fiscales, redes e impresoras en Venezuela
      </h1>
      {/* El hero entra inmediato (above the fold); el resto se revela al scroll */}
      <HeroBanner />
      <ScrollReveal>
        <CategoryGrid />
      </ScrollReveal>
      <ScrollReveal>
        <PromoBanners />
      </ScrollReveal>
      {/* ComoComprar y Testimonios revelan sus items internamente */}
      <ComoComprar />
      <ScrollReveal>
        <FeaturedProducts />
      </ScrollReveal>
      <TrustBanner />
      <Testimonios />
      <ScrollReveal>
        <BrandSection />
      </ScrollReveal>
    </>
  )
}
