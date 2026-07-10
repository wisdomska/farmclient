import { useFarm } from '../../lib/derive'
import { Spark, TrendArrow } from '../../components/primitives'

export function FarmerPrices() {
  const f = useFarm()

  return (
    <div style={{ padding: '14px 20px 28px' }}>
      <div className="text-[20px] tracking-[-0.01em] text-ink mb-[16px]">Today's prices</div>

      {/* Crop pills */}
      <div className="fcscroll flex gap-[8px] mb-[20px] pb-[4px]" style={{ overflowX: 'auto' }}>
        <span className="flex-shrink-0 text-[13px] bg-primary text-primary-ink px-[16px] py-[7px] rounded-full">Yam</span>
        <span className="flex-shrink-0 text-[13px] text-ink2 border border-line px-[16px] py-[7px] rounded-full" style={{ background: 'transparent' }}>Maize</span>
        <span className="flex-shrink-0 text-[13px] text-ink2 border border-line px-[16px] py-[7px] rounded-full" style={{ background: 'transparent' }}>Cassava</span>
        <span className="flex-shrink-0 text-[13px] text-ink2 border border-line px-[16px] py-[7px] rounded-full" style={{ background: 'transparent' }}>Tomato</span>
      </div>

      {/* Price big card */}
      <div className="bg-surface border border-line rounded-[12px] p-[20px] mb-[20px]">
        <div className="text-[12px] text-ink2 mb-[4px]">Yam · average across Ghana</div>
        <div className="flex items-baseline gap-[8px] mb-[14px]">
          <span className="text-[34px] tracking-[-0.02em] text-ink">{f.priceBig}</span>
          <span className="text-[14px] text-ink2">/kg</span>
          <span className="inline-flex items-center gap-[4px] text-[13px] text-success">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17 17 7"/><path d="M9 7h8v8"/>
            </svg>
            3.2%
          </span>
        </div>
        <Spark data={f.priceSeries} w={300} h={80} color="var(--primary)" fill />
      </div>

      {/* Prices near you */}
      <div className="text-[13px] text-ink2 mb-[10px]">Prices near you</div>
      <div className="border border-line rounded-[12px] overflow-hidden">
        {f.priceRegions.map((r) => (
          <div key={r.region} className="flex items-center justify-between border-b border-line" style={{ padding: '14px 16px' }}>
            <span className="text-[14px] text-ink">{r.region}</span>
            <div className="flex items-center gap-[10px]">
              <span className="text-[14px] text-ink">{r.priceStr}</span>
              <span className="inline-flex"><TrendArrow value={r.trend} size={12} /></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
