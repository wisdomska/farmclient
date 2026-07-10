import { useFarm } from '../../lib/derive'
import { CropGlyph, Spark } from '../../components/primitives'

export function FarmerSell() {
  const f = useFarm()

  return (
    <div style={{ padding: '14px 20px 28px' }}>
      <div className="text-[20px] tracking-[-0.01em] text-ink mb-[20px]">Sell my crops</div>

      {/* Crop picker */}
      <div className="text-[13px] text-ink2 mb-[12px]">Pick your crop</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginBottom: 22 }}>
        {f.addCrops.map((c) => (
          <div
            key={c.crop}
            className={`flex flex-col items-center gap-[4px] rounded-[8px] border p-[10px] cursor-pointer text-center ${
              c.active
                ? 'bg-primary-dim border-primary text-primary'
                : 'bg-surface2 border-line text-ink2'
            }`}
          >
            <span style={{ transform: 'scale(0.6)', display: 'block' }}>
              <CropGlyph crop={c.crop} size={40} />
            </span>
            <span className="text-[10px]">{c.crop}</span>
          </div>
        ))}
      </div>

      {/* Quantity */}
      <div className="mb-[16px]">
        <label className="block text-[13px] text-ink2 mb-[7px]">How much do you have? (kg)</label>
        <input
          defaultValue="1,800"
          className="w-full bg-surface border border-line rounded-[8px] text-[15px] text-ink font-[inherit] outline-none focus:border-primary"
          style={{ padding: '13px 14px', minHeight: 44 }}
        />
      </div>

      {/* Harvest date */}
      <div className="mb-[16px]">
        <label className="block text-[13px] text-ink2 mb-[7px]">When did you pick it?</label>
        <div className="flex items-center justify-between bg-surface border border-line rounded-[8px]" style={{ padding: '13px 14px', minHeight: 44 }}>
          <span className="text-[15px] text-ink">15 Jul 2026</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
          </svg>
        </div>
      </div>

      {/* Price */}
      <div className="mb-[16px]">
        <div className="flex items-center justify-between mb-[7px]">
          <label className="text-[13px] text-ink2">Price for 1 kg (GHS)</label>
          <button onClick={f.aiSuggest} className="inline-flex items-center gap-[5px] bg-primary-dim text-primary border-none rounded-full cursor-pointer font-[inherit]" style={{ padding: '5px 11px', fontSize: 11 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 3 1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3z"/>
            </svg>
            Best price
          </button>
        </div>
        <input
          defaultValue="4.20"
          className="w-full bg-surface border border-primary rounded-[8px] text-[15px] text-ink font-[inherit] outline-none"
          style={{ padding: '13px 14px', minHeight: 44 }}
        />
        <div className="flex items-center gap-[8px] mt-[8px] text-[12px] text-ink2">
          <Spark data={f.addSparkData} w={70} h={30} color="var(--primary)" />
          A fair price here is GHS 4.05–4.35
        </div>
      </div>

      {/* Add photos */}
      <div className="text-[13px] text-ink2 mb-[10px]">Add photos</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10, marginBottom: 24 }}>
        {/* First cell — sel.photo */}
        <div style={{ aspectRatio: '1', borderRadius: 8, overflow: 'hidden', border: '1px solid var(--primary)' }}>
          {f.sel.photo && <img src={f.sel.photo} alt={f.sel.crop} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
        </div>
        {/* Dashed add tiles */}
        <div className="bg-surface2 border-line flex flex-col items-center justify-center gap-[6px] text-ink3 cursor-pointer" style={{ aspectRatio: '1', border: '1.5px dashed var(--border)', borderRadius: 8 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14"/><path d="M5 12h14"/>
          </svg>
          <span className="text-[10px]">Add photo</span>
        </div>
        <div className="bg-surface2 flex flex-col items-center justify-center gap-[6px] text-ink3 cursor-pointer" style={{ aspectRatio: '1', border: '1.5px dashed var(--border)', borderRadius: 8 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14"/><path d="M5 12h14"/>
          </svg>
        </div>
        <div className="bg-surface2 flex flex-col items-center justify-center gap-[6px] text-ink3 cursor-pointer" style={{ aspectRatio: '1', border: '1.5px dashed var(--border)', borderRadius: 8 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14"/><path d="M5 12h14"/>
          </svg>
        </div>
      </div>

      <button onClick={f.goListingsTab} className="w-full bg-primary text-primary-ink border-none rounded-[8px] text-[15px] cursor-pointer font-[inherit]" style={{ padding: 15, minHeight: 44 }}>
        Put it up for sale
      </button>
    </div>
  )
}
