export type Theme = 'dark' | 'light'
export type Lang = 'en' | 'tw'
export type MktView = 'grid' | 'list' | 'map'

/** Mirrors the backend's JWT role claim (farmclient-api src/types/roles.ts). */
export type Role = 'farmer' | 'buyer' | 'agent' | 'admin' | 'superadmin'

export type AuthStatus = 'idle' | 'checking' | 'authed' | 'anon'

export type AiBand = 'fair' | 'low' | 'high'

export interface Listing {
  id: string
  crop: string
  farmer: string
  region: string
  district: string
  distanceKm: number
  price: number
  qty: number
  harvest: string
  rating: number
  reviews: number
  score: number
  verified: boolean
  ai: AiBand
  trend: number
  storage: string
  delivery: string
}

/** A listing decorated with display-ready strings + action callbacks. */
export interface DisplayListing extends Listing {
  priceStr: string
  distStr: string
  qtyStr: string
  ratingStr: string
  aiBg: string
  aiFg: string
  aiText: string
  photo: string
  initials: string
  selectFn: () => void
  orderFn: (e?: React.MouseEvent) => void
}

export interface Chip {
  bg: string
  fg: string
  label: string
}

export interface FarmState {
  theme: Theme
  lang: Lang
  orderQty: number
  payMethod: string
  paying: boolean
  mktView: MktView
  mktCrop: string
  mktSearch: string
  mktSort: string
  mktVerified: boolean
  mktDelivery: string[]
  mktMin: number
  mktMax: number
  ussdNode: string
  toast: string
  token: string | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currentUser: any
  liveListings: Listing[] | null
  role: Role | null
  authStatus: AuthStatus
  farmerScore: number | null
}
