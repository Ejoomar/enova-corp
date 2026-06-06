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
  // Balanza ACLAS LS2 M3
  {
    id: "r1", productId: "ef-ls2m3", author: "Carlos M.", rating: 5, date: "2025-05-10",
    title: "Excelente balanza, homologación sin problema",
    body: "La instalamos en nuestro local y el proceso de homologación con SENIAT fue sencillo. Muy precisa y rápida para emitir tickets. El soporte de ENOVA fue clave.",
    verified: true,
  },
  {
    id: "r2", productId: "ef-ls2m3", author: "Mariela R.", rating: 4, date: "2025-04-15",
    title: "Funciona perfecto para supermercado",
    body: "Llevamos 3 meses usándola sin fallas. La pantalla es clara y el ticket fiscal sale bien formateado. Le quitaría una estrella solo porque el manual viene en inglés.",
    verified: true,
  },

  // Impresora Fiscal ACLAS PP9-PLUS
  {
    id: "r3", productId: "ef-pp9plus", author: "José A.", rating: 5, date: "2025-03-20",
    title: "La mejor impresora fiscal del mercado venezolano",
    body: "Llevamos años buscando una impresora confiable y esta cumple todo. Imprime rápido, el papel de 80mm es estándar y no ha fallado. ENOVA la entregó configurada y lista.",
    verified: true,
  },

  // Dell OptiPlex 3080 Mini
  {
    id: "r4", productId: "lap-cpu3080", author: "Andreína V.", rating: 5, date: "2025-05-01",
    title: "Mini PC potente y silencioso para oficina",
    body: "Lo usamos para trabajo administrativo con Excel, Word y navegación. Es silencioso, ocupa muy poco espacio y el SSD le da mucha velocidad. Excelente relación precio-rendimiento.",
    verified: true,
  },
  {
    id: "r5", productId: "lap-cpu3080", author: "Ricardo T.", rating: 4, date: "2025-04-10",
    title: "Muy buen equipo para el precio",
    body: "El OptiPlex Mini cumple perfectamente para tareas de oficina. Viene sin sistema operativo pero ENOVA te orienta con la instalación. 4 estrellas porque preferiría 16GB de RAM.",
    verified: false,
  },

  // Lenovo ThinkCentre M70Q
  {
    id: "r6", productId: "lap-lntkm70q7", author: "Gabriela S.", rating: 5, date: "2025-04-28",
    title: "El i7 11va generación vuela",
    body: "Con 16GB RAM y SSD 256GB hace todo fluidísimo. Tengo abiertas 20 pestañas, Zoom y el ERP al mismo tiempo sin que se inmute. El factor MFF es perfecto para el escritorio.",
    verified: true,
  },
  {
    id: "r7", productId: "lap-lntkm70q7", author: "Manuel O.", rating: 5, date: "2025-03-30",
    title: "Rendimiento profesional en un equipo compacto",
    body: "Lo usamos en contabilidad con software especializado y el rendimiento es impecable. Lenovo construye muy bien estos mini PC. Volvería a comprarlo sin dudar.",
    verified: true,
  },

  // Epson EcoTank L3250
  {
    id: "r8", productId: "imp-epl3250", author: "Patricia L.", rating: 5, date: "2025-05-05",
    title: "La impresora que toda oficina necesita",
    body: "Los costos de impresión bajaron muchísimo con los tanques EcoTank. Imprime, copia y escanea sin problemas. La Wi-Fi funciona bien desde cualquier equipo de la oficina.",
    verified: true,
  },
  {
    id: "r9", productId: "imp-epl3250", author: "Luisa F.", rating: 4, date: "2025-04-20",
    title: "Excelente, el ahorro en tinta es real",
    body: "Venía usando cartuchos y el cambio a EcoTank fue una revolución. Las botellas de tinta duran meses. Alguna vez tarda en inicializar pero en general es confiable.",
    verified: false,
  },

  // Router TP-Link Archer C64
  {
    id: "r10", productId: "red-rtc64", author: "Diego C.", rating: 5, date: "2025-04-15",
    title: "La señal llega a toda la oficina",
    body: "Cubre perfectamente 150m² de oficina. El dual band va en serio: conectamos los equipos críticos en 5GHz y el resto en 2.4GHz. Estable y sin caídas desde que lo tenemos.",
    verified: true,
  },
  {
    id: "r11", productId: "red-rtc64", author: "Ana B.", rating: 4, date: "2025-03-10",
    title: "Buen router para el precio",
    body: "Para uso doméstico y pequeña oficina es más que suficiente. La configuración es simple desde la app. Descuento una estrella porque el panel web podría ser más intuitivo.",
    verified: true,
  },

  // Cámara EZVIZ CS-H7C Dual Lens
  {
    id: "r12", productId: "cam-csh7c", author: "Pedro A.", rating: 5, date: "2025-04-25",
    title: "Dos lentes que lo ven todo",
    body: "La visión dual es impresionante: un ojo al frente y otro en gran angular. La sirena integrada disuadió a un intruso la primera semana. App EZVIZ funciona muy bien desde el móvil.",
    verified: true,
  },

  // Cámara EZVIZ CS-H8C 2K Exterior
  {
    id: "r13", productId: "cam-csh8c", author: "Laura M.", rating: 5, date: "2025-05-08",
    title: "La visión nocturna a color es espectacular",
    body: "De noche graba en color como si fuera de día. Resistente IP67: aguantó lluvia y humedad sin problemas. La imagen en 2K es muy nítida, se ven hasta las placas de los carros.",
    verified: true,
  },
  {
    id: "r14", productId: "cam-csh8c", author: "Tomás N.", rating: 4, date: "2025-04-05",
    title: "Muy buena cámara exterior, instalación fácil",
    body: "La instalé yo mismo en menos de 30 minutos. La app la detectó al instante. Le quitaría una estrella porque la configuración inicial del almacenamiento en la nube es confusa.",
    verified: false,
  },
]

export function getReviewsForProduct(productId: string): Review[] {
  return reviews.filter((r) => r.productId === productId)
}
