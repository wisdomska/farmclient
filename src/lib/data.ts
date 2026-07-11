import type { AiBand, Chip, Listing } from './types'
import type { OrderStatus } from './orderStatus'

/** Mock marketplace inventory — 24 listings, 3 per crop, spanning all 16 regions. */
export const LISTINGS: Listing[] = [
  { id: 'L1', crop: 'Yam', farmer: 'Ama Boateng', region: 'Bono East', district: 'Techiman', distanceKm: 12, price: 4.2, qty: 1800, harvest: '15 Jul 2026', rating: 4.8, reviews: 64, score: 812, verified: true, ai: 'fair', trend: +3.2, storage: 'Dry barn, ventilated', delivery: 'Pickup or agent drop-off' },
  { id: 'L2', crop: 'Tomato', farmer: 'Adwoa Owusu', region: 'Ashanti', district: 'Kumasi', distanceKm: 8, price: 6.5, qty: 640, harvest: '02 Jul 2026', rating: 4.6, reviews: 41, score: 735, verified: true, ai: 'fair', trend: -1.4, storage: 'Cool shade, crated', delivery: 'Pickup' },
  { id: 'L3', crop: 'Maize', farmer: 'Ibrahim Mohammed', region: 'Northern', district: 'Tamale', distanceKm: 34, price: 1.8, qty: 5200, harvest: '28 Jun 2026', rating: 4.9, reviews: 118, score: 901, verified: true, ai: 'low', trend: +0.6, storage: 'Silo, moisture-controlled', delivery: 'Bulk transport' },
  { id: 'L4', crop: 'Plantain', farmer: 'Kofi Mensah', region: 'Eastern', district: 'Koforidua', distanceKm: 21, price: 3.4, qty: 980, harvest: '10 Jul 2026', rating: 4.4, reviews: 29, score: 688, verified: true, ai: 'fair', trend: +2.1, storage: 'Ambient, racked', delivery: 'Pickup or agent drop-off' },
  { id: 'L5', crop: 'Cassava', farmer: 'Esi Appiah', region: 'Central', district: 'Cape Coast', distanceKm: 46, price: 1.1, qty: 3100, harvest: '05 Jul 2026', rating: 4.7, reviews: 52, score: 770, verified: true, ai: 'fair', trend: 0, storage: 'Fresh, processed in 48h', delivery: 'Bulk transport' },
  { id: 'L6', crop: 'Pepper', farmer: 'Yaw Darko', region: 'Volta', district: 'Ho', distanceKm: 58, price: 8.0, qty: 420, harvest: '18 Jul 2026', rating: 4.5, reviews: 33, score: 712, verified: true, ai: 'high', trend: +5.8, storage: 'Cool shade, crated', delivery: 'Pickup' },
  { id: 'L7', crop: 'Onion', farmer: 'Abena Asante', region: 'Upper East', district: 'Bolgatanga', distanceKm: 72, price: 4.8, qty: 1500, harvest: '22 Jul 2026', rating: 4.6, reviews: 47, score: 744, verified: true, ai: 'fair', trend: -0.9, storage: 'Dry store, netted', delivery: 'Bulk transport' },
  { id: 'L8', crop: 'Rice', farmer: 'Kwaku Boahen', region: 'Volta', district: 'Ho', distanceKm: 61, price: 5.2, qty: 2400, harvest: '30 Jun 2026', rating: 4.8, reviews: 88, score: 856, verified: true, ai: 'fair', trend: +1.3, storage: 'Milled, bagged', delivery: 'Bulk transport' },
  { id: 'L9', crop: 'Maize', farmer: 'Salifu Abdulai', region: 'Upper West', district: 'Wa', distanceKm: 96, price: 2.0, qty: 3800, harvest: '25 Jun 2026', rating: 4.2, reviews: 18, score: 645, verified: false, ai: 'fair', trend: +1.2, storage: 'Crib, shelled', delivery: 'Bulk transport' },
  { id: 'L10', crop: 'Maize', farmer: 'Akosua Frimpong', region: 'Bono', district: 'Sunyani', distanceKm: 28, price: 1.9, qty: 2600, harvest: '01 Jul 2026', rating: 4.7, reviews: 56, score: 782, verified: true, ai: 'low', trend: 0, storage: 'Silo, dried', delivery: 'Pickup or agent drop-off' },
  { id: 'L11', crop: 'Yam', farmer: 'Kwabena Owusu', region: 'Savannah', district: 'Damongo', distanceKm: 88, price: 4.5, qty: 2200, harvest: '12 Jul 2026', rating: 4.5, reviews: 37, score: 731, verified: true, ai: 'high', trend: +4.1, storage: 'Dry barn', delivery: 'Bulk transport' },
  { id: 'L12', crop: 'Yam', farmer: 'Efua Mensimah', region: 'Oti', district: 'Dambai', distanceKm: 74, price: 3.9, qty: 1500, harvest: '08 Jul 2026', rating: 4.1, reviews: 12, score: 568, verified: false, ai: 'fair', trend: -0.8, storage: 'Ambient shed', delivery: 'Pickup' },
  { id: 'L13', crop: 'Tomato', farmer: 'Kojo Antwi', region: 'Greater Accra', district: 'Ada', distanceKm: 15, price: 6.9, qty: 480, harvest: '04 Jul 2026', rating: 4.8, reviews: 73, score: 803, verified: true, ai: 'high', trend: -2.2, storage: 'Cool shade, crated', delivery: 'Pickup or agent drop-off' },
  { id: 'L14', crop: 'Tomato', farmer: 'Lydia Asamoah', region: 'Upper East', district: 'Navrongo', distanceKm: 81, price: 5.8, qty: 720, harvest: '06 Jul 2026', rating: 4.4, reviews: 26, score: 694, verified: true, ai: 'low', trend: +0.9, storage: 'Shade net, crated', delivery: 'Bulk transport' },
  { id: 'L15', crop: 'Cassava', farmer: 'Yaa Pokuaa', region: 'Ahafo', district: 'Goaso', distanceKm: 39, price: 1.2, qty: 4100, harvest: '03 Jul 2026', rating: 4.7, reviews: 61, score: 858, verified: true, ai: 'fair', trend: +0.4, storage: 'Fresh, processed in 48h', delivery: 'Bulk transport' },
  { id: 'L16', crop: 'Cassava', farmer: 'Nana Adjei', region: 'Western', district: 'Takoradi', distanceKm: 52, price: 1.05, qty: 5200, harvest: '30 Jun 2026', rating: 4.0, reviews: 15, score: 611, verified: false, ai: 'low', trend: 0, storage: 'Fresh, same-day lift', delivery: 'Pickup' },
  { id: 'L17', crop: 'Plantain', farmer: 'Grace Tetteh', region: 'Western North', district: 'Sefwi Wiawso', distanceKm: 66, price: 3.1, qty: 1300, harvest: '09 Jul 2026', rating: 4.8, reviews: 58, score: 869, verified: true, ai: 'fair', trend: +1.8, storage: 'Ambient, racked', delivery: 'Pickup or agent drop-off' },
  { id: 'L18', crop: 'Plantain', farmer: 'Samuel Boadu', region: 'Ashanti', district: 'Obuasi', distanceKm: 24, price: 3.6, qty: 760, harvest: '14 Jul 2026', rating: 4.3, reviews: 22, score: 715, verified: true, ai: 'high', trend: +2.6, storage: 'Ambient shed', delivery: 'Pickup' },
  { id: 'L19', crop: 'Rice', farmer: 'Fatima Alhassan', region: 'North East', district: 'Nalerigu', distanceKm: 92, price: 5.0, qty: 3100, harvest: '27 Jun 2026', rating: 4.9, reviews: 94, score: 921, verified: true, ai: 'fair', trend: +1.1, storage: 'Milled, bagged', delivery: 'Bulk transport' },
  { id: 'L20', crop: 'Rice', farmer: 'Daniel Quaye', region: 'Volta', district: 'Sogakope', distanceKm: 44, price: 5.4, qty: 1900, harvest: '02 Jul 2026', rating: 4.2, reviews: 19, score: 668, verified: false, ai: 'fair', trend: -0.5, storage: 'Paddy, dried', delivery: 'Bulk transport' },
  { id: 'L21', crop: 'Pepper', farmer: 'Comfort Adu', region: 'Central', district: 'Kasoa', distanceKm: 19, price: 7.4, qty: 350, harvest: '16 Jul 2026', rating: 4.6, reviews: 44, score: 742, verified: true, ai: 'low', trend: +3.4, storage: 'Cool shade, crated', delivery: 'Pickup or agent drop-off' },
  { id: 'L22', crop: 'Pepper', farmer: 'Mensah Kotey', region: 'Greater Accra', district: 'Dodowa', distanceKm: 11, price: 8.4, qty: 280, harvest: '20 Jul 2026', rating: 3.9, reviews: 9, score: 597, verified: false, ai: 'high', trend: +6.2, storage: 'Ambient, same-day', delivery: 'Pickup' },
  { id: 'L23', crop: 'Onion', farmer: 'Awudu Seidu', region: 'Upper West', district: 'Tumu', distanceKm: 102, price: 4.4, qty: 2100, harvest: '19 Jul 2026', rating: 4.5, reviews: 31, score: 787, verified: true, ai: 'fair', trend: -1.1, storage: 'Dry store, netted', delivery: 'Bulk transport' },
  { id: 'L24', crop: 'Onion', farmer: 'Patience Nyarko', region: 'Eastern', district: 'Nsawam', distanceKm: 26, price: 5.1, qty: 900, harvest: '24 Jul 2026', rating: 4.4, reviews: 27, score: 703, verified: true, ai: 'fair', trend: +0.7, storage: 'Dry store, netted', delivery: 'Pickup or agent drop-off' },
]

