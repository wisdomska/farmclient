import { useFarm } from '../lib/derive'
import { Icon } from '../components/primitives'
import { TopBar, ListingCard } from '../components/shared'

export function Marketplace() {
  const f = useFarm()

  const viewBtnBase = 'w-[36px] h-[36px] flex items-center justify-center rounded-lg border transition-colors duration-150'
  const activeBtn = `${viewBtnBase} bg-primary text-primary-ink border-primary`
  const inactiveBtn = `${viewBtnBase} bg-transparent text-ink2 border-line`

  return (
    <div>
      <TopBar active="marketplace" showSearch />

      <div className="grid max-w-[1440px] mx-auto" style={{ gridTemplateColumns: '260px 1fr' }}>
        {/* Filter sidebar */}
        <aside className="border-r border-line px-[24px] py-[28px] min-h-[calc(100vh-110px)]">
          <div className="flex items-center justify-between mb-[24px]">
            <span className="text-[15px] text-ink">Filters</span>
            <span
              className="text-[12px] text-primary cursor-pointer"
              onClick={f.resetFilters}
            >
              Reset
            </span>
          </div>

          {/* Crop checkboxes */}
          <div className="mb-[26px]">
            <div className="text-[12px] tracking-[0.04em] uppercase text-ink3 mb-[14px]">Crop</div>
            <div className="flex flex-col gap-[11px]">
              {f.cropChecks.map((c) => (
                <label
                  key={c.label}
                  onClick={c.onClick}
                  className="flex items-center gap-[10px] text-[13.5px] text-ink2 cursor-pointer"
                >
                  <span className="w-[16px] h-[16px] rounded-[4px] border border-line flex items-center justify-center flex-shrink-0">
                    {c.on && (
                      <Icon
                        paths={['M20 6 9 17l-5-5']}
                        size={11}
                        stroke="var(--primary)"
                        strokeWidth={3}
                      />
                    )}
                  </span>
                  {c.label}
                </label>
              ))}
            </div>
          </div>

          {/* Price range */}
          <div className="mb-[26px]">
            <div className="text-[12px] tracking-[0.04em] uppercase text-ink3 mb-[14px]">
              Price range (GHS/kg)
            </div>
            <div className="flex items-center gap-[10px]">
              <input
                value={f.mktMin}
                onChange={f.setMin}
                className="w-1/2 bg-surface border border-line rounded-[8px] px-[11px] py-[9px] text-[13px] text-ink font-[inherit] outline-none focus:border-primary"
              />
              <span className="text-ink3">–</span>
              <input
                value={f.mktMax}
                onChange={f.setMax}
                className="w-1/2 bg-surface border border-line rounded-[8px] px-[11px] py-[9px] text-[13px] text-ink font-[inherit] outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Delivery checkboxes (static) */}
          <div className="mb-[26px]">
            <div className="text-[12px] tracking-[0.04em] uppercase text-ink3 mb-[14px]">Delivery</div>
            <div className="flex flex-col gap-[11px]">
              <label className="flex items-center gap-[10px] text-[13.5px] text-ink2 cursor-pointer">
                <span className="w-[16px] h-[16px] rounded-[4px] border border-line flex-shrink-0" />
                Pickup
              </label>
              <label className="flex items-center gap-[10px] text-[13.5px] text-ink2 cursor-pointer">
                <span className="w-[16px] h-[16px] rounded-[4px] border border-line flex-shrink-0" />
                Agent drop-off
              </label>
              <label className="flex items-center gap-[10px] text-[13.5px] text-ink2 cursor-pointer">
                <span className="w-[16px] h-[16px] rounded-[4px] border border-line flex-shrink-0" />
                Bulk transport
              </label>
            </div>
          </div>

          {/* Trusted farmers toggle */}
          <label
            onClick={f.toggleVerified}
            className="flex items-center justify-between text-[13.5px] text-ink cursor-pointer"
          >
            Trusted farmers only
            <span
              className={`relative inline-flex items-center w-[42px] h-[24px] rounded-full transition-colors duration-150 ${f.mktVerified ? 'bg-primary' : 'bg-surface2'}`}
            >
              <span
                className={`absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white shadow transition-transform duration-150 ${f.mktVerified ? 'translate-x-[21px]' : 'translate-x-[3px]'}`}
              />
            </span>
          </label>
        </aside>

        {/* Listing area */}
        <div className="px-[28px] pt-[24px] pb-[64px]">
          {/* Header row */}
          <div className="flex items-center justify-between mb-[22px]">
            <div>
              <h1 className="text-[22px] font-normal tracking-[-0.02em] m-0 mb-[3px]">The market</h1>
              <span className="text-[13px] text-ink2">
                {f.mktCount} on sale now · across 16 regions
              </span>
            </div>
            <div className="flex items-center gap-[14px]">
              {/* Sort select */}
              <div className="relative flex items-center bg-surface border border-line rounded-[8px] px-[10px]">
                <span className="text-[13px] text-ink2">Sort:</span>
                <select
                  value={f.mktSort}
                  onChange={f.setSort}
                  aria-label="Sort listings"
                  className="appearance-none bg-transparent border-none outline-none text-ink text-[13px] font-[inherit] py-[9px] pl-[6px] pr-[24px] cursor-pointer"
                >
                  <option value="best">Best match</option>
                  <option value="price-asc">Cheapest first</option>
                  <option value="price-desc">Most expensive</option>
                  <option value="near">Closest to me</option>
                  <option value="rating">Best rated</option>
                </select>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--text-secondary)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="absolute right-[9px] pointer-events-none"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>

              {/* View toggle buttons */}
              <div className="flex gap-[6px]">
                <button
                  onClick={f.setGrid}
                  aria-label="Grid view"
                  className={f.gridActive ? activeBtn : inactiveBtn}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                  </svg>
                </button>
                <button
                  onClick={f.setList}
                  aria-label="List view"
                  className={f.listActive ? activeBtn : inactiveBtn}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="8" y1="6" x2="21" y2="6" />
                    <line x1="8" y1="12" x2="21" y2="12" />
                    <line x1="8" y1="18" x2="21" y2="18" />
                    <line x1="3" y1="6" x2="3.01" y2="6" />
                    <line x1="3" y1="12" x2="3.01" y2="12" />
                    <line x1="3" y1="18" x2="3.01" y2="18" />
                  </svg>
                </button>
                <button
                  onClick={f.setMap}
                  aria-label="Map view"
                  className={f.mapActive ? activeBtn : inactiveBtn}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                    <line x1="9" y1="3" x2="9" y2="18" />
                    <line x1="15" y1="6" x2="15" y2="21" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Map view */}
          {f.mapActive && (
            <div className="relative h-[560px] border border-line rounded-[12px] overflow-hidden bg-surface">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 800 560"
                preserveAspectRatio="xMidYMid slice"
                className="absolute inset-0"
              >
                <rect width="800" height="560" fill="var(--bg-tertiary)" />
                <path
                  d="M120 80 L640 90 L660 470 L150 490 Z"
                  fill="none"
                  stroke="var(--border)"
                  strokeWidth="2"
                />
                <path
                  d="M0 200 H800 M0 360 H800 M280 0 V560 M520 0 V560"
                  stroke="var(--border)"
                  strokeWidth="1"
                  opacity="0.5"
                />
              </svg>

              {/* Kumasi pin */}
              <div className="absolute flex flex-col items-center" style={{ left: '30%', top: '38%' }}>
                <span className="bg-primary text-primary-ink text-[12px] px-[10px] py-[5px] rounded-[20px]">
                  Kumasi · 3
                </span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--primary)" stroke="none">
                  <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7z" />
                </svg>
              </div>

              {/* Tamale pin */}
              <div className="absolute flex flex-col items-center" style={{ left: '55%', top: '20%' }}>
                <span className="bg-primary text-primary-ink text-[12px] px-[10px] py-[5px] rounded-[20px]">
                  Tamale · 1
                </span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--primary)" stroke="none">
                  <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7z" />
                </svg>
              </div>

              {/* Cape Coast pin */}
              <div className="absolute flex flex-col items-center" style={{ left: '40%', top: '62%' }}>
                <span className="bg-primary text-primary-ink text-[12px] px-[10px] py-[5px] rounded-[20px]">
                  Cape Coast · 1
                </span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--primary)" stroke="none">
                  <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7z" />
                </svg>
              </div>

              {/* Ho pin */}
              <div className="absolute flex flex-col items-center" style={{ left: '68%', top: '50%' }}>
                <span className="bg-primary text-primary-ink text-[12px] px-[10px] py-[5px] rounded-[20px]">
                  Ho · 2
                </span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--primary)" stroke="none">
                  <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7z" />
                </svg>
              </div>

              {/* Legend */}
              <div className="absolute top-[16px] left-[16px] bg-bg border border-line rounded-[8px] px-[14px] py-[10px] text-[12px] text-ink2">
                8 listings · clustered by district
              </div>
            </div>
          )}

          {/* Grid view */}
          {f.gridActive && (
            <div className="grid grid-cols-3 gap-[18px]">
              {f.mktFiltered.map((l) => (
                <ListingCard key={l.id} l={l} showHarvest />
              ))}
            </div>
          )}

          {/* List view */}
          {f.listActive && (
            <div className="flex flex-col gap-[12px]">
              {f.mktFiltered.map((l) => (
                <div
                  key={l.id}
                  onClick={l.selectFn}
                  className="cursor-pointer flex items-center gap-[18px] bg-surface border border-line rounded-[12px] p-[14px] transition-colors duration-150 hover:border-ink3"
                >
                  {/* Image thumb */}
                  <div className="w-[120px] h-[72px] flex-shrink-0 rounded-[8px] overflow-hidden bg-surface2 relative">
                    {l.photo && (
                      <img
                        src={l.photo}
                        alt={l.crop}
                        className="w-full h-full object-cover block"
                      />
                    )}
                    <span className="absolute top-[6px] left-[6px] text-[10px] bg-primary-dim text-primary px-[8px] py-[2px] rounded-[20px]">
                      {l.crop}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-[10px] mb-[6px]">
                      <span className="text-[11px] bg-primary-dim text-primary px-[9px] py-[3px] rounded-[20px]">
                        {l.crop}
                      </span>
                      <span
                        className="text-[11px] px-[9px] py-[3px] rounded-[20px]"
                        style={{ background: l.aiBg, color: l.aiFg }}
                      >
                        {l.aiText}
                      </span>
                    </div>
                    <div className="text-[15px] text-ink">{l.farmer}</div>
                    <div className="text-[12px] text-ink2">
                      {l.distStr} · {l.qtyStr} available
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <div className="flex items-baseline gap-[3px] justify-end">
                      <span className="text-[21px] text-ink">{l.priceStr}</span>
                      <span className="text-[12px] text-ink2">/kg</span>
                    </div>
                  </div>

                  {/* Quick order */}
                  <button
                    onClick={l.orderFn}
                    className="bg-primary text-primary-ink border-none rounded-[6px] px-[16px] py-[9px] text-[13px] cursor-pointer font-[inherit] hover:opacity-[0.88] flex-shrink-0"
                  >
                    Quick order
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
