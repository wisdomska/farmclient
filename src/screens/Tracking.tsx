import { useFarm } from '../lib/derive'
import { StarIcon } from '../components/primitives'
import { TopBar } from '../components/shared'

export function Tracking() {
  const f = useFarm()

  return (
    <div>
      <TopBar showNav={false} showAvatar={false} back={{ label: 'All orders', onClick: f.goOrders }} />

      <div className="max-w-[720px] mx-auto px-[28px] pt-[40px] pb-[64px]">
        <div className="flex items-center justify-between mb-[6px]">
          <span className="text-[13px] font-mono text-ink3">ORD-2041</span>
          <span className="text-[13px] text-ink2">Placed 16 Jun 2026</span>
        </div>
        <h1 className="text-[26px] font-normal tracking-[-0.02em] m-0 mb-[8px]">
          {f.sel.crop} · {f.orderQty} kg from {f.sel.farmer}
        </h1>
        <div className="text-[14px] text-ink2 mb-[36px]">
          {f.sel.district}, {f.sel.region} · Total {f.orderTotalStr}
        </div>

        {/* stepper */}
        <div className="border border-line rounded-[12px] px-[28px] pt-[28px] pb-[8px] mb-[24px]">
          {f.steps.map((st) => (
            <div key={st.idx} className="flex gap-[16px] pb-[20px] relative">
              <div className="flex flex-col items-center flex-shrink-0">
                {st.done && (
                  <div className="w-[30px] h-[30px] rounded-full bg-primary flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary-text)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                )}
                {st.current && (
                  <div className="w-[30px] h-[30px] rounded-full border-2 border-primary flex items-center justify-center">
                    <span className="w-[10px] h-[10px] rounded-full bg-primary fc-pulse" />
                  </div>
                )}
                {st.future && (
                  <div className="w-[30px] h-[30px] rounded-full border-2 border-line flex items-center justify-center text-[12px] text-ink3">
                    {st.idx}
                  </div>
                )}
                <div className="w-[2px] flex-1 min-h-[18px] bg-line mt-[4px]" />
              </div>
              <div className="pt-[4px]">
                <div className="text-[15px] text-ink">{st.name}</div>
                {st.current && (
                  <div className="text-[13px] text-primary mt-[3px]">In progress now</div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-[12px] items-center">
          {f.isDelivered && (
            <>
              <button
                onClick={f.confirmReceipt}
                className="bg-primary text-primary-ink border-none rounded-[8px] px-[22px] py-[14px] text-[14px] cursor-pointer font-[inherit] min-h-[44px] hover:opacity-[0.88]"
              >
                I got my order
              </button>
              <span className="text-[13px] text-ink3 cursor-pointer underline">Report a problem</span>
            </>
          )}
          <button
            onClick={f.advanceStep}
            className="bg-transparent text-ink2 border border-line rounded-[8px] px-[22px] py-[14px] text-[14px] cursor-pointer font-[inherit] min-h-[44px] hover:border-ink3 hover:text-ink"
          >
            Advance status (demo)
          </button>
        </div>
      </div>

      {f.showRating && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-[20px]" style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className="bg-surface border border-line rounded-[12px] p-[36px] max-w-[380px] w-full text-center">
            <div className="w-[52px] h-[52px] mx-auto mb-[18px] rounded-full bg-success-dim flex items-center justify-center">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <h2 className="text-[20px] font-normal tracking-[-0.01em] m-0 mb-[8px]">All done!</h2>
            <p className="text-[14px] text-ink2 leading-[1.6] m-0 mb-[24px]">
              {f.sel.farmer} has been paid {f.orderTotalStr}, straight to their phone. Thank you! How was your order?
            </p>
            <div className="flex justify-center gap-[8px] mb-[26px]">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => f.setRating(n)}
                  aria-label={`Rate ${n}`}
                  className="bg-transparent border-none cursor-pointer p-[4px]"
                >
                  <StarIcon filled={n <= f.rated} size={30} />
                </button>
              ))}
            </div>
            <button
              onClick={f.closeRating}
              className="w-full bg-primary text-primary-ink border-none rounded-[8px] py-[13px] text-[14px] cursor-pointer font-[inherit] min-h-[44px] hover:opacity-[0.88]"
            >
              Submit rating
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
