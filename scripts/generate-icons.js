const sharp = require("sharp")
const path = require("path")

const SRC = path.join(__dirname, "..", "public", "images", "logo.png")
const APP = path.join(__dirname, "..", "src", "app")

// El favicon necesita fondo: el logo azul sobre transparente se pierde en
// pestañas oscuras. Se genera con fondo blanco sutil redondeado.
async function icon(size, file) {
  const padding = Math.round(size * 0.12)
  const inner = size - padding * 2

  const logo = await sharp(SRC)
    .resize(inner, inner, { fit: "inside" })
    .toBuffer()

  const radius = Math.round(size * 0.2)
  const rounded = Buffer.from(
    `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" fill="#ffffff"/></svg>`
  )

  await sharp(rounded)
    .composite([{ input: logo, gravity: "center" }])
    .png()
    .toFile(path.join(APP, file))

  console.log(`${file} (${size}x${size}) generado`)
}

async function main() {
  await icon(512, "icon.png")
  await icon(180, "apple-icon.png")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
