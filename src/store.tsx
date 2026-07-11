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
import { api, apiEnabled, clearToken, decodeJwtClaim, getToken, mapApiListing, setToken, setUnauthorizedHandler } from './lib/api'
import { firebaseEnabled, signInWithGoogle } from './lib/firebase'
import type { FarmState, Lang, Listing, Role, Theme } from './lib/types'

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
  orderQty: 100,
  payMethod: 'mtn',
  paying: false,
  mktView: 'grid',
  mktCrop: 'All',
  mktSearch: '',
  mktSort: 'best',
  mktVerified: false,
  mktDelivery: [],
  mktMin: 0,
  mktMax: 10,
  ussdNode: 'root',
  toast: '',
  token: getToken(),
  currentUser: null,
  liveListings: null,
  role: null,
  authStatus: 'idle',
  farmerScore: null,
}

interface Store {
  state: FarmState
  set: (patch: Partial<FarmState>) => void
  toggleTheme: () => void
  showToast: (msg: string) => void
  scrollToId: (id: string) => void
  ussdSend: (d: string) => void
  loginEmail: (email: string, password: string) => Promise<Role | null>
  registerEmail: (email: string, password: string, fullName: string) => Promise<Role | null>
  loginGoogle: () => Promise<Role | null>
  logout: () => void
  /** Dev/QA-only: impersonate a role locally without a backend. Only reachable from debug-gated UI. */
  devSetRole: (role: Role | null) => void
  loadListings: (params?: Record<string, string>) => Promise<void>
  placeOrder: (listingId: string, payerPhone?: string) => Promise<{ orderId: string } | null>
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
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored) setState((s) => ({ ...s, theme: stored }))
    } catch {
      /* noop */
    }
  }, [])

  // Session expiry mid-flow (e.g. during checkout): tear the session down so
  // the route guard redirects to /sign-in?redirect=<current page>. After
  // re-auth the user lands back where they were — no broken payment state.
  useEffect(() => {
    setUnauthorizedHandler(() => {
      clearToken()
      set({ token: null, currentUser: null, role: null, authStatus: 'anon', farmerScore: null })
      showToast('Your session expired — please sign in again.')
    })
  }, [set, showToast])

  // Boot-time session rehydration: a stored token only counts as a session
  // once the server has re-verified it (POST /auth/refresh re-signs the JWT).
  // The role is then read from the verified token — never from client input.
  useEffect(() => {
    const token = getToken()
    if (!apiEnabled || !token) {
      set({ authStatus: 'anon' })
      return
    }
    set({ authStatus: 'checking' })
    api
      .refresh()
      .then((res) => {
        setToken(res.token)
        const role = decodeJwtClaim(res.token, 'role') as Role | null
        if (role) {
          set({ token: res.token, role, authStatus: 'authed' })
        } else {
          clearToken()
          set({ token: null, role: null, authStatus: 'anon' })
        }
      })
      .catch(() => {
        clearToken()
        set({ token: null, role: null, currentUser: null, authStatus: 'anon' })
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loginEmail = useCallback(async (email: string, password: string): Promise<Role | null> => {
    if (!apiEnabled) {
      // No backend configured — real credentials cannot be verified, so no session is created.
      showToast('Sign-in is unavailable: the live API is not configured.')
      return null
    }
    try {
      const res = await api.login(email, password)
      setToken(res.token)
      const role = (res.role as Role) || 'buyer'
      set({ token: res.token, currentUser: res.user, role, authStatus: 'authed' })
      showToast('Welcome back!')
      return role
    } catch (err) {
      showToast((err as Error).message)
      return null
    }
  }, [set, showToast])

  const registerEmail = useCallback(async (email: string, password: string, fullName: string): Promise<Role | null> => {
    if (!apiEnabled) {
      showToast('Sign-up is unavailable: the live API is not configured.')
      return null
    }
    try {
      const res = await api.register(email, password, fullName)
      setToken(res.token)
      const role = (res.role as Role) || 'buyer'
      set({ token: res.token, currentUser: res.user, role, authStatus: 'authed' })
      showToast('Welcome! Your account has been created.')
      return role
    } catch (err) {
      showToast((err as Error).message)
      return null
    }
  }, [set, showToast])

  const loginGoogle = useCallback(async (): Promise<Role | null> => {
    if (!firebaseEnabled || !apiEnabled) {
      showToast('Google sign-in is not available right now.')
      return null
    }
    try {
      const idToken = await signInWithGoogle()
      const res = await api.googleAuth(idToken)
      setToken(res.token)
      const role = (res.role as Role) || 'buyer'
      set({ token: res.token, currentUser: res.user, role, authStatus: 'authed' })
      showToast('Welcome!')
      return role
    } catch (err) {
      showToast((err as Error).message)
      return null
    }
  }, [set, showToast])

  const logout = useCallback(() => {
    clearToken()
    set({ token: null, currentUser: null, liveListings: null, role: null, authStatus: 'anon', farmerScore: null })
  }, [set])

  const devSetRole = useCallback((role: Role | null) => {
    if (role) {
      set({ role, authStatus: 'authed', currentUser: { fullName: 'Demo ' + role } })
    } else {
      clearToken()
      set({ token: null, currentUser: null, role: null, authStatus: 'anon', farmerScore: null })
    }
  }, [set])

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

  const placeOrder = useCallback(async (listingId: string, payerPhone?: string): Promise<{ orderId: string } | null> => {
    if (!apiEnabled) {
      // demo flow — simulate payment
      set({ paying: true })
      return new Promise((resolve) => {
        setTimeout(() => {
          set({ paying: false })
          resolve({ orderId: 'ORD-NEW' })
        }, 2600)
      })
    }
    const { orderQty } = stateRef.current
    set({ paying: true })
    try {
      const res = await api.createOrder({ listingId, quantityKg: orderQty, payerPhone })
      set({ paying: false })
      const msg = res.payment.ok ? 'Approve the prompt on your phone' : 'Order placed'
      showToast(msg)
      return { orderId: res.order.id }
    } catch (err) {
      set({ paying: false })
      showToast((err as Error).message)
      return null
    }
  }, [set, showToast])

  const value = useMemo<Store>(
    () => ({ state, set, toggleTheme, showToast, scrollToId, ussdSend, loginEmail, registerEmail, loginGoogle, logout, devSetRole, loadListings, placeOrder, setLang }),
    [state, set, toggleTheme, showToast, scrollToId, ussdSend, loginEmail, registerEmail, loginGoogle, logout, devSetRole, loadListings, placeOrder, setLang],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useStore(): Store {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
