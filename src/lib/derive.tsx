import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useStore } from '../store'
import {
  CROPS_ALL,
  LISTINGS,
  MOCK_ONGOING_COUNT,
  MOCK_ORDERS,
  USSD_NODES,
  aiColors,
  aiLabel,
  chip,
  cropPhoto,
  fmtGHS,
  keypadSub,
} from './data'
import { statusChip } from './orderStatus'
import { DEMO_FARMER_SCORE, farmScoreTier, farmScoreTierLabel } from './farmScore'
import type { DisplayListing, Listing } from './types'
import { apiEnabled } from './api'

/**
 * Central derived-state hook — the React port of the prototype's
 * renderVals() + screenVals() methods. Screens consume this and stay
 * almost purely presentational. Navigation is URL-driven via react-router.
 */
export function useFarm() {
  const { state: s, set, toggleTheme, showToast, scrollToId, ussdSend, loginEmail, registerEmail, loginGoogle, logout, loadListings, placeOrder, setLang } = useStore()
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams<{ listingId?: string }>()

  const disp = (l: Listing): DisplayListing => {
    const ai = aiColors(l.ai)
    return {
      ...l,
      priceStr: fmtGHS(l.price),
      distStr: l.district + ' · ' + l.distanceKm + ' km',
      qtyStr: l.qty.toLocaleString('en-US') + ' kg',
      ratingStr: l.rating.toFixed(1),
      aiBg: ai.bg,
      aiFg: ai.fg,
      aiText: aiLabel(l.ai),
      photo: cropPhoto(l.crop),
      initials: l.farmer.split(' ').map((w) => w[0]).join('').slice(0, 2),
      selectFn: () => {
        navigate(`/app/marketplace/${l.id}`)
      },
      orderFn: (e?: React.MouseEvent) => {
        if (e && e.stopPropagation) e.stopPropagation()
        set({ orderQty: 100 })
        navigate(`/app/checkout/${l.id}`)
      },
    }
  }

  // Use live API listings when available; fall back to mock data
  const source: Listing[] = s.liveListings ?? LISTINGS
  const all = source.map(disp)
  const sel = source.find((l) => l.id === params.listingId) || source[0] || LISTINGS[0]
  const selD = disp(sel)
  const subtotal = sel.price * s.orderQty
  const fee = subtotal * 0.015
  const total = subtotal + fee

  // ── ticker ──
  const tickerSrc: [string, number, number][] = [
    ['Yam', 4.2, 3.2], ['Maize', 1.8, 0], ['Tomato', 6.5, -1.4], ['Cassava', 1.1, 0.6],
    ['Plantain', 3.4, 2.1], ['Rice', 5.2, 1.3], ['Pepper', 8.0, 5.8], ['Onion', 4.8, -0.9],
    ['Soybean', 3.9, 0.4], ['Sorghum', 2.6, -0.3],
  ]
  const ticker = tickerSrc.map(([crop, p, t]) => ({
    crop,
    priceStr: fmtGHS(p),
    trend: t,
    trendStr: (t > 0 ? '+' : '') + t.toFixed(1) + '%',
    color: t > 0 ? 'var(--success)' : t < 0 ? 'var(--error)' : 'var(--text-secondary)',
  }))

  // ── marketplace ──
  const cropTabsOrdered = ['All', 'Maize', 'Yam', 'Cassava', 'Tomato', 'Plantain', 'Rice', 'Pepper', 'Onion'].map((c) => ({
    label: c,
    active: s.mktCrop === c,
    onClick: () => set({ mktCrop: c }),
  }))

  const q = (s.mktSearch || '').trim().toLowerCase()
  let mktFiltered = all.filter((l) => {
    if (s.mktCrop !== 'All' && l.crop !== s.mktCrop) return false
    if (s.mktVerified && !l.verified) return false
    if (l.price < s.mktMin || l.price > s.mktMax) return false
    if (q && !(l.crop + ' ' + l.farmer + ' ' + l.district + ' ' + l.region).toLowerCase().includes(q)) return false
    return true
  })
  const sorters: Record<string, (a: DisplayListing, b: DisplayListing) => number> = {
    'price-asc': (a, b) => a.price - b.price,
    'price-desc': (a, b) => b.price - a.price,
    near: (a, b) => a.distanceKm - b.distanceKm,
    rating: (a, b) => b.rating - a.rating,
  }
  if (sorters[s.mktSort]) mktFiltered = mktFiltered.slice().sort(sorters[s.mktSort])

  const cropChecks = CROPS_ALL.map((c) => ({
    label: c,
    on: s.mktCrop === c,
    onClick: () => set({ mktCrop: s.mktCrop === c ? 'All' : c }),
  }))

  // ── orders (mock fallback) — presentation derives from lib/orderStatus ──
  const mkOrder = (m: (typeof MOCK_ORDERS)[number]) => {
    const l = (source.find((x) => x.id === m.lid) ?? LISTINGS.find((x) => x.id === m.lid))!
    const c = statusChip(m.status)
    return {
      id: m.id,
      crop: l.crop,
      photo: cropPhoto(l.crop),
      farmer: l.farmer,
      district: l.district,
      qtyStr: m.qty.toLocaleString('en-US') + ' kg',
      date: m.date,
      totalStr: fmtGHS(l.price * m.qty),
      bg: c.bg,
      fg: c.fg,
      label: c.label,
      onClick: () => navigate(`/app/orders/${m.id}`),
    }
  }
  const ordersOngoing = MOCK_ORDERS.slice(0, MOCK_ONGOING_COUNT).map(mkOrder)
  const ordersPast = MOCK_ORDERS.slice(MOCK_ONGOING_COUNT).map(mkOrder)

  // ── dashboard active orders (same mock source, same status derivation) ──
  const orders = MOCK_ORDERS.slice(0, MOCK_ONGOING_COUNT).map(mkOrder)

  // ── payment methods ──
  const payDefs: [string, string, string][] = [
    ['mtn', 'MTN MoMo', '024 · 054 · 055 · 059'],
    ['telecel', 'Telecel Cash', '020 · 050'],
    ['at', 'AT Money', '026 · 056 · 027 · 057'],
    ['bank', 'Bank transfer', 'GHS account'],
  ]
  const payMethods = payDefs.map(([key, name, desc]) => ({ key, name, desc, active: s.payMethod === key, onClick: () => set({ payMethod: key }) }))

  // ── farmer wallet ──
  const txns = [
    { label: 'Payout — ORD-2041 Tomato', sub: '14 Jun 2026 · Disbursements', amt: '+ ' + fmtGHS(780), pos: true },
    { label: 'Payout — ORD-2033 Yam', sub: '09 Jun 2026 · Disbursements', amt: '+ ' + fmtGHS(2520), pos: true },
    { label: 'Harvest advance repayment', sub: '05 Jun 2026 · Auto-deduct', amt: '– ' + fmtGHS(150), pos: false },
    { label: 'Payout — ORD-2027 Plantain', sub: '01 Jun 2026 · Disbursements', amt: '+ ' + fmtGHS(1190), pos: true },
  ]
  const myListings = [
    { crop: 'Yam', qtyStr: '1,800 kg', priceStr: fmtGHS(4.2) + '/kg', photo: cropPhoto('Yam'), ...chip('active'), label: 'Selling' },
    { crop: 'Plantain', qtyStr: '980 kg', priceStr: fmtGHS(3.4) + '/kg', photo: cropPhoto('Plantain'), ...chip('active'), label: 'Selling' },
    { crop: 'Cassava', qtyStr: '3,100 kg', priceStr: fmtGHS(1.1) + '/kg', photo: cropPhoto('Cassava'), ...chip('sold') },
  ]
  const addCrops = CROPS_ALL.map((c, i) => ({ crop: c, active: i === 1 }))

  // ── farmer's own score (live when available, demo fallback) ──
  const farmerScore = s.farmerScore ?? DEMO_FARMER_SCORE
  const farmerScoreTierText = farmScoreTierLabel(farmScoreTier(farmerScore))

  // ── prices regional ──
  const priceRegions = [
    { region: 'Bono East', priceStr: fmtGHS(4.2), trend: 3.2 },
    { region: 'Ashanti', priceStr: fmtGHS(4.05), trend: 1.1 },
    { region: 'Northern', priceStr: fmtGHS(3.8), trend: -0.6 },
    { region: 'Greater Accra', priceStr: fmtGHS(4.55), trend: 2.4 },
    { region: 'Volta', priceStr: fmtGHS(3.95), trend: 0 },
  ]
  const priceSeries = [3.6, 3.7, 3.65, 3.8, 3.95, 4.0, 3.9, 4.05, 4.1, 4.2]

  // ── admin ──
  const kpis = [
    { label: 'Farmers', value: '2,041,883', delta: '+12.4k', iconPaths: ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2'] },
    { label: 'Buyers', value: '3,412', delta: '+86', iconPaths: ['M3 3h18v4H3z', 'M19 7v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7'] },
    { label: 'Volume (30d)', value: 'GHS 18.4M', delta: '+9.1%', iconPaths: ['M3 3v18h18', 'M7 14l4-4 3 3 5-6'] },
    { label: 'Active listings', value: '9,720', delta: '+318', iconPaths: ['M3 3h7v7H3z', 'M14 3h7v7h-7z', 'M14 14h7v7h-7z', 'M3 14h7v7H3z'] },
  ]
  const revenue = [42, 48, 45, 53, 60, 58, 64, 71, 68, 74, 80, 77, 86, 92]
  const topCrops = [
    { crop: 'Maize', vol: '248,200 kg', val: 'GHS 446,760' },
    { crop: 'Yam', vol: '132,400 kg', val: 'GHS 556,080' },
    { crop: 'Tomato', vol: '61,800 kg', val: 'GHS 401,700' },
    { crop: 'Cassava', vol: '198,500 kg', val: 'GHS 218,350' },
    { crop: 'Rice', vol: '88,200 kg', val: 'GHS 458,640' },
  ]
  const disputes = [
    { id: 'ORD-1994', buyer: 'Golden Fork', farmer: 'Yaw Darko', reason: 'Quantity short by 8%', ...chip('disputed') },
    { id: 'ORD-1981', buyer: 'AccraFresh Ltd', farmer: 'Esi Appiah', reason: 'Quality dispute — moisture', ...chip('disputed') },
  ]
  const smsLog = [
    { to: '+233 24 •• 1042', crop: 'Yam', status: 'Delivered', time: '11:02 am', ok: true },
    { to: '+233 20 •• 7781', crop: 'Maize', status: 'Delivered', time: '11:02 am', ok: true },
    { to: '+233 55 •• 3390', crop: 'Tomato', status: 'Pending', time: '11:03 am', ok: false },
    { to: '+233 26 •• 5567', crop: 'Plantain', status: 'Delivered', time: '11:03 am', ok: true },
  ]
  // Farmer rows carry their FarmScore (same values as their marketplace listings);
  // buyers/agents have none.
  const usersRows: { name: string; role: string; loc: string; joined: string; bg: string; fg: string; label: string; score: number | null }[] = [
    { name: 'Ama Boateng', role: 'Farmer', loc: 'Techiman, Bono East', joined: '12 Mar 2026', ...chip('confirmed'), label: 'Verified', score: 812 },
    { name: 'Kwame Asante', role: 'Buyer', loc: 'Accra', joined: '04 Feb 2026', ...chip('confirmed'), label: 'Verified', score: null },
    { name: 'Ibrahim Mohammed', role: 'Farmer', loc: 'Tamale, Northern', joined: '21 Apr 2026', ...chip('confirmed'), label: 'Verified', score: 901 },
    { name: 'Yaw Mensah', role: 'Field agent', loc: 'Techiman, Bono East', joined: '09 Jan 2026', ...chip('active'), label: 'Active', score: null },
    { name: 'Adwoa Owusu', role: 'Farmer', loc: 'Kumasi, Ashanti', joined: '30 May 2026', ...chip('pending'), label: 'Pending', score: 735 },
  ]
  const ordersRows = [
    { id: 'ORD-2041', crop: 'Tomato · 120 kg', who: 'Golden Fork', amt: fmtGHS(780), ...statusChip('in_progress') },
    { id: 'ORD-2038', crop: 'Maize · 500 kg', who: 'AccraFresh Ltd', amt: fmtGHS(900), ...statusChip('confirmed') },
    { id: 'ORD-2033', crop: 'Yam · 600 kg', who: 'Golden Fork', amt: fmtGHS(2520), ...statusChip('completed') },
    { id: 'ORD-2027', crop: 'Plantain · 350 kg', who: 'Kwik Foods', amt: fmtGHS(1190), ...statusChip('completed') },
    { id: 'ORD-1994', crop: 'Pepper · 80 kg', who: 'Golden Fork', amt: fmtGHS(640), ...statusChip('disputed') },
  ]
  const paymentsRows = [
    { ref: 'PAY-7741', type: 'Payout to farmer', who: 'Ama Boateng', amt: '+ ' + fmtGHS(780), date: '14 Jun 2026', pos: true },
    { ref: 'PAY-7740', type: 'Buyer deposit', who: 'Golden Fork', amt: '– ' + fmtGHS(780), date: '13 Jun 2026', pos: false },
    { ref: 'PAY-7738', type: 'Payout to farmer', who: 'Ibrahim Mohammed', amt: '+ ' + fmtGHS(900), date: '12 Jun 2026', pos: true },
    { ref: 'PAY-7735', type: 'Loan repayment', who: 'Ama Boateng', amt: '– ' + fmtGHS(150), date: '05 Jun 2026', pos: false },
  ]

  const heroStats = [
    { value: '2,000,000+', label: 'Farmers across Ghana' },
    { value: 'GHS 1.9B', label: 'Wasted food we help save' },
    { value: '11 crops', label: 'You can buy and sell' },
    { value: '16 regions', label: 'All over the country' },
  ]
  const howItWorks = [
    { num: '01', title: 'The farmer shows their crops', desc: 'On any phone, the farmer says what they grew and how much. We suggest a fair price for them.', iconPaths: ['M7 20h10', 'M10 20c5.5-2.5.8-6.4 3-10', 'M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z'] },
    { num: '02', title: 'The buyer orders and pays', desc: 'The buyer picks what they need and pays. The money is held safely until the food arrives.', iconPaths: ['M2 3h20v14H2z', 'M2 17l4 4', 'M22 17l-4 4', 'M12 7v6', 'M9 10h6'] },
    { num: '03', title: 'The farmer gets paid', desc: 'Once the buyer confirms the food, the farmer is paid the same day, straight to their phone.', iconPaths: ['M19 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7', 'M16 17h6', 'M19 14l3 3-3 3'] },
  ]
  const footerCols = [
    { title: 'The market', links: ['See all crops', 'Trusted farmers', 'Today’s prices', 'Map view'] },
    { title: 'For farmers', links: ['Dial *789#', 'Get a small loan', 'Trust score', 'Our field helpers'] },
    { title: 'About us', links: ['Our story', 'How it works', 'Privacy', 'Contact us'] },
  ]

  const isSignUp = location.pathname === '/sign-up'

  return {
    s,
    theme: s.theme,
    toggleTheme,
    showToast,
    toast: s.toast,

    // api / auth
    apiEnabled,
    loginEmail,
    registerEmail,
    loginGoogle,
    logout,
    loadListings,
    liveListings: s.liveListings,
    currentUser: s.currentUser,
    role: s.role,
    authStatus: s.authStatus,

    // i18n
    lang: s.lang,
    setLang,

    // nav (URL-driven)
    goAuth: () => navigate('/sign-in'),
    goMarketplace: () => navigate('/app/marketplace'),
    goPublicMarket: () => navigate('/marketplace'),
    goDashboard: () => navigate('/app'),
    goHome: () => navigate('/'),
    goOrders: () => navigate('/app/orders'),
    goOrder: (id: string) => navigate(`/app/orders/${id}`),
    goListing: (id: string) => navigate(`/app/marketplace/${id}`),
    goSettings: () => navigate('/app/settings'),
    goPayments: () => navigate('/app/settings/payment'),
    goUssd: () => scrollToId('fc-ussd'),
    navHow: () => scrollToId('fc-how'),
    navFarmers: () => scrollToId('fc-ussd'),
    navStory: () => scrollToId('fc-story'),

    // landing
    heroStats,
    howItWorks,
    footerCols,
    recommended: all.slice(0, 4),

    // auth
    isSignUp,
    authTitle: isSignUp ? 'Create your account' : 'Welcome back',
    authSub: isSignUp ? 'Start sourcing verified produce in minutes.' : 'Sign in to manage your orders and listings.',
    authCta: isSignUp ? 'Create account' : 'Sign in',
    authSwitchText: isSignUp ? 'Already have an account?' : 'New to FarmClient?',
    authSwitchCta: isSignUp ? 'Sign in' : 'Create an account',
    setSignIn: () => navigate('/sign-in', { replace: true }),
    setSignUp: () => navigate('/sign-up', { replace: true }),
    toggleAuthMode: () => navigate(isSignUp ? '/sign-in' : '/sign-up', { replace: true }),

    // dashboard / marketplace shared
    ticker,
    quickStats: [
      { label: 'Total spent (all time)', value: fmtGHS(48250) },
      { label: 'Orders this month', value: '14' },
      { label: 'Listings browsed', value: '132' },
    ],
    cropTabs: cropTabsOrdered,
    orders,
    mktSearch: s.mktSearch,
    setSearch: (e: React.ChangeEvent<HTMLInputElement>) => set({ mktSearch: e.target.value }),
    searchToMarket: (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        set({ mktSearch: (e.target as HTMLInputElement).value })
        navigate(s.authStatus === 'authed' ? '/app/marketplace' : '/marketplace')
      }
    },

    // marketplace
    mktFiltered,
    mktView: s.mktView,
    mktCount: mktFiltered.length,
    gridActive: s.mktView === 'grid',
    listActive: s.mktView === 'list',
    mapActive: s.mktView === 'map',
    setGrid: () => set({ mktView: 'grid' }),
    setList: () => set({ mktView: 'list' }),
    setMap: () => set({ mktView: 'map' }),
    mktSort: s.mktSort,
    setSort: (e: React.ChangeEvent<HTMLSelectElement>) => set({ mktSort: e.target.value }),
    mktVerified: s.mktVerified,
    toggleVerified: () => set({ mktVerified: !s.mktVerified }),
    mktMin: s.mktMin,
    mktMax: s.mktMax,
    setMin: (e: React.ChangeEvent<HTMLInputElement>) => set({ mktMin: parseFloat(e.target.value) || 0 }),
    setMax: (e: React.ChangeEvent<HTMLInputElement>) => set({ mktMax: parseFloat(e.target.value) || 10 }),
    cropChecks,
    resetFilters: () => set({ mktCrop: 'All', mktSearch: '', mktVerified: false, mktMin: 0, mktMax: 10, mktSort: 'best' }),

    // listing detail
    sel: selD,
    orderQty: s.orderQty,
    orderTotalStr: fmtGHS(sel.price * s.orderQty),
    incQty: () => set({ orderQty: Math.min(sel.qty, s.orderQty + 50) }),
    decQty: () => set({ orderQty: Math.max(50, s.orderQty - 50) }),
    priceChartData: [3.7, 3.8, 3.75, 3.9, 4.0, 4.05, 3.95, 4.1, 4.15, 4.2],
    similar: all.filter((l) => l.id !== sel.id).slice(0, 3),
    trendStr: (sel.trend > 0 ? '+' : '') + sel.trend.toFixed(1) + '%',
    trendColor: sel.trend > 0 ? 'var(--success)' : sel.trend < 0 ? 'var(--error)' : 'var(--text-secondary)',

    // checkout
    subtotalStr: fmtGHS(subtotal),
    feeStr: fmtGHS(fee),
    totalStr: fmtGHS(total),
    payMethods,
    paying: s.paying,
    placeOrder,

    // listings pool (Tracking looks up its order's listing here)
    all,

    // farmer app
    walletBalance: fmtGHS(12480),
    txns,
    myListings,
    addCrops,
    addSparkData: [3.8, 3.9, 4.0, 4.05, 4.1, 4.2],
    priceRegions,
    priceBig: fmtGHS(4.2),
    priceSeries,
    farmerScore,
    farmerScoreTierText,
    goAddTab: () => navigate('/farmer/sell'),
    goPricesTab: () => navigate('/farmer/prices'),
    goListingsTab: () => {
      navigate('/farmer/listings')
      showToast('Done! Your crops are now for sale.')
    },
    withdrawMoney: () => showToast('Sent to your MoMo. Check your phone.'),
    applyAdvance: () => showToast('Loan request sent. We will text you.'),
    aiSuggest: () => showToast('A fair price today is GHS 4.20 per kg.'),

    // ussd
    ussdTitle: USSD_NODES[s.ussdNode].title,
    ussdBody: USSD_NODES[s.ussdNode].body,
    ussdReset: () => set({ ussdNode: 'root' }),
    ussdKeys: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((d) => ({ d, sub: keypadSub(d), onClick: () => ussdSend(d) })),

    // admin
    kpis,
    revenue,
    topCrops,
    disputes,
    smsLog,
    usersRows,
    ordersRows,
    paymentsRows,
    adminListings: all,
    sendBroadcast: () => showToast('Price update sent to 2.04M farmers by text'),
    resolveDispute: () => showToast('Dispute marked as resolved'),
    saveSettings: () => showToast('Settings saved'),

    // orders
    ordersOngoing,
    ordersPast,
    ordersOngoingCount: ordersOngoing.length,
  }
}

export type Farm = ReturnType<typeof useFarm>
