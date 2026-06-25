import type { Listing } from './types'

export const API = import.meta.env.VITE_API_URL as string | undefined
export const apiEnabled = !!API

// ── token helpers ──────────────────────────────────────────────────────────
const TOKEN_KEY = 'fc_token'

export function getToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

export function setToken(t: string): void {
  try {
    localStorage.setItem(TOKEN_KEY, t)
  } catch {
    /* noop */
  }
}

export function clearToken(): void {
  try {
    localStorage.removeItem(TOKEN_KEY)
  } catch {
    /* noop */
  }
}

// ── generic fetch client ───────────────────────────────────────────────────
async function request<T>(method: string, path: string, body?: unknown): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  const token = getToken()
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(`${API}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  if (!res.ok) {
    let message = `Request failed: ${res.status}`
    try {
      const json = await res.json()
      if (json && json.error) message = json.error
    } catch {
      /* ignore parse error */
    }
    throw new Error(message)
  }

  return res.json() as Promise<T>
}

// ── API surface ────────────────────────────────────────────────────────────
export const api = {
  register(email: string, password: string, fullName: string) {
    return request<{ token: string; user: unknown; role: string; isNewUser: boolean }>(
      'POST',
      '/v1/auth/register',
      { email, password, fullName },
    )
  },

  login(email: string, password: string) {
    return request<{ token: string; user: unknown; role: string }>(
      'POST',
      '/v1/auth/login',
      { email, password },
    )
  },

  googleAuth(idToken: string) {
    return request<{ token: string; user: unknown; role: string; isNewUser: boolean }>(
      'POST',
      '/v1/auth/google',
      { idToken },
    )
  },

  listings(params: Record<string, string> = {}) {
    const qs = new URLSearchParams(params).toString()
    return request<{ items: unknown[]; page: number; total: number }>(
      'GET',
      `/v1/listings${qs ? '?' + qs : ''}`,
    )
  },

  listing(id: string) {
    return request<unknown>('GET', `/v1/listings/${id}`)
  },

  createOrder(body: { listingId: string; quantityKg: number; deliveryDate?: string; deliveryMethod?: string; payerPhone?: string }) {
    return request<{
      order: {
        id: string
        orderRef: string
        cropType: string
        quantityKg: number
        pricePerKg: string
        subtotal: string
        platformFee: string
        totalPaid: string
        status: string
        deliveryDate?: string
      }
      payment: { ok: boolean; code: string; message: string }
    }>('POST', '/v1/orders', body)
  },

  myOrders() {
    return request<{ ongoing: unknown[]; past: unknown[]; total: number }>('GET', '/v1/orders')
  },

  order(id: string) {
    return request<unknown>('GET', `/v1/orders/${id}`)
  },

  confirmReceive(id: string, pin?: string) {
    return request<{ order: unknown; payout: unknown }>(
      'PATCH',
      `/v1/orders/${id}/receive`,
      pin !== undefined ? { pin } : {},
    )
  },

  rateOrder(id: string, rating: number) {
    return request<{ ok: boolean; order: unknown }>('PATCH', `/v1/orders/${id}/rate`, { rating })
  },
}

// ── shape mapper ───────────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapApiListing(raw: any): Listing {
  const ratingCount: number = raw.farmer?.ratingCount ?? 0
  const ratingSum: number = raw.farmer?.ratingSum ?? 0
  return {
    id: raw.id as string,
    crop: raw.cropType as string,
    farmer: raw.farmer?.fullName as string,
    region: raw.region as string,
    district: raw.district as string,
    distanceKm: 0,
    price: Number(raw.pricePerKg),
    qty: Number(raw.qtyRemaining ?? raw.quantityKg),
    harvest: (raw.harvestDate as string | undefined)?.slice(0, 10) ?? '',
    rating: ratingCount > 0 ? ratingSum / ratingCount : 4.6,
    reviews: ratingCount,
    score: (raw.farmer?.farmScore as number | undefined) ?? 600,
    verified: raw.farmer?.verification === 'verified',
    ai: 'fair',
    trend: 0,
    storage: (raw.storage as string | undefined) ?? 'Stored',
    delivery: (raw.deliveryMethod as string | undefined) ?? 'Pickup',
  }
}
