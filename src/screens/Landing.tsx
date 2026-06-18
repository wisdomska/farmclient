import { useFarm } from '../lib/derive'
import { Icon, Logo } from '../components/primitives'
import { ThemeToggle } from '../components/shared'

export function Landing() {
  const f = useFarm()

  return (
    <div>
      {/* marketing nav */}
      <nav className="flex items-center justify-between max-w-[1280px] mx-auto px-[32px] py-[18px] sticky top-[46px] z-50 bg-bg">
        <div className="flex items-center gap-[38px]">
          <div className="flex items-center gap-[10px]">
            <div className="w-[30px] h-[30px] rounded-[8px] bg-primary flex items-center justify-center">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-primary-ink">
                <path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/>
                <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/>
                <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/>
              </svg>
            </div>
            <span className="text-[19px] font-normal tracking-[-0.02em]">FarmClient</span>
          </div>
          <div className="flex items-center gap-[26px] text-[14px] text-ink2">
            <span onClick={f.goMarketplace} className="cursor-pointer transition-colors duration-150 hover:text-ink">Marketplace</span>
            <span onClick={f.navHow} className="cursor-pointer transition-colors duration-150 hover:text-ink">How it works</span>
            <span onClick={f.navFarmers} className="cursor-pointer transition-colors duration-150 hover:text-ink">For farmers</span>
            <span onClick={f.navStory} className="cursor-pointer transition-colors duration-150 hover:text-ink">Our story</span>
          </div>
        </div>
        <div className="flex items-center gap-[12px]">
          <ThemeToggle />
          <button
            onClick={f.goAuth}
            className="bg-transparent border-none text-ink text-[14px] cursor-pointer px-[14px] py-[10px] font-[inherit] hover:text-primary transition-colors duration-150"
          >
            Sign in
          </button>
          <button
            onClick={f.goMarketplace}
            className="bg-primary text-primary-ink border-none rounded-[8px] px-[18px] py-[11px] text-[14px] font-normal cursor-pointer font-[inherit] transition-opacity duration-150 hover:opacity-[0.88]"
          >
            See the market
          </button>
        </div>
      </nav>

      {/* hero */}
      <div className="max-w-[1280px] mx-auto px-[32px] pt-[60px] pb-[40px] grid gap-[56px] items-center" style={{ gridTemplateColumns: '1.05fr 0.95fr' }}>
        <div>
          <div className="inline-flex items-center gap-[8px] px-[12px] py-[6px] border border-line rounded-[20px] text-[12px] tracking-[0.06em] uppercase text-ink2 mb-[28px]">
            <span className="w-[6px] h-[6px] rounded-full bg-primary" />
            A fairer market for every farmer
          </div>
          <h1 className="text-[60px] leading-[1.06] tracking-[-0.03em] font-normal m-0 mb-[22px] text-ink">
            Fair prices for farmers. Fresh food for buyers.
          </h1>
          <p className="text-[18px] leading-[1.6] text-ink2 m-0 mb-[36px] max-w-[480px]">
            FarmClient links Ghana's farmers with trusted buyers. Farmers sell their crops the easy way — even with a simple phone — and get paid the same day.
          </p>
          <div className="flex gap-[14px] flex-wrap">
            <button
              onClick={f.goMarketplace}
              className="inline-flex items-center gap-[9px] bg-primary text-primary-ink border-none rounded-[8px] px-[24px] py-[15px] text-[15px] cursor-pointer font-[inherit] transition-opacity duration-150 hover:opacity-[0.88]"
            >
              See what's for sale
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </button>
            <button
              onClick={f.goUssd}
              className="inline-flex items-center gap-[9px] bg-transparent text-ink border border-line rounded-[8px] px-[24px] py-[15px] text-[15px] cursor-pointer font-[inherit] transition-colors duration-150 hover:border-primary hover:text-primary"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              I'm a Farmer — Dial *789#
            </button>
          </div>
          <p className="text-[13px] text-ink3 mt-[28px] mb-0 flex items-center gap-[8px]">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary flex-shrink-0">
              <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
            Your money stays safe · Quick payment · Works on any phone
          </p>
        </div>

        {/* hero image */}
        <div className="relative">
          <div className="rounded-[16px] overflow-hidden bg-surface2 border border-line" style={{ aspectRatio: '4/5' }}>
            <img
              src="https://images.unsplash.com/photo-1752917680382-3ac274d84103?auto=format&fit=crop&w=1100&q=78"
              alt="A farmer holding a basket of freshly harvested vegetables"
              className="w-full h-full object-cover block"
            />
          </div>
          <div className="absolute left-[-20px] bottom-[30px] bg-surface border border-line rounded-[12px] px-[18px] py-[14px] flex items-center gap-[13px]">
            <div className="w-[40px] h-[40px] rounded-full bg-primary-dim flex items-center justify-center text-primary flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </div>
            <div>
              <div className="text-[12px] text-ink2">Fair price today · Yam</div>
              <div className="text-[19px] text-ink">
                GHS 4.20 <span className="text-[12px] text-ink2">/kg</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* stats strip */}
      <div className="max-w-[1280px] mx-auto px-[32px] py-[30px]">
        <div className="grid border border-line rounded-[12px] overflow-hidden" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
          {f.heroStats.map((s, idx) => (
            <div key={idx} className="px-[24px] py-[26px] border-r border-line last:border-r-0">
              <div className="text-[30px] tracking-[-0.02em] text-ink mb-[6px]">{s.value}</div>
              <div className="text-[13px] text-ink2">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* how it works */}
      <div id="fc-how" className="max-w-[1280px] mx-auto px-[32px] py-[56px]">
        <div className="mb-[32px]">
          <div className="text-[12px] tracking-[0.08em] uppercase text-primary mb-[10px]">How it works</div>
          <h2 className="text-[34px] tracking-[-0.02em] font-normal m-0 text-ink">Three simple steps.</h2>
        </div>
        <div className="grid gap-[20px]" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
          {f.howItWorks.map((h) => (
            <div key={h.num} className="bg-surface border border-line rounded-[12px] p-[28px]">
              <div className="flex items-center justify-between mb-[24px]">
                <div className="w-[44px] h-[44px] rounded-[10px] bg-primary-dim flex items-center justify-center text-primary">
                  <Icon paths={h.iconPaths} size={22} />
                </div>
                <span className="text-[13px] font-mono text-ink3">{h.num}</span>
              </div>
              <h3 className="text-[19px] font-normal tracking-[-0.01em] m-0 mb-[10px] text-ink">{h.title}</h3>
              <p className="text-[14px] leading-[1.6] text-ink2 m-0">{h.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* why trust band / our story */}
      <div id="fc-story" className="max-w-[1280px] mx-auto px-[32px] pb-[56px]">
        <div className="relative rounded-[16px] overflow-hidden border border-line">
          <img
            src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=1100&q=72"
            alt="Green farm field in Ghana"
            className="w-full object-cover block"
            style={{ height: '300px' }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(90deg, rgba(10,10,10,0.86) 0%, rgba(10,10,10,0.55) 55%, rgba(10,10,10,0.2) 100%)' }}
          />
          <div className="absolute inset-0 flex flex-col justify-center p-[40px] max-w-[560px]">
            <h3 className="text-[26px] font-normal tracking-[-0.02em] m-0 mb-[12px]" style={{ color: '#fff' }}>
              Built for every farmer in Ghana.
            </h3>
            <p className="text-[15px] leading-[1.65] m-0" style={{ color: '#d8d8d8' }}>
              No smartphone? No problem. Dial *789# on any phone to sell your crops, check today's price, and get paid — in your own simple steps.
            </p>
          </div>
        </div>
      </div>

      {/* footer */}
      <div className="border-t border-line">
        <div className="max-w-[1280px] mx-auto px-[32px] py-[44px] grid gap-[32px]" style={{ gridTemplateColumns: '1.4fr 1fr 1fr 1fr' }}>
          {/* brand col */}
          <div>
            <div className="flex items-center gap-[10px] mb-[16px]">
              <div className="w-[28px] h-[28px] rounded-[7px] bg-primary flex items-center justify-center">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-primary-ink">
                  <path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/>
                  <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/>
                  <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/>
                </svg>
              </div>
              <span className="text-[17px] tracking-[-0.02em]">FarmClient</span>
            </div>
            <p className="text-[13px] leading-[1.6] text-ink2 max-w-[280px] m-0 mb-[18px]">
              Ghana's friendly farm market. Fair prices for farmers, fresh food for buyers — paid the same day.
            </p>
            <div className="flex gap-[10px]">
              <div className="flex items-center gap-[8px] border border-line rounded-[8px] px-[12px] py-[8px]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="text-ink">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                <div style={{ lineHeight: '1.1' }}>
                  <div className="text-[8px] text-ink3">Download on the</div>
                  <div className="text-[12px] text-ink">App Store</div>
                </div>
              </div>
              <div className="flex items-center gap-[8px] border border-line rounded-[8px] px-[12px] py-[8px]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="text-ink">
                  <path d="M3 20.5V3.5c0-.4.2-.7.5-.9l10 9.4-10 9.4c-.3-.2-.5-.5-.5-.9zM14.8 14.2l2.6 2.5-9.2 5.2 6.6-7.7zM18.5 12.9l-2.9 2.7-2.8-2.6 2.8-2.6 2.9 2.5zM8.2 2.6l9.2 5.2-2.6 2.5L8.2 2.6z"/>
                </svg>
                <div style={{ lineHeight: '1.1' }}>
                  <div className="text-[8px] text-ink3">GET IT ON</div>
                  <div className="text-[12px] text-ink">Google Play</div>
                </div>
              </div>
            </div>
          </div>

          {/* footer link cols */}
          {f.footerCols.map((col) => (
            <div key={col.title}>
              <div className="text-[12px] tracking-[0.06em] uppercase text-ink3 mb-[16px]">{col.title}</div>
              <div className="flex flex-col gap-[11px]">
                {col.links.map((lnk) => (
                  <span key={lnk} className="text-[13px] text-ink2 cursor-pointer transition-colors duration-150 hover:text-ink">
                    {lnk}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-line">
          <div className="max-w-[1280px] mx-auto px-[32px] py-[18px] flex justify-between items-center text-[12.5px] text-ink3">
            <span>© 2026 FarmClient · Republic of Ghana</span>
            <span>Payments secured by Moolre</span>
          </div>
        </div>
      </div>
    </div>
  )
}
