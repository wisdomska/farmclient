import { useFarm } from '../../lib/derive'

export function FarmerListings() {
  const f = useFarm()

  return (
    <div style={{ padding: '14px 20px 28px' }}>
      <div className="text-[20px] tracking-[-0.01em] text-ink mb-[18px]">My crops</div>

      {/* Status pills */}
      <div className="flex gap-[8px] mb-[20px]">
        <span className="text-[13px] bg-primary text-primary-ink px-[16px] py-[7px] rounded-full">Selling</span>
        <span className="text-[13px] text-ink2 border border-line px-[16px] py-[7px] rounded-full" style={{ background: 'transparent' }}>Sold</span>
        <span className="text-[13px] text-ink2 border border-line px-[16px] py-[7px] rounded-full" style={{ background: 'transparent' }}>Ended</span>
      </div>

      <div className="flex flex-col gap-[12px]">
        {f.myListings.map((m) => (
          <div key={m.crop + m.qtyStr} className="flex items-center gap-[12px] bg-surface border border-line rounded-[10px] p-[14px]">
            <div style={{ width: 46, height: 46, flexShrink: 0, borderRadius: 8, overflow: 'hidden', background: 'var(--bg-tertiary)' }}>
              {m.photo && <img src={m.photo} alt={m.crop} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
            </div>
            <div className="flex-1">
              <div className="text-[14px] text-ink">{m.crop}</div>
              <div className="text-[12px] text-ink2">{m.qtyStr} · {m.priceStr}</div>
            </div>
            <span className="rounded-full px-[10px] py-1 text-[11px]" style={{ background: m.bg, color: m.fg }}>{m.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
