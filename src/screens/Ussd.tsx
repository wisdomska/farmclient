import { useFarm } from '../lib/derive'

export function Ussd() {
  const f = useFarm()

  return (
    <div className="flex items-center justify-center gap-[48px] px-[32px] py-[32px] bg-surface" style={{ minHeight: 'calc(100vh - 46px)' }}>
      {/* Left intro text column */}
      <div style={{ maxWidth: '300px' }}>
        <div className="text-[11px] tracking-[0.08em] uppercase text-ink3 mb-[8px]">
          Farmer interface · *789#
        </div>
        <div className="text-[22px] tracking-[-0.02em] text-ink leading-[1.25] mb-[14px]">
          No smartphone? No problem.
        </div>
        <div className="text-[14px] text-ink2 leading-[1.6] mb-[18px]">
          Everything works on any cheap phone by dialing *789# — sell your crops, check prices, see your money, and ask for a loan. Tap the keypad to try it.
        </div>
        <div className="flex flex-col gap-[10px]">
          <div className="flex items-center gap-[10px] text-[13px] text-ink2">
            <span className="w-[6px] h-[6px] rounded-full bg-primary shrink-0"></span>
            Works on MTN, Telecel &amp; AirtelTigo
          </div>
          <div className="flex items-center gap-[10px] text-[13px] text-ink2">
            <span className="w-[6px] h-[6px] rounded-full bg-primary shrink-0"></span>
            Just a few simple steps
          </div>
          <div className="flex items-center gap-[10px] text-[13px] text-ink2">
            <span className="w-[6px] h-[6px] rounded-full bg-primary shrink-0"></span>
            You get a text after every step
          </div>
        </div>
      </div>

      {/* Feature phone mockup */}
      <div style={{ width: '282px', background: '#0d0d0d', border: '1px solid #262626', borderRadius: '28px 28px 22px 22px', padding: '18px 16px 22px', boxShadow: 'none' }}>
        {/* Top notch bar */}
        <div className="flex items-center justify-center gap-[8px] mb-[12px]">
          <div style={{ width: '34px', height: '4px', borderRadius: '4px', background: '#262626' }}></div>
        </div>
        {/* Status bar */}
        <div className="flex items-center justify-between px-[4px] pb-[6px]" style={{ fontSize: '9px', color: '#6a6a6a' }}>
          <span>MTN</span>
          <span>FarmClient</span>
          <span>11:01</span>
        </div>

        {/* Screen */}
        <div className="flex flex-col rounded-[8px] p-[14px]" style={{ background: '#0a1f1d', border: '1px solid #14302c', minHeight: '230px' }}>
          {/* Title */}
          <div
            className="font-mono text-[10px] tracking-[0.04em] mb-[10px] pb-[8px] text-primary"
            style={{ borderBottom: '1px solid #14302c' }}
          >
            {f.ussdTitle}
          </div>
          {/* Body */}
          <div
            className="font-mono flex-1"
            style={{ fontSize: '12.5px', color: '#d6f5f1', lineHeight: '1.65', whiteSpace: 'pre-line' }}
          >
            {f.ussdBody}
          </div>
          {/* Footer row */}
          <div
            className="flex items-center justify-between mt-[10px] pt-[8px]"
            style={{ borderTop: '1px solid #14302c' }}
          >
            <span
              onClick={f.ussdReset}
              className="font-mono cursor-pointer"
              style={{ fontSize: '10px', color: '#7fb8b0' }}
            >
              Cancel
            </span>
            <span className="font-mono" style={{ fontSize: '10px', color: '#7fb8b0' }}>
              Reply
            </span>
          </div>
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-[8px] mt-[16px]">
          {f.ussdKeys.map((k, idx) => (
            <button
              key={idx}
              onClick={k.onClick}
              aria-label={`Key ${k.d}`}
              className="flex flex-col items-center justify-center gap-[1px] h-[42px] rounded-[8px] cursor-pointer transition-[background] duration-150 ease-out hover:bg-[#222]"
              style={{ background: '#161616', border: '1px solid #2a2a2a', color: '#e8e8e8', fontFamily: 'inherit' }}
            >
              <span style={{ fontSize: '16px', lineHeight: '1' }}>{k.d}</span>
              <span style={{ fontSize: '7px', color: '#6a6a6a', letterSpacing: '0.06em', minHeight: '8px' }}>{k.sub}</span>
            </button>
          ))}
        </div>

        {/* Call / End buttons */}
        <div className="flex justify-between mt-[12px]">
          <button
            aria-label="Call"
            className="flex items-center justify-center rounded-[8px] cursor-pointer bg-success"
            style={{ width: '54px', height: '34px', border: 'none' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </button>
          <button
            onClick={f.ussdReset}
            aria-label="End"
            className="flex items-center justify-center rounded-[8px] cursor-pointer bg-error"
            style={{ width: '54px', height: '34px', border: 'none' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 8.63 19M2 2l20 20"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
