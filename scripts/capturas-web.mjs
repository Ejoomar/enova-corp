// Recorre la TIENDA (storefront) con Chromium headless y guarda capturas reales
// en docs/capturas-web/ para el manual del vendedor (docs/MANUAL-WEB.md).
// Incluye interacciones reales: agregar al carrito, abrir búsqueda por imagen, etc.
//
// Requisito: server de producción corriendo en localhost:3000.
// Uso: npm run capturas:web

import { chromium } from "playwright"
import { mkdirSync } from "node:fs"
import { resolve } from "node:path"

const BASE = "http://localhost:3000"
const OUT = resolve("docs/capturas-web")
const PRODUCTO = "/products/balanza-aclas-ls2-m3"

async function main() {
  mkdirSync(OUT, { recursive: true })
  const browser = await chromium.launch()

  // ── Recorrido desktop (1280x800) ──────────────────────────────────────────
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })

  // 01 — Home: hero + topbar con tasa BCV en vivo
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" })
  await page.waitForTimeout(1500)
  await page.screenshot({ path: `${OUT}/01-home-hero.png` })
  console.log("✓ 01-home-hero.png")

  // 02 — Categorías interactivas (filmstrip)
  await page.locator(".filmstrip-grid").scrollIntoViewIfNeeded()
  await page.waitForTimeout(800)
  await page.screenshot({ path: `${OUT}/02-categorias.png` })
  console.log("✓ 02-categorias.png")

  // 03 — Búsqueda por imagen con IA (diálogo abierto)
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" })
  await page.click('button[aria-label="Buscar por imagen"]')
  await page.waitForTimeout(600)
  await page.screenshot({ path: `${OUT}/03-busqueda-imagen.png` })
  await page.keyboard.press("Escape")
  console.log("✓ 03-busqueda-imagen.png")

  // 04 — Página de producto (galería, specs, doble CTA)
  await page.goto(`${BASE}${PRODUCTO}`, { waitUntil: "networkidle" })
  await page.waitForTimeout(1200)
  await page.screenshot({ path: `${OUT}/04-producto.png` })
  console.log("✓ 04-producto.png")

  // 05 — Carrito con producto y total en Bs a tasa BCV
  await page.getByRole("button", { name: "Agregar al Carrito" }).click()
  await page.waitForTimeout(600)
  await page.goto(`${BASE}/cart`, { waitUntil: "networkidle" })
  await page.waitForTimeout(1200)
  await page.screenshot({ path: `${OUT}/05-carrito.png` })
  console.log("✓ 05-carrito.png")

  // 06 — Checkout (formulario de envío con métodos locales)
  await page.goto(`${BASE}/checkout`, { waitUntil: "networkidle" })
  await page.waitForTimeout(1200)
  await page.screenshot({ path: `${OUT}/06-checkout.png` })
  console.log("✓ 06-checkout.png")

  // 07 — Cotización B2B con producto agregado
  await page.goto(`${BASE}${PRODUCTO}`, { waitUntil: "networkidle" })
  await page.getByRole("button", { name: "Agregar a cotización" }).click()
  await page.waitForTimeout(600)
  await page.goto(`${BASE}/cotizacion`, { waitUntil: "networkidle" })
  await page.waitForTimeout(1000)
  await page.screenshot({ path: `${OUT}/07-cotizacion.png` })
  console.log("✓ 07-cotizacion.png")

  // 08 — Footer: cuentas bancarias y métodos de pago (bloque de confianza)
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" })
  await page.locator("footer").scrollIntoViewIfNeeded()
  await page.waitForTimeout(800)
  await page.screenshot({ path: `${OUT}/08-footer-pagos.png` })
  console.log("✓ 08-footer-pagos.png")

  await page.close()

  // ── Vista móvil (375x812) — el diseño mobile-first ────────────────────────
  const movil = await browser.newPage({ viewport: { width: 375, height: 812 } })
  await movil.goto(`${BASE}/`, { waitUntil: "networkidle" })
  await movil.waitForTimeout(1500)
  await movil.screenshot({ path: `${OUT}/09-movil-home.png` })
  console.log("✓ 09-movil-home.png")

  await movil.goto(`${BASE}${PRODUCTO}`, { waitUntil: "networkidle" })
  await movil.waitForTimeout(1200)
  await movil.screenshot({ path: `${OUT}/10-movil-producto.png` })
  console.log("✓ 10-movil-producto.png")

  await browser.close()
  console.log(`\nListo: 10 capturas en docs/capturas-web/`)
}

main().catch((err) => {
  console.error("Error generando capturas:", err.message)
  process.exit(1)
})