/**
 * Demo orders used when the live API is unavailable. Status is a canonical
 * OrderStatus — all presentation (chip, track step, label) derives from
 * lib/orderStatus.ts. The first two are "on the way", the rest are past.
 */
export interface MockOrder {
  id: string
  lid: string
  qty: number
  date: string
  status: OrderStatus
}

export const MOCK_ORDERS: MockOrder[] = [
  { id: 'ORD-2044', lid: 'L13', qty: 80, date: '18 Jun 2026', status: 'pending_payment' },
  { id: 'ORD-2041', lid: 'L2', qty: 120, date: '16 Jun 2026', status: 'in_progress' },
  { id: 'ORD-2038', lid: 'L3', qty: 500, date: '15 Jun 2026', status: 'confirmed' },
  { id: 'ORD-2036', lid: 'L19', qty: 300, date: '14 Jun 2026', status: 'delivered' },
  { id: 'ORD-2033', lid: 'L1', qty: 600, date: '09 Jun 2026', status: 'completed' },
  { id: 'ORD-2027', lid: 'L4', qty: 350, date: '01 Jun 2026', status: 'completed' },
  { id: 'ORD-1994', lid: 'L6', qty: 80, date: '24 May 2026', status: 'disputed' },
]

/** Statuses that count as "on the way" in the buyer's order list. */
export const ONGOING_STATUSES: OrderStatus[] = ['pending_payment', 'confirmed', 'in_progress', 'delivered']

