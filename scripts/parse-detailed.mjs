/**
 * parse-detailed.mjs
 * Procesa ambos CSV detallados de Energlass con precios y descripciones reales.
 *
 * Formatos detectados automáticamente:
 *   - CSV-3: 1 producto por fila  (data=nombre, data2=precio, data3=descripción, image=img)
 *   - CSV-4: 4 productos por fila (data..data4=nombres, data5..data11=precios, image..image4=imgs)
 *
 * Uso: node scripts/parse-detailed.mjs
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "csv-parse/sync";

const __dir  = dirname(fileURLToPath(import.meta.url));
const ROOT   = join(__dir, "..");
const DL_DIR = join(process.env.USERPROFILE ?? process.env.HOME ?? "", "Downloads");

// ─── Rutas de archivos ─────────────────────────────────────────────────────
const FILES = [
  join(DL_DIR, "energlass-cl-2026-04-24-3.csv"),
  join(DL_DIR, "energlass-cl-2026-04-24-4.csv"),
];

// ─── Categorías desde URL ─────────────────────────────────────────────────
const URL_TO_CAT = {
  "soportes-puertas-vidrio": "puertas-vidrio",
  "tiradores-puerta":        "puertas-vidrio",
  "quicios":                 "quicios",
  "cerraduras-puertas":      "cerraduras",
  "cerraduras-vitrina":      "cerraduras",
  "herrajes-baranda-vidrio": "barandas",
  "kit-shower-door-corredera":"shower-door",
  "canales-terminacion":     "canales-terminacion",
  "burletes":                "burletes",
  "bisagras-vitrina":        "bisagras-vitrina",
  "distanciadores":          "distanciadores",
  "conectores-union":        "conectores-union",
  "soportes-vitrina":        "soportes-vitrina",
};

function urlToSlug(url = "") {
  const m = url.match(/energlass\.cl\/([^/?#]+)/);
  const raw = m?.[1] ?? "general";
  return URL_TO_CAT[raw] ?? raw;
}

// ─── Limpieza de precio ────────────────────────────────────────────────────
// "$ 7.900 + IVA"  →  7900
function cleanPrice(raw = "") {
  const s = raw.replace(/\s/g, "");
  const m = s.match(/[\d]+(?:\.[\d]+)*/);
  if (!m) return null;
  return parseInt(m[0].replace(/\./g, ""), 10);
}

// ─── Parseo de descripción ─────────────────────────────────────────────────
function parseDesc(raw = "") {
  const lines = raw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const code = lines.find((l) => l.startsWith("Code:"))?.replace("Code:", "").trim() ?? "";

  const specs = {};
  for (const line of lines) {
    if (line.startsWith("Code:") || line === "VER DETALLE") continue;
    if (line.startsWith("*") && line.endsWith("*")) {
      specs["Uso"] = line.replace(/\*/g, "").trim();
    } else if (/^\d+[xX×]\d+/.test(line)) {
      specs["Medidas"] = line;
    } else if (/^para\s/i.test(line)) {
      specs["Aplicación"] = line;
    } else if (/^(acero|aluminio|zinc|color|formato|para espesores|tapa|base)/i.test(line)) {
      const key = line.split(" ")[0].charAt(0).toUpperCase() + line.split(" ")[0].slice(1);
      specs[key] = line;
    }
  }

  return {
    code,
    description: lines.filter((l) => !l.startsWith("Code:") && l !== "VER DETALLE").join(" • "),
    specs,
  };
}

