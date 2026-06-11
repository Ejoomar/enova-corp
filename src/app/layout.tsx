import type { Metadata, Viewport } from "next"
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import { SITE_URL } from "@/config/empresa"

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500"],
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0057b7",
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "ENOVA CORP ® — Computación | Equipos Fiscales",
  description: "Distribuidor de computación, laptops, equipos fiscales, redes y cámaras en Venezuela. Marcas: Dell, HP, Lenovo, Epson, TP-Link, Hikvision. Garantía 6 meses a 1 año y envíos a todo Venezuela.",
  openGraph: {
    siteName: "ENOVA CORP",
    locale: "es_VE",
    type: "website",
  },
  // Favicons: src/app/icon.png y apple-icon.png; OG: src/app/opengraph-image.png
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Preload first hero slide so the browser fetches it before React hydrates */}
        <link rel="preload" href="/images/hero/bg-1.svg" as="image" type="image/svg+xml" />
      </head>
      <body className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          {children}
          <Toaster richColors position="bottom-center" closeButton />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
