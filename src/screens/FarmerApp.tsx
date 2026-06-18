import { useFarm } from '../lib/derive'
import { Icon, TrendArrow, Ring, Spark, CropGlyph } from '../components/primitives'

export function FarmerApp() {
  const f = useFarm()

  return (
    <div className="bg-surface flex items-center justify-center gap-[40px] p-[32px]" style={{ minHeight: 'calc(100vh - 46px)' }}>
      {/* Left intro text */}
      <div className="flex-shrink-0">
        <div className="text-[11px] tracking-[0.08em] uppercase text-ink3 mb-[6px]">Farmer app · on your phone</div>
        <div className="text-[20px] tracking-[-0.02em] text-ink max-w-[240px] leading-[1.3]">Ama's crops, money and trust score — all in her pocket.</div>
        <div className="text-[13px] text-ink2 mt-[12px] max-w-[240px] leading-[1.6]">A simple app for farmers with a smartphone. It does the same things as dialing *789#. Tap the buttons below to look around.</div>
      </div>

      {/* Phone frame */}
      <div style={{ width: 384, background: '#000', borderRadius: 48, padding: 9 }}>
        <div className="bg-bg" style={{ borderRadius: 40, overflow: 'hidden', height: 788, display: 'flex', flexDirection: 'column', position: 'relative' }}>
          {/* Notch */}
          <div style={{ position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)', width: 104, height: 28, background: '#000', borderRadius: 20, zIndex: 6 }} />

          {/* Status bar */}
          <div className="flex items-center justify-between text-[13px] text-ink flex-shrink-0" style={{ padding: '15px 28px 8px' }}>
            <span style={{ fontVariantNumeric: 'tabular-nums' }}>11:01</span>
            <div className="flex gap-[7px] items-center">
              <svg width="16" height="12" viewBox="0 0 18 12" fill="currentColor">
                <rect x="0" y="7" width="3" height="5" rx="1"/>
                <rect x="5" y="4" width="3" height="8" rx="1"/>
                <rect x="10" y="1.5" width="3" height="10.5" rx="1"/>
                <rect x="15" y="0" width="3" height="12" rx="1" opacity="0.35"/>
              </svg>
              <svg width="15" height="12" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="1.3">
                <path d="M1 4.5a10 10 0 0 1 14 0M3.5 7.5a6 6 0 0 1 9 0M8 10.5h.01"/>
              </svg>
              <svg width="22" height="12" viewBox="0 0 24 12" fill="none" stroke="currentColor" strokeWidth="1.2">
                <rect x="1" y="2" width="19" height="8" rx="2"/>
                <rect x="2.5" y="3.5" width="13" height="5" rx="1" fill="currentColor"/>
                <path d="M22 4.5v3" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          {/* Scrollable body */}
          <div className="fcscroll" style={{ flex: 1, overflowY: 'auto' }}>

            {/* FARMER HOME */}
            {f.isFarmerHome && (
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
                    <div style={{ position: 'relative', width: 64, height: 64, flexShrink: 0 }}>
                      <Ring score={812} size={64} />
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }} className="text-ink">812</div>
                    </div>
                    <div>
                      <div className="text-[13px] text-ink">Trust score</div>
                      <div className="text-[11px] text-ink2 mt-[2px]">Very good · you can get a loan</div>
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

                {/* What I'm selling */}
                <div className="text-[14px] text-ink mb-[12px]">What I'm selling</div>
                <div className="flex flex-col gap-[10px] mb-[24px]">
                  {/* First item — uses sel.photo */}
                  <div className="flex items-center gap-[12px] bg-surface border border-line rounded-[10px] p-[12px]">
                    <div style={{ width: 40, height: 40, flexShrink: 0, borderRadius: 8, overflow: 'hidden', background: 'var(--bg-tertiary)' }}>
                      {f.sel.photo && <img src={f.sel.photo} alt={f.sel.crop} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
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
                      <img src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=200&q=70" alt="Plantain" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
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
            )}

            {/* FARMER ADD */}
            {f.isFarmerAdd && (
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
            )}

            {/* FARMER LISTINGS */}
            {f.isFarmerListings && (
              <div style={{ padding: '14px 20px 28px' }}>
                <div className="text-[20px] tracking-[-0.01em] text-ink mb-[18px]">My crops</div>

                {/* Status pills */}
                <div className="flex gap-[8px] mb-[20px]">
                  <span className="text-[13px] bg-primary text-primary-ink px-[16px] py-[7px] rounded-full">Selling</span>
                  <span className="text-[13px] text-ink2 border border-line px-[16px] py-[7px] rounded-full" style={{ background: 'transparent' }}>Sold</span>
                  <span className="text-[13px] text-ink2 border border-line px-[16px] py-[7px] rounded-full" style={{ background: 'transparent' }}>Ended</span>
                </div>

                <div className="flex flex-col gap-[12px]">
                  {f.myListings.map((m) => (
                    <div key={m.crop + m.qtyStr} className="flex items-center gap-[12px] bg-surface border border-line rounded-[10px] p-[14px]">
                      <div style={{ width: 46, height: 46, flexShrink: 0, borderRadius: 8, overflow: 'hidden', background: 'var(--bg-tertiary)' }}>
                        {m.photo && <img src={m.photo} alt={m.crop} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
                      </div>
                      <div className="flex-1">
                        <div className="text-[14px] text-ink">{m.crop}</div>
                        <div className="text-[12px] text-ink2">{m.qtyStr} · {m.priceStr}</div>
                      </div>
                      <span className="rounded-full px-[10px] py-1 text-[11px]" style={{ background: m.bg, color: m.fg }}>{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FARMER PRICES */}
            {f.isFarmerPrices && (
              <div style={{ padding: '14px 20px 28px' }}>
                <div className="text-[20px] tracking-[-0.01em] text-ink mb-[16px]">Today's prices</div>

                {/* Crop pills */}
                <div className="fcscroll flex gap-[8px] mb-[20px] pb-[4px]" style={{ overflowX: 'auto' }}>
                  <span className="flex-shrink-0 text-[13px] bg-primary text-primary-ink px-[16px] py-[7px] rounded-full">Yam</span>
                  <span className="flex-shrink-0 text-[13px] text-ink2 border border-line px-[16px] py-[7px] rounded-full" style={{ background: 'transparent' }}>Maize</span>
                  <span className="flex-shrink-0 text-[13px] text-ink2 border border-line px-[16px] py-[7px] rounded-full" style={{ background: 'transparent' }}>Cassava</span>
                  <span className="flex-shrink-0 text-[13px] text-ink2 border border-line px-[16px] py-[7px] rounded-full" style={{ background: 'transparent' }}>Tomato</span>
                </div>

                {/* Price big card */}
                <div className="bg-surface border border-line rounded-[12px] p-[20px] mb-[20px]">
                  <div className="text-[12px] text-ink2 mb-[4px]">Yam · average across Ghana</div>
                  <div className="flex items-baseline gap-[8px] mb-[14px]">
                    <span className="text-[34px] tracking-[-0.02em] text-ink">{f.priceBig}</span>
                    <span className="text-[14px] text-ink2">/kg</span>
                    <span className="inline-flex items-center gap-[4px] text-[13px] text-success">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17 17 7"/><path d="M9 7h8v8"/>
                      </svg>
                      3.2%
                    </span>
                  </div>
                  <Spark data={f.priceSeries} w={300} h={80} color="var(--primary)" fill />
                </div>

                {/* Prices near you */}
                <div className="text-[13px] text-ink2 mb-[10px]">Prices near you</div>
                <div className="border border-line rounded-[12px] overflow-hidden">
                  {f.priceRegions.map((r) => (
                    <div key={r.region} className="flex items-center justify-between border-b border-line" style={{ padding: '14px 16px' }}>
                      <span className="text-[14px] text-ink">{r.region}</span>
                      <div className="flex items-center gap-[10px]">
                        <span className="text-[14px] text-ink">{r.priceStr}</span>
                        <span className="inline-flex"><TrendArrow value={r.trend} size={12} /></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FARMER WALLET */}
            {f.isFarmerWallet && (
              <div style={{ padding: '14px 20px 28px' }}>
                <div className="text-[20px] tracking-[-0.01em] text-ink mb-[16px]">My money</div>

                {/* Balance card */}
                <div className="bg-primary-dim border border-line rounded-[12px] p-[20px] mb-[16px]">
                  <div className="text-[12px] text-ink2 mb-[6px]">Money you can take out</div>
                  <div className="text-[32px] tracking-[-0.02em] text-ink mb-[14px]">{f.walletBalance}</div>
                  <button onClick={f.withdrawMoney} className="bg-primary text-primary-ink border-none rounded-[8px] text-[14px] cursor-pointer font-[inherit]" style={{ padding: '11px 18px' }}>
                    Send to my MoMo
                  </button>
                </div>

                {/* Trust score row */}
                <div className="flex items-center gap-[16px] bg-surface border border-line rounded-[12px] p-[18px] mb-[22px]">
                  <div style={{ position: 'relative', width: 84, height: 84, flexShrink: 0 }}>
                    <Ring score={812} size={84} />
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <span className="text-[22px] text-ink">812</span>
                      <span className="text-[9px] text-ink3">TRUST SCORE</span>
                    </div>
                  </div>
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
            )}
          </div>

          {/* Bottom tab bar */}
          <div className="flex border-t border-line flex-shrink-0 bg-bg" style={{ padding: '8px 6px 18px' }}>
            {f.farmerTabs.map((t) => (
              <button
                key={t.key}
                onClick={t.onClick}
                aria-label={t.label}
                className="flex-1 flex flex-col items-center gap-[4px] bg-transparent border-none cursor-pointer font-[inherit]"
                style={{ padding: '6px 0', color: t.active ? 'var(--primary)' : 'var(--text-tertiary)' }}
              >
                <Icon paths={t.iconPaths} size={22} />
                <span className="text-[10px]">{t.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
