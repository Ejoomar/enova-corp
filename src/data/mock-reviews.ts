export interface Review {
  id: string
  productId: string
  author: string
  rating: number
  date: string
  title: string
  body: string
  verified: boolean
}

export const reviews: Review[] = [
  // iPhone 16 Pro Max
  {
    id: "r1", productId: "sm-001", author: "Matías F.", rating: 5, date: "2025-05-10",
    title: "Increíble. El mejor teléfono que he tenido.",
    body: "La cámara es brutal, las fotos en condiciones de poca luz son impresionantes. El chip A18 Pro se nota en todo lo que haces. Vale cada peso.",
    verified: true,
  },
  {
    id: "r2", productId: "sm-001", author: "Valentina C.", rating: 5, date: "2025-04-22",
    title: "Pantalla y batería de otro nivel",
    body: "Venía de un Galaxy S22 y el salto fue enorme. La pantalla Super Retina se ve perfecta tanto en interior como exterior. La batería me dura fácil un día y medio.",
    verified: true,
  },
  {
    id: "r3", productId: "sm-001", author: "Rodrigo M.", rating: 4, date: "2025-03-15",
    title: "Excelente, solo le falta USB-C más rápido",
    body: "Todo en este teléfono es premium. Mi único reparo es que la velocidad USB-C podría ser mayor para transferencias. Por lo demás, perfecto.",
    verified: false,
  },

  // MacBook Air M3
  {
    id: "r4", productId: "lap-001", author: "Daniela P.", rating: 5, date: "2025-05-01",
    title: "La laptop perfecta para trabajo y creatividad",
    body: "Vengo de una MacBook Intel 2019 y la diferencia es abismal. Sin ventilador, silenciosa, ultra liviana y dura todo el día sin cargar. La mejor compra del año.",
    verified: true,
  },
  {
    id: "r5", productId: "lap-001", author: "Sebastián H.", rating: 5, date: "2025-04-18",
    title: "M3 destruye a todo en su precio",
    body: "Para diseño y video lo tiene todo. Edito en Premiere, Figma y Lightroom al mismo tiempo sin ningún problema. Y cabe en cualquier mochila.",
    verified: true,
  },

  // Sony WH-1000XM5
  {
    id: "r6", productId: "aud-002", author: "Camila R.", rating: 5, date: "2025-04-30",
    title: "La cancelación de ruido es mágica",
    body: "Trabajo desde casa con mi familia y estos auriculares me salvan la vida. Me aíslan completamente. El sonido es cálido y detallado. Jamás volvería atrás.",
    verified: true,
  },
  {
    id: "r7", productId: "aud-002", author: "Felipe N.", rating: 4, date: "2025-03-20",
    title: "Muy buenos, aunque algo caros",
    body: "Son los mejores que usé en cuanto a cancelación de ruido. El sonido es excelente con LDAC. El precio duele, pero si trabajas en lugares ruidosos se justifica.",
    verified: true,
  },

  // AirPods Pro 2
  {
    id: "r8", productId: "aud-001", author: "Javiera M.", rating: 5, date: "2025-05-05",
    title: "Los uso todo el día sin cansancio",
    body: "Son cómodos, con buena cancelación y el audio espacial en Apple TV es una pasada. La integración con iPhone es impecable. No se los sacaría ni para dormir.",
    verified: true,
  },

  // ASUS ROG Zephyrus G16
  {
    id: "r9", productId: "lap-002", author: "Ignacio B.", rating: 5, date: "2025-04-25",
    title: "La mejor laptop gaming del mercado",
    body: "Diseño premium, teclado excelente y el display a 165 Hz con colores precisos es brutal. Juego a todo a full sin que se trabe. La compraría de nuevo sin dudar.",
    verified: true,
  },
  {
    id: "r10", productId: "lap-002", author: "Tomás V.", rating: 4, date: "2025-03-10",
    title: "Potente, aunque calienta bastante en gaming",
    body: "Rendimiento impresionante para gaming y diseño 3D. Se calienta cuando la exiges al máximo pero con modo performance funciona genial. La batería dura poco en gaming (obvio).",
    verified: false,
  },

  // iPad Pro M4
  {
    id: "r11", productId: "tab-001", author: "Paula S.", rating: 5, date: "2025-05-08",
    title: "La mejor tablet del mundo, sin discusión",
    body: "El OLED es impresionante para dibujar y ver contenido. Con el Apple Pencil Pro la experiencia es única. Para ilustración y toma de notas no hay nada igual.",
    verified: true,
  },

  // Logitech G Pro X Superlight 2
  {
    id: "r12", productId: "gam-002", author: "Diego C.", rating: 5, date: "2025-04-15",
    title: "El mouse definitivo para gaming competitivo",
    body: "Sensor impecable, peso pluma y 95 horas de batería. Juego en 1600 DPI y los movimientos son precisísimos. Vale cada peso para gaming serio.",
    verified: true,
  },
]

export function getReviewsForProduct(productId: string): Review[] {
  return reviews.filter((r) => r.productId === productId)
}
