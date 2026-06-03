/**
 * parse-catalog.mjs
 * Lee CatalogoEnerglass.csv y genera public/data/productos.json
 *
 * Uso: node scripts/parse-catalog.mjs [ruta-al-csv]
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "csv-parse/sync";

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dir, "..");

const CSV_PATH =
  process.argv[2] ??
  join(
    process.env.USERPROFILE ?? process.env.HOME ?? "",
    "Downloads",
    "CatalogoEnerglass.csv"
  );

console.log(`📂 Leyendo CSV: ${CSV_PATH}\n`);

const raw = readFileSync(CSV_PATH, "utf-8");

const rows = parse(raw, {
  columns: true,
  skip_empty_lines: true,
  relax_quotes: true,
  relax_column_count: true,
  trim: true,
});

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

/** Genera un nombre legible a partir del nombre de archivo de la imagen */
function nameFromUrl(url) {
  const base = url.split("/").pop()?.replace(/\.[a-z]+$/i, "") ?? "";
  return base
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\s{2,}/g, " ")
    .trim();
}

/** Limpia un precio: quita $, puntos de miles, CLP, espacios → número */
function cleanPrice(raw) {
  if (!raw) return null;
  const num = parseInt(raw.replace(/[$.\sCLP]/g, "").replace(/,/g, ""), 10);
  return isNaN(num) ? null : num;
}

// ─────────────────────────────────────────────
// Mapa de categorías → slug del catálogo
// ─────────────────────────────────────────────
const CATEGORY_SLUG = {
  "CONECTORES DE UNIÓN": "conectores-union",
  "DISTANCIADORES Y EMBELLECEDORES": "conectores-union",
  "BISAGRAS VITRINA": "bisagras-vitrina",
  "CERRADURAS VITRINA": "bisagras-vitrina",
  "SOPORTES VITRINA": "bisagras-vitrina",
  "CANALES DE TERMINACIÓN": "canales-terminacion",
  "PERFILES DE TERMINACIÓN": "canales-terminacion",
  "TORNILLOS E INSUMOS": "canales-terminacion",
  "HERRAJES BARANDA DE VIDRIO": "barandas",
  "BALAUSTROS Y PASAMANOS": "barandas",
  "KIT SHOWER DOOR CORREDERA": "shower-door",
  "BURLETES - BARRE AGUA": "burletes",
  "BARANDA BANQUINA": "barandas",
  "TIRADORES PARA PUERTAS": "puertas-vidrio",
  "KIT PUERTA DESLIZANTE": "puertas-vidrio",
  "HERRAJES SHOWER DOOR": "shower-door",
  "SOPORTES PUERTAS DE VIDRIO": "puertas-vidrio",
  QUICIOS: "quicios",
  "CERRADURAS PUERTAS DE VIDRIO": "cerraduras",
};

// ─────────────────────────────────────────────
// Procesar filas
// ─────────────────────────────────────────────
const products = [];
let id = 1;

for (const row of rows) {
  // Cada fila tiene hasta 3 "secciones" (title / title2 / title3)
  const sections = [
    { label: row.title, image_col: row.image_1, image_col2: row.image_2 },
    { label: row.title2, image_col: null, image_col2: null },
    { label: row.title3, image_col: null, image_col2: null },
  ].filter((s) => s.label && s.label.trim());

  const mainCategory = (row.title ?? "").trim();
  const pageUrl = (row.item_page_link ?? "").trim();

  // Recolectar todas las imágenes de image_1 e image_2
  const allImages = [
    ...(row.image_1 ?? "").split("\n"),
    ...(row.image_2 ?? "").split("\n"),
  ]
    .map((u) => u.trim())
    .filter((u) => u.startsWith("http") && /\.(png|jpg|jpeg|gif|webp)/i.test(u));

  for (const imgUrl of allImages) {
    const filename = imgUrl.split("/").pop() ?? "";
    const slug = filename.replace(/\.[a-z]+$/i, "");
    const categorySlug =
      CATEGORY_SLUG[mainCategory] ??
      mainCategory.toLowerCase().replace(/\s+/g, "-");

    // Precio: intentar leer de price_1 si existe, sino null
    const rawPrice = row["price_1"] ?? row["price"] ?? null;

    products.push({
      id: String(id++),
      name: nameFromUrl(imgUrl),
      category: categorySlug,
      categoryLabel: mainCategory,
      slug,
      price: cleanPrice(rawPrice),
      image: imgUrl,
      localImage: `/images/products/${filename}`,
      url: pageUrl,
    });
  }
}

// ─────────────────────────────────────────────
// Escribir JSON
// ─────────────────────────────────────────────
const outDir = join(ROOT, "public", "data");
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "productos.json");
writeFileSync(outPath, JSON.stringify(products, null, 2), "utf-8");

console.log(`✅  ${products.length} productos generados`);
console.log(`📄  Guardado en: ${outPath}`);
console.log(`\nPróximo paso → node scripts/download-images.mjs`);
