import { products } from "./mock-products"

export interface UserProfile {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  createdAt: string
}

export interface Address {
  id: string
  label: string
  name: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  isDefault: boolean
}

export interface OrderItem {
  productId: string
  name: string
  brand: string
  price: number
  quantity: number
  image: string
}

export interface Order {
  id: string
  items: OrderItem[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  paymentMethod: string
  shippingAddress: string
  createdAt: string
  updatedAt: string
}

export const userProfile: UserProfile = {
  id: "1",
  name: "Juan Perez",
  email: "juan.perez@email.com",
  phone: "+58 412 555 0921",
  createdAt: "2024-01-15",
}

export const addresses: Address[] = [
  {
    id: "1",
    label: "Casa",
    name: "Juan Perez",
    phone: "+58 412 555 0921",
    address: "Av. Francisco de Miranda, Urb. Los Palos Grandes, Apto 401",
    city: "Caracas",
    state: "Miranda",
    zipCode: "1060",
    isDefault: true,
  },
  {
    id: "2",
    label: "Oficina",
    name: "Juan Perez",
    phone: "+58 424 555 3812",
    address: "Av. Libertador, CC El Sambil, Piso 3",
    city: "Caracas",
    state: "Miranda",
    zipCode: "1060",
    isDefault: false,
  },
]

const findProduct = (id: string) => products.find((p) => p.id === id)!

export const orders: Order[] = [
  {
    id: "ORD-2024-001",
    items: [
      {
        productId: "ef-ls2m3",
        name: "Balanza ACLAS LS2 M3",
        brand: "ACLAS",
        price: 760,
        quantity: 1,
        image: findProduct("ef-ls2m3").images[0],
      },
    ],
    total: 760,
    status: "delivered",
    paymentMethod: "Transferencia Banesco",
    shippingAddress: "Av. Francisco de Miranda, Los Palos Grandes, Caracas",
    createdAt: "2024-03-15",
    updatedAt: "2024-03-20",
  },
  {
    id: "ORD-2024-002",
    items: [
      {
        productId: "red-rtc64",
        name: "Router TP-Link Archer C64 AC1200",
        brand: "TP-Link",
        price: 30,
        quantity: 2,
        image: findProduct("red-rtc64").images[0],
      },
      {
        productId: "imp-epl3250",
        name: "Multifuncional Epson EcoTank L3250",
        brand: "Epson",
        price: 230,
        quantity: 1,
        image: findProduct("imp-epl3250").images[0],
      },
    ],
    total: 290,
    status: "shipped",
    paymentMethod: "Pago Móvil",
    shippingAddress: "Av. Libertador, CC El Sambil, Caracas",
    createdAt: "2024-03-18",
    updatedAt: "2024-03-19",
  },
  {
    id: "ORD-2024-003",
    items: [
      {
        productId: "lap-cpu3080",
        name: "CPU Dell OptiPlex 3080 Mini i3 10ma",
        brand: "Dell",
        price: 230,
        quantity: 1,
        image: findProduct("lap-cpu3080").images[0],
      },
    ],
    total: 230,
    status: "processing",
    paymentMethod: "Transferencia Banesco",
    shippingAddress: "Av. Francisco de Miranda, Los Palos Grandes, Caracas",
    createdAt: "2024-03-20",
    updatedAt: "2024-03-20",
  },
  {
    id: "ORD-2024-004",
    items: [
      {
        productId: "cam-csh8c",
        name: "Cámara EZVIZ CS-H8C 2K Exterior IP67",
        brand: "EZVIZ",
        price: 77,
        quantity: 1,
        image: findProduct("cam-csh8c").images[0],
      },
    ],
    total: 77,
    status: "cancelled",
    paymentMethod: "Zelle",
    shippingAddress: "Av. Francisco de Miranda, Los Palos Grandes, Caracas",
    createdAt: "2024-03-10",
    updatedAt: "2024-03-11",
  },
]

export const favorites = [products[0], products[1], products[6], products[9]]
