/**
 * download-images.mjs
 * Descarga todas las imágenes de public/data/productos.json
 * a public/images/products/ y actualiza el JSON con rutas locales.
 *
 * Uso: node scripts/download-images.mjs
 */
import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  existsSync,
  createWriteStream,
} from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import https from "node:https";
import http from "node:http";

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dir, "..");

const JSON_PATH = join(ROOT, "public", "data", "productos.json");
const IMG_DIR = join(ROOT, "public", "images", "products");

mkdirSync(IMG_DIR, { recursive: true });

// ─────────────────────────────────────────────
// Descargador con soporte de redirecciones
// ─────────────────────────────────────────────
function downloadFile(url, dest, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    if (redirectCount > 5) {
      reject(new Error("Demasiadas redirecciones"));
      return;
    }
    if (existsSync(dest)) {
      resolve("ya existe");
      return;
    }

    const proto = url.startsWith("https") ? https : http;
    const file = createWriteStream(dest);

    proto
      .get(url, (res) => {
        // Seguir redirecciones
        if (res.statusCode === 301 || res.statusCode === 302) {
          file.close();
          const newUrl = res.headers.location ?? "";
          return downloadFile(newUrl, dest, redirectCount + 1)
            .then(resolve)
            .catch(reject);
        }

        if (res.statusCode !== 200) {
          file.close();
          reject(new Error(`HTTP ${res.statusCode}`));
          return;
        }

        res.pipe(file);
        file.on("finish", () => file.close(() => resolve("descargada")));
      })
      .on("error", (err) => {
        file.close();
        reject(err);
      });
  });
}

// ─────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────
const products = JSON.parse(readFileSync(JSON_PATH, "utf-8"));

console.log(`🖼  Descargando ${products.length} imágenes...\n`);

let ok = 0;
let skip = 0;
let fail = 0;

for (const [i, product] of products.entries()) {
  const filename = product.image.split("/").pop();
  const dest = join(IMG_DIR, filename);
  const label = `[${String(i + 1).padStart(3, "0")}/${products.length}]`;

  try {
    const status = await downloadFile(product.image, dest);
    if (status === "ya existe") {
      skip++;
      process.stdout.write(`${label} ⏭  ${filename}\n`);
    } else {
      ok++;
      process.stdout.write(`${label} ✅ ${filename}\n`);
    }
  } catch (err) {
    fail++;
    process.stdout.write(`${label} ❌ ${filename} → ${err.message}\n`);
  }
}

// ─────────────────────────────────────────────
// Actualizar JSON con rutas locales
// ─────────────────────────────────────────────
const updated = products.map((p) => ({
  ...p,
  image: `/images/products/${p.image.split("/").pop()}`,
}));

writeFileSync(JSON_PATH, JSON.stringify(updated, null, 2), "utf-8");

console.log(`
─────────────────────────────────────────
✅ Descargadas : ${ok}
⏭  Ya existían : ${skip}
❌ Errores     : ${fail}
─────────────────────────────────────────
📝 JSON actualizado con rutas locales en:
   ${JSON_PATH}
`);
