import type { MetadataRoute } from "next"
import { SITE_URL } from "@/config/empresa"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api", "/checkout", "/cart", "/cotizacion"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
