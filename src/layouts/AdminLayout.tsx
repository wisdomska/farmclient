import { NavLink, Outlet } from 'react-router-dom'
import { RequireRole } from '../components/RequireRole'

const NAV: { to: string; label: string }[] = [
  { to: '/admin/overview', label: 'Overview' },
  { to: '/admin/users', label: 'Users' },
  { to: '/admin/listings', label: 'Listings' },
  { to: '/admin/orders', label: 'Orders' },
  { to: '/admin/payments', label: 'Payments' },
  { to: '/admin/sms', label: 'SMS' },
  { to: '/admin/settings', label: 'Settings' },
]

function AdminShell() {
  return (
    <div className="grid md:grid-cols-[240px_1fr]" style={{ minHeight: 'calc(100vh - var(--toolbar-h))' }}>
      {/* Sidebar */}
      <aside className="bg-surface border-r border-line flex flex-col px-[16px] py-[24px]">
        <div className="flex items-center gap-[9px] px-[8px] mb-[28px]">
          <div
            className="bg-primary flex items-center justify-center flex-shrink-0"
            style={{ width: 28, height: 28, borderRadius: 7 }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--primary-text)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 20h10"/>
              <path d="M10 20c5.5-2.5.8-6.4 3-10"/>
              <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/>
              <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/>
            </svg>
          </div>
          <span className="text-[16px] tracking-[-0.02em] text-ink">FarmClient</span>
          <span className="text-[9px] tracking-[0.06em] uppercase text-ink3 border border-line rounded-[20px] px-[7px] py-[2px]">Admin</span>
        </div>

        <div className="flex flex-row flex-wrap md:flex-col gap-[2px]">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `text-left px-[12px] py-[9px] rounded-[7px] text-[13.5px] border-none cursor-pointer font-[inherit] no-underline ${isActive ? 'bg-primary-dim text-primary' : 'bg-transparent text-ink2'}`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </div>

        <div className="flex-1" />

        <div className="flex items-center gap-[10px] px-[8px] py-[10px] border-t border-line">
          <div
            className="bg-surface2 border border-line flex items-center justify-center text-[12px] text-ink2 flex-shrink-0"
            style={{ width: 32, height: 32, borderRadius: '50%' }}
          >
            SA
          </div>
          <div>
            <div className="text-[13px] text-ink">Super Admin</div>
            <div className="text-[11px] text-ink3">Accra HQ</div>
          </div>
        </div>
      </aside>

      {/* Main — the routed admin screen */}
      <div className="px-[32px] pt-[28px] pb-[56px] overflow-y-auto">
        <Outlet />
      </div>
    </div>
  )
}

export function AdminLayout() {
  return (
    <RequireRole roles={['admin', 'superadmin']}>
      <AdminShell />
    </RequireRole>
  )
}