export function fmtGHS(n: number): string {
  return 'GHS ' + Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

/** One quantity formatter app-wide: thousands separator + lowercase "kg". */
export function fmtQty(n: number): string {
  return n.toLocaleString('en-US') + ' kg'
}

/** One percentage formatter app-wide: explicit sign, one decimal. */
export function fmtPct(n: number): string {
  return (n > 0 ? '+' : '') + n.toFixed(1) + '%'
}

export function aiLabel(ai: AiBand): string {
  return ai === 'fair' ? 'Fair price' : ai === 'low' ? 'Good price' : 'A bit high'
}

export function aiColors(ai: AiBand): { bg: string; fg: string } {
  if (ai === 'fair') return { bg: 'var(--success-dim)', fg: 'var(--success)' }
  if (ai === 'low') return { bg: 'var(--primary-dim)', fg: 'var(--primary)' }
  return { bg: 'var(--warning-dim)', fg: 'var(--warning)' }
}

const CHIP_MAP: Record<string, Chip> = {
  active: { bg: 'var(--primary-dim)', fg: 'var(--primary)', label: 'In progress' },
  confirmed: { bg: 'var(--success-dim)', fg: 'var(--success)', label: 'Farmer confirmed' },
  pending: { bg: 'var(--warning-dim)', fg: 'var(--warning)', label: 'Pending' },
  delivered: { bg: 'var(--success-dim)', fg: 'var(--success)', label: 'Delivered' },
  disputed: { bg: 'var(--error-dim)', fg: 'var(--error)', label: 'Disputed' },
  sold: { bg: 'var(--bg-tertiary)', fg: 'var(--text-secondary)', label: 'Sold' },
}

export function chip(key: string): Chip {
  return CHIP_MAP[key] || CHIP_MAP.active
}

const CROP_PHOTO_MAP: Record<string, string> = {
  Tomato: 'photo-1741517287225-7cd8d44b3cf3',
  Pepper: 'photo-1471193945509-9ad0617afabf',
  Onion: 'photo-1471193945509-9ad0617afabf',
  Maize: 'photo-1574323347407-f5e1ad6d020b',
  Rice: 'photo-1574323347407-f5e1ad6d020b',
  Sorghum: 'photo-1574323347407-f5e1ad6d020b',
  Soybean: 'photo-1574323347407-f5e1ad6d020b',
  Yam: 'photo-1518977676601-b53f82aba655',
  Cassava: 'photo-1518977676601-b53f82aba655',
  Plantain: 'photo-1605000797499-95a51c5269ae',
}

/**
 * Crop photo URL, sized for the slot that renders it — request only the pixels
 * needed (mobile-data-friendly) instead of shipping 900px images everywhere.
 */
export function cropPhoto(crop: string, w = 600): string {
  return (
    'https://images.unsplash.com/' +
    (CROP_PHOTO_MAP[crop] || 'photo-1605000797499-95a51c5269ae') +
    `?auto=format&fit=crop&w=${w}&q=60`
  )
}

export const HERO_IMG = 'https://images.unsplash.com/photo-1752917680382-3ac274d84103?auto=format&fit=crop&w=1100&q=78'
export const FARM_SCENE = 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=1100&q=72'

// ── USSD flow ──────────────────────────────────────────────
export interface UssdNode {
  title: string
  body: string
  opts: Record<string, string>
}

export const USSD_NODES: Record<string, UssdNode> = {
  root: { title: 'FarmClient · *789#', body: 'Welcome to FarmClient\n\n1. Sell my crops\n2. See prices\n3. My money\n4. Get a loan', opts: { '1': 'crop', '2': 'prices', '3': 'wallet', '4': 'loan' } },
  crop: { title: 'Sell my crops', body: 'Pick your crop:\n\n1. Maize   2. Yam\n3. Cassava 4. Tomato\n5. Plantain', opts: { '1': 'qty', '2': 'qty', '3': 'qty', '4': 'qty', '5': 'qty' } },
  qty: { title: 'Sell my crops', body: 'How much do you have?\n\n1. 500 kg\n2. 1,000 kg\n3. 1,800 kg', opts: { '1': 'price', '2': 'price', '3': 'price' } },
  price: { title: 'Sell my crops', body: 'A fair price today is\nGHS 4.20 for 1 kg of Yam.\n\n1. Use this price\n2. Set my own price', opts: { '1': 'confirm', '2': 'confirm' } },
  confirm: { title: 'Sell my crops', body: 'Sell 1,800 kg of Yam at\nGHS 4.20 each in Techiman?\n\n1. Yes, sell it\n2. No, go back', opts: { '1': 'done', '2': 'root' } },
  done: { title: 'All done', body: 'Done! Your Yam is now\nfor sale.\nYour number: FV-00841\n\nBuyers near you will get\na text message.\nDial *789# any time.', opts: {} },
  prices: { title: 'Today’s prices', body: 'For 1 kg today:\n\nYam       GHS 4.20  up\nMaize     GHS 1.80  same\nTomato    GHS 6.50  down\nCassava   GHS 1.10  up\n\n0. Go back', opts: { '0': 'root' } },
  wallet: { title: 'My money', body: 'You have: GHS 12,480.00\nLast payment: GHS 780.00\n  Order 2041 · 14 Jun 2026\n\n0. Go back', opts: { '0': 'root' } },
  loan: { title: 'Get a loan', body: 'Trust score: 795\nYou can borrow money.\n\nYou can get up to\nGHS 3,000.00\n\n1. Get loan now\n0. Go back', opts: { '1': 'done', '0': 'root' } },
}

export function keypadSub(d: string): string {
  const m: Record<string, string> = { '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl', '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz' }
  return m[d] || ''
}

export const CROPS_ALL = ['Maize', 'Yam', 'Cassava', 'Tomato', 'Plantain', 'Rice', 'Pepper', 'Onion']
