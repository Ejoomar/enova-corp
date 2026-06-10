const sharp = require("sharp")
const path = require("path")

const SRC = path.join(__dirname, "..", "public", "images", "logo.jpg")
const OUT = path.join(__dirname, "..", "public", "images", "logo.png")

// Brand brass blue used across the site (--brass / --primary)
const BRAND_R = 0x00
const BRAND_G = 0x57
const BRAND_B = 0xb7

async function main() {
  const { data, info } = await sharp(SRC)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const { width, height, channels } = info
  const out = Buffer.alloc(width * height * 4)

  for (let i = 0; i < width * height; i++) {
    const r = data[i * channels]
    const g = data[i * channels + 1]
    const b = data[i * channels + 2]

    // Luminance: white icon pixels are bright, blue background pixels are dark/saturated blue
    const luminance = (r * 0.299 + g * 0.587 + b * 0.114)

    const o = i * 4
    if (luminance > 140) {
      // White icon shape -> recolor to brand blue, fully opaque
      out[o] = BRAND_R
      out[o + 1] = BRAND_G
      out[o + 2] = BRAND_B
      out[o + 3] = 255
    } else {
      // Blue background -> fully transparent
      out[o] = 0
      out[o + 1] = 0
      out[o + 2] = 0
      out[o + 3] = 0
    }
  }

  await sharp(out, { raw: { width, height, channels: 4 } })
    .png()
    .trim()
    .toFile(OUT)

  console.log("Logo procesado ->", OUT)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
