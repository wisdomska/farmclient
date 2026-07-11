import { useLocation, useNavigate } from 'react-router-dom'
import { useFarm } from '../lib/derive'
import { useStore } from '../store'
import type { Role } from '../lib/types'
import { SunIcon, MoonIcon } from './primitives'
import { LanguageToggle } from './shared'

/**
 * Dev/QA-only prototype bar. Never rendered in production UI — gated by
 * `debugMode` (import.meta.env.DEV or ?debug=1) at the App root.
 * The role selector impersonates a role locally so all three shells can be
 * demoed without a backend; the server still enforces real authorization.
 */
const NAV_DEFS: [string, string][] = [
  ['/', 'Landing'],
  ['/sign-in', 'Sign in'],
  ['/app', 'Dashboard'],
  ['/app/marketplace', 'Marketplace'],
  ['/app/marketplace/L1', 'Listing'],
  ['/app/checkout/L1', 'Checkout'],
  ['/app/orders', 'Orders'],
  ['/app/orders/ORD-2041', 'Tracking'],
  ['/farmer', 'Farmer App'],
  ['/admin', 'Admin'],
]

export function Toolbar() {
  const { state, devSetRole, toggleTheme } = useStore()
  const navigate = useNavigate()
  const location = useLocation()
  const f = useFarm()
  return (
    <div className="sticky top-0 z-[90] flex h-[46px] items-center gap-4 border-b border-line bg-surface px-[14px]">
      <div className="flex flex-shrink-0 items-center gap-2">
        <div className="flex h-[18px] w-[18px] items-center justify-center rounded-[5px] bg-primary">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--primary-text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 20h10" />
            <path d="M10 20c5.5-2.5.8-6.4 3-10" />
            <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
            <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
          </svg>
        </div>
        <span className="text-[12px] tracking-[-0.01em] text-ink">FarmClient</span>
        <span className="rounded-full border border-line px-[7px] py-[2px] text-[9px] uppercase tracking-[0.08em] text-ink3">
          Dev
        </span>
      </div>
      <div className="fcscroll flex flex-1 min-w-0 items-center gap-1 overflow-x-auto px-[2px]">
        {NAV_DEFS.map(([path, label]) => {
          const active = location.pathname === path
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              aria-label={label}
              className={
                'flex-shrink-0 whitespace-nowrap rounded-[7px] border-none px-3 py-[6px] text-[12.5px] transition-all ' +
                (active ? 'bg-primary text-primary-ink' : 'bg-transparent text-ink2 hover:bg-surface2 hover:text-ink')
              }
            >
              {label}
            </button>
          )
        })}
      </div>
      {/* Dev role switcher — the only way to demo farmer/admin shells without a backend */}
      <select
        value={state.role ?? ''}
        onChange={(e) => devSetRole((e.target.value || null) as Role | null)}
        aria-label="Dev role switcher"
        className="flex-shrink-0 rounded-lg border border-line bg-surface px-[8px] py-[5px] text-[12px] text-ink2 outline-none cursor-pointer"
      >
        <option value="">Signed out</option>
        <option value="buyer">Buyer</option>
        <option value="farmer">Farmer</option>
        <option value="admin">Admin</option>
        <option value="superadmin">Super admin</option>
      </select>
      <span className="hidden sm:block"><LanguageToggle /></span>
      <button
        onClick={toggleTheme}
        aria-label="Toggle light and dark mode"
        title="Toggle theme"
        className="flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center rounded-lg border border-line bg-transparent text-ink2 transition-all hover:border-ink3 hover:text-ink"
      >
        {f.theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      </button>
    </div>
  )
}
