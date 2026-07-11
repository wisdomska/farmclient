import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFarm } from '../lib/derive'
import { TopBar } from '../components/shared'
import { api, apiEnabled } from '../lib/api'
import { cropPhoto, fmtGHS, fmtQty } from '../lib/data'
import { statusChip } from '../lib/orderStatus'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapApiOrder(o: any, onClick: () => void) {
  const c = statusChip(o.status as string)
  return {
    id: (o.orderRef ?? o.id) as string,
    crop: o.cropType as string,
    photo: cropPhoto(o.cropType as string),
    farmer: o.farmer?.fullName as string ?? '—',
    district: o.farmer?.district as string ?? '—',
    qtyStr: fmtQty(Number(o.quantityKg ?? 0)),
    date: typeof o.createdAt === 'string' ? o.createdAt.slice(0, 10) : '',
    totalStr: fmtGHS(Number(o.totalPaid ?? 0)),
    bg: c.bg,
    fg: c.fg,
    label: c.label,
    onClick,
  }
}

/** Placeholder row shown while live orders load — same shape as a real row, no layout shift. */
function SkeletonRow() {
  return (
    <div className="flex items-center gap-[16px] bg-surface border border-line rounded-[12px] px-[16px] py-[14px]" aria-hidden="true">
      <div className="w-[64px] h-[64px] flex-shrink-0 rounded-[8px] bg-surface2 fc-pulse" />
      <div className="flex-1 min-w-0 flex flex-col gap-[8px]">
        <div className="h-[12px] w-[140px] rounded bg-surface2 fc-pulse" />
        <div className="h-[14px] w-[200px] rounded bg-surface2 fc-pulse" />
        <div className="h-[11px] w-[240px] rounded bg-surface2 fc-pulse" />
      </div>
      <div className="h-[16px] w-[80px] rounded bg-surface2 fc-pulse" />
    </div>
  )
}

type FetchState = 'loading' | 'ready' | 'error'

export function Orders() {
  const f = useFarm()
  const navigate = useNavigate()
  const [liveOngoing, setLiveOngoing] = useState<ReturnType<typeof mapApiOrder>[] | null>(null)
  const [livePast, setLivePast] = useState<ReturnType<typeof mapApiOrder>[] | null>(null)
  const [fetchState, setFetchState] = useState<FetchState>(apiEnabled ? 'loading' : 'ready')

  // fetchState starts at 'loading' when the API is enabled, so the initial
  // effect only kicks off the request; 'loading' is re-set only on retry.
  function load() {
    if (!apiEnabled) return
    api.myOrders().then((res) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mapRow = (o: any) => mapApiOrder(o, () => navigate(`/app/orders/${o.id}`))
      setLiveOngoing((res.ongoing as unknown[]).map(mapRow))
      setLivePast((res.past as unknown[]).map(mapRow))
      setFetchState('ready')
    }).catch(() => {
      // Never substitute demo orders for a real buyer's order history —
      // show an honest error with retry instead.
      setLiveOngoing(null)
      setLivePast(null)
      setFetchState('error')
    })
  }

  useEffect(() => {
    load()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Live data when the API is configured; demo data only in demo builds.
  const ordersOngoing = apiEnabled ? (liveOngoing ?? []) : f.ordersOngoing
  const ordersPast = apiEnabled ? (livePast ?? []) : f.ordersPast
  const ordersOngoingCount = ordersOngoing.length
  const isEmpty = fetchState === 'ready' && ordersOngoing.length === 0 && ordersPast.length === 0

  return (
    <div>
      <TopBar active="orders" />

      <div className="max-w-[1000px] mx-auto px-[28px] py-[32px] pb-[64px]">
        <h1 className="text-[28px] font-normal tracking-[-0.02em] mb-[6px]">Your orders</h1>
        <p className="text-[14px] text-ink2 mb-[32px]">
          See what's on the way, and look back at what you've bought. Tap an order to track it.
        </p>

        {fetchState === 'loading' && (
          <div className="flex flex-col gap-[12px]" role="status" aria-label="Loading your orders">
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
          </div>
        )}

        {fetchState === 'error' && (
          <div className="flex flex-col items-start gap-[12px] bg-surface border border-line rounded-[12px] p-[24px]">
            <div className="text-[15px] text-ink">We couldn't load your orders</div>
            <div className="text-[13px] text-ink2">Check your connection and try again — your orders and payments are safe.</div>
            <button
              onClick={() => {
                setFetchState('loading')
                load()
              }}
              className="bg-primary text-primary-ink border-none rounded-[8px] px-[18px] py-[10px] text-[13.5px] cursor-pointer font-[inherit] min-h-[44px] hover:opacity-[0.88]"
            >
              Try again
            </button>
          </div>
        )}

        {isEmpty && (
          <div className="flex flex-col items-center gap-[12px] bg-surface border border-line rounded-[12px] p-[36px] text-center">
            <div className="text-[16px] text-ink">No orders yet</div>
            <div className="text-[13px] text-ink2 max-w-[320px]">
              When you order from a farmer, it shows up here so you can track it from payment to delivery.
            </div>
            <button
              onClick={f.goMarketplace}
              className="bg-primary text-primary-ink border-none rounded-[8px] px-[20px] py-[12px] text-[14px] cursor-pointer font-[inherit] min-h-[44px] hover:opacity-[0.88]"
            >
              Browse the market
            </button>
          </div>
        )}

        {fetchState === 'ready' && !isEmpty && (
        <>
        {/* On the way */}
        <div className="flex items-center gap-[10px] mb-[16px]">
          <h2 className="text-[17px] font-normal tracking-[-0.01em] m-0">On the way</h2>
          <span className="text-[12px] bg-primary-dim text-primary px-[10px] py-[3px] rounded-full">
            {ordersOngoingCount}
          </span>
        </div>
        <div className="flex flex-col gap-[12px] mb-[40px]">
          {ordersOngoing.map((o) => (
            <div
              key={o.id}
              onClick={o.onClick}
              role="button"
              tabIndex={0}
              aria-label={`Track order ${o.id}: ${o.crop}, ${o.label}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  o.onClick()
                }
              }}
              className="cursor-pointer flex items-center gap-[16px] bg-surface border border-line rounded-[12px] px-[16px] py-[14px] transition-[border-color] duration-[150ms] ease-out hover:border-ink3 focus-visible:border-primary outline-none"
            >
              <div className="w-[64px] h-[64px] flex-shrink-0 rounded-[8px] overflow-hidden bg-surface2">
                {o.photo && (
                  <img loading="lazy" decoding="async"
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
          {ordersPast.map((o) => (
            <div
              key={o.id}
              onClick={o.onClick}
              role="button"
              tabIndex={0}
              aria-label={`Track order ${o.id}: ${o.crop}, ${o.label}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  o.onClick()
                }
              }}
              className="cursor-pointer flex items-center gap-[16px] bg-surface border border-line rounded-[12px] px-[16px] py-[14px] transition-[border-color] duration-[150ms] ease-out hover:border-ink3 focus-visible:border-primary outline-none"
            >
              <div className="w-[64px] h-[64px] flex-shrink-0 rounded-[8px] overflow-hidden bg-surface2">
                {o.photo && (
                  <img loading="lazy" decoding="async"
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
        </>
        )}
      </div>
    </div>
  )
}
