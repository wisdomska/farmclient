import type { AiBand, Chip, Listing } from './types'

export const LISTINGS: Listing[] = [
  { id: 'L1', crop: 'Yam', farmer: 'Ama Boateng', region: 'Bono East', district: 'Techiman', distanceKm: 12, price: 4.2, qty: 1800, harvest: '15 Jul 2026', rating: 4.8, reviews: 64, score: 812, verified: true, ai: 'fair', trend: +3.2, storage: 'Dry barn, ventilated', delivery: 'Pickup or agent drop-off' },
  { id: 'L2', crop: 'Tomato', farmer: 'Adwoa Owusu', region: 'Ashanti', district: 'Kumasi', distanceKm: 8, price: 6.5, qty: 640, harvest: '02 Jul 2026', rating: 4.6, reviews: 41, score: 735, verified: true, ai: 'fair', trend: -1.4, storage: 'Cool shade, crated', delivery: 'Pickup' },
  { id: 'L3', crop: 'Maize', farmer: 'Ibrahim Mohammed', region: 'Northern', district: 'Tamale', distanceKm: 34, price: 1.8, qty: 5200, harvest: '28 Jun 2026', rating: 4.9, reviews: 118, score: 901, verified: true, ai: 'low', trend: +0.6, storage: 'Silo, moisture-controlled', delivery: 'Bulk transport' },
  { id: 'L4', crop: 'Plantain', farmer: 'Kofi Mensah', region: 'Eastern', district: 'Koforidua', distanceKm: 21, price: 3.4, qty: 980, harvest: '10 Jul 2026', rating: 4.4, reviews: 29, score: 688, verified: true, ai: 'fair', trend: +2.1, storage: 'Ambient, racked', delivery: 'Pickup or agent drop-off' },
  { id: 'L5', crop: 'Cassava', farmer: 'Esi Appiah', region: 'Central', district: 'Cape Coast', distanceKm: 46, price: 1.1, qty: 3100, harvest: '05 Jul 2026', rating: 4.7, reviews: 52, score: 770, verified: true, ai: 'fair', trend: 0, storage: 'Fresh, processed in 48h', delivery: 'Bulk transport' },
  { id: 'L6', crop: 'Pepper', farmer: 'Yaw Darko', region: 'Volta', district: 'Ho', distanceKm: 58, price: 8.0, qty: 420, harvest: '18 Jul 2026', rating: 4.5, reviews: 33, score: 712, verified: true, ai: 'high', trend: +5.8, storage: 'Cool shade, crated', delivery: 'Pickup' },
  { id: 'L7', crop: 'Onion', farmer: 'Abena Asante', region: 'Upper East', district: 'Bolgatanga', distanceKm: 72, price: 4.8, qty: 1500, harvest: '22 Jul 2026', rating: 4.6, reviews: 47, score: 744, verified: true, ai: 'fair', trend: -0.9, storage: 'Dry store, netted', delivery: 'Bulk transport' },
  { id: 'L8', crop: 'Rice', farmer: 'Kwaku Boahen', region: 'Volta', district: 'Ho', distanceKm: 61, price: 5.2, qty: 2400, harvest: '30 Jun 2026', rating: 4.8, reviews: 88, score: 856, verified: true, ai: 'fair', trend: +1.3, storage: 'Milled, bagged', delivery: 'Bulk transport' },
]

export function fmtGHS(n: number): string {
  return 'GHS ' + Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
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

export function cropPhoto(crop: string): string {
  return (
    'https://images.unsplash.com/' +
    (CROP_PHOTO_MAP[crop] || 'photo-1605000797499-95a51c5269ae') +
    '?auto=format&fit=crop&w=900&q=70'
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
  loan: { title: 'Get a loan', body: 'Trust score: 812\nYou can borrow money.\n\nYou can get up to\nGHS 3,000.00\n\n1. Get loan now\n0. Go back', opts: { '1': 'done', '0': 'root' } },
}

export function keypadSub(d: string): string {
  const m: Record<string, string> = { '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl', '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz' }
  return m[d] || ''
}

export const CROPS_ALL = ['Maize', 'Yam', 'Cassava', 'Tomato', 'Plantain', 'Rice', 'Pepper', 'Onion']
