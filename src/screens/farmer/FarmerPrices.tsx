import { useState } from 'react'
import { useFarm } from '../../lib/derive'
import { Spark, TrendArrow } from '../../components/primitives'
import { fmtGHS } from '../../lib/data'

const CROP_PRICES: Record<string, { price: number; trend: number; series: number[] }> = {
  Yam: { price: 4.2, trend: 3.2, series: [3.6, 3.7, 3.65, 3.8, 3.95, 4.0, 3.9, 4.05, 4.1, 4.2] },
  Maize: { price: 1.8, trend: 0, series: [1.75, 1.8, 1.78, 1.82, 1.8, 1.79, 1.81, 1.8, 1.8, 1.8] },
  Cassava: { price: 1.1, trend: 0.6, series: [1.0, 1.02, 1.05, 1.03, 1.06, 1.08, 1.07, 1.09, 1.1, 1.1] },
  Tomato: { price: 6.5, trend: -1.4, series: [7.1, 7.0, 6.9, 6.95, 6.8, 6.7, 6.75, 6.6, 6.55, 6.5] },
}

export function FarmerPrices() {
  const f = useFarm()
  const [crop, setCrop] = useState('Yam')
  const cur = CROP_PRICES[crop]
  const trendColor = cur.trend > 0 ? 'var(--success)' : cur.trend < 0 ? 'var(--error)' : 'var(--text-secondary)'
  // Regional spread scales with the selected crop's national average
  const regions = f.priceRegions.map((r, i) => {
    const factor = [1, 0.96, 0.9, 1.08, 0.94][i]
    return { ...r, priceStr: fmtGHS(cur.price * factor) }
  })

  return (
    <div style={{ padding: '14px 20px 28px' }}>
      <div className="text-[20px] tracking-[-0.01em] text-ink mb-[16px]">Today's prices</div>

      {/* Crop pills */}
      <div className="fcscroll flex gap-[8px] mb-[20px] pb-[4px]" style={{ overflowX: 'auto' }}>
        {Object.keys(CROP_PRICES).map((c) => (
          <button
            key={c}
            onClick={() => setCrop(c)}
            className={
              c === crop
                ? 'flex-shrink-0 text-[13px] bg-primary text-primary-ink border-none px-[16px] py-[7px] rounded-full cursor-pointer font-[inherit]'
                : 'flex-shrink-0 text-[13px] text-ink2 bg-transparent border border-line px-[16px] py-[7px] rounded-full cursor-pointer font-[inherit]'
            }
          >
            {c}
          </button>
        ))}
      </div>

      {/* Price big card */}
      <div className="bg-surface border border-line rounded-[12px] p-[20px] mb-[20px]">
        <div className="text-[12px] text-ink2 mb-[4px]">{crop} · average across Ghana</div>
        <div className="flex items-baseline gap-[8px] mb-[14px]">
          <span className="text-[34px] tracking-[-0.02em] text-ink">{fmtGHS(cur.price)}</span>
          <span className="text-[14px] text-ink2">/kg</span>
          <span className="inline-flex items-center gap-[4px] text-[13px]" style={{ color: trendColor }}>
            <TrendArrow value={cur.trend} size={13} />
            {(cur.trend > 0 ? '+' : '') + cur.trend.toFixed(1)}%
          </span>
        </div>
        <Spark data={cur.series} w={300} h={80} color="var(--primary)" fill />
      </div>

      {/* Prices near you */}
      <div className="text-[13px] text-ink2 mb-[10px]">Prices near you</div>
      <div className="border border-line rounded-[12px] overflow-hidden">
        {regions.map((r) => (
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