// ─── Slug desde nombre o URL de imagen ────────────────────────────────────
function makeSlug(name = "", imgUrl = "") {
  if (imgUrl) {
    const fn = imgUrl.split("/").pop()?.replace(/\.[a-z]+$/i, "");
    if (fn) return fn;
  }
  return name
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// ─── Detectar formato del CSV ─────────────────────────────────────────────
function detectFormat(headers) {
  // Formato 4: tiene image2, image3, image4 y data5..data16
  if (headers.includes("image4") && headers.includes("data16")) return "4x";
  // Formato 3: 1 producto por fila
  return "1x";
}

// ─── Extraer productos de una fila (formato 4x) ───────────────────────────
function extractRow4x(row, category) {
  const items = [
    { name: row.data,  price: row.data5,  desc: row.data8,  img: row.image  },
    { name: row.data2, price: row.data6,  desc: row.data9,  img: row.image2 },
    { name: row.data3, price: row.data7,  desc: row.data10, img: row.image3 },
    { name: row.data4, price: row.data11, desc: row.data12, img: row.image4 },
  ];

  return items
    .filter((it) => it.name?.trim() && it.name !== "VER DETALLE")
    .map((it) => {
      const { code, description, specs } = parseDesc(it.desc ?? "");
      const price = cleanPrice(it.price ?? "");
      return {
        name:        it.name.trim(),
        price,
        plusIva:     price !== null,
        code,
        description,
        specs,
        image:       it.img?.trim() ?? "",
        slug:        makeSlug(it.name, it.img ?? ""),
        category,
      };
    });
}

// ─── Extraer producto de una fila (formato 1x) ────────────────────────────
function extractRow1x(row, category) {
  const name  = row.data?.trim();
  const price = cleanPrice(row.data2 ?? "");
  if (!name || name === "VER DETALLE") return [];

  const { code, description, specs } = parseDesc(row.data3 ?? "");
  return [
    {
      name,
      price,
      plusIva:     price !== null,
      code,
      description,
      specs,
      image:       row.image?.trim() ?? "",
      slug:        makeSlug(name, row.image ?? ""),
      category,
    },
  ];
}

// ─── Main ─────────────────────────────────────────────────────────────────
const all = [];
let id = 1;

for (const filePath of FILES) {
  let raw;
  try {
    raw = readFileSync(filePath, "utf-8");
  } catch {
    console.warn(`⚠  No se encontró: ${filePath} (ignorado)`);
    continue;
  }

  const rows = parse(raw, {
    columns: true,
    skip_empty_lines: true,
    relax_quotes: true,
    relax_column_count: true,
    trim: true,
  });

  if (rows.length === 0) continue;

  const headers = Object.keys(rows[0]);
  const fmt = detectFormat(headers);
  console.log(`📂 ${filePath.split(/[\\/]/).pop()} → formato ${fmt}`);

  for (const row of rows) {
    const paginationUrl = row.pagination?.trim();
    const startUrl      = row.web_scraper_start_url?.trim();
    const category      = urlToSlug(paginationUrl || startUrl || "");

    const items =
      fmt === "4x"
        ? extractRow4x(row, category)
        : extractRow1x(row, category);

    for (const item of items) {
      all.push({
        id:          String(id++),
        ...item,
        localImage:  item.image
          ? `/images/products/${item.image.split("/").pop()}`
          : "",
      });
    }
  }
}

// Deduplicar por slug (conservar el primero)
const seen = new Set();
const deduped = all.filter((p) => {
  if (seen.has(p.slug)) return false;
  seen.add(p.slug);
  return true;
});

// Re-numerar
deduped.forEach((p, i) => (p.id = String(i + 1)));

// Guardar
const outDir = join(ROOT, "public", "data");
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "productos.json");
writeFileSync(outPath, JSON.stringify(deduped, null, 2), "utf-8");

// Resumen
const cats = [...new Set(deduped.map((p) => p.category))];
console.log(`\n✅  ${deduped.length} productos (${all.length - deduped.length} duplicados eliminados)`);
console.log(`📂  Categorías: ${cats.join(", ")}`);
console.log(`💰  Con precio: ${deduped.filter((p) => p.price !== null).length}`);
console.log(`📄  Guardado en: ${outPath}`);
console.log(`\nPróximo paso → node scripts/download-images.mjs`);
