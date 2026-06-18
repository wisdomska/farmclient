import { useFarm } from '../lib/derive'
import { TrendArrow, Ring, Spark } from '../components/primitives'
import { TopBar } from '../components/shared'

export function ListingDetail() {
  const f = useFarm()

  return (
    <div>
      <TopBar showNav={false} back={{ label: 'Back to marketplace', onClick: f.goMarketplace }} />

      <div className="max-w-[1200px] mx-auto px-[28px] pt-[32px] pb-[64px] grid gap-[32px]" style={{ gridTemplateColumns: '1fr 380px' }}>
        {/* LEFT COLUMN */}
        <div>
          {/* Main gallery image */}
          <div className="border border-line rounded-[12px] bg-surface2 flex items-center justify-center relative text-ink3 mb-[12px]" style={{ aspectRatio: '16/9' }}>
            {f.sel.photo && (
              <img src={f.sel.photo} alt={f.sel.crop} className="absolute inset-0 w-full h-full object-cover" />
            )}
            <span className="absolute top-[14px] left-[14px] text-[12px] bg-primary-dim text-primary px-[12px] py-[5px] rounded-full">
              {f.sel.crop}
            </span>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-[10px] mb-[32px]">
            <div className="aspect-square rounded-[8px] overflow-hidden border border-primary">
              {f.sel.photo && (
                <img src={f.sel.photo} alt={f.sel.crop} className="w-full h-full object-cover block" />
              )}
            </div>
            <div className="aspect-square rounded-[8px] overflow-hidden border border-line">
              <img
                src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=1100&q=72"
                alt="Farm"
                className="w-full h-full object-cover block"
                style={{ opacity: 0.9 }}
              />
            </div>
            <div className="aspect-square rounded-[8px] overflow-hidden border border-line">
              {f.sel.photo && (
                <img src={f.sel.photo} alt={f.sel.crop} className="w-full h-full object-cover block" style={{ opacity: 0.85 }} />
              )}
            </div>
            <div className="aspect-square rounded-[8px] overflow-hidden border border-line">
              <img
                src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=1100&q=72"
                alt="Farm"
                className="w-full h-full object-cover block"
                style={{ opacity: 0.75 }}
              />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-[28px] font-normal tracking-[-0.02em] m-0 mb-[6px] text-ink">
            {f.sel.crop} — {f.sel.district}
          </h1>
          <div className="text-[14px] text-ink2 mb-[28px]">
            {f.sel.region} Region · Harvested {f.sel.harvest}
          </div>

          {/* Produce details 2x2 */}
          <div className="grid grid-cols-2 gap-[14px] mb-[32px]">
            <div className="border border-line rounded-[8px] p-[16px]">
              <div className="text-[12px] text-ink3 mb-[6px]">Quantity available</div>
              <div className="text-[16px] text-ink">{f.sel.qtyStr}</div>
            </div>
            <div className="border border-line rounded-[8px] p-[16px]">
              <div className="text-[12px] text-ink3 mb-[6px]">Harvest date</div>
              <div className="text-[16px] text-ink">{f.sel.harvest}</div>
            </div>
            <div className="border border-line rounded-[8px] p-[16px]">
              <div className="text-[12px] text-ink3 mb-[6px]">Storage condition</div>
              <div className="text-[16px] text-ink">{f.sel.storage}</div>
            </div>
            <div className="border border-line rounded-[8px] p-[16px]">
              <div className="text-[12px] text-ink3 mb-[6px]">Delivery</div>
              <div className="text-[16px] text-ink">{f.sel.delivery}</div>
            </div>
          </div>

          {/* Fair price guide card */}
          <div className="border border-line rounded-[12px] p-[24px] mb-[32px]">
            <div className="flex items-center gap-[8px] mb-[18px]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 3 1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3z" />
              </svg>
              <span className="text-[16px] text-ink">Fair price guide</span>
            </div>
            <div className="flex items-end justify-between gap-[24px]">
              <div>
                <div className="text-[12px] text-ink3 mb-[6px]">Current fair price</div>
                <div className="flex items-baseline gap-[6px]">
                  <span className="text-[32px] tracking-[-0.02em] text-ink">{f.sel.priceStr}</span>
                  <span className="text-[14px] text-ink2">/kg</span>
                </div>
                <div className="inline-flex items-center gap-[5px] mt-[8px] text-[13px]" style={{ color: f.trendColor }}>
                  <TrendArrow value={f.sel.trend} size={16} />
                  {f.trendStr} this week
                </div>
              </div>
              <div className="flex-1 max-w-[300px]">
                <Spark data={f.priceChartData} w={300} h={90} color="var(--primary)" fill />
              </div>
            </div>
          </div>

          {/* Similar listings */}
          <h2 className="text-[18px] font-normal tracking-[-0.01em] m-0 mb-[16px] text-ink">Similar listings</h2>
          <div className="grid grid-cols-3 gap-[14px]">
            {f.similar.map((l) => (
              <div
                key={l.id}
                onClick={l.selectFn}
                className="cursor-pointer bg-surface border border-line rounded-[8px] overflow-hidden transition-[border-color] duration-[150ms] ease-out hover:border-ink3"
              >
                <div className="relative overflow-hidden bg-surface2" style={{ aspectRatio: '16/9' }}>
                  {l.photo && (
                    <img src={l.photo} alt={l.crop} className="w-full h-full object-cover block" />
                  )}
                  <span className="absolute top-[8px] left-[8px] text-[11px] bg-primary-dim text-primary px-[9px] py-[3px] rounded-full">
                    {l.crop}
                  </span>
                </div>
                <div className="p-[12px]">
                  <div className="text-[13px] text-ink">{l.farmer}</div>
                  <div className="text-[11px] text-ink2 mt-[2px] mb-[8px]">{l.district}</div>
                  <div className="text-[17px] text-ink">
                    {l.priceStr}<span className="text-[11px] text-ink2">/kg</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT RAIL */}
        <div>
          {/* Farmer card */}
          <div className="border border-line rounded-[12px] p-[24px] mb-[16px]">
            <div className="flex items-center gap-[14px] mb-[20px]">
              <div className="w-[52px] h-[52px] rounded-full bg-surface2 border border-line flex items-center justify-content-center text-[16px] text-ink2 flex-shrink-0" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {f.sel.initials}
              </div>
              <div>
                <div className="flex items-center gap-[7px]">
                  <span className="text-[16px] text-ink">{f.sel.farmer}</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <div className="inline-flex items-center gap-[4px] text-[13px] text-ink2 mt-[3px]">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="var(--primary)" stroke="none">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
                  </svg>
                  {f.sel.ratingStr} · {f.sel.reviews} orders
                </div>
              </div>
            </div>
            <div className="flex items-center gap-[18px] border-t border-line pt-[18px]">
              <div className="relative w-[120px] h-[120px] flex-shrink-0">
                <Ring score={f.sel.score} size={120} />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[24px] text-ink">{f.sel.score}</span>
                  <span className="text-[10px] text-ink3 tracking-[0.04em]">TRUST SCORE</span>
                </div>
              </div>
              <div className="text-[13px] text-ink2 leading-[1.6]">
                The trust score shows how reliable this farmer is. A higher score means more buyers trust them — and it helps them get a small loan.
              </div>
            </div>
          </div>

          {/* Order panel */}
          <div className="border border-line rounded-[12px] p-[24px]" style={{ position: 'sticky', top: '80px' }}>
            <div className="flex items-baseline gap-[5px] mb-[20px]">
              <span className="text-[30px] tracking-[-0.02em] text-ink">{f.sel.priceStr}</span>
              <span className="text-[14px] text-ink2">/kg</span>
            </div>
            <div className="text-[12px] text-ink3 mb-[8px]">Quantity (kg)</div>
            <div className="flex items-center border border-line rounded-[8px] overflow-hidden mb-[18px]">
              <button
                onClick={f.decQty}
                aria-label="Decrease quantity"
                className="w-[48px] h-[48px] flex-shrink-0 bg-surface border-none text-ink cursor-pointer flex items-center justify-center hover:bg-surface2"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M5 12h14" />
                </svg>
              </button>
              <div className="flex-1 text-center text-[18px] text-ink">{f.orderQty}</div>
              <button
                onClick={f.incQty}
                aria-label="Increase quantity"
                className="w-[48px] h-[48px] flex-shrink-0 bg-surface border-none text-ink cursor-pointer flex items-center justify-center hover:bg-surface2"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
              </button>
            </div>
            <div className="flex items-center justify-between mb-[18px]">
              <span className="text-[14px] text-ink2">Order total</span>
              <span className="text-[22px] text-ink">{f.orderTotalStr}</span>
            </div>
            <button
              onClick={f.sel.orderFn}
              className="w-full bg-primary text-primary-ink border-none rounded-[8px] py-[15px] text-[15px] cursor-pointer font-[inherit] min-h-[44px] transition-opacity duration-[150ms] ease-out hover:opacity-[0.88]"
            >
              Place order
            </button>
            <div className="flex items-center justify-center gap-[6px] text-[12px] text-ink3 mt-[14px]">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Your money is safe until your food arrives
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
