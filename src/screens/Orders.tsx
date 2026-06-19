import { useEffect, useState } from 'react'
import { useFarm } from '../lib/derive'
import { useStore } from '../store'
import { TopBar } from '../components/shared'
import { api, apiEnabled } from '../lib/api'
import { chip, cropPhoto, fmtGHS } from '../lib/data'

// Map API order status string to chip key
function statusToChipKey(status: string): string {
  switch (status) {
    case 'pending_payment': return 'pending'
    case 'confirmed': return 'confirmed'
    case 'in_progress': return 'active'
    case 'delivered': return 'delivered'
    case 'completed': return 'delivered'
    case 'disputed': return 'disputed'
    default: return 'active'
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapApiOrder(o: any, onClick: () => void) {
  const statusKey = statusToChipKey(o.status as string)
  const c = chip(statusKey)
  return {
    id: (o.orderRef ?? o.id) as string,
    crop: o.cropType as string,
    photo: cropPhoto(o.cropType as string),
    farmer: o.farmer?.fullName as string ?? '—',
    district: o.farmer?.district as string ?? '—',
    qtyStr: `${o.quantityKg} kg`,
    date: typeof o.createdAt === 'string' ? o.createdAt.slice(0, 10) : '',
    totalStr: fmtGHS(Number(o.totalPaid ?? 0)),
    bg: c.bg,
    fg: c.fg,
    label: c.label,
    onClick,
  }
}

export function Orders() {
  const f = useFarm()
  const { set } = useStore()
  const [liveOngoing, setLiveOngoing] = useState<ReturnType<typeof mapApiOrder>[] | null>(null)
  const [livePast, setLivePast] = useState<ReturnType<typeof mapApiOrder>[] | null>(null)

  useEffect(() => {
    if (!apiEnabled) return
    api.myOrders().then((res) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mapRow = (o: any) => mapApiOrder(o, () => {
        set({ selectedId: o.id, currentOrderId: o.id })
        f.go('tracking')
      })
      setLiveOngoing((res.ongoing as unknown[]).map(mapRow))
      setLivePast((res.past as unknown[]).map(mapRow))
    }).catch(() => {
      setLiveOngoing(null)
      setLivePast(null)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Prefer live data; fall back to mock
  const ordersOngoing = liveOngoing ?? f.ordersOngoing
  const ordersPast = livePast ?? f.ordersPast
  const ordersOngoingCount = ordersOngoing.length


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
            {ordersOngoingCount}
          </span>
        </div>
        <div className="flex flex-col gap-[12px] mb-[40px]">
          {ordersOngoing.map((o) => (
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
          {ordersPast.map((o) => (
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
