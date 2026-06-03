import "dotenv/config"
import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log("Seeding Energlass database...")

  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.address.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.brand.deleteMany()
  await prisma.user.deleteMany()

  // Categories
  const categoriesData = [
    { name: "Puertas de Vidrio", slug: "puertas-vidrio", icon: "DoorOpen" },
    { name: "Shower Door", slug: "shower-door", icon: "Droplets" },
    { name: "Barandas", slug: "barandas", icon: "Shield" },
    { name: "Quicios", slug: "quicios", icon: "Settings" },
    { name: "Cerraduras", slug: "cerraduras", icon: "Lock" },
    { name: "Canales", slug: "canales", icon: "GripHorizontal" },
    { name: "Burletes", slug: "burletes", icon: "Layers" },
    { name: "Balaustros", slug: "balaustros", icon: "Columns2" },
    { name: "Brazos Hidráulicos", slug: "brazos-hidraulicos", icon: "Wrench" },
  ]

  const categories: Record<string, string> = {}
  for (const cat of categoriesData) {
    const created = await prisma.category.create({ data: cat })
    categories[cat.slug] = created.id
  }
  console.log(`Created ${categoriesData.length} categories`)

  // Brands / Materials
  const brandsData = [
    { name: "Acero Inox SS304", slug: "ss304" },
    { name: "Acero Inox SS316", slug: "ss316" },
    { name: "Duplex 2205", slug: "duplex-2205" },
    { name: "Aluminio", slug: "aluminio" },
    { name: "Zinc", slug: "zinc" },
    { name: "PVC", slug: "pvc" },
  ]

  const brands: Record<string, string> = {}
  for (const brand of brandsData) {
    const created = await prisma.brand.create({ data: brand })
    brands[brand.name] = created.id
  }
  console.log(`Created ${brandsData.length} materials/brands`)

  // Products
  const productsData = [
    // PUERTAS DE VIDRIO
    {
      name: "Pivote Superior",
      slug: "pivote-superior-hspv0001",
      brand: "Acero Inox SS304",
      category: "puertas-vidrio",
      price: 12300,
      images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500"],
      description: "Pivote superior para puertas de vidrio de 10 a 12 mm. Acero Inoxidable satinado.",
      specs: { "Código": "HSPV0001", "Vidrio": "10 a 12 mm", "Material": "Acero Inoxidable satinado" },
      stock: 50, isNew: false, isFeatured: true,
    },
    {
      name: "Soporte Superior para Alemana",
      slug: "soporte-superior-hspv0002",
      brand: "Acero Inox SS304",
      category: "puertas-vidrio",
      price: 17500,
      images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500"],
      description: "Soporte superior para muela tipo Alemana. Para puertas de vidrio 10–12 mm.",
      specs: { "Código": "HSPV0002", "Vidrio": "10 a 12 mm", "Uso": "Muela tipo Alemana" },
      stock: 40, isNew: false, isFeatured: true,
    },
    {
      name: "Soporte Inferior",
      slug: "soporte-inferior-hspv0004",
      brand: "Acero Inox SS304",
      category: "puertas-vidrio",
      price: 12300,
      images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500"],
      description: "Soporte inferior para puertas de vidrio 10–12 mm. Acero Inoxidable satinado.",
      specs: { "Código": "HSPV0004", "Vidrio": "10 a 12 mm" },
      stock: 45, isNew: false, isFeatured: false,
    },
    {
      name: "Bisagra Puerta Interior",
      slug: "bisagra-puerta-interior-hbpv0001",
      brand: "Zinc",
      category: "puertas-vidrio",
      price: 18700,
      images: ["https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500"],
      description: "Bisagra para puerta interior. Vidrio 8–10 mm. Zinc satinado. Requiere perforación.",
      specs: { "Código": "HBPV0001", "Vidrio": "8 a 10 mm", "Material": "Zinc satinado" },
      stock: 25, isNew: false, isFeatured: false,
    },
    // QUICIOS
    {
      name: "Quicio Embutido K65 – 100 Kg",
      slug: "quicio-embutido-k65-qepu0007",
      brand: "Acero Inox SS304",
      category: "quicios",
      price: 65000,
      comparePrice: 72000,
      images: ["https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=500"],
      description: "Alto tráfico. Peso máx. 100 Kg – Ancho máx. 1000 mm. Retención 90°. Similar Dorma BTS-65 IV.",
      specs: { "Código": "QEPU0007", "Peso Máx": "100 Kg", "Ancho Máx": "1000 mm", "Retención": "90°" },
      stock: 15, isNew: false, isFeatured: true,
    },
    {
      name: "Quicio Embutido K75 – 120 Kg",
      slug: "quicio-embutido-k75-qepu0006",
      brand: "Acero Inox SS304",
      category: "quicios",
      price: 75000,
      images: ["https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=500"],
      description: "Alto tráfico. Peso máx. 120 Kg – Ancho máx. 1100 mm. Retención 90°. Similar Dorma BTS-75V.",
      specs: { "Código": "QEPU0006", "Peso Máx": "120 Kg", "Ancho Máx": "1100 mm" },
      stock: 10, isNew: false, isFeatured: true,
    },
    {
      name: "Quicio Sobrepiso K100 – 100 Kg",
      slug: "quicio-sobrepiso-k100-qspv0001",
      brand: "Acero Inox SS304",
      category: "quicios",
      price: 70000,
      comparePrice: 78000,
      images: ["https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=500"],
      description: "Alto tráfico. Peso máx. 100 Kg – Ancho máx. 950 mm. Retención 90°. Rápida instalación.",
      specs: { "Código": "QSPV0001", "Peso Máx": "100 Kg", "Instalación": "Rápida" },
      stock: 12, isNew: false, isFeatured: false,
    },
    // CERRADURAS
    {
      name: "Cerradura Arco – Llave",
      slug: "cerradura-arco-llave-hcpv0004",
      brand: "Acero Inox SS304",
      category: "cerraduras",
      price: 29700,
      images: ["https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=500"],
      description: "Para vidrio 10–12 mm, vidrio a vidrio. Cerrojo circular simple. No requiere perforación.",
      specs: { "Código": "HCPV0004", "Vidrio": "10 a 12 mm", "Tipo": "Vidrio–Vidrio" },
      stock: 20, isNew: false, isFeatured: true,
    },
    {
      name: "Cerradura Doble Pitón",
      slug: "cerradura-doble-piton-hcpv0005",
      brand: "Acero Inox SS304",
      category: "cerraduras",
      price: 29900,
      images: ["https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=500"],
      description: "Para vidrio 10–12 mm, vidrio a vidrio. No requiere perforación.",
      specs: { "Código": "HCPV0005", "Vidrio": "10 a 12 mm", "Tipo": "Vidrio–Vidrio" },
      stock: 18, isNew: false, isFeatured: false,
    },
    // SHOWER DOOR
    {
      name: "Bisagra Vidrio–Muro Satinado",
      slug: "bisagra-vidrio-muro-satinado",
      brand: "Acero Inox SS304",
      category: "shower-door",
      price: 34900,
      images: ["https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=500"],
      description: "Bisagra vidrio a muro shower door. Para vidrio 8–10 mm. Acero Inoxidable satinado.",
      specs: { "Vidrio": "8 a 10 mm", "Terminación": "Satinado" },
      stock: 35, isNew: false, isFeatured: true,
    },
    {
      name: "Bisagra Vidrio–Muro Negro",
      slug: "bisagra-vidrio-muro-negro-hsdn0001",
      brand: "Acero Inox SS304",
      category: "shower-door",
      price: 24900,
      images: ["https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=500"],
      description: "Bisagra vidrio a muro shower door. Para vidrio 8–10 mm. Acero Inoxidable negro.",
      specs: { "Código": "HSDN0001", "Vidrio": "8 a 10 mm", "Terminación": "Negro mate" },
      stock: 30, isNew: true, isFeatured: true,
    },
    {
      name: "Bisagra Vidrio–Muro Oro Bruñido",
      slug: "bisagra-vidrio-muro-oro-hsdo0001",
      brand: "Acero Inox SS304",
      category: "shower-door",
      price: 29900,
      images: ["https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=500"],
      description: "Bisagra vidrio a muro shower door. Para vidrio 8–10 mm. Terminación Oro Bruñido oscuro.",
      specs: { "Código": "HSDO0001", "Vidrio": "8 a 10 mm", "Terminación": "Oro Bruñido" },
      stock: 20, isNew: true, isFeatured: true,
    },
    {
      name: "Kit Shower Door Corredera Satinado",
      slug: "kit-shower-door-corredera-satinado-ksdc0003",
      brand: "Acero Inox SS304",
      category: "shower-door",
      price: 57000,
      comparePrice: 64000,
      images: ["https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=500"],
      description: "Kit completo corredera. Incluye ruedas, soportes, cilindros anti-levantamiento, topes, guía, tirador ASA 58mm y riel 2 mts.",
      specs: { "Código": "KSDC0003", "Vidrio": "8 a 10 mm", "Terminación": "Satinado", "Riel": "2 metros" },
      stock: 15, isNew: false, isFeatured: true,
    },
    {
      name: "Kit Shower Door Corredera Negro",
      slug: "kit-shower-door-corredera-negro-ksdn0002",
      brand: "Acero Inox SS304",
      category: "shower-door",
      price: 64000,
      images: ["https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=500"],
      description: "Kit completo corredera negro. Incluye todos los accesorios y riel 2 mts.",
      specs: { "Código": "KSDN0002", "Vidrio": "8 a 10 mm", "Terminación": "Negro mate" },
      stock: 12, isNew: true, isFeatured: false,
    },
    // BARANDAS
    {
      name: "Soporte Espiga SS304",
      slug: "soporte-espiga-ss304-hbes0001",
      brand: "Acero Inox SS304",
      category: "barandas",
      price: 31000,
      images: ["https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500"],
      description: "Soporte espiga para barandas. Vidrio 10–12 mm. SS304 satinado. No requiere perforación.",
      specs: { "Código": "HBES0001", "Vidrio": "10 a 12 mm", "Material": "SS304 satinado" },
      stock: 60, isNew: false, isFeatured: true,
    },
    {
      name: "Soporte Espiga Duplex 2205",
      slug: "soporte-espiga-duplex-hbes0005",
      brand: "Duplex 2205",
      category: "barandas",
      price: 36000,
      images: ["https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500"],
      description: "Soporte espiga Duplex 2205 para barandas. Mayor resistencia a la corrosión. Ideal para entornos costeros.",
      specs: { "Código": "HBES0005", "Vidrio": "10 a 12 mm", "Material": "Duplex 2205 satinado" },
      stock: 30, isNew: false, isFeatured: true,
    },
    {
      name: "Cerradura Baranda Piscina SS316",
      slug: "cerradura-baranda-piscina-hcba0001",
      brand: "Acero Inox SS316",
      category: "barandas",
      price: 44000,
      images: ["https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500"],
      description: "Cerradura frontal para barandas de piscina. Vidrio 10–12 mm. SS316 resistente a cloruros.",
      specs: { "Código": "HCBA0001", "Material": "SS316", "Uso": "Barandas piscina" },
      stock: 20, isNew: false, isFeatured: true,
    },
    // CANALES
    {
      name: "Canal Inox Satinado 15×15 mm – 3 mts",
      slug: "canal-inox-satin-15x15-caui0001",
      brand: "Acero Inox SS304",
      category: "canales",
      price: 26000,
      images: ["https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500"],
      description: "Canal de acero inoxidable 1,5 mm. Para vidrio 8–10 mm. Terminación satinado. Largo 3 metros.",
      specs: { "Código": "CAUI0001", "Medidas": "15×15 mm", "Largo": "3 metros" },
      stock: 40, isNew: false, isFeatured: false,
    },
    {
      name: "Canal Inox Negro 15×15 mm – 3 mts",
      slug: "canal-inox-negro-15x15-caui0002",
      brand: "Acero Inox SS304",
      category: "canales",
      price: 29000,
      images: ["https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500"],
      description: "Canal de acero inoxidable negro mate 1,5 mm. Para vidrio 8–10 mm. Largo 3 metros.",
      specs: { "Código": "CAUI0002", "Medidas": "15×15 mm", "Terminación": "Negro mate" },
      stock: 35, isNew: true, isFeatured: false,
    },
    {
      name: "Canal Aluminio Plata 19×15 mm – 3 mts",
      slug: "canal-aluminio-plata-19x15-caua0001",
      brand: "Aluminio",
      category: "canales",
      price: 17500,
      images: ["https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500"],
      description: "Canal de aluminio anodizado 2 mm. Para vidrio 8–10 mm. Terminación plata. Largo 3 metros.",
      specs: { "Código": "CAUA0001", "Medidas": "19×15 mm", "Terminación": "Plata" },
      stock: 50, isNew: false, isFeatured: true,
    },
    // BURLETES
    {
      name: "Burlete Vidrio–Muro 8mm",
      slug: "burlete-vidrio-muro-8mm-bpvc0001",
      brand: "PVC",
      category: "burletes",
      price: 9900,
      images: ["https://images.unsplash.com/photo-1452784444945-3f422708fe5e?w=500"],
      description: "PVC azulado traslúcido. 2,2 metros de largo. Aleta blanda 15,5 mm. Para vidrio 8 mm.",
      specs: { "Código": "BPVC0001", "Vidrio": "8 mm", "Largo": "2,2 metros" },
      stock: 100, isNew: false, isFeatured: false,
    },
    {
      name: "Burlete Magnético 90°/180° 8mm",
      slug: "burlete-magnetico-bpvc0009",
      brand: "PVC",
      category: "burletes",
      price: 11900,
      images: ["https://images.unsplash.com/photo-1452784444945-3f422708fe5e?w=500"],
      description: "Burlete magnético 90° o 180°. PVC azulado traslúcido. 2,2 metros. Para vidrio 8 mm.",
      specs: { "Código": "BPVC0009", "Vidrio": "8 mm", "Ángulo": "90° o 180°" },
      stock: 80, isNew: false, isFeatured: false,
    },
    // BALAUSTROS
    {
      name: "Balaustro Intermedio 180°",
      slug: "balaustro-intermedio-180-hbba0001",
      brand: "Acero Inox SS304",
      category: "balaustros",
      price: 89000,
      images: ["https://images.unsplash.com/photo-1567016526105-22da7c13161a?w=500"],
      description: "Para vidrio 10–12 mm. Tubo 2\" – Alto 1000 mm. SS304. Incluye 4 pinzas, gomas, tapa y herraje pasamanos.",
      specs: { "Código": "HBBA0001", "Vidrio": "10 a 12 mm", "Alto": "1000 mm" },
      stock: 20, isNew: false, isFeatured: true,
    },
    // BRAZOS HIDRÁULICOS
    {
      name: "Brazo Hidráulico K052 – 65 Kg",
      slug: "brazo-hidraulico-k052-cacp0005",
      brand: "Aluminio",
      category: "brazos-hidraulicos",
      price: 17500,
      images: ["https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=500"],
      description: "Para puertas de hasta 65 Kg. Uso residencial y comercial. Cierre ajustable. Aluminio pintado.",
      specs: { "Código": "CACP0005", "Capacidad": "Hasta 65 Kg", "Material": "Aluminio pintado" },
      stock: 20, isNew: false, isFeatured: true,
    },
  ]

  for (const product of productsData) {
    await prisma.product.create({
      data: {
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: product.price,
        comparePrice: product.comparePrice,
        stock: product.stock,
        images: product.images,
        specs: product.specs,
        isNew: product.isNew,
        isFeatured: product.isFeatured,
        categoryId: categories[product.category],
        brandId: brands[product.brand],
      },
    })
  }
  console.log(`Created ${productsData.length} products`)

  // Admin User
  const adminUser = await prisma.user.create({
    data: {
      email: "admin@energlass.cl",
      password: "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu9lK",
      name: "Admin Energlass",
      phone: "+56 2 3209 0021",
      role: "ADMIN",
      status: "ACTIVE",
    },
  })
  console.log(`Created admin: ${adminUser.email}`)

  // Test Customer
  const customerUser = await prisma.user.create({
    data: {
      email: "cliente@email.com",
      password: "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu9lK",
      name: "Carlos Martínez",
      phone: "+56 9 8765 4321",
      role: "CUSTOMER",
      status: "ACTIVE",
    },
  })

  await prisma.address.create({
    data: {
      label: "Casa",
      name: "Carlos Martínez",
      phone: "+56 9 8765 4321",
      address: "Av. Libertador Bernardo O'Higgins 1234",
      city: "Santiago",
      state: "Región Metropolitana",
      zipCode: "8340457",
      isDefault: true,
      userId: customerUser.id,
    },
  })
  console.log(`Created customer: ${customerUser.email}`)

  console.log("Energlass seed completed!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
