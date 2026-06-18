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
import type { FarmState, Screen, Theme } from './lib/types'

const INITIAL: FarmState = {
  theme: 'dark',
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
}

interface Store {
  state: FarmState
  set: (patch: Partial<FarmState>) => void
  go: (screen: Screen) => void
  toggleTheme: () => void
  showToast: (msg: string) => void
  scrollToId: (id: string) => void
  ussdSend: (d: string) => void
}

const StoreContext = createContext<Store | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<FarmState>(INITIAL)
  const toastSeq = useRef(0)

  const set = useCallback((patch: Partial<FarmState>) => {
    setState((s) => ({ ...s, ...patch }))
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

  const value = useMemo<Store>(
    () => ({ state, set, go, toggleTheme, showToast, scrollToId, ussdSend }),
    [state, set, go, toggleTheme, showToast, scrollToId, ussdSend],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useStore(): Store {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
