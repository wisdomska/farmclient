import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useFarm } from '../lib/derive'
import { StarIcon } from '../components/primitives'
import { TopBar } from '../components/shared'
import { api, apiEnabled } from '../lib/api'
import { MOCK_ORDERS, fmtGHS, fmtQty } from '../lib/data'
import { ORDERED_STEP_LABELS, nextStatus, orderStatusInfo, type OrderStatus } from '../lib/orderStatus'

interface LiveOrder {
  crop: string
  farmer: string
  district: string
  region: string
  qty: number
  totalStr: string
  placed: string
}

/** State passed by Checkout right after a demo order is placed. */
interface NewOrderState {
  listingId?: string
  qty?: number
  status?: OrderStatus
  placed?: string
}

export function Tracking() {
  const f = useFarm()
  const navigate = useNavigate()
  const location = useLocation()
  const { orderId } = useParams<{ orderId: string }>()

  const newOrder = (location.state ?? null) as NewOrderState | null
  const mock = MOCK_ORDERS.find((m) => m.id === orderId)

  // The one status for this order — every element below (chip semantics,
  // stepper, actions) derives from it via lib/orderStatus.
  const [status, setStatus] = useState<OrderStatus>(newOrder?.status ?? mock?.status ?? 'pending_payment')
  const [live, setLive] = useState<LiveOrder | null>(null)
  const [showRating, setShowRating] = useState(false)
  const [rated, setRated] = useState(0)

  useEffect(() => {
    if (!apiEnabled || !orderId) return
    api.order(orderId).then((raw) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const o = raw as any
      if (o?.status) setStatus(o.status as OrderStatus)
      if (o?.cropType) {
        setLive({
          crop: o.cropType as string,
          farmer: (o.farmer?.fullName as string) ?? '—',
          district: (o.farmer?.district as string) ?? '—',
          region: (o.farmer?.region as string) ?? '',
          qty: Number(o.quantityKg ?? 0),
          totalStr: fmtGHS(Number(o.totalPaid ?? 0)),
          placed: typeof o.createdAt === 'string' ? o.createdAt.slice(0, 10) : '',
        })
      }
    }).catch(() => { /* keep mock/demo fields */ })
  }, [orderId])

  // Demo/mock display fields when no live order is available
  const lid = newOrder?.listingId ?? mock?.lid ?? 'L1'
  const listing = f.all.find((l) => l.id === lid) ?? f.all[0]
  const qty = live?.qty ?? newOrder?.qty ?? mock?.qty ?? 100
  const crop = live?.crop ?? listing.crop
  const farmer = live?.farmer ?? listing.farmer
  const district = live?.district ?? listing.district
  const region = live?.region ?? listing.region
  const totalStr = live?.totalStr ?? fmtGHS(listing.price * qty)
  const placed = live?.placed ?? newOrder?.placed ?? mock?.date ?? ''

  const info = orderStatusInfo(status)
  const steps = ORDERED_STEP_LABELS.map((name, i) => ({
    name,
    idx: i + 1,
    done: i < info.trackStep,
    current: i === info.trackStep,
    future: i > info.trackStep,
  }))
  const isDelivered = info.trackStep >= 3

  const confirmReceipt = () => {
    setStatus('completed')
    setShowRating(true)
  }
  const closeRating = () => {
    setShowRating(false)
    if (apiEnabled && orderId && rated > 0) {
      api.rateOrder(orderId, rated).catch(() => undefined)
    }
    f.showToast('Thank you! Your rating was saved.')
  }

  return (
    <div>
      <TopBar showNav={false} showAvatar={false} back={{ label: 'All orders', onClick: () => navigate('/app/orders') }} />

      <div className="max-w-[720px] mx-auto px-[28px] pt-[40px] pb-[64px]">
        <div className="flex items-center justify-between mb-[6px]">
          <span className="text-[13px] font-mono text-ink3">{orderId}</span>
          {placed && <span className="text-[13px] text-ink2">Placed {placed}</span>}
        </div>
        <h1 className="text-[26px] font-normal tracking-[-0.02em] m-0 mb-[8px]">
          {crop} · {fmtQty(qty)} from {farmer}
        </h1>
        <div className="text-[14px] text-ink2 mb-[20px]">
          {district}{region ? `, ${region}` : ''} · Total {totalStr}
        </div>

        {/* Escrow status — when money is held vs released (SRS §2.2) */}
        <div className="flex gap-[11px] bg-primary-dim rounded-[8px] p-[14px] mb-[24px]">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary flex-shrink-0 mt-[1px]">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span className="text-[13px] text-ink leading-[1.55]">
            {info.trackStep >= 4
              ? `${totalStr} has been released from escrow and paid to ${farmer}.`
              : status === 'disputed'
                ? `${totalStr} stays safely in escrow while we resolve your dispute.`
                : `${totalStr} is held safely in escrow. ${farmer} is only paid after you confirm delivery.`}
          </span>
        </div>

        {/* stepper */}
        <div className="border border-line rounded-[12px] px-[28px] pt-[28px] pb-[8px] mb-[24px]">
          {steps.map((st) => (
            <div key={st.idx} className="flex gap-[16px] pb-[20px] relative">
              <div className="flex flex-col items-center flex-shrink-0">
                {st.done && (
                  <div className="w-[30px] h-[30px] rounded-full bg-primary flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary-text)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                )}
                {st.current && (
                  <div className="w-[30px] h-[30px] rounded-full border-2 border-primary flex items-center justify-center">
                    <span className="w-[10px] h-[10px] rounded-full bg-primary fc-pulse" />
                  </div>
                )}
                {st.future && (
                  <div className="w-[30px] h-[30px] rounded-full border-2 border-line flex items-center justify-center text-[12px] text-ink3">
                    {st.idx}
                  </div>
                )}
                <div className="w-[2px] flex-1 min-h-[18px] bg-line mt-[4px]" />
              </div>
              <div className="pt-[4px]">
                <div className="text-[15px] text-ink">{st.name}</div>
                {st.current && (
                  <div className="text-[13px] text-primary mt-[3px]">In progress now</div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-[12px] items-center">
          {isDelivered && (
            <>
              <button
                onClick={confirmReceipt}
                className="bg-primary text-primary-ink border-none rounded-[8px] px-[22px] py-[14px] text-[14px] cursor-pointer font-[inherit] min-h-[44px] hover:opacity-[0.88]"
              >
                I got my order
              </button>
              <span
                onClick={() => {
                  setStatus('disputed')
                  f.showToast('We opened a dispute. Our team will call you shortly.')
                }}
                className="text-[13px] text-ink3 cursor-pointer underline hover:text-ink"
              >
                Report a problem
              </span>
            </>
          )}
          <button
            onClick={() => setStatus((s) => nextStatus(s))}
            className="bg-transparent text-ink2 border border-line rounded-[8px] px-[22px] py-[14px] text-[14px] cursor-pointer font-[inherit] min-h-[44px] hover:border-ink3 hover:text-ink"
          >
            Advance status (demo)
          </button>
        </div>
      </div>

      {showRating && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-[20px]" style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className="bg-surface border border-line rounded-[12px] p-[36px] max-w-[380px] w-full text-center">
            <div className="w-[52px] h-[52px] mx-auto mb-[18px] rounded-full bg-success-dim flex items-center justify-center">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <h2 className="text-[20px] font-normal tracking-[-0.01em] m-0 mb-[8px]">All done!</h2>
            <p className="text-[14px] text-ink2 leading-[1.6] m-0 mb-[24px]">
              {farmer} has been paid {totalStr}, straight to their phone. Thank you! How was your order?
            </p>
            <div className="flex justify-center gap-[8px] mb-[26px]">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => setRated(n)}
                  aria-label={`Rate ${n}`}
                  className="bg-transparent border-none cursor-pointer p-[4px]"
                >
                  <StarIcon filled={n <= rated} size={30} />
                </button>
              ))}
            </div>
            <button
              onClick={closeRating}
              className="w-full bg-primary text-primary-ink border-none rounded-[8px] py-[13px] text-[14px] cursor-pointer font-[inherit] min-h-[44px] hover:opacity-[0.88]"
            >
              Submit rating
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
