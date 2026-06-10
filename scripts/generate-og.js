const sharp = require("sharp")
const path = require("path")

const LOGO = path.join(__dirname, "..", "public", "images", "logo.png")
const OUT = path.join(__dirname, "..", "src", "app", "opengraph-image.png")

// OG 1200x630: fondo claro de marca, logo + wordmark + tagline
async function main() {
  const W = 1200
  const H = 630

  const logo = await sharp(LOGO).resize(280, 280, { fit: "inside" }).toBuffer()
  const logoMeta = await sharp(logo).metadata()

  const svg = Buffer.from(`
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${W}" height="${H}" fill="#f5f4f0"/>
      <rect x="0" y="0" width="${W}" height="10" fill="#0057B7"/>
      <text x="600" y="430" text-anchor="middle" font-family="Georgia, serif" font-size="72" font-weight="500" fill="#191c24" letter-spacing="-1">ENOVA CORP</text>
      <text x="600" y="495" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" fill="#5a5f6b">Computación · Equipos Fiscales · Redes</text>
      <text x="600" y="560" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" fill="#0057B7" letter-spacing="3">MÉRIDA · ENVÍOS A TODA VENEZUELA</text>
    </svg>
  `)

  await sharp(svg)
    .composite([
      {
        input: logo,
        left: Math.round((W - (logoMeta.width ?? 280)) / 2),
        top: 70,
      },
    ])
    .png()
    .toFile(OUT)

  console.log("opengraph-image.png generado (1200x630)")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
