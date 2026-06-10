export interface OrderItem {
  productId: string
  name: string
  brand: string
  price: number
  quantity: number
  image?: string
}

export interface ShippingAddress {
  name: string
  phone: string
  address: string
  city: string
  state: string
  cedula?: string
  email?: string
  courier?: string
}

export interface Order {
  id: string
  items: OrderItem[]
  subtotal: number
  shipping: number
  total: number
  /** Total en bolívares a la tasa BCV del momento de la compra. */
  totalBs?: number | null
  /** Tasa BCV usada para calcular totalBs. */
  tasaBcv?: number | null
  paymentMethod: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  shippingAddress: ShippingAddress
  /** "web" = pedido real hecho desde la tienda; ausente = dato mock. */
  source?: "web"
  notes?: string
  createdAt: string
  updatedAt: string
}

export const orders: Order[] = [
  {
    id: "ORD-2025-001",
    items: [
      {
        productId: "1",
        name: "Intel Core i9-14900K",
        brand: "Intel",
        price: 589.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=80&h=80&fit=crop",
      },
      {
        productId: "5",
        name: "Corsair Vengeance DDR5 32GB",
        brand: "Corsair",
        price: 189.99,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=80&h=80&fit=crop",
      },
    ],
    subtotal: 969.97,
    shipping: 0,
    total: 969.97,
    paymentMethod: "Transferencia bancaria",
    status: "delivered",
    shippingAddress: {
      name: "Carlos Mendoza",
      phone: "+58 412-555-0101",
      address: "Av. Francisco de Miranda, Edif. Torre Linda, Piso 3, Apto 3B",
      city: "Caracas",
      state: "Distrito Capital",
    },
    createdAt: "2025-11-15T10:30:00Z",
    updatedAt: "2025-11-20T14:00:00Z",
  },
  {
    id: "ORD-2025-002",
    items: [
      {
        productId: "3",
        name: "ASUS ROG STRIX RTX 4090",
        brand: "ASUS",
        price: 1899.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=80&h=80&fit=crop",
      },
    ],
    subtotal: 1899.99,
    shipping: 15,
    total: 1914.99,
    paymentMethod: "Zelle",
    status: "shipped",
    shippingAddress: {
      name: "María García",
      phone: "+58 424-555-0202",
      address: "Urb. Las Mercedes, Calle Monterrey, Casa 12",
      city: "Caracas",
      state: "Distrito Capital",
    },
    createdAt: "2025-11-28T09:15:00Z",
    updatedAt: "2025-12-01T11:30:00Z",
  },
  {
    id: "ORD-2025-003",
    items: [
      {
        productId: "7",
        name: "Samsung 990 Pro NVMe 2TB",
        brand: "Samsung",
        price: 219.99,
        quantity: 1,
      },
      {
        productId: "9",
        name: "Noctua NH-D15 Chromax",
        brand: "Noctua",
        price: 99.99,
        quantity: 1,
      },
      {
        productId: "4",
        name: "MSI MAG Z790 TOMAHAWK",
        brand: "MSI",
        price: 299.99,
        quantity: 1,
      },
    ],
    subtotal: 619.97,
    shipping: 10,
    total: 629.97,
    paymentMethod: "PayPal",
    status: "processing",
    shippingAddress: {
      name: "Luís Ramírez",
      phone: "+58 416-555-0303",
      address: "Urb. Prebo I, Av. Bolívar Norte, Torre Empresarial, Piso 8",
      city: "Valencia",
      state: "Carabobo",
    },
    createdAt: "2025-12-01T16:45:00Z",
    updatedAt: "2025-12-02T08:00:00Z",
  },
  {
    id: "ORD-2025-004",
    items: [
      {
        productId: "2",
        name: "AMD Ryzen 9 7950X",
        brand: "AMD",
        price: 549.99,
        quantity: 1,
      },
    ],
    subtotal: 549.99,
    shipping: 0,
    total: 549.99,
    paymentMethod: "Transferencia bancaria",
    status: "pending",
    shippingAddress: {
      name: "Ana Rodríguez",
      phone: "+58 426-555-0404",
      address: "Sector Santa Rosalía, Calle 8, Casa 22",
      city: "Maracaibo",
      state: "Zulia",
    },
    createdAt: "2025-12-03T11:20:00Z",
    updatedAt: "2025-12-03T11:20:00Z",
  },
  {
    id: "ORD-2025-005",
    items: [
      {
        productId: "6",
        name: "Logitech G Pro X Superlight 2",
        brand: "Logitech",
        price: 159.99,
        quantity: 1,
      },
      {
        productId: "8",
        name: 'LG UltraGear 27GP850-B 27"',
        brand: "LG",
        price: 399.99,
        quantity: 1,
      },
    ],
    subtotal: 559.98,
    shipping: 10,
    total: 569.98,
    paymentMethod: "Zelle",
    status: "cancelled",
    shippingAddress: {
      name: "Pedro Hernández",
      phone: "+58 414-555-0505",
      address: "Urb. El Trigal, Av. Principal, Qta. La Palma",
      city: "Valencia",
      state: "Carabobo",
    },
    notes: "Cliente solicitó cancelación por cambio de dirección.",
    createdAt: "2025-11-25T14:00:00Z",
    updatedAt: "2025-11-26T09:00:00Z",
  },
  {
    id: "ORD-2025-006",
    items: [
      {
        productId: "10",
        name: "Corsair RM1000x SHIFT 1000W",
        brand: "Corsair",
        price: 229.99,
        quantity: 1,
      },
      {
        productId: "11",
        name: "NZXT H9 Flow Mid Tower",
        brand: "NZXT",
        price: 169.99,
        quantity: 1,
      },
      {
        productId: "1",
        name: "Intel Core i9-14900K",
        brand: "Intel",
        price: 589.99,
        quantity: 1,
      },
    ],
    subtotal: 989.97,
    shipping: 0,
    total: 989.97,
    paymentMethod: "Transferencia bancaria",
    status: "processing",
    shippingAddress: {
      name: "Sofía Torres",
      phone: "+58 412-555-0606",
      address: "Res. Los Laureles, Torre B, Piso 12, Apto 12-A",
      city: "Caracas",
      state: "Distrito Capital",
    },
    createdAt: "2025-12-04T08:30:00Z",
    updatedAt: "2025-12-04T10:15:00Z",
  },
]
