// Datos oficiales de la empresa — ÚNICA fuente de verdad.
// Todo teléfono, dato de pago o dirección del sitio debe leerse de aquí.
// Los campos marcados TODO-CLIENTE deben confirmarse con el cliente antes de la entrega.

export const EMPRESA = {
  nombre: "ENOVA CORP C.A.",
  rif: "J-00000000-0", // TODO-CLIENTE: RIF real
  whatsapp: "584223668201",
  whatsappDisplay: "0422-366-8201",
  email: "Gerencia@enovacorp.co",
  instagram: "@enovacorpve",
  instagramUrl: "https://instagram.com/enovacorpve",
  direccion: "Av. Andrés Bello, C.C. Alto Chama, Local 105-A, Mérida",
  ciudad: "Mérida",

  pagos: {
    pagoMovil: {
      label: "Pago Móvil",
      // TODO-CLIENTE: banco/teléfono/cédula reales — mientras tanto se coordinan por WhatsApp
      nota: "Te enviamos el banco, teléfono y cédula por WhatsApp para completar tu pago.",
    },
    usdEfectivo: {
      label: "USD Efectivo / Divisa",
      detalle: "Coordinar entrega por WhatsApp",
    },
  },

  // Equipos fiscales: la palabra "SENIAT" + garantía es lo que busca el comprador
  // (la competencia gana el nicho citándolo explícitamente).
  fiscal: {
    // TODO-CLIENTE: confirmar el N° de providencia SENIAT aplicable a los equipos
    // (ej. "SNAT/2018/0141"). Si queda vacío, el sello dice "homologado" sin número.
    providencia: "",
    // TODO-CLIENTE: confirmar la garantía exacta de los equipos fiscales.
    garantia: "Garantía oficial y soporte técnico post-venta",
  },
} as const

export function whatsappLink(message: string): string {
  return `https://wa.me/${EMPRESA.whatsapp}?text=${encodeURIComponent(message)}`
}

// URL pública del sitio — usada por sitemap, robots, OG y JSON-LD.
// TODO-CLIENTE: configurar NEXT_PUBLIC_SITE_URL en Vercel con el dominio final.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://basictech-mkrfsz52i-jomar-eliezers-projects.vercel.app"
