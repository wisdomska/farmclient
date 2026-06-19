import { useStore } from '../store'
import {
  CROPS_ALL,
  LISTINGS,
  USSD_NODES,
  aiColors,
  aiLabel,
  chip,
  cropPhoto,
  fmtGHS,
  keypadSub,
} from './data'
import type { DisplayListing, Listing } from './types'
import { api, apiEnabled } from './api'

/**
 * Central derived-state hook — the React port of the prototype's
 * renderVals() + screenVals() methods. Screens consume this and stay
 * almost purely presentational.
 */
export function useFarm() {
  const { state: s, set, go, toggleTheme, showToast, scrollToId, ussdSend, loginEmail, registerEmail, logout, loadListings, placeOrder } = useStore()

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
        set({ selectedId: l.id })
        go('listing')
      },
      orderFn: (e?: React.MouseEvent) => {
        if (e && e.stopPropagation) e.stopPropagation()
        set({ selectedId: l.id, orderQty: 100 })
        go('checkout')
      },
    }
  }

  // Use live API listings when available; fall back to mock data
  const source: Listing[] = s.liveListings ?? LISTINGS
  const all = source.map(disp)
  const sel = source.find((l) => l.id === s.selectedId) || source[0] || disp(LISTINGS[0])
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
  const cropTabs = ['All', ...CROPS_ALL.slice().sort()].filter((v, i, a) => a.indexOf(v) === i)
  // preserve original tab order
  const cropTabsOrdered = ['All', 'Maize', 'Yam', 'Cassava', 'Tomato', 'Plantain', 'Rice', 'Pepper', 'Onion'].map((c) => ({
    label: c,
    active: s.mktCrop === c,
    onClick: () => set({ mktCrop: c }),
  }))
  void cropTabs

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

  // ── dashboard active orders ──
  const orders = [
    { id: 'ORD-2041', crop: 'Tomato', farmer: 'Adwoa Owusu', qtyStr: '120 kg', totalStr: fmtGHS(780), ...chip('active') },
    { id: 'ORD-2038', crop: 'Maize', farmer: 'Ibrahim Mohammed', qtyStr: '500 kg', totalStr: fmtGHS(900), ...chip('confirmed') },
  ]

  const mkOrder = (id: string, lid: string, qty: number, date: string, step: number, statusKey: string, labelOver?: string) => {
    const l = (source.find((x) => x.id === lid) ?? LISTINGS.find((x) => x.id === lid))!
    const c = chip(statusKey)
    return {
      id,
      crop: l.crop,
      photo: cropPhoto(l.crop),
      farmer: l.farmer,
      district: l.district,
      qtyStr: qty.toLocaleString('en-US') + ' kg',
      date,
      totalStr: fmtGHS(l.price * qty),
      bg: c.bg,
      fg: c.fg,
      label: labelOver || c.label,
      onClick: () => {
        set({ selectedId: lid, orderQty: qty, trackStep: step, showRating: false })
        go('tracking')
      },
    }
  }
  const ordersOngoing = [
    mkOrder('ORD-2041', 'L2', 120, '16 Jun 2026', 2, 'active', 'In progress'),
    mkOrder('ORD-2038', 'L3', 500, '15 Jun 2026', 1, 'confirmed', 'Farmer confirmed'),
  ]
  const ordersPast = [
    mkOrder('ORD-2033', 'L1', 600, '09 Jun 2026', 4, 'delivered', 'Completed'),
    mkOrder('ORD-2027', 'L4', 350, '01 Jun 2026', 4, 'delivered', 'Completed'),
    mkOrder('ORD-1994', 'L6', 80, '24 May 2026', 4, 'disputed', 'Refunded'),
  ]

  // ── tracking ──
  const stepNames = ['We got your payment', 'Farmer said yes', 'Getting your order ready', 'Delivered to you', 'All done']
  const steps = stepNames.map((name, i) => ({ name, idx: i + 1, done: i < s.trackStep, current: i === s.trackStep, future: i > s.trackStep }))

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
  const tabIcons: Record<string, string[]> = {
    home: ['M3 9.5 12 3l9 6.5', 'M5 10v10h14V10'],
    add: ['M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z', 'M12 8v8', 'M8 12h8'],
    listings: ['M3 4h18', 'M3 10h18', 'M3 16h12'],
    prices: ['M16 7h6v6', 'm22 7-8.5 8.5-5-5L2 17'],
    wallet: ['M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h16a1 1 0 0 1 1 1v3', 'M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4', 'M18 12a2 2 0 0 0 0 4h4v-4z'],
  }
  const farmerTabs = (['home', 'add', 'listings', 'prices', 'wallet'] as const).map((k) => ({
    key: k,
    label: k.charAt(0).toUpperCase() + k.slice(1),
    active: s.farmerTab === k,
    onClick: () => set({ farmerTab: k }),
    iconPaths: tabIcons[k],
  }))
  const addCrops = CROPS_ALL.map((c, i) => ({ crop: c, active: i === 1 }))

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
  const adminNav = (['overview', 'users', 'listings', 'orders', 'payments', 'sms', 'settings'] as const).map((k) => ({
    key: k,
    label: k === 'sms' ? 'SMS' : k.charAt(0).toUpperCase() + k.slice(1),
    active: s.adminTab === k,
    onClick: () => set({ adminTab: k }),
  }))
  const usersRows = [
    { name: 'Ama Boateng', role: 'Farmer', loc: 'Techiman, Bono East', joined: '12 Mar 2026', ...chip('confirmed'), label: 'Verified' },
    { name: 'Kwame Asante', role: 'Buyer', loc: 'Accra', joined: '04 Feb 2026', ...chip('confirmed'), label: 'Verified' },
    { name: 'Ibrahim Mohammed', role: 'Farmer', loc: 'Tamale, Northern', joined: '21 Apr 2026', ...chip('confirmed'), label: 'Verified' },
    { name: 'Yaw Mensah', role: 'Field agent', loc: 'Techiman, Bono East', joined: '09 Jan 2026', ...chip('active'), label: 'Active' },
    { name: 'Adwoa Owusu', role: 'Farmer', loc: 'Kumasi, Ashanti', joined: '30 May 2026', ...chip('pending'), label: 'Pending' },
  ]
  const ordersRows = [
    { id: 'ORD-2041', crop: 'Tomato · 120 kg', who: 'Golden Fork', amt: fmtGHS(780), ...chip('active') },
    { id: 'ORD-2038', crop: 'Maize · 500 kg', who: 'AccraFresh Ltd', amt: fmtGHS(900), ...chip('confirmed') },
    { id: 'ORD-2033', crop: 'Yam · 600 kg', who: 'Golden Fork', amt: fmtGHS(2520), ...chip('delivered') },
    { id: 'ORD-2027', crop: 'Plantain · 350 kg', who: 'Kwik Foods', amt: fmtGHS(1190), ...chip('sold') },
    { id: 'ORD-1994', crop: 'Pepper · 80 kg', who: 'Golden Fork', amt: fmtGHS(640), ...chip('disputed') },
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

  return {
    s,
    theme: s.theme,
    toggleTheme,
    showToast,
    toast: s.toast,

    // screen flags
    isLanding: s.screen === 'landing',
    isAuth: s.screen === 'auth',
    isDashboard: s.screen === 'dashboard',
    isMarketplace: s.screen === 'marketplace',
    isListing: s.screen === 'listing',
    isCheckout: s.screen === 'checkout',
    isOrders: s.screen === 'orders',
    isTracking: s.screen === 'tracking',
    isUssd: s.screen === 'ussd',
    isFarmer: s.screen === 'farmer',
    isAdmin: s.screen === 'admin',

    // api
    apiEnabled,
    loginEmail,
    registerEmail,
    logout,
    loadListings,
    liveListings: s.liveListings,
    currentUser: s.currentUser,

    // nav
    go,
    goAuth: () => go('auth'),
    goMarketplace: () => go('marketplace'),
    goDashboard: () => go('dashboard'),
    goUssd: () => go('ussd'),
    goTracking: () => go('tracking'),
    goListingBack: () => go('listing'),
    goOrders: () => go('orders'),
    navHow: () => scrollToId('fc-how'),
    navFarmers: () => go('ussd'),
    navStory: () => scrollToId('fc-story'),
    doSignIn: () => {
      go('dashboard')
      showToast('Welcome back!')
    },

    // landing
    heroStats,
    howItWorks,
    footerCols,
    recommended: all.slice(0, 4),

    // auth
    authMode: s.authMode,
    isSignUp: s.authMode === 'signup',
    authTitle: s.authMode === 'signup' ? 'Create your account' : 'Welcome back',
    authSub: s.authMode === 'signup' ? 'Start sourcing verified produce in minutes.' : 'Sign in to manage your orders and listings.',
    authCta: s.authMode === 'signup' ? 'Create account' : 'Sign in',
    authSwitchText: s.authMode === 'signup' ? 'Already have an account?' : 'New to FarmClient?',
    authSwitchCta: s.authMode === 'signup' ? 'Sign in' : 'Create an account',
    setSignIn: () => set({ authMode: 'signin' }),
    setSignUp: () => set({ authMode: 'signup' }),
    toggleAuthMode: () => set({ authMode: s.authMode === 'signup' ? 'signin' : 'signup' }),

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
        go('marketplace')
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
    startPay: () => {
      set({ paying: true })
      setTimeout(() => {
        set({ paying: false, paid: true, trackStep: 0 })
        go('tracking')
      }, 2600)
    },
    placeOrder,

    // tracking
    steps,
    trackStep: s.trackStep,
    isDelivered: s.trackStep >= 3,
    advanceStep: () => set({ trackStep: Math.min(4, s.trackStep + 1) }),
    confirmReceipt: () => set({ trackStep: 4, showRating: true }),
    showRating: s.showRating,
    rated: s.rated,
    setRating: (n: number) => set({ rated: n }),
    closeRating: () => {
      set({ showRating: false })
      if (apiEnabled && s.currentOrderId && s.rated > 0) {
        api.rateOrder(s.currentOrderId, s.rated).catch(() => undefined)
      }
      showToast('Thank you! Your rating was saved.')
    },

    // farmer app
    farmerTab: s.farmerTab,
    farmerTabs,
    isFarmerHome: s.farmerTab === 'home',
    isFarmerAdd: s.farmerTab === 'add',
    isFarmerListings: s.farmerTab === 'listings',
    isFarmerPrices: s.farmerTab === 'prices',
    isFarmerWallet: s.farmerTab === 'wallet',
    walletBalance: fmtGHS(12480),
    txns,
    myListings,
    addCrops,
    addSparkData: [3.8, 3.9, 4.0, 4.05, 4.1, 4.2],
    priceRegions,
    priceBig: fmtGHS(4.2),
    priceSeries,
    goAddTab: () => set({ farmerTab: 'add' }),
    goPricesTab: () => set({ farmerTab: 'prices' }),
    goListingsTab: () => {
      set({ farmerTab: 'listings' })
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
    adminTab: s.adminTab,
    adminNav,
    kpis,
    isAdminOverview: s.adminTab === 'overview',
    isAdminSms: s.adminTab === 'sms',
    isAdminUsers: s.adminTab === 'users',
    isAdminListings: s.adminTab === 'listings',
    isAdminOrders: s.adminTab === 'orders',
    isAdminPayments: s.adminTab === 'payments',
    isAdminSettings: s.adminTab === 'settings',
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
