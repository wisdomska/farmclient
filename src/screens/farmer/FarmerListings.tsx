import { useState } from 'react'
import { useFarm } from '../../lib/derive'

const PILLS = ['Selling', 'Sold', 'Ended'] as const
type Pill = (typeof PILLS)[number]

export function FarmerListings() {
  const f = useFarm()
  const [pill, setPill] = useState<Pill>('Selling')
  const shown = f.myListings.filter((m) =>
    pill === 'Selling' ? m.label === 'Selling' : pill === 'Sold' ? m.label === 'Sold' : false,
  )

  return (
    <div style={{ padding: '14px 20px 28px' }}>
      <div className="text-[20px] tracking-[-0.01em] text-ink mb-[18px]">My crops</div>

      {/* Status pills */}
      <div className="flex gap-[8px] mb-[20px]">
        {PILLS.map((p) => (
          <button
            key={p}
            onClick={() => setPill(p)}
            className={
              p === pill
                ? 'text-[13px] bg-primary text-primary-ink border-none px-[16px] py-[7px] rounded-full cursor-pointer font-[inherit]'
                : 'text-[13px] text-ink2 bg-transparent border border-line px-[16px] py-[7px] rounded-full cursor-pointer font-[inherit]'
            }
          >
            {p}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-[12px]">
        {shown.map((m) => (
          <div key={m.crop + m.qtyStr} className="flex items-center gap-[12px] bg-surface border border-line rounded-[10px] p-[14px]">
            <div style={{ width: 46, height: 46, flexShrink: 0, borderRadius: 8, overflow: 'hidden', background: 'var(--bg-tertiary)' }}>
              {m.photo && <img loading="lazy" decoding="async" src={m.photo} alt={m.crop} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
            </div>
            <div className="flex-1">
              <div className="text-[14px] text-ink">{m.crop}</div>
              <div className="text-[12px] text-ink2">{m.qtyStr} · {m.priceStr}</div>
            </div>
            <span className="rounded-full px-[10px] py-1 text-[11px]" style={{ background: m.bg, color: m.fg }}>{m.label}</span>
          </div>
        ))}
        {shown.length === 0 && (
          <div className="text-[13px] text-ink2 bg-surface border border-line rounded-[10px] p-[16px] text-center">
            Nothing here yet.
          </div>
        )}
      </div>
    </div>
  )
}
