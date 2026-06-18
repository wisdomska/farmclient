import type { ReactNode } from 'react'
import { useFarm } from '../lib/derive'
import type { DisplayListing } from '../lib/types'
import { Icon, Logo, MoonIcon, StarSolid, SunIcon } from './primitives'

export function PinIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

export function ThemeToggle({ size = 40 }: { size?: number }) {
  const { theme, toggleTheme } = useFarm()
  return (
    <button
      onClick={toggleTheme}
      aria-label="Switch between light and dark"
      title="Light / dark"
      className="flex flex-shrink-0 items-center justify-center rounded-lg border border-line bg-transparent text-ink2 transition-colors hover:border-ink3 hover:text-ink"
      style={{ width: size, height: size }}
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}

/** App-shell header used across the buyer screens. */
export function TopBar({
  active,
  showSearch,
  showNotif,
  showNav = true,
  showAvatar = true,
  back,
  right,
}: {
  active?: 'dashboard' | 'marketplace' | 'orders'
  showSearch?: boolean
  showNotif?: boolean
  showNav?: boolean
  showAvatar?: boolean
  back?: { label: string; onClick: () => void }
  right?: ReactNode
}) {
  const f = useFarm()
  const navItem = (label: string, key: 'dashboard' | 'marketplace' | 'orders', onClick: () => void) => (
    <span
      onClick={active === key ? undefined : onClick}
      className={
        active === key
          ? 'cursor-pointer text-primary'
          : 'cursor-pointer text-ink2 transition-colors hover:text-ink'
      }
    >
      {label}
    </span>
  )
  return (
    <div className="sticky top-[46px] z-50 flex h-16 items-center gap-5 border-b border-line bg-bg px-7">
      <div onClick={f.goDashboard} className="flex flex-shrink-0 cursor-pointer items-center gap-[9px]">
        <Logo size={17} box={28} radius={7} />
        <span className="text-[17px] tracking-[-0.02em]">FarmClient</span>
      </div>

      {back && (
        <button
          onClick={back.onClick}
          className="inline-flex items-center gap-[7px] bg-transparent text-[13px] text-ink2 transition-colors hover:text-ink"
        >
          <Icon paths={['M19 12H5', 'm12 19-7-7 7-7']} size={16} />
          {back.label}
        </button>
      )}

      {showSearch && (
        <div className="flex h-[42px] max-w-[440px] flex-1 items-center gap-[10px] rounded-lg border border-line bg-surface px-[14px]">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            placeholder="Search crop or district…"
            value={f.mktSearch}
            onChange={f.setSearch}
            onKeyDown={f.searchToMarket}
            className="flex-1 border-none bg-transparent text-[14px] text-ink outline-none"
          />
        </div>
      )}

      <div className="flex-1" />

      {showNav && (
        <div className="flex flex-shrink-0 items-center gap-[22px] text-[14px]">
          {navItem('Dashboard', 'dashboard', f.goDashboard)}
          {navItem('Marketplace', 'marketplace', f.goMarketplace)}
          {navItem('Orders', 'orders', f.goOrders)}
        </div>
      )}

      {showNotif && (
        <button
          aria-label="Notifications"
          className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-transparent text-ink2 hover:text-ink"
        >
          <Icon paths={['M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9', 'M10.3 21a1.94 1.94 0 0 0 3.4 0']} size={18} />
          <span className="absolute right-2 top-[7px] h-[7px] w-[7px] rounded-full border-[1.5px] border-bg bg-primary" />
        </button>
      )}

      <ThemeToggle />
      {right}
      {showAvatar && (
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface2 text-[14px] text-ink2">
          KA
        </div>
      )}
    </div>
  )
}

/** Marketplace / dashboard produce card. */
export function ListingCard({ l, showHarvest }: { l: DisplayListing; showHarvest?: boolean }) {
  return (
    <div
      onClick={l.selectFn}
      className="cursor-pointer overflow-hidden rounded-xl border border-line bg-surface transition-colors hover:border-ink3"
    >
      <div className="relative flex aspect-video items-center justify-center bg-surface2 text-ink3">
        <img src={l.photo} alt={l.crop} className="absolute inset-0 h-full w-full object-cover" />
        <span className="absolute left-[10px] top-[10px] rounded-full bg-primary-dim px-[10px] py-1 text-[11px] text-primary">
          {l.crop}
        </span>
        <span className="absolute right-[10px] top-[10px] rounded-full px-[10px] py-1 text-[11px]" style={{ background: l.aiBg, color: l.aiFg }}>
          {l.aiText}
        </span>
      </div>
      <div className="p-[14px]">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-[14px] text-ink">{l.farmer}</span>
          <span className="inline-flex items-center gap-1 text-[12px] text-ink2">
            <StarSolid />
            {l.ratingStr}
          </span>
        </div>
        <div className="mb-3 text-[12px] text-ink2">
          {l.qtyStr} available{showHarvest ? ` · ${l.harvest}` : ''}
        </div>
        <div className="mb-3 flex items-baseline gap-1">
          <span className="text-[22px] text-ink">{l.priceStr}</span>
          <span className="text-[13px] text-ink2">/kg</span>
        </div>
        <div className="flex items-center justify-between border-t border-line pt-3">
          <span className="inline-flex items-center gap-[5px] text-[11.5px] text-ink2">
            <PinIcon />
            {showHarvest ? l.distStr : l.district}
          </span>
          <button
            onClick={l.orderFn}
            className="rounded-md border-none bg-primary px-[13px] py-[7px] text-[12.5px] text-primary-ink hover:opacity-[0.88]"
          >
            Quick order
          </button>
        </div>
      </div>
    </div>
  )
}
