import { useFarm } from '../lib/derive'
import { TopBar } from '../components/shared'

export function Checkout() {
  const f = useFarm()

  return (
    <div>
      <TopBar
        showNav={false}
        showAvatar={false}
        back={{ label: 'Back', onClick: f.goListingBack }}
        right={<span className="text-[13px] text-ink3">Step 2 of 3 · Payment</span>}
      />

      <div className="max-w-[980px] mx-auto px-[28px] pt-[36px] pb-[64px]">
        <h1 className="text-[28px] font-normal tracking-[-0.02em] mb-[28px]">Checkout</h1>

        <div className="grid gap-[28px] items-start" style={{ gridTemplateColumns: '1fr 380px' }}>

          {/* Payment method */}
          <div>
            <div className="text-[15px] text-ink mb-[14px]">Payment method</div>

            <div className="flex flex-col gap-[10px] mb-[28px]">
              {f.payMethods.map((p) => (
                <button
                  key={p.key}
                  onClick={p.onClick}
                  className={`w-full flex items-center gap-[14px] bg-surface border rounded-[10px] px-[16px] py-[14px] text-left cursor-pointer transition-colors duration-150 ${p.active ? 'border-primary' : 'border-line'}`}
                >
                  <span className="w-[20px] h-[20px] rounded-full border border-line flex-shrink-0 flex items-center justify-center">
                    {p.active && (
                      <span className="w-[10px] h-[10px] rounded-full bg-primary"></span>
                    )}
                  </span>
                  <div className="flex-1">
                    <div className="text-[14px] text-ink">{p.name}</div>
                    <div className="text-[12px] text-ink3">{p.desc}</div>
                  </div>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-ink3">
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <path d="M2 10h20" />
                  </svg>
                </button>
              ))}
            </div>

            <div className="mb-[20px]">
              <label className="block text-[13px] text-ink2 mb-[7px]">Mobile money number</label>
              <input
                defaultValue="024 •• 1042"
                className="w-full bg-surface border border-line rounded-[8px] px-[14px] py-[12px] text-[14px] text-ink font-[inherit] outline-none min-h-[44px] focus:border-primary"
              />
            </div>

            <div className="flex gap-[11px] bg-primary-dim rounded-[8px] p-[16px]">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary flex-shrink-0 mt-[1px]"
              >
                <rect x="5" y="2" width="14" height="20" rx="2" />
                <path d="M12 18h.01" />
              </svg>
              <span className="text-[13px] text-ink leading-[1.55]">
                You will get a payment request on your phone. Approve it, and your money is kept safe until your food arrives.
              </span>
            </div>
          </div>

          {/* Order summary */}
          <div className="border border-line rounded-[12px] p-[24px]">
            <div className="text-[15px] text-ink mb-[18px]">Order summary</div>

            <div className="flex gap-[12px] items-center pb-[18px] border-b border-line mb-[18px]">
              <div className="w-[56px] h-[56px] flex-shrink-0 rounded-[8px] overflow-hidden bg-surface2">
                {f.sel.photo && (
                  <img
                    src={f.sel.photo}
                    alt={f.sel.crop}
                    className="w-full h-full object-cover block"
                  />
                )}
              </div>
              <div>
                <div className="text-[14px] text-ink">{f.sel.crop} · {f.orderQty} kg</div>
                <div className="text-[12px] text-ink2">{f.sel.farmer} · {f.sel.district}</div>
              </div>
            </div>

            <div className="flex flex-col gap-[11px] mb-[18px] text-[14px]">
              <div className="flex justify-between">
                <span className="text-ink2">Crops ({f.orderQty} kg)</span>
                <span className="text-ink">{f.subtotalStr}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink2">Service fee (1.5%)</span>
                <span className="text-ink">{f.feeStr}</span>
              </div>
            </div>

            <div className="flex justify-between items-baseline border-t border-line pt-[16px] mb-[20px]">
              <span className="text-[15px] text-ink">Total</span>
              <span className="text-[24px] text-ink">{f.totalStr}</span>
            </div>

            <button
              onClick={f.startPay}
              className="w-full bg-primary text-primary-ink border-none rounded-[8px] py-[15px] text-[15px] cursor-pointer font-[inherit] min-h-[44px] transition-opacity duration-150 hover:opacity-[0.88]"
            >
              Confirm &amp; Pay
            </button>
          </div>
        </div>
      </div>

      {/* Paying modal */}
      {f.paying && (
        <div className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center">
          <div className="bg-surface border border-line rounded-[12px] p-[44px] text-center max-w-[360px]">
            <div className="fc-spin w-[48px] h-[48px] mx-auto mb-[24px] border-[3px] border-line border-t-primary rounded-full"></div>
            <div className="text-[17px] text-ink mb-[10px]">Waiting for your MoMo approval…</div>
            <div className="text-[13px] text-ink2 leading-[1.6]">
              Check your phone and approve the request for {f.totalStr}. This window closes on its own.
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
