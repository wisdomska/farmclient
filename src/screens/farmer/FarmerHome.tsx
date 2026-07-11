import { useFarm } from '../../lib/derive'
import { FarmScore } from '../../components/FarmScore'

export function FarmerHome() {
  const f = useFarm()

  return (
    <div style={{ padding: '14px 20px 28px' }}>
      {/* Greeting + avatar */}
      <div className="flex items-center justify-between mb-[20px]">
        <div>
          <div className="text-[13px] text-ink2">Akwaaba,</div>
          <div className="text-[20px] tracking-[-0.01em] text-ink">Ama Boateng</div>
        </div>
        <div className="w-[42px] h-[42px] rounded-full bg-surface2 border border-line flex items-center justify-center text-ink2 text-[15px]">AB</div>
      </div>

      {/* Wallet card */}
      <div className="bg-primary-dim border border-line rounded-[12px] p-[20px] mb-[14px]">
        <div className="text-[12px] text-ink2 mb-[6px]">Your money</div>
        <div className="text-[32px] tracking-[-0.02em] text-ink mb-[8px]">{f.walletBalance}</div>
        <div className="flex items-center gap-[6px] text-[12px] text-success">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17 17 7"/><path d="M9 7h8v8"/>
          </svg>
          Last payment GHS 780.00 · 14 Jun
        </div>
      </div>

      {/* Trust score card */}
      <div className="flex gap-[14px] mb-[20px]">
        <div className="flex-1 bg-surface border border-line rounded-[12px] p-[16px] flex items-center gap-[14px]">
          <FarmScore score={f.farmerScore} size={64} showLabel={false} />
          <div>
            <div className="text-[13px] text-ink">Trust score</div>
            <div className="text-[11px] text-ink2 mt-[2px]">{f.farmerScoreTierText} · you can get a loan</div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-[10px] mb-[24px]">
        <button onClick={f.goAddTab} className="flex-1 flex flex-col items-center gap-[8px] bg-primary text-primary-ink border-none rounded-[10px] p-[16px] text-[13px] cursor-pointer font-[inherit]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14"/><path d="M5 12h14"/>
          </svg>
          Sell my crops
        </button>
        <button onClick={f.goPricesTab} className="flex-1 flex flex-col items-center gap-[8px] bg-surface text-ink border border-line rounded-[10px] p-[16px] text-[13px] cursor-pointer font-[inherit]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 7h6v6"/><path d="m22 7-8.5 8.5-5-5L2 17"/>
          </svg>
          See prices
        </button>
      </div>

      {/* What I'm selling — tap in to manage listings */}
      <div className="flex items-center justify-between mb-[12px]">
        <div className="text-[14px] text-ink">What I'm selling</div>
        <button onClick={f.goListingsTab} className="text-[12px] text-primary cursor-pointer bg-transparent border-none font-[inherit] p-0 min-h-[32px]">See all</button>
      </div>
      <div className="flex flex-col gap-[10px] mb-[24px]">
        {/* First item — uses sel.photo */}
        <div className="flex items-center gap-[12px] bg-surface border border-line rounded-[10px] p-[12px]">
          <div style={{ width: 40, height: 40, flexShrink: 0, borderRadius: 8, overflow: 'hidden', background: 'var(--bg-tertiary)' }}>
            {f.sel.photo && <img loading="lazy" decoding="async" src={f.sel.photo} alt={f.sel.crop} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
          </div>
          <div className="flex-1">
            <div className="text-[14px] text-ink">Yam · 1,800 kg</div>
            <div className="text-[12px] text-ink2">GHS 4.20/kg · Techiman</div>
          </div>
          <span className="text-[11px] bg-primary-dim text-primary px-[10px] py-1 rounded-full">On sale</span>
        </div>
        {/* Second item — static plantain img */}
        <div className="flex items-center gap-[12px] bg-surface border border-line rounded-[10px] p-[12px]">
          <div style={{ width: 40, height: 40, flexShrink: 0, borderRadius: 8, overflow: 'hidden', background: 'var(--bg-tertiary)' }}>
            <img loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=200&q=70" alt="Plantain" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
          <div className="flex-1">
            <div className="text-[14px] text-ink">Plantain · 980 kg</div>
            <div className="text-[12px] text-ink2">GHS 3.40/kg · Techiman</div>
          </div>
          <span className="text-[11px] bg-primary-dim text-primary px-[10px] py-1 rounded-full">On sale</span>
        </div>
      </div>

      {/* Orders waiting */}
      <div className="text-[14px] text-ink mb-[12px]">Orders waiting</div>
      <div className="bg-surface border border-line rounded-[10px] p-[14px]">
        <div className="flex items-center justify-between mb-[8px]">
          <span className="text-[13px] font-mono text-ink3">ORD-2041</span>
          <span className="text-[11px] bg-warning-dim text-warning px-[10px] py-1 rounded-full">Confirm you sent it</span>
        </div>
        <div className="text-[14px] text-ink">Tomato · 120 kg → Golden Fork</div>
        <div className="text-[13px] text-ink2 mt-[4px]">GHS 780.00 is kept safe. Confirm when you send the crops.</div>
      </div>
    </div>
  )
}
