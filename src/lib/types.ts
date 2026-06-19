export type Screen =
  | 'landing'
  | 'auth'
  | 'dashboard'
  | 'marketplace'
  | 'listing'
  | 'checkout'
  | 'orders'
  | 'tracking'
  | 'ussd'
  | 'farmer'
  | 'admin'

export type Theme = 'dark' | 'light'
export type AuthMode = 'signin' | 'signup'
export type MktView = 'grid' | 'list' | 'map'
export type FarmerTab = 'home' | 'add' | 'listings' | 'prices' | 'wallet'
export type AdminTab =
  | 'overview'
  | 'users'
  | 'listings'
  | 'orders'
  | 'payments'
  | 'sms'
  | 'settings'

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
  screen: Screen
  authMode: AuthMode
  selectedId: string
  orderQty: number
  payMethod: string
  paying: boolean
  paid: boolean
  trackStep: number
  rated: number
  showRating: boolean
  farmerTab: FarmerTab
  adminTab: AdminTab
  mktView: MktView
  mktCrop: string
  mktSearch: string
  mktSort: string
  mktVerified: boolean
  mktMin: number
  mktMax: number
  ussdNode: string
  toast: string
  token: string | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currentUser: any
  liveListings: Listing[] | null
}
