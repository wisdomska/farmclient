import { useFarm } from '../lib/derive'
import type { Screen } from '../lib/types'
import { useStore } from '../store'
import { SunIcon, MoonIcon } from './primitives'

const NAV_DEFS: [Screen, string][] = [
  ['landing', 'Landing'],
  ['auth', 'Sign in'],
  ['dashboard', 'Dashboard'],
  ['marketplace', 'Marketplace'],
  ['listing', 'Listing'],
  ['checkout', 'Checkout'],
  ['orders', 'Orders'],
  ['tracking', 'Tracking'],
  ['ussd', 'USSD'],
  ['farmer', 'Farmer App'],
  ['admin', 'Admin'],
]

export function Toolbar() {
  const { state, go, toggleTheme } = useStore()
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
          Prototype
        </span>
      </div>
      <div className="fcscroll flex flex-1 items-center gap-1 overflow-x-auto px-[2px]">
        {NAV_DEFS.map(([key, label]) => {
          const active = state.screen === key
          return (
            <button
              key={key}
              onClick={() => go(key)}
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
