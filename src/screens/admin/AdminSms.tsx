import { useFarm } from '../../lib/derive'

export function AdminSms() {
  const f = useFarm()

  return (
    <div style={{ maxWidth: 760 }}>
      <h1 className="text-[24px] font-normal tracking-[-0.02em] text-ink m-0 mb-[3px]">SMS broadcast</h1>
      <span className="text-[13px] text-ink2">Send price updates and news to farmers by text</span>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 20, marginTop: 26 }}>
        <div>
          <label className="block text-[13px] text-ink2 mb-[8px]">Message</label>
          <textarea
            className="w-full bg-surface border border-line rounded-[8px] p-[14px] text-[14px] text-ink font-[inherit] outline-none leading-[1.6] resize-none focus:border-primary"
            style={{ height: 130 }}
            defaultValue="FarmClient: Yam is GHS 4.20/kg today in Bono East, up 3.2%. Dial *789# to list your harvest."
          />
          <div className="flex justify-between text-[12px] text-ink3 mt-[8px]">
            <span>1 SMS segment · 132 / 160 chars</span>
            <span>Sent by text message</span>
          </div>
          <button
            onClick={f.sendBroadcast}
            className="mt-[18px] inline-flex items-center gap-[9px] bg-primary text-primary-ink border-none rounded-[8px] px-[22px] py-[13px] text-[14px] cursor-pointer font-[inherit]"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2 11 13"/>
              <path d="M22 2 15 22l-4-9-9-4 20-7z"/>
            </svg>
            Send broadcast
          </button>
        </div>

        <div>
          <label className="block text-[13px] text-ink2 mb-[8px]">Recipients</label>
          <div className="flex flex-col gap-[8px]">
            <label className="flex items-center gap-[10px] bg-surface border border-primary rounded-[8px] px-[14px] py-[12px] text-[13.5px] text-ink cursor-pointer">
              <span className="border border-primary flex items-center justify-center flex-shrink-0" style={{ width: 16, height: 16, borderRadius: '50%' }}>
                <span className="bg-primary" style={{ width: 8, height: 8, borderRadius: '50%' }} />
              </span>
              All farmers · 2.04M
            </label>
            <label className="flex items-center gap-[10px] bg-surface border border-line rounded-[8px] px-[14px] py-[12px] text-[13.5px] text-ink2 cursor-pointer">
              <span className="border border-line flex-shrink-0" style={{ width: 16, height: 16, borderRadius: '50%' }} />
              By region
            </label>
            <label className="flex items-center gap-[10px] bg-surface border border-line rounded-[8px] px-[14px] py-[12px] text-[13.5px] text-ink2 cursor-pointer">
              <span className="border border-line flex-shrink-0" style={{ width: 16, height: 16, borderRadius: '50%' }} />
              By crop
            </label>
          </div>
        </div>
      </div>

      <div className="mt-[28px]">
        <div className="text-[15px] text-ink mb-[14px]">Delivery log</div>
        <div className="border border-line rounded-[8px] overflow-hidden">
          <div
            className="bg-surface text-[12px] text-ink3 tracking-[0.04em] uppercase px-[16px] py-[12px]"
            style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 0.8fr' }}
          >
            <span>Recipient</span>
            <span>Crop</span>
            <span>Status</span>
            <span>Time</span>
          </div>
          {f.smsLog.map((m) => (
            <div
              key={m.to}
              className="border-t border-line px-[16px] py-[13px] text-[13.5px] items-center"
              style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 0.8fr' }}
            >
              <span className="text-ink font-mono text-[12.5px]">{m.to}</span>
              <span className="text-ink2">{m.crop}</span>
              <span className="text-ink2">{m.status}</span>
              <span className="text-ink3">{m.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
