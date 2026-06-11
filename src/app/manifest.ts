import type { MetadataRoute } from "next"

// Manifest PWA — mejora el "Añadir a pantalla de inicio" en Android con los
// colores e identidad de la marca. No hay service worker (offline) a propósito.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ENOVA CORP — Computación y Equipos Fiscales",
    short_name: "ENOVA CORP",
    description:
      "Distribuidor de computación, laptops, equipos fiscales, redes y cámaras en Venezuela.",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f4f0",
    theme_color: "#0057b7",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  }
}
