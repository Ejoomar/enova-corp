
import { HeroBanner } from "@/components/home/HeroBanner"
import { CategoryGrid } from "@/components/home/CategoryGrid"
import { PromoBanners } from "@/components/home/PromoBanners"
import { FeaturedProducts } from "@/components/home/FeaturedProducts"
import { BrandSection } from "@/components/home/BrandSection"
import { TrustBanner } from "@/components/home/TrustBanner"
import { ScrollReveal } from "@/components/ui/ScrollReveal"

export default function HomePage() {
  return (
    <>
      {/* El hero entra inmediato (above the fold); el resto se revela al scroll */}
      <HeroBanner />
      <ScrollReveal>
        <CategoryGrid />
      </ScrollReveal>
      <ScrollReveal>
        <PromoBanners />
      </ScrollReveal>
      <ScrollReveal>
        <FeaturedProducts />
      </ScrollReveal>
      <TrustBanner />
      <ScrollReveal>
        <BrandSection />
      </ScrollReveal>
    </>
  )
}
