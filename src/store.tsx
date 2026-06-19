import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { USSD_NODES } from './lib/data'
import { api, apiEnabled, clearToken, getToken, mapApiListing, setToken } from './lib/api'
import { firebaseEnabled, signInWithGoogle } from './lib/firebase'
import type { FarmState, Lang, Listing, Screen, Theme } from './lib/types'

function getStoredLang(): Lang {
  try {
    const v = localStorage.getItem('fc_lang')
    if (v === 'en' || v === 'tw') return v
  } catch { /* noop */ }
  return 'en'
}

const INITIAL: FarmState = {
  theme: 'dark',
  lang: getStoredLang(),
  screen: 'landing',
  authMode: 'signin',
  selectedId: 'L1',
  orderQty: 100,
  payMethod: 'mtn',
  paying: false,
  paid: false,
  trackStep: 0,
  rated: 0,
  showRating: false,
  farmerTab: 'home',
  adminTab: 'overview',
  mktView: 'grid',
  mktCrop: 'All',
  mktSearch: '',
  mktSort: 'best',
  mktVerified: false,
  mktMin: 0,
  mktMax: 10,
  ussdNode: 'root',
  toast: '',
  token: getToken(),
  currentUser: null,
  liveListings: null,
  currentOrderId: null,
}

interface Store {
  state: FarmState
  set: (patch: Partial<FarmState>) => void
  go: (screen: Screen) => void
  toggleTheme: () => void
  showToast: (msg: string) => void
  scrollToId: (id: string) => void
  ussdSend: (d: string) => void
  loginEmail: (email: string, password: string) => Promise<void>
  registerEmail: (email: string, password: string, fullName: string) => Promise<void>
  loginGoogle: () => Promise<void>
  logout: () => void
  loadListings: (params?: Record<string, string>) => Promise<void>
  placeOrder: () => Promise<void>
  setLang: (l: Lang) => void
}

const StoreContext = createContext<Store | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<FarmState>(INITIAL)
  const stateRef = useRef<FarmState>(INITIAL)
  const toastSeq = useRef(0)

  const set = useCallback((patch: Partial<FarmState>) => {
    setState((s) => {
      const next = { ...s, ...patch }
      stateRef.current = next
      return next
    })
  }, [])

  const go = useCallback((screen: Screen) => {
    setState((s) => ({ ...s, screen }))
    try {
      window.scrollTo(0, 0)
    } catch {
      /* noop */
    }
  }, [])

  const toggleTheme = useCallback(() => {
    setState((s) => {
      const theme: Theme = s.theme === 'dark' ? 'light' : 'dark'
      try {
        localStorage.setItem('fc_theme', theme)
      } catch {
        /* noop */
      }
      return { ...s, theme }
    })
  }, [])

  const showToast = useCallback((msg: string) => {
    toastSeq.current += 1
    const id = toastSeq.current
    setState((s) => ({ ...s, toast: msg }))
    setTimeout(() => {
      if (toastSeq.current === id) setState((s) => ({ ...s, toast: '' }))
    }, 2600)
  }, [])

  const scrollToId = useCallback((id: string) => {
    try {
      const el = document.getElementById(id)
      if (el) {
        const y = el.getBoundingClientRect().top + window.pageYOffset - 60
        window.scrollTo({ top: y, behavior: 'smooth' })
      }
    } catch {
      /* noop */
    }
  }, [])

  const ussdSend = useCallback((d: string) => {
    setState((s) => {
      const node = USSD_NODES[s.ussdNode]
      const next = node && node.opts[d]
      return next ? { ...s, ussdNode: next } : s
    })
  }, [])

  // Mirror componentDidMount: restore stored theme.
  useEffect(() => {
    try {
      const stored = localStorage.getItem('fc_theme') as Theme | null
      if (stored) setState((s) => ({ ...s, theme: stored }))
    } catch {
      /* noop */
    }
  }, [])

  const loginEmail = useCallback(async (email: string, password: string) => {
    if (!apiEnabled) {
      go('dashboard')
      return
    }
    try {
      const res = await api.login(email, password)
      setToken(res.token)
      setState((s) => ({ ...s, token: res.token, currentUser: res.user }))
      go('dashboard')
      showToast('Welcome back!')
    } catch (err) {
      showToast((err as Error).message)
    }
  }, [go, showToast])

  const registerEmail = useCallback(async (email: string, password: string, fullName: string) => {
    if (!apiEnabled) {
      go('dashboard')
      return
    }
    try {
      const res = await api.register(email, password, fullName)
      setToken(res.token)
      setState((s) => ({ ...s, token: res.token, currentUser: res.user }))
      go('dashboard')
      showToast('Welcome! Your account has been created.')
    } catch (err) {
      showToast((err as Error).message)
    }
  }, [go, showToast])

  const loginGoogle = useCallback(async () => {
    if (firebaseEnabled) {
      try {
        const idToken = await signInWithGoogle()
        const res = await api.googleAuth(idToken)
        setToken(res.token)
        setState((s) => ({ ...s, token: res.token, currentUser: res.user }))
        go('dashboard')
        showToast('Welcome!')
      } catch (err) {
        showToast((err as Error).message)
      }
    } else {
      // No Firebase configured — demo fallback
      go('dashboard')
    }
  }, [go, showToast])

  const logout = useCallback(() => {
    clearToken()
    setState((s) => ({ ...s, token: null, currentUser: null, liveListings: null }))
    go('landing')
  }, [go])

  const setLang = useCallback((l: Lang) => {
    try {
      localStorage.setItem('fc_lang', l)
    } catch { /* noop */ }
    setState((s) => ({ ...s, lang: l }))
  }, [])

  const loadListings = useCallback(async (params?: Record<string, string>) => {
    if (!apiEnabled) return
    try {
      const res = await api.listings(params)
      const mapped: Listing[] = res.items.map(mapApiListing)
      setState((s) => ({ ...s, liveListings: mapped }))
    } catch {
      setState((s) => ({ ...s, liveListings: null }))
    }
  }, [])

  const placeOrder = useCallback(async () => {
    if (!apiEnabled) {
      // demo flow — simulate payment
      setState((s) => ({ ...s, paying: true }))
      setTimeout(() => {
        setState((s) => ({ ...s, paying: false, paid: true, trackStep: 0 }))
        go('tracking')
      }, 2600)
      return
    }
    // Capture selectedId and orderQty from the ref (kept current by set())
    const { selectedId, orderQty } = stateRef.current
    setState((s) => ({ ...s, paying: true }))
    try {
      const res = await api.createOrder({ listingId: selectedId, quantityKg: orderQty })
      setState((s) => ({ ...s, paying: false, paid: true, trackStep: 0, currentOrderId: res.order.id }))
      go('tracking')
      const msg = res.payment.ok ? 'Approve the prompt on your phone' : 'Order placed'
      showToast(msg)
    } catch (err) {
      setState((s) => ({ ...s, paying: false }))
      showToast((err as Error).message)
    }
  }, [go, showToast])

  const value = useMemo<Store>(
    () => ({ state, set, go, toggleTheme, showToast, scrollToId, ussdSend, loginEmail, registerEmail, loginGoogle, logout, loadListings, placeOrder, setLang }),
    [state, set, go, toggleTheme, showToast, scrollToId, ussdSend, loginEmail, registerEmail, loginGoogle, logout, loadListings, placeOrder, setLang],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useStore(): Store {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
