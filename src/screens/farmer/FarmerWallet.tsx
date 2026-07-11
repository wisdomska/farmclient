import { useFarm } from '../../lib/derive'
import { FarmScore } from '../../components/FarmScore'

export function FarmerWallet() {
  const f = useFarm()

  return (
    <div style={{ padding: '14px 20px 28px' }}>
      <div className="text-[20px] tracking-[-0.01em] text-ink mb-[16px]">My money</div>

      {/* Balance card — available (released) vs pending (still in escrow) */}
      <div className="bg-primary-dim border border-line rounded-[12px] p-[20px] mb-[16px]">
        <div className="text-[12px] text-ink2 mb-[6px]">Money you can take out</div>
        <div className="text-[32px] tracking-[-0.02em] text-ink mb-[8px]">{f.walletBalance}</div>
        <div className="flex items-center justify-between text-[12px] mb-[14px]">
          <span className="text-ink2">Waiting for buyers to confirm</span>
          <span className="text-ink">{f.walletPending}</span>
        </div>
        <button onClick={f.withdrawMoney} className="bg-primary text-primary-ink border-none rounded-[8px] text-[14px] cursor-pointer font-[inherit] min-h-[44px]" style={{ padding: '11px 18px' }}>
          Send to my MoMo
        </button>
      </div>

      {/* Trust score row */}
      <div className="flex items-center gap-[16px] bg-surface border border-line rounded-[12px] p-[18px] mb-[22px]">
        <FarmScore score={f.farmerScore} size={84} />
        <div className="flex-1 text-[12.5px] text-ink2 leading-[1.7]">
          <div>On-time delivery · <span className="text-ink">98%</span></div>
          <div>Quality consistency · <span className="text-ink">High</span></div>
          <div>Completed orders · <span className="text-ink">64</span></div>
        </div>
      </div>

      {/* Transactions */}
      <div className="text-[14px] text-ink mb-[12px]">Money in and out</div>
      <div className="flex flex-col gap-[2px] mb-[24px]">
        {f.txns.map((t) => (
          <div key={t.label + t.sub} className="flex items-center justify-between border-b border-line" style={{ padding: '13px 0' }}>
            <div>
              <div className="text-[13.5px] text-ink">{t.label}</div>
              <div className="text-[11.5px] text-ink3 mt-[2px]">{t.sub}</div>
            </div>
            <span className="text-[14px] text-ink">{t.amt}</span>
          </div>
        ))}
      </div>

      {/* Loan card */}
      <div className="bg-surface border border-primary rounded-[12px] p-[18px]">
        <div className="flex items-center gap-[8px] mb-[8px]">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 10h18M7 15h2M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"/>
          </svg>
          <span className="text-[14px] text-ink">Get a small loan</span>
        </div>
        <div className="text-[13px] text-ink2 leading-[1.6] mb-[14px]">
          Your good trust score means you can borrow up to <span className="text-ink">GHS 3,000.00</span>. You pay it back slowly from your next sales.
        </div>
        <button onClick={f.applyAdvance} className="w-full bg-primary text-primary-ink border-none rounded-[8px] text-[14px] cursor-pointer font-[inherit]" style={{ padding: 12 }}>
          Ask for the loan
        </button>
      </div>
    </div>
  )
}
