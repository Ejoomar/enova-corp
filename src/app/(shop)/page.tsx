
import { HeroBanner } from "@/components/home/HeroBanner"
import { CategoryGrid } from "@/components/home/CategoryGrid"
import { PromoBanners } from "@/components/home/PromoBanners"
import { FeaturedProducts } from "@/components/home/FeaturedProducts"
import { BrandSection } from "@/components/home/BrandSection"

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <CategoryGrid />
      <PromoBanners />
      <FeaturedProducts />
      <BrandSection />
    </>
  )
}
