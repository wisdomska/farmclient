import { useFarm } from '../../lib/derive'

export function AdminPayments() {
  const f = useFarm()

  return (
    <div>
      <h1 className="text-[24px] font-normal tracking-[-0.02em] text-ink m-0 mb-[3px]">Payments</h1>
      <span className="text-[13px] text-ink2">Money paid in and out of FarmClient</span>
      <div className="border border-line rounded-[8px] overflow-hidden mt-[22px]">
        <div
          className="bg-surface text-[12px] text-ink3 tracking-[0.04em] uppercase px-[18px] py-[12px]"
          style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.4fr 1.3fr 1fr 1fr' }}
        >
          <span>Reference</span>
          <span>Type</span>
          <span>Person</span>
          <span>Amount</span>
          <span>Date</span>
        </div>
        {f.paymentsRows.map((p) => (
          <div
            key={p.ref}
            className="border-t border-line px-[18px] py-[14px] text-[13.5px] items-center"
            style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.4fr 1.3fr 1fr 1fr' }}
          >
            <span className="text-ink3 font-mono text-[12px]">{p.ref}</span>
            <span className="text-ink">{p.type}</span>
            <span className="text-ink2">{p.who}</span>
            <span className="text-ink">{p.amt}</span>
            <span className="text-ink3">{p.date}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
