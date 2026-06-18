import { useFarm } from '../lib/derive'
import { TopBar } from '../components/shared'

export function Orders() {
  const f = useFarm()

  return (
    <div>
      <TopBar active="orders" />

      <div className="max-w-[1000px] mx-auto px-[28px] py-[32px] pb-[64px]">
        <h1 className="text-[28px] font-normal tracking-[-0.02em] mb-[6px]">Your orders</h1>
        <p className="text-[14px] text-ink2 mb-[32px]">
          See what's on the way, and look back at what you've bought. Tap an order to track it.
        </p>

        {/* On the way */}
        <div className="flex items-center gap-[10px] mb-[16px]">
          <h2 className="text-[17px] font-normal tracking-[-0.01em] m-0">On the way</h2>
          <span className="text-[12px] bg-primary-dim text-primary px-[10px] py-[3px] rounded-full">
            {f.ordersOngoingCount}
          </span>
        </div>
        <div className="flex flex-col gap-[12px] mb-[40px]">
          {f.ordersOngoing.map((o) => (
            <div
              key={o.id}
              onClick={o.onClick}
              className="cursor-pointer flex items-center gap-[16px] bg-surface border border-line rounded-[12px] px-[16px] py-[14px] transition-[border-color] duration-[150ms] ease-out hover:border-ink3"
            >
              <div className="w-[64px] h-[64px] flex-shrink-0 rounded-[8px] overflow-hidden bg-surface2">
                {o.photo && (
                  <img
                    src={o.photo}
                    alt={o.crop}
                    className="w-full h-full object-cover block"
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-[10px] mb-[4px]">
                  <span className="text-[12px] font-mono text-ink3">{o.id}</span>
                  <span
                    style={{ background: o.bg, color: o.fg }}
                    className="text-[11px] px-[10px] py-[3px] rounded-full"
                  >
                    {o.label}
                  </span>
                </div>
                <div className="text-[15px] text-ink">{o.crop} · {o.qtyStr}</div>
                <div className="text-[12.5px] text-ink2">{o.farmer} · {o.district} · {o.date}</div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-[16px] text-ink">{o.totalStr}</div>
              </div>
              <div className="flex items-center gap-[6px] flex-shrink-0 text-primary text-[13px]">
                Track
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Past orders */}
        <h2 className="text-[17px] font-normal tracking-[-0.01em] mb-[16px]">Past orders</h2>
        <div className="flex flex-col gap-[12px]">
          {f.ordersPast.map((o) => (
            <div
              key={o.id}
              onClick={o.onClick}
              className="cursor-pointer flex items-center gap-[16px] bg-surface border border-line rounded-[12px] px-[16px] py-[14px] transition-[border-color] duration-[150ms] ease-out hover:border-ink3"
            >
              <div className="w-[64px] h-[64px] flex-shrink-0 rounded-[8px] overflow-hidden bg-surface2">
                {o.photo && (
                  <img
                    src={o.photo}
                    alt={o.crop}
                    className="w-full h-full object-cover block"
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-[10px] mb-[4px]">
                  <span className="text-[12px] font-mono text-ink3">{o.id}</span>
                  <span
                    style={{ background: o.bg, color: o.fg }}
                    className="text-[11px] px-[10px] py-[3px] rounded-full"
                  >
                    {o.label}
                  </span>
                </div>
                <div className="text-[15px] text-ink">{o.crop} · {o.qtyStr}</div>
                <div className="text-[12.5px] text-ink2">{o.farmer} · {o.district} · {o.date}</div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-[16px] text-ink">{o.totalStr}</div>
              </div>
              <div className="flex items-center gap-[6px] flex-shrink-0 text-ink2 text-[13px]">
                View
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
