import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface BannerSlide {
  id: string
  tag: string
  title: string
  subtitle: string
  description: string
  cta1Label: string
  cta1Href: string
  cta2Label: string
  cta2Href: string
  image: string
  imageAlt: string
  bgImage: string
  imagePosition: string
  bg: string
  tagColor: string
  isBrand: boolean
  active: boolean
  order: number
}

const DEFAULT_SLIDES: BannerSlide[] = [
  {
    id: 'slide-1',
    tag: 'Distribuidor oficial · Mérida, Venezuela',
    title: 'Tu tecnología,',
    subtitle: 'en un solo lugar.',
    description: 'Computación, equipos fiscales, impresoras, redes y periféricos con garantía oficial. Stock disponible y despacho nacional vía MRW.',
    cta1Label: 'Explorar catálogo',
    cta1Href: '/products',
    cta2Label: '',
    cta2Href: '',
    image: '',
    imageAlt: '',
    bgImage: '/images/hero/bg-1.svg',
    imagePosition: 'center center',
    bg: 'from-[#020817] via-[#0a1628] to-[#0c1e3d]',
    tagColor: 'bg-[var(--brass)]/20 text-[var(--brass-bright)] border border-[var(--brass)]/40',
    isBrand: true,
    active: true,
    order: 0,
  },
  {
    id: 'slide-2',
    tag: 'Laptops profesionales',
    title: 'Dell · Lenovo',
    subtitle: 'Core i5 & i7',
    description: 'Portátiles de 13ª generación para trabajo remoto, diseño y productividad empresarial. Garantía oficial y soporte técnico incluido.',
    cta1Label: 'Ver laptops disponibles',
    cta1Href: '/products?category=laptops',
    cta2Label: '',
    cta2Href: '',
    image: '',
    imageAlt: '',
    bgImage: '/images/hero/bg-2.svg',
    imagePosition: 'center center',
    bg: 'from-[#0a0a0a] via-[#111827] to-[#1a2744]',
    tagColor: 'bg-white/15 text-white border border-white/25',
    isBrand: false,
    active: true,
    order: 1,
  },
  {
    id: 'slide-3',
    tag: 'Solución fiscal Venezuela',
    title: 'Impresoras',
    subtitle: 'Fiscales SENIAT',
    description: 'Modelos homologados: Epson TM-T20, Bixolon y más. Cumple la normativa fiscal venezolana con equipos certificados y en stock.',
    cta1Label: 'Ver equipos fiscales',
    cta1Href: '/products?category=equipos-fiscales',
    cta2Label: '',
    cta2Href: '',
    image: '',
    imageAlt: '',
    bgImage: '/images/hero/bg-3.svg',
    imagePosition: 'center center',
    bg: 'from-[#0c1445] via-[#0f1f5c] to-[#0a2a6e]',
    tagColor: 'bg-white/15 text-white border border-white/25',
    isBrand: false,
    active: true,
    order: 2,
  },
  {
    id: 'slide-4',
    tag: 'Infraestructura de red',
    title: 'Conecta tu',
    subtitle: 'empresa.',
    description: 'Routers, switches, access points y cableado estructurado TP-Link y Mercusys. Redes estables para hogares y empresas de cualquier tamaño.',
    cta1Label: 'Ver soluciones de red',
    cta1Href: '/products?category=redes',
    cta2Label: '',
    cta2Href: '',
    image: '',
    imageAlt: '',
    bgImage: '/images/hero/bg-4.svg',
    imagePosition: 'center center',
    bg: 'from-[#0a0a0a] via-[#141414] to-[#1c1c2e]',
    tagColor: 'bg-white/15 text-white border border-white/25',
    isBrand: false,
    active: true,
    order: 3,
  },
]

interface BannerStore {
  slides: BannerSlide[]
  addSlide: (data: Omit<BannerSlide, 'id' | 'order'>) => void
  updateSlide: (id: string, data: Partial<Omit<BannerSlide, 'id'>>) => void
  deleteSlide: (id: string) => void
  toggleActive: (id: string) => void
  moveUp: (id: string) => void
  moveDown: (id: string) => void
}

export const useBannerStore = create<BannerStore>()(
  persist(
    (set, get) => ({
      slides: DEFAULT_SLIDES,

      addSlide: (data) => {
        const slides = get().slides
        const maxOrder = slides.reduce((m, s) => Math.max(m, s.order), -1)
        const newSlide: BannerSlide = {
          ...data,
          id: `slide-${Date.now()}`,
          order: maxOrder + 1,
        }
        set({ slides: [...slides, newSlide] })
      },

      updateSlide: (id, data) => {
        set((state) => ({
          slides: state.slides.map((s) => (s.id === id ? { ...s, ...data } : s)),
        }))
      },

      deleteSlide: (id) => {
        set((state) => ({
          slides: state.slides
            .filter((s) => s.id !== id)
            .map((s, i) => ({ ...s, order: i })),
        }))
      },

      toggleActive: (id) => {
        set((state) => ({
          slides: state.slides.map((s) =>
            s.id === id ? { ...s, active: !s.active } : s
          ),
        }))
      },

      moveUp: (id) => {
        const slides = [...get().slides].sort((a, b) => a.order - b.order)
        const idx = slides.findIndex((s) => s.id === id)
        if (idx <= 0) return
        const updated = slides.map((s, i) => {
          if (i === idx - 1) return { ...s, order: idx }
          if (i === idx) return { ...s, order: idx - 1 }
          return s
        })
        set({ slides: updated })
      },

      moveDown: (id) => {
        const slides = [...get().slides].sort((a, b) => a.order - b.order)
        const idx = slides.findIndex((s) => s.id === id)
        if (idx < 0 || idx >= slides.length - 1) return
        const updated = slides.map((s, i) => {
          if (i === idx) return { ...s, order: idx + 1 }
          if (i === idx + 1) return { ...s, order: idx }
          return s
        })
        set({ slides: updated })
      },
    }),
    {
      name: 'enova-banners',
      version: 4,
      migrate: () => ({ slides: DEFAULT_SLIDES }),
    }
  )
)
