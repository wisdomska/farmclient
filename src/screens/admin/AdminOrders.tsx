import { useFarm } from '../../lib/derive'

export function AdminOrders() {
  const f = useFarm()

  return (
    <div>
      <h1 className="text-[24px] font-normal tracking-[-0.02em] text-ink m-0 mb-[3px]">Orders</h1>
      <span className="text-[13px] text-ink2">All buyer orders and where they are now</span>
      <div className="border border-line rounded-[8px] overflow-hidden mt-[22px]">
        <div
          className="bg-surface text-[12px] text-ink3 tracking-[0.04em] uppercase px-[18px] py-[12px]"
          style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.6fr 1.2fr 1fr 1fr' }}
        >
          <span>Order</span>
          <span>Crop</span>
          <span>Buyer</span>
          <span>Amount</span>
          <span>Status</span>
        </div>
        {f.ordersRows.map((o) => (
          <div
            key={o.id}
            className="border-t border-line px-[18px] py-[14px] text-[13.5px] items-center"
            style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.6fr 1.2fr 1fr 1fr' }}
          >
            <span className="text-ink3 font-mono text-[12px]">{o.id}</span>
            <span className="text-ink">{o.crop}</span>
            <span className="text-ink2">{o.who}</span>
            <span className="text-ink">{o.amt}</span>
            <span
              className="justify-self-start text-[11px] rounded-full px-[10px] py-1"
              style={{ background: o.bg, color: o.fg }}
            >
              {o.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
