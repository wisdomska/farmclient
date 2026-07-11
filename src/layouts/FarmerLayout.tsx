import { useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { RequireRole } from '../components/RequireRole'
import { Icon } from '../components/primitives'
import { useStore } from '../store'
import { api, apiEnabled, decodeJwtClaim } from '../lib/api'

const TABS: { to: string; label: string; end?: boolean; iconPaths: string[] }[] = [
  { to: '/farmer', label: 'Home', end: true, iconPaths: ['M3 9.5 12 3l9 6.5', 'M5 10v10h14V10'] },
  { to: '/farmer/sell', label: 'Sell', iconPaths: ['M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z', 'M12 8v8', 'M8 12h8'] },
  { to: '/farmer/prices', label: 'Prices', iconPaths: ['M16 7h6v6', 'm22 7-8.5 8.5-5-5L2 17'] },
  { to: '/farmer/wallet', label: 'Wallet', iconPaths: ['M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h16a1 1 0 0 1 1 1v3', 'M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4', 'M18 12a2 2 0 0 0 0 4h4v-4z'] },
]

function FarmerShell() {
  const { state, set } = useStore()

  // Fetch the signed-in farmer's own live FarmScore (farmerId comes from the
  // verified JWT). Demo mode falls back to DEMO_FARMER_SCORE in derive.
  useEffect(() => {
    if (!apiEnabled || state.role !== 'farmer' || !state.token) return
    const farmerId = decodeJwtClaim(state.token, 'farmerId')
    if (!farmerId) return
    api.farmerScore(farmerId)
      .then((r) => set({ farmerScore: r.score }))
      .catch(() => { /* keep demo fallback */ })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.role, state.token])

  return (
    <div className="bg-surface flex flex-wrap items-center justify-center gap-[40px] p-[16px] sm:p-[32px]" style={{ minHeight: 'calc(100vh - var(--toolbar-h))' }}>
      {/* Left intro text */}
      <div className="flex-shrink-0">
        <div className="text-[11px] tracking-[0.08em] uppercase text-ink3 mb-[6px]">Farmer app · on your phone</div>
        <div className="text-[20px] tracking-[-0.02em] text-ink max-w-[240px] leading-[1.3]">Ama's crops, money and trust score — all in her pocket.</div>
        <div className="text-[13px] text-ink2 mt-[12px] max-w-[240px] leading-[1.6]">A simple app for farmers with a smartphone. It does the same things as dialing *789#. Tap the buttons below to look around.</div>
      </div>

      {/* Phone frame */}
      <div style={{ width: 384, background: '#000', borderRadius: 48, padding: 9 }}>
        <div className="bg-bg" style={{ borderRadius: 40, overflow: 'hidden', height: 788, display: 'flex', flexDirection: 'column', position: 'relative' }}>
          {/* Notch */}
          <div style={{ position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)', width: 104, height: 28, background: '#000', borderRadius: 20, zIndex: 6 }} />

          {/* Status bar */}
          <div className="flex items-center justify-between text-[13px] text-ink flex-shrink-0" style={{ padding: '15px 28px 8px' }}>
            <span style={{ fontVariantNumeric: 'tabular-nums' }}>11:01</span>
            <div className="flex gap-[7px] items-center">
              <svg width="16" height="12" viewBox="0 0 18 12" fill="currentColor">
                <rect x="0" y="7" width="3" height="5" rx="1"/>
                <rect x="5" y="4" width="3" height="8" rx="1"/>
                <rect x="10" y="1.5" width="3" height="10.5" rx="1"/>
                <rect x="15" y="0" width="3" height="12" rx="1" opacity="0.35"/>
              </svg>
              <svg width="15" height="12" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="1.3">
                <path d="M1 4.5a10 10 0 0 1 14 0M3.5 7.5a6 6 0 0 1 9 0M8 10.5h.01"/>
              </svg>
              <svg width="22" height="12" viewBox="0 0 24 12" fill="none" stroke="currentColor" strokeWidth="1.2">
                <rect x="1" y="2" width="19" height="8" rx="2"/>
                <rect x="2.5" y="3.5" width="13" height="5" rx="1" fill="currentColor"/>
                <path d="M22 4.5v3" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          {/* Scrollable body — the routed farmer screen */}
          <div className="fcscroll" style={{ flex: 1, overflowY: 'auto' }}>
            <Outlet />
          </div>

          {/* Bottom tab bar — persistent nav: Home, Sell, Prices, Wallet */}
          <div className="flex border-t border-line flex-shrink-0 bg-bg" style={{ padding: '8px 6px 18px' }}>
            {TABS.map((t) => (
              <NavLink
                key={t.to}
                to={t.to}
                end={t.end}
                aria-label={t.label}
                className="flex-1 flex flex-col items-center gap-[4px] bg-transparent border-none cursor-pointer font-[inherit]"
                style={({ isActive }) => ({ padding: '6px 0', color: isActive ? 'var(--primary)' : 'var(--text-tertiary)', textDecoration: 'none' })}
              >
                <Icon paths={t.iconPaths} size={22} />
                <span className="text-[10px]">{t.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function FarmerLayout() {
  return (
    <RequireRole roles={['farmer']}>
      <FarmerShell />
    </RequireRole>
  )
}
