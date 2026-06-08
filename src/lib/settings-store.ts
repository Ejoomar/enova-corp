/**
 * Shared in-memory settings store.
 * Imported by both /api/admin/settings and /api/exchange-rate so they share
 * the same module-scope object.
 *
 * Values reset on server restart — a real database is needed for persistence.
 */
export const settingsStore = {
  general: {
    storeName:        "ENOVA CORP",
    storeEmail:       "Gerencia@enovacorp.co",
    storePhone:       "0422-3668201",
    storeAddress:     "Av. Andrés Bello, C.C. Alto Chama, Local 105-A, Mérida",
    storeDescription: "Tu tienda de tecnología de confianza",
    timezone:         "america-caracas",
    currency:         "usd",
  },
  store: {
    showOutOfStock:   true,
    showStockCount:   true,
    allowReviews:     true,
    shippingCost:     15,
    freeShippingFrom: 200,
    /** Manual BCV rate (Bs per $). Used as fallback when ve.dolarapi.com is unavailable. */
    bcvRate:          null as number | null,
  },
  notifications: {
    notifyNewOrders: true,
    notifyLowStock:  true,
  },
  payments: {
    acceptCards:    true,
    acceptTransfer: true,
    acceptDigital:  true,
  },
}
