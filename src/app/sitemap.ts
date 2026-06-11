import type { MetadataRoute } from "next"
import { products, categories } from "@/data/mock-products"
import { SITE_URL } from "@/config/empresa"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL,                 lastModified: now, changeFrequency: "daily",   priority: 1 },
    { url: `${SITE_URL}/products`,   lastModified: now, changeFrequency: "daily",   priority: 0.9 },
    { url: `${SITE_URL}/catalogo`,   lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${SITE_URL}/about`,      lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/b2b`,        lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/contact`,    lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/faq`,        lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/help`,       lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/shipping`,   lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/warranty`,   lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/terms`,      lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${SITE_URL}/privacy`,    lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
  ]

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${SITE_URL}/products?category=${cat.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }))

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}/products/${product.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }))

  return [...staticRoutes, ...categoryRoutes, ...productRoutes]
}
