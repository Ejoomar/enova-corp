// Recorre el panel admin con Chromium headless y guarda capturas reales en
// docs/capturas/ para el manual del cliente (docs/MANUAL-ADMIN.md).
//
// Requisitos: server de produccion corriendo en localhost:3000 con ADMIN_PASSWORD
// configurada (el script la lee del .env — nunca va hardcodeada aqui).
//
// Uso: npm run capturas

import { chromium } from "playwright"
import { readFileSync, mkdirSync } from "node:fs"
import { resolve } from "node:path"

const BASE = "http://localhost:3000"
const OUT = resolve("docs/capturas")

function leerPasswordDelEnv() {
  const env = readFileSync(resolve(".env"), "utf8")
  const linea = env.split("\n").find((l) => l.startsWith("ADMIN_PASSWORD="))
  if (!linea) throw new Error("ADMIN_PASSWORD no encontrada en .env")
  return linea.split("=")[1].trim()
}

const PAGINAS = [
  { archivo: "02-dashboard.png",     ruta: "/admin",              espera: 1800 }, // count-up de stats
  { archivo: "03-productos.png",     ruta: "/admin/products",     espera: 1200 },
  { archivo: "04-producto-nuevo.png", ruta: "/admin/products/new", espera: 1000 },
  { archivo: "05-pedidos.png",       ruta: "/admin/orders",       espera: 1200 },
  { archivo: "06-pedido-detalle.png", ruta: "/admin/orders/ORD-2025-001", espera: 1200 },
  { archivo: "07-pagos.png",         ruta: "/admin/payments",     espera: 1200 },
  { archivo: "08-banners.png",       ruta: "/admin/banners",      espera: 1200 },
  { archivo: "09-configuracion.png", ruta: "/admin/settings",     espera: 1200 },
]

async function main() {
  mkdirSync(OUT, { recursive: true })
  const password = leerPasswordDelEnv()

  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })

  // 1. Login (captura de la pantalla limpia ANTES de ingresar)
  await page.goto(`${BASE}/admin/login`, { waitUntil: "networkidle" })
  await page.screenshot({ path: `${OUT}/01-login.png` })

  await page.fill("#password", password)
  await page.click('form button[type="submit"]')
  await page.waitForURL(`${BASE}/admin`, { timeout: 15000 })

  // 2. Recorrido por cada seccion
  for (const { archivo, ruta, espera } of PAGINAS) {
    await page.goto(`${BASE}${ruta}`, { waitUntil: "networkidle" })
    await page.waitForTimeout(espera) // hidratacion de stores + animaciones
    await page.screenshot({ path: `${OUT}/${archivo}` })
    console.log(`✓ ${archivo}`)
  }

  await browser.close()
  console.log(`\nListo: ${PAGINAS.length + 1} capturas en docs/capturas/`)
}

main().catch((err) => {
  console.error("Error generando capturas:", err.message)
  process.exit(1)
})
