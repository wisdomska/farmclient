import { useFarm } from '../../lib/derive'
import { FarmScore } from '../../components/FarmScore'

export function AdminListings() {
  const f = useFarm()

  return (
    <div>
      <h1 className="text-[24px] font-normal tracking-[-0.02em] text-ink m-0 mb-[3px]">Listings</h1>
      <span className="text-[13px] text-ink2">Every crop on sale right now</span>
      <div className="fcscroll border border-line rounded-[8px] overflow-x-auto mt-[22px]">
        <div
          className="bg-surface text-[12px] text-ink3 tracking-[0.04em] uppercase px-[18px] py-[12px]"
          style={{ display: 'grid', minWidth: 560, gridTemplateColumns: '0.7fr 1.2fr 1.2fr 0.9fr 1fr 0.6fr 0.8fr' }}
        >
          <span>Crop</span>
          <span>Farmer</span>
          <span>District</span>
          <span>Price/kg</span>
          <span>Available</span>
          <span>Score</span>
          <span>Status</span>
        </div>
        {f.adminListings.map((l) => (
          <div
            key={l.id}
            className="border-t border-line px-[18px] py-[12px] text-[13.5px] items-center"
            style={{ display: 'grid', minWidth: 560, gridTemplateColumns: '0.7fr 1.2fr 1.2fr 0.9fr 1fr 0.6fr 0.8fr' }}
          >
            <div className="flex items-center gap-[10px]">
              <div className="bg-surface2 rounded-[6px] overflow-hidden flex-shrink-0" style={{ width: 34, height: 34 }}>
                {l.photo && (
                  <img loading="lazy" decoding="async" src={l.photo} alt={l.crop} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                )}
              </div>
              <span className="text-ink">{l.crop}</span>
            </div>
            <span className="text-ink">{l.farmer}</span>
            <span className="text-ink2">{l.district}</span>
            <span className="text-ink">{l.priceStr}</span>
            <span className="text-ink2">{l.qtyStr}</span>
            <span><FarmScore score={l.score} size={30} showLabel={false} /></span>
            <span className="justify-self-start text-[11px] rounded-full px-[10px] py-1" style={{ background: 'var(--primary-dim)', color: 'var(--primary)' }}>On sale</span>
          </div>
        ))}
      </div>
    </div>
  )
}
