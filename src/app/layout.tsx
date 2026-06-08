import type { Metadata } from "next"
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import { SessionProvider } from "@/components/providers/SessionProvider"

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

export const metadata: Metadata = {
  title: "ENOVA CORP ® — Computación | Equipos Fiscales",
  description: "Distribuidor de computación, laptops, equipos fiscales, redes y cámaras en Venezuela. Marcas: Dell, HP, Lenovo, Epson, TP-Link, Hikvision. Garantía 6 meses a 1 año y envíos a todo Venezuela.",
  icons: {
    icon: "/images/logo.jpg",
    shortcut: "/images/logo.jpg",
    apple: "/images/logo.jpg",
  },
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
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
