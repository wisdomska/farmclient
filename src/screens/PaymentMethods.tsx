import { useNavigate } from 'react-router-dom'
import { useFarm } from '../lib/derive'
import { TopBar } from '../components/shared'

export function PaymentMethods() {
  const f = useFarm()
  const navigate = useNavigate()

  return (
    <div>
      <TopBar showNav={false} showAvatar={false} back={{ label: 'Settings', onClick: () => navigate('/app/settings') }} />

      <div className="max-w-[620px] mx-auto px-[28px] pt-[36px] pb-[64px]">
        <h1 className="text-[24px] font-normal tracking-[-0.02em] text-ink m-0 mb-[3px]">Payment methods</h1>
        <span className="text-[13px] text-ink2">How you pay for your orders</span>

        {/* Saved number */}
        <div className="text-[15px] text-ink mt-[26px] mb-[14px]">Saved numbers</div>
        <div className="w-full flex items-center gap-[14px] bg-surface border border-primary rounded-[10px] px-[16px] py-[14px]">
          <span className="w-[20px] h-[20px] rounded-full border border-line flex-shrink-0 flex items-center justify-center">
            <span className="w-[10px] h-[10px] rounded-full bg-primary"></span>
          </span>
          <div className="flex-1">
            <div className="text-[14px] text-ink">024 •• 4567 · MTN MoMo</div>
            <div className="text-[12px] text-ink3">Default · used for your last order</div>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-ink3">
            <rect x="2" y="5" width="20" height="14" rx="2" />
            <path d="M2 10h20" />
          </svg>
        </div>
        <button
          disabled
          className="mt-[12px] bg-transparent border border-line rounded-[8px] px-[16px] py-[10px] text-[13px] text-ink3 font-[inherit] cursor-not-allowed opacity-60"
        >
          Add another number
        </button>

        {/* Available providers */}
        <div className="text-[15px] text-ink mt-[32px] mb-[14px]">Available providers</div>
        <div className="flex flex-col gap-[10px]">
          {f.payMethods.map((p) => (
            <div
              key={p.key}
              className="w-full flex items-center gap-[14px] bg-surface border border-line rounded-[10px] px-[16px] py-[14px]"
            >
              <div className="flex-1">
                <div className="text-[14px] text-ink">{p.name}</div>
                <div className="text-[12px] text-ink3">{p.desc}</div>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-ink3">
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <path d="M2 10h20" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
