# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BasicTechShop is an e-commerce application for computer products built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, and shadcn/ui. Currently in UI-only phase with mock data - backend integration (PostgreSQL/Prisma) planned for future.

### Component Organization
```
src/components/
├── layout/      # Header, Footer, TopBar, MobileNav, ThemeToggle
├── home/        # HeroBanner, CategoryGrid, FeaturedProducts, BrandSection
├── products/    # ProductCard, ProductGrid, FilterSidebar, filters
├── cart/        # CartItem, CartSummary
├── checkout/    # ShippingForm, PaymentForm, OrderSummary
├── admin/       # AdminSidebar, AdminHeader, StatsCard
├── profile/     # ProfileSidebar, ProfileMobileNav
├── providers/   # ThemeProvider (next-themes wrapper)
└── ui/          # shadcn/ui components
```

### Data Layer
- `src/data/mock-products.ts` - Products, categories, brands
- `src/data/mock-user.ts` - User profile, addresses, orders, favorites
- `src/data/mock-admin.ts` - Admin stats, users, payments
- `src/types/index.ts` - Core interfaces (Product, Category, CartItem, FilterState)

### Styling System
- Tailwind CSS v4 with CSS variables in OKLCH color space
- Dark/light themes via `next-themes` (class strategy)
- Theme variables in `src/app/globals.css`
- Use `cn()` utility from `src/lib/utils.ts` for class merging

### Key Patterns

- Server Components by default, `"use client"` for interactivity
- useState for local UI state (filters, quantities)
- useMemo for computed values (filtered/sorted products)
- Layouts with nested routes for shared UI (admin, profile)
- Mobile-first responsive design with Sheet components for mobile nav

## Configuration

- **Path alias**: `@/*` maps to `./src/*`
- **Images**: Remote patterns configured for `images.unsplash.com`
- **shadcn/ui**: "new-york" style, "neutral" base color, lucide icons

## Project Plan

See `/docs/PLAN.md` for detailed implementation phases and roadmap.


## Rules

- Al momento de crear datos nuevos no uses Modales, usa paginas dedicadas para los formularios 
- no uses server actions, usa Route handlers
- para manejo de estado global usa Zustand
- para formularios usar react-hook-form y zod

## Deploy — OBLIGATORIO

**Después de CADA cambio de código en este proyecto, sin excepción:**

```bash
git add <archivos modificados>
git commit -m "tipo: descripción del cambio"
git push origin master
```

Vercel detecta el push y despliega automáticamente.
No preguntar si hacer deploy — siempre hacerlo al terminar cualquier tarea.

### Regla de versión de store
Cada vez que cambien URLs de imágenes en `src/data/mock-products.ts`,
incrementar `version` en `src/stores/products-store.ts` para invalidar el caché de localStorage.